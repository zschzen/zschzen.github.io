<script setup lang="ts">
import type { MediaItem } from '~/types'

const props = defineProps<{ items: MediaItem[], label: string }>()

const rail = ref<HTMLUListElement>()
const index = ref(0)
const atEnd = ref(false)
// Video slides show a still with a play button until clicked; never autoplay.
const playing = ref<number>()
const motion = usePreferredReducedMotion()

// Distance between slide starts: slide width + flex gap.
function step() {
  const el = rail.value
  const first = el?.firstElementChild as HTMLElement | null
  if (!el || !first)
    return 1
  return first.offsetWidth + (Number.parseFloat(getComputedStyle(el).columnGap) || 0)
}

function onScroll() {
  const el = rail.value!
  atEnd.value = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
  // The last slides cannot snap to the start, so the scroll end means "last".
  index.value = atEnd.value ? props.items.length - 1 : Math.round(el.scrollLeft / step())
}

function scrollToSlide(i: number) {
  rail.value?.scrollTo({ left: i * step(), behavior: motion.value === 'reduce' ? 'auto' : 'smooth' })
}

// Used by the case study "Watch clip" button.
function playFirstVideo() {
  const i = props.items.findIndex(m => m.video)
  if (i < 0)
    return
  rail.value?.scrollIntoView({ behavior: motion.value === 'reduce' ? 'auto' : 'smooth', block: 'center' })
  scrollToSlide(i)
  playing.value = i
}

defineExpose({ playFirstVideo })
</script>

<template>
  <div class="flex flex-col gap-3 lg:gap-4">
    <ul
      ref="rail"
      v-drag-scroll
      :aria-label="label"
      :tabindex="items.length > 1 ? 0 : undefined"
      :class="items.length > 1 ? 'rail media-rail' : 'col'"
      @scroll.passive="onScroll"
    >
      <li
        v-for="(item, i) in items"
        :key="item.src ?? item.youtube"
        class="media aspect-video"
        :class="items.length > 1 ? 'w-[var(--slide)]' : 'w-full'"
      >
        <template v-if="item.video">
          <template v-if="playing === i">
            <!-- Audio starts muted; the YouTube player has its own unmute button. -->
            <iframe
              v-if="item.youtube"
              :src="`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&mute=1&playsinline=1&rel=0`"
              :title="item.caption ?? item.alt ?? label"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
              class="h-full w-full"
            />
            <video
              v-else
              :src="item.src"
              controls
              autoplay
              playsinline
              class="h-full w-full object-cover"
            />
          </template>
          <button v-else type="button" class="group relative block h-full w-full" :aria-label="`Play video: ${item.caption ?? item.alt ?? label}`" @click="playing = i">
            <img v-if="item.poster" :src="item.poster" alt="" loading="lazy" class="h-full w-full object-cover">
            <video v-else :src="`${item.src}#t=0.1`" preload="metadata" muted playsinline tabindex="-1" class="pointer-events-none h-full w-full object-cover" />
            <span class="play-overlay transition-transform duration-150 group-hover:scale-105" aria-hidden="true">
              <span class="i-ph-play-fill h-5! w-5! lg:h-6! lg:w-6!" />
            </span>
            <span v-if="item.duration" class="badge-overlay" aria-hidden="true">
              <span class="i-ph-play-fill h-[11px]! w-[11px]!" />{{ item.duration }}
            </span>
          </button>
        </template>
        <img v-else :src="item.src" :alt="item.alt ?? item.caption ?? ''" loading="lazy" class="h-full w-full object-cover">
      </li>
    </ul>

    <div v-if="items.length > 1" class="col flex items-center justify-between gap-4 text-sm leading-[1.4] text-muted-foreground lg:text-[15px]">
      <p>{{ items[index]?.caption }}</p>
      <div class="flex shrink-0 items-center gap-2">
        <p aria-live="polite">
          {{ index + 1 }} / {{ items.length }}
        </p>
        <button type="button" class="btn-icon hidden lg:inline-flex" aria-label="Previous slide" :disabled="index === 0" @click="scrollToSlide(index - 1)">
          <span class="i-ph-arrow-left h-4! w-4!" aria-hidden="true" />
        </button>
        <button type="button" class="btn-icon hidden lg:inline-flex" aria-label="Next slide" :disabled="atEnd" @click="scrollToSlide(index + 1)">
          <span class="i-ph-arrow-right h-4! w-4!" aria-hidden="true" />
        </button>
      </div>
    </div>
    <p v-else-if="items[0]?.caption" class="col text-sm leading-[1.4] text-muted-foreground lg:text-[15px]">
      {{ items[0].caption }}
    </p>
  </div>
</template>
