<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted } from 'vue'
import { formatDate } from '~/logics/utils'

interface MediaObject {
  type: 'video' | 'image' | 'embed'
  content: string
}

const props = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
  // Update prop type to be our new MediaObject
  media: {
    type: Object as PropType<MediaObject>,
  },
  date: {
    type: String,
    required: true,
  },
})

// This function ensures the Bluesky script is loaded only once.
function ensureBlueskyScript() {
  const scriptSrc = 'https://embed.bsky.app/static/embed.js'
  if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    script.charset = 'utf-8'
    document.head.appendChild(script)
  }
}

onMounted(() => {
  // If the component has a Bluesky embed, make sure the script is present.
  if (props.media?.type === 'embed' && props.media.content.includes('bluesky-embed')) {
    ensureBlueskyScript()
  }
})
</script>

<template>
  <div>
    <a
      border="~ base rounded-lg" block of-hidden
      class="group"
      hover="scale-101 shadow-xl z-10 select-text" transition-treansform duration-300 bg-base relative transform-gpu
      :href="frontmatter.link"
      target="_blank"
    >
      <div v-if="media">
        <video
          v-if="media.type === 'video'"
          :src="media.content"
          preload="none" w-full autoplay loop muted playsinline
        />
        <img
          v-else-if="media.type === 'image'"
          loading="lazy"
          :src="media.content"
          w-full alt="Demonstration media"
        >
      </div>

      <div class="prose prose-sm p4 m0 pb3">
        <slot />
        <div op50 text-sm pt2>
          {{ formatDate(date, false) }}
        </div>
      </div>
    </a>
  </div>
</template>
