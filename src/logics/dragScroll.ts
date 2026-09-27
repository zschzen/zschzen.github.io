import type { Directive } from 'vue'

// `v-drag-scroll`: mouse drag scrolling for rails. Touch and pen already
// scroll them natively, so only the mouse is handled here.
export const dragScroll: Directive<HTMLElement> = {
  mounted(el) {
    let startX = 0
    let startScroll = 0
    let dragged = false
    let timer: ReturnType<typeof setTimeout> | undefined

    function restoreSnap() {
      clearTimeout(timer)
      el.removeEventListener('scrollend', restoreSnap)
      el.style.scrollSnapType = ''
    }

    function onMove(e: PointerEvent) {
      const dx = e.clientX - startX
      if (!dragged) {
        if (Math.abs(dx) < 5)
          return
        dragged = true
        // Snapping would fight every scrollLeft write; settle() restores it.
        el.style.scrollSnapType = 'none'
        el.style.userSelect = 'none'
        el.style.cursor = 'grabbing'
        window.getSelection()?.removeAllRanges()
      }
      el.scrollLeft = startScroll - dx
    }

    // Glide to a slide start: the next one in the drag direction, or back to
    // the nearest one after a short drag. Snapping resumes once it stops.
    function settle() {
      el.style.userSelect = ''
      el.style.cursor = ''
      const first = el.firstElementChild as HTMLElement
      const max = el.scrollWidth - el.clientWidth
      const stops = [...el.children].map(c => Math.min((c as HTMLElement).offsetLeft - first.offsetLeft, max))
      const x = el.scrollLeft
      const moved = x - startScroll
      const target = Math.abs(moved) < 40
        ? stops.reduce((a, b) => Math.abs(b - x) < Math.abs(a - x) ? b : a)
        : moved > 0
          ? stops.find(s => s >= x) ?? max
          : stops.filter(s => s <= x).pop() ?? 0
      if (Math.abs(target - x) < 1)
        return restoreSnap()
      el.addEventListener('scrollend', restoreSnap)
      timer = setTimeout(restoreSnap, 1000) // browsers without scrollend
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' })
    }

    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      // Also settles a glide that this press interrupted.
      if (dragged || el.style.scrollSnapType)
        settle()
    }

    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || el.scrollWidth <= el.clientWidth)
        return
      // Leave video controls (seek bar, volume) and open lab dialogs alone.
      if ((e.target as Element).closest('video[controls], dialog'))
        return
      clearTimeout(timer)
      el.removeEventListener('scrollend', restoreSnap)
      startX = e.clientX
      startScroll = el.scrollLeft
      dragged = false
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    })

    // A drag ends with a click on the card under the pointer: drop it.
    el.addEventListener('click', (e) => {
      if (dragged) {
        e.preventDefault()
        e.stopPropagation()
      }
    }, true)

    // Links and images would otherwise start a native drag and end ours.
    el.addEventListener('dragstart', e => e.preventDefault())
  },
}
