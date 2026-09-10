// Live GLSL editor: a CodeMirror pane beside an @actis/core canvas.
// Client-only: call from onMounted, never during vite-ssg pre-render.
// Post markup stays untouched:
// <div class="codeAndCanvas" data="/assets/shaders/*/*.frag"></div>
// Edits recompile through the same worker-first path as ShaderCanvas
// (debounced); failures keep the editor open with the real
// `pass:line:message` in an error bar instead of killing the block.
import type { Renderer } from '@actis/core'
import type { PassFailure } from './ShaderCanvas'
import { StreamLanguage } from '@codemirror/language'
import { cpp } from '@codemirror/legacy-modes/mode/clike'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup, EditorView } from 'codemirror'
import { buildConfig, showFallback, waitForPasses } from './ShaderCanvas'
// Same vendored worker entry as ShaderCanvas (see its note): public/actis
// ships verbatim, so display and editor share one URL and the handshake
// guards skew for both.
const actisWorkerUrl = `${import.meta.env.BASE_URL}actis/worker-entry.mjs`

const RECOMPILE_DEBOUNCE_MS = 400
const EDITOR_STYLE_ID = 'shader-editor-styles'

function ensureEditorStyles() {
  if (document.getElementById(EDITOR_STYLE_ID))
    return
  const style = document.createElement('style')
  style.id = EDITOR_STYLE_ID
  style.textContent = [
    '.shader-editor{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start}',
    '.shader-editor-code{flex:1 1 340px;min-width:0}',
    '.shader-editor-code .cm-editor{border-radius:8px;overflow:hidden}',
    '.shader-editor-side{flex:0 0 auto;margin-left:auto;text-align:center}',
    '.shader-error{max-width:250px;margin:8px auto 0;color:#ff7b72;font-size:0.85em;white-space:pre-wrap}',
  ].join('\n')
  document.head.appendChild(style)
}

export async function bootShaderEditor(mount: HTMLElement): Promise<() => void> {
  const noop = () => {}
  const url = mount.getAttribute('data')
  if (!url)
    return noop

  let response: Response
  try {
    response = await fetch(url)
  }
  catch {
    showFallback(mount, 'Interactive shader unavailable: the shader source could not be loaded.')
    return noop
  }
  if (!response.ok) {
    showFallback(mount, 'Interactive shader unavailable: the shader source could not be loaded.')
    return noop
  }
  const initialSource = await response.text()

  ensureEditorStyles()
  const root = document.createElement('div')
  root.className = 'shader-editor'
  const codeEl = document.createElement('div')
  codeEl.className = 'shader-editor-code'
  const sideEl = document.createElement('div')
  sideEl.className = 'shader-editor-side'
  const canvas = document.createElement('canvas')
  canvas.className = 'shader-editor-canvas'
  canvas.width = 250
  canvas.height = 250
  const errorEl = document.createElement('p')
  errorEl.className = 'shader-error'
  errorEl.setAttribute('role', 'alert')
  errorEl.hidden = true
  sideEl.append(canvas, errorEl)
  root.append(codeEl, sideEl)
  mount.appendChild(root)

  const { createRenderer } = await import('@actis/core')
  // Refreshed on every applySource so onError only trusts the live config.
  let passNames = new Set<string>()
  let seenError: PassFailure | null = null
  let renderer: Renderer
  // Which backend actually runs, queryable from the DOM (headless checks).
  mount.dataset.actisBackend = 'worker'
  try {
    renderer = await createRenderer(canvas, {
      mode: 'auto',
      workerUrl: actisWorkerUrl,
      onFallback: (reason) => {
        mount.dataset.actisBackend = 'main'
        mount.dataset.actisFallback = reason
      },
      onError: ({ passName, coords }) => {
        if (passNames.has(passName))
          seenError = { passName, line: coords.line, message: coords.message }
        console.error(`[ShaderEditor] ${url} pass "${passName}" at line ${coords.line}: ${coords.message}`)
      },
    })
  }
  catch (error) {
    console.warn(`[ShaderEditor] ${url}: renderer unavailable, showing fallback.`, error)
    root.remove()
    showFallback(mount, 'Interactive shader unavailable: this device or browser has no WebGL support.')
    return noop
  }

  let visible = true
  // Typed getter: onError assigns inside a closure, so direct reads in this
  // scope would narrow to null. The boundary preserves the union.
  const getFailure = (): PassFailure | null => seenError
  let debounce = 0
  const showError = (message: string) => {
    errorEl.textContent = message
    errorEl.hidden = false
  }
  const hideError = () => {
    errorEl.hidden = true
  }

  // Generation counter: a slow worker compile may still be polling when
  // the next debounced edit lands. Stale generations bail before touching
  // playback or the error bar.
  let epoch = 0

  async function applySource(source: string): Promise<void> {
    const current = ++epoch
    const live = (fn: () => void) => {
      if (current === epoch)
        fn()
    }
    seenError = null
    const config = buildConfig(source)
    passNames = new Set(config.passes.map(pass => pass.name))
    let setupOk = true
    try {
      renderer.setup(config)
    }
    catch (error) {
      setupOk = false
      console.error(`[ShaderEditor] ${url}: setup threw.`, error)
    }
    if (setupOk && await waitForPasses(renderer, getFailure)) {
      live(() => {
        hideError()
        // play() is idempotent on both backends; setup() cancelled the loop.
        if (visible)
          renderer.play()
      })
      return
    }
    // Broken edit blanks the canvas until fixed. The bar says where.
    live(() => {
      const failure = getFailure()
      showError(failure
        ? `Shader error in "${failure.passName}" at line ${failure.line}: ${failure.message}`
        : 'Interactive shader unavailable: the shader failed to compile.')
    })
  }

  const view = new EditorView({
    doc: initialSource,
    extensions: [
      basicSetup,
      StreamLanguage.define(cpp),
      oneDark,
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (!update.docChanged)
          return
        window.clearTimeout(debounce)
        debounce = window.setTimeout(() => {
          void applySource(update.state.doc.toString())
        }, RECOMPILE_DEBOUNCE_MS)
      }),
    ],
    parent: codeEl,
  })

  await applySource(initialSource)

  // Pause offscreen editors; replaces the old scroll-visibility loop.
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (!entry)
      return
    visible = entry.isIntersecting
    if (visible) {
      // No-op when already playing or when the current edit is broken
      // (empty pipeline renders nothing either way).
      renderer.resume()
    }
    else {
      renderer.pause()
    }
  })
  observer.observe(canvas)

  return () => {
    window.clearTimeout(debounce)
    observer.disconnect()
    view.destroy()
    try {
      renderer.dispose()
    }
    catch {
      // Already gone (worker terminated on a previous unmount).
    }
  }
}
