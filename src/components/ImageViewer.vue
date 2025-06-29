<script setup lang="ts">
const imageModel = ref<HTMLImageElement | null>(null)
const imageAlt = ref<string>()

function setImageModel(img: HTMLImageElement): void {
  imageModel.value = img
  imageAlt.value = img.alt

  const figure = img.closest('figure')
  if (figure) {
    const caption = figure.querySelector('figcaption')
    if (caption?.textContent) {
      imageAlt.value ||= caption.textContent
    }
  }
}

function closeModal(): void {
  imageModel.value = null
}

function isValidImageTarget(element: HTMLElement): boolean {
  return element.tagName === 'IMG'
    && !element.classList.contains('no-preview')
}

function isInsideClickableElement(path: EventTarget[]): boolean {
  return path.some(el =>
    el instanceof HTMLElement
    && ['A', 'BUTTON'].includes(el.tagName),
  )
}

function isInValidContainer(path: EventTarget[]): boolean {
  return path.some(el =>
    el instanceof HTMLElement
    && (el.classList.contains('prose') || el.classList.contains('photos')),
  )
}

async function hasImageMoved(img: HTMLImageElement): Promise<boolean> {
  const initialPos = img.getBoundingClientRect()
  await new Promise(resolve => setTimeout(resolve, 50))
  const newPos = img.getBoundingClientRect()

  return initialPos.left !== newPos.left || initialPos.top !== newPos.top
}

useEventListener('click', async (e: MouseEvent) => {
  const path = Array.from(e.composedPath()) as EventTarget[]
  const target = path[0] as HTMLElement

  if (!(target instanceof HTMLElement)
    || !isValidImageTarget(target)
    || isInsideClickableElement(path)
    || !isInValidContainer(path)) {
    return
  }

  // Do not open image when they are moving. Mainly for mobile to avoid conflict with hovering behavior.
  if (await hasImageMoved(target as HTMLImageElement)) {
    return
  }

  setImageModel(target as HTMLImageElement)
})

function navigateImage(direction: 'next' | 'prev'): void {
  if (!imageModel.value?.dataset.photoIndex)
    return

  const currentIndex = Number.parseInt(imageModel.value.dataset.photoIndex)
  const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
  const targetImg = document.querySelector(
    `img[data-photo-index="${targetIndex}"]`,
  ) as HTMLImageElement | null

  if (targetImg) {
    setImageModel(targetImg)
  }
}

onKeyStroke('ArrowRight', (e: KeyboardEvent) => {
  if (imageModel.value) {
    navigateImage('next')
    e.preventDefault()
  }
})

onKeyStroke('ArrowLeft', (e: KeyboardEvent) => {
  if (imageModel.value) {
    navigateImage('prev')
    e.preventDefault()
  }
})

onKeyStroke('Escape', (e: KeyboardEvent) => {
  if (imageModel.value) {
    closeModal()
    e.preventDefault()
  }
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="imageModel" fixed top-0 left-0 right-0 bottom-0 z-500 backdrop-blur-7 tabindex="0" role="dialog"
      aria-modal="true" :aria-label="`Image preview: ${imageAlt}`" @click="imageModel = undefined"
      @keydown.esc="imageModel = undefined"
    >
      <div absolute top-0 left-0 right-0 bottom-0 bg-black:50 z--1 />

      <img
        :src="imageModel.src" :alt="imageModel.alt" :class="imageModel.className" max-w-screen max-h-screen w-full
        h-full object-contain @click.stop
      >

      <div v-if="imageAlt" text-white bg-black:50 absolute right-5 bottom-5 px2 py1 flex justify-center items-center>
        {{ imageAlt }}
      </div>

      <!-- Navigation hints for keyboard users -->
      <div class="sr-only">
        Press Escape to close, Arrow keys to navigate between images
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
