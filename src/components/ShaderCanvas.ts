// Boots a post shader canvas with @actis/core (worker-first, automatic
// main-thread fallback). Client-only: call from onMounted, never during
// vite-ssg pre-render. Post markup stays untouched:
// <canvas class="canvas" data-fragment-url="/assets/shaders/*/*.frag" …>
import type { Renderer, RendererConfig, StaticUniformProvider } from '@actis/core'
// Actis' worker entry, vendored from @actis/core@26.9.0 into public/actis:
// the published package exposes no ./worker-entry subpath, and Actis'
// default sibling resolution misses inside the bundle, so the file ships
// verbatim and its URL is passed explicitly. Re-copy on bump; the protocol
// handshake fails safe on skew (main-thread fallback).
const actisWorkerUrl = `${import.meta.env.BASE_URL}actis/worker-entry.mjs`

const POINTER_PROVIDER_ID = 'blog:pointer-buttons'

interface PointerState {
  u_mouse_over: number
  u_mouse_down: number
}

// Worker proxies apply setup() asynchronously: the pass list arrives with
// the worker's 'passes' event, so a synchronous getPassNames() right after
// setup() is always empty there (false "failed to compile"). Poll instead;
// the main-thread renderer answers synchronously and skips the wait.
const PASS_POLL_INTERVAL_MS = 100
const PASS_TIMEOUT_MS = 3000

export interface PassFailure {
  passName: string
  line: number
  message: string
}

function isWorkerRenderer(renderer: Renderer): boolean {
  return 'isOffscreenRenderer' in renderer
}

export function waitForPasses(renderer: Renderer, getFailure: () => PassFailure | null): Promise<boolean> {
  if (!isWorkerRenderer(renderer))
    return Promise.resolve(renderer.getPassNames().length > 0)
  return new Promise((resolve) => {
    const started = Date.now()
    const timer = setInterval(() => {
      if (getFailure() || renderer.getPassNames().length > 0 || Date.now() - started > PASS_TIMEOUT_MS) {
        clearInterval(timer)
        resolve(renderer.getPassNames().length > 0)
      }
    }, PASS_POLL_INTERVAL_MS)
  })
}

export function buildConfig(source: string): RendererConfig {
  // Game-of-Life style feedback shaders follow the classic live-editor convention:
  // one source compiled twice, gated by `#if defined(BUFFER_0)`.
  // Actis injects no defines, so split it into two passes here and rename
  // the feedback sampler to Actis' `u_textureN` convention.
  if (source.includes('BUFFER_0')) {
    const renamed = source.replaceAll('u_buffer0', 'u_texture0')
    return {
      passes: [
        { name: 'buffer0', fragmentShader: `#define BUFFER_0 1\n${renamed}`, textures: ['buffer0'] },
        { name: 'display', fragmentShader: renamed, textures: ['buffer0'] },
      ],
    }
  }
  return { passes: [{ name: 'main', fragmentShader: source, textures: [] }] }
}

export function showFallback(canvas: HTMLElement, message: string): void {
  canvas.style.display = 'none'
  const note = document.createElement('p')
  note.className = 'shader-fallback'
  note.setAttribute('role', 'note')
  note.textContent = message
  // afterend: never touch the parent, sibling math must survive (see 2d-sdf fix).
  canvas.insertAdjacentElement('afterend', note)
}

export async function bootShaderCanvas(canvas: HTMLCanvasElement): Promise<() => void> {
  const noop = () => {}
  const url = canvas.dataset.fragmentUrl
  if (!url)
    return noop

  let response: Response
  try {
    response = await fetch(url)
  }
  catch {
    showFallback(canvas, 'Interactive shader unavailable: the shader source could not be loaded.')
    return noop
  }
  if (!response.ok) {
    showFallback(canvas, 'Interactive shader unavailable: the shader source could not be loaded.')
    return noop
  }
  const config = buildConfig(await response.text())

  const { createRenderer } = await import('@actis/core')
  const passNames = new Set(config.passes.map(pass => pass.name))
  let seenError: PassFailure | null = null
  let renderer: Renderer
  // Which backend actually runs, queryable from the DOM (headless checks).
  canvas.dataset.actisBackend = 'worker'
  try {
    renderer = await createRenderer(canvas, {
      mode: 'auto',
      workerUrl: actisWorkerUrl,
      onFallback: (reason) => {
        canvas.dataset.actisBackend = 'main'
        canvas.dataset.actisFallback = reason
      },
      onError: ({ passName, coords }) => {
        if (passNames.has(passName))
          seenError = { passName, line: coords.line, message: coords.message }
        console.error(`[ShaderCanvas] ${url} pass "${passName}" at line ${coords.line}: ${coords.message}`)
      },
    })
  }
  catch (error) {
    // No WebGL at all (headless, old devices): leave a note, keep siblings intact.
    console.warn(`[ShaderCanvas] ${url}: renderer unavailable, showing fallback.`, error)
    showFallback(canvas, 'Interactive shader unavailable: this device or browser has no WebGL support.')
    return noop
  }

  // Display button uniforms (see the editor for the live variant). Static descriptors are the only
  // provider form that crosses the worker boundary, so re-register the
  // snapshot on each discrete pointer flip (no per-frame churn).
  const state: PointerState = { u_mouse_over: 0, u_mouse_down: 0 }
  const syncPointer = () => {
    renderer.unregisterUniformProvider(POINTER_PROVIDER_ID)
    const provider: StaticUniformProvider = { id: POINTER_PROVIDER_ID, values: { ...state } }
    renderer.registerUniformProvider(provider)
  }
  const setOver = (v: number) => {
    if (state.u_mouse_over !== v) {
      state.u_mouse_over = v
      syncPointer()
    }
  }
  const setDown = (v: number) => {
    if (state.u_mouse_down !== v) {
      state.u_mouse_down = v
      syncPointer()
    }
  }
  const onOver = () => setOver(1)
  const onOut = () => setOver(0)
  const onDown = () => setDown(1)
  const onUp = () => setDown(0)
  canvas.addEventListener('mouseenter', onOver)
  canvas.addEventListener('mouseleave', onOut)
  canvas.addEventListener('mousedown', onDown)
  canvas.addEventListener('mouseup', onUp)
  syncPointer()

  const removePointerListeners = () => {
    canvas.removeEventListener('mouseenter', onOver)
    canvas.removeEventListener('mouseleave', onOut)
    canvas.removeEventListener('mousedown', onDown)
    canvas.removeEventListener('mouseup', onUp)
  }
  const failSetup = (message: string) => {
    // Real compile detail for devtools/headless; the note stays generic.
    if (seenError)
      canvas.dataset.actisError = `${seenError.passName}:${seenError.line}:${seenError.message}`
    removePointerListeners()
    try {
      renderer.dispose()
    }
    catch {
      // Already gone (worker terminated on a previous unmount).
    }
    showFallback(canvas, message)
  }

  try {
    renderer.setup(config)
  }
  catch (error) {
    console.error(`[ShaderCanvas] ${url}: setup threw, showing fallback.`, error)
    failSetup('Interactive shader unavailable: the shader failed to compile.')
    return noop
  }
  if (!await waitForPasses(renderer, () => seenError)) {
    failSetup('Interactive shader unavailable: the shader failed to compile.')
    return noop
  }
  renderer.play()

  // Pause offscreen canvases; replaces the old scroll-visibility loop.
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (!entry)
      return
    if (entry.isIntersecting)
      renderer.resume()
    else renderer.pause()
  })
  observer.observe(canvas)

  return () => {
    observer.disconnect()
    removePointerListeners()
    try {
      renderer.dispose()
    }
    catch {
      // Already gone (worker terminated on a previous unmount).
    }
  }
}
