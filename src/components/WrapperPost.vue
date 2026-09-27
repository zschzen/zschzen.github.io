<script setup lang='ts'>
import { formatDate, readTime } from '~/logics/utils'
import { isDark } from '~/stores/theme'
import GiscusComments from './GiscusComments.vue'

const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const content = ref<HTMLDivElement>()

// Render ```mermaid blocks client-side (vite-ssg has no DOM).
// The fence rule in vite.config.ts emits <pre class="mermaid"> with the raw
// source, so SSG HTML still carries the diagram text until hydration.
async function renderMermaid() {
  if (!content.value?.querySelector('.mermaid'))
    return
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({ startOnLoad: false, theme: isDark.value ? 'dark' : 'default' })
  await mermaid.run({ querySelector: '.mermaid', suppressErrors: true })
}

onMounted(() => {
  renderMermaid()
})

watch(() => route.path, () => nextTick(() => renderMermaid()))

const segments = computed(() => route.path.split('/').filter(Boolean))
const title = computed(() => frontmatter.display ?? frontmatter.title)
const kind = computed(() => ({ post: 'Post', note: 'Note', poem: 'Poem' } as Record<string, string>)[String(frontmatter.type ?? '').split('+')[0]])

const showComments = computed(() => {
  return frontmatter.disableComments !== true
    && Boolean(frontmatter.date)
    && segments.value.length >= 2
})
</script>

<template>
  <header v-if="title" class="col flex flex-col items-start gap-3 pb-10 lg:gap-4 lg:pb-14" :lang="frontmatter.lang">
    <RouterLink v-if="segments.length >= 2" :to="`/${segments[0]}`" class="link-arrow mt-3 py-3 lg:mt-10 lg:py-0" lang="en">
      <span class="i-ph-arrow-left h-4! w-4!" aria-hidden="true" /> All writing
    </RouterLink>
    <h1 class="h-display-lg pt-3 lg:pt-8" :class="segments.length < 2 && 'lg:pt-24'">
      {{ title }}
    </h1>
    <p v-if="frontmatter.subtitle" class="text-[17px] leading-[1.5] text-muted-foreground lg:text-xl">
      {{ frontmatter.subtitle }}
    </p>
    <p v-if="frontmatter.date" class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-[1.4] text-muted-foreground lg:gap-x-4 lg:text-[15px]" lang="en">
      <span v-if="kind" class="font-medium text-foreground">{{ kind }}</span>
      <span>{{ formatDate(frontmatter.date, true) }}</span>
      <span v-if="readTime(frontmatter.duration)">{{ readTime(frontmatter.duration) }}</span>
      <span v-if="frontmatter.place">
        <a v-if="frontmatter.placeLink" :href="frontmatter.placeLink" target="_blank" rel="noopener" class="link">{{ frontmatter.place }}</a>
        <template v-else>{{ frontmatter.place }}</template>
      </span>
      <span v-if="frontmatter.lang === 'pt'" class="rounded-pill bg-secondary px-1.5 text-[11px] leading-[1.6] text-secondary-foreground">PT</span>
    </p>
    <p v-if="frontmatter.draft" class="mt-2 w-full rounded-lg bg-secondary px-4 py-3 text-[15px] text-secondary-foreground" lang="en">
      This is a draft post, the content may be incomplete. Please check back later.
    </p>
  </header>

  <article
    ref="content" :lang="frontmatter.lang"
    :class="[frontmatter.tocAlwaysOn ? 'toc-always-on' : '', frontmatter.class]"
  >
    <slot />
  </article>

  <div v-if="showComments" class="col mt-16 print:hidden">
    <GiscusComments />
  </div>
</template>
