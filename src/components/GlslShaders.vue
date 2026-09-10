<script setup lang="ts">
// Boots interactive GLSL canvases/editors on @actis/core (worker-first).
// Client-only by construction: onMounted never runs during vite-ssg
// pre-render.
// Display canvases (`canvas.canvas`) run via ShaderCanvas; editable
// `.codeAndCanvas` blocks run via ShaderEditor (CodeMirror + Actis).
// Place `<GlslShaders />` at the top of any post using either.
import { onBeforeUnmount } from 'vue'

const disposers: (() => void)[] = []

async function bootActisCanvases() {
  const canvases = Array.from(document.getElementsByClassName('canvas')) as HTMLCanvasElement[]
  if (canvases.length === 0)
    return
  const { bootShaderCanvas } = await import('./ShaderCanvas')
  await Promise.all(canvases.map(async (canvas) => {
    if (canvas.dataset.actisReady)
      return
    canvas.dataset.actisReady = '1'
    try {
      disposers.push(await bootShaderCanvas(canvas))
    }
    catch (e) {
      console.error('[GlslShaders]', e)
    }
  }))
}

async function bootEditors() {
  const blocks = Array.from(document.querySelectorAll('.codeAndCanvas')) as HTMLElement[]
  if (blocks.length === 0)
    return
  const { bootShaderEditor } = await import('./ShaderEditor')
  await Promise.all(blocks.map(async (el) => {
    if (el.dataset.glslReady || !el.hasAttribute('data'))
      return
    el.dataset.glslReady = '1'
    try {
      disposers.push(await bootShaderEditor(el))
    }
    catch (e) {
      console.error('[GlslShaders]', e)
    }
  }))
}

onMounted(async () => {
  try {
    await bootActisCanvases()
    await nextTick()
    await bootEditors()
  }
  catch (e) {
    console.error('[GlslShaders]', e)
  }
})

onBeforeUnmount(() => {
  while (disposers.length > 0)
    disposers.pop()!()
})
</script>

<template>
  <!-- runtime-injected Actis canvases/editors live in the post body -->
  <span hidden aria-hidden="true" />
</template>
