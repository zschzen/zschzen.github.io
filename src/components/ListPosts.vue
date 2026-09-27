<script setup lang="ts">
import type { Post, PostKind } from '~/types'
import { usePosts } from '~/logics/content'
import { formatDate, readTime, useQueryState } from '~/logics/utils'

// `type` preselects a tab (/notes, /poems). `under` renders one folder
// (/notes/2024) as a plain archive without controls.
const props = defineProps<{ type?: PostKind, under?: string }>()

const all = usePosts(props.under)
const labels: Record<PostKind, string> = { post: 'Posts', note: 'Notes', poem: 'Poems' }

const kind = useQueryState('type', props.type ?? 'all')
const query = ref('')
const search = refDebounced(query, 150)

const tabs = [
  { value: 'all', label: 'All', count: all.length },
  ...(Object.keys(labels) as PostKind[]).map(k => ({ value: k, label: labels[k], count: all.filter(p => p.kind === k).length })),
].filter(t => t.count)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return all.filter(p => (kind.value === 'all' || p.kind === kind.value) && (!q || p.title.toLowerCase().includes(q)))
})

const featured = computed(() => props.under || search.value || !['all', 'post'].includes(kind.value)
  ? undefined
  : filtered.value.find(p => p.kind === 'post'))

const groups = computed(() => {
  const byYear = new Map<number, Post[]>()
  for (const p of filtered.value) {
    if (p === featured.value)
      continue
    const year = new Date(p.date).getFullYear()
    byYear.set(year, [...byYear.get(year) ?? [], p])
  }
  return [...byYear]
})

const section = props.under ? `/${props.under.split('/')[1]}` : ''
</script>

<template>
  <div>
    <header v-if="under" class="page-intro">
      <RouterLink :to="section" class="link-arrow py-2.5 lg:py-0">
        <span class="i-ph-arrow-left h-4! w-4!" aria-hidden="true" /> All writing
      </RouterLink>
      <h1 class="h-display capitalize">
        {{ under.split('/').pop() }}
      </h1>
    </header>

    <template v-else>
      <header class="page-intro">
        <h1 class="h-display">
          Writing
        </h1>
        <p class="page-sub">
          Tutorials, study notes and the occasional poem about games, rendering and physics.
        </p>
        <a href="/feed.xml" class="link-arrow py-2.5 lg:py-0">
          RSS feed <span class="i-ph-rss-simple h-4! w-4!" aria-hidden="true" />
        </a>
      </header>

      <div class="flex flex-col gap-3 pt-4 lg:col lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-4 lg:pt-10">
        <div class="px-col">
          <label class="flex items-center gap-2 rounded-pill bg-secondary px-4 py-3 focus-within:(outline outline-2 outline-offset-2 outline-foreground) lg:w-60 lg:py-2.5">
            <span class="i-ph-magnifying-glass h-4! w-4! shrink-0 text-secondary-muted-foreground" aria-hidden="true" />
            <span class="sr-only">Search posts</span>
            <input
              v-model="query"
              type="search"
              placeholder="Search posts"
              class="w-full bg-transparent text-[15px] leading-[1.4] outline-none placeholder:text-secondary-muted-foreground"
            >
          </label>
        </div>
        <FilterTabs v-model="kind" :options="tabs" label="Filter writing by type" class="px-col" />
      </div>

      <article v-if="featured" class="col flex flex-col gap-3 pt-8 lg:gap-4 lg:pt-12">
        <RouterLink :to="featured.path" class="media block aspect-[2/1]" tabindex="-1" aria-hidden="true">
          <img :src="featured.cover" alt="" class="h-full w-full object-cover">
        </RouterLink>
        <p class="flex items-center gap-3 pt-1 text-sm leading-[1.4] lg:gap-4 lg:text-[15px]">
          <span class="font-medium">Post</span>
          <span class="text-muted-foreground">{{ formatDate(featured.date, true) }}</span>
          <span v-if="readTime(featured.duration)" class="text-muted-foreground">{{ readTime(featured.duration) }}</span>
        </p>
        <h2 :lang="featured.lang" class="text-[22px] font-medium leading-[1.25] tracking-[-0.02em] lg:text-[28px]">
          <RouterLink :to="featured.path" class="link">
            {{ featured.title }}
          </RouterLink>
        </h2>
        <p v-if="featured.excerpt" :lang="featured.lang" class="page-sub">
          {{ featured.excerpt }}
        </p>
        <RouterLink :to="featured.path" class="link-arrow self-start py-2.5 lg:py-0">
          Read post <span class="i-ph-arrow-right h-4! w-4!" aria-hidden="true" />
        </RouterLink>
      </article>
    </template>

    <div class="col flex flex-col gap-8 lg:gap-10" :class="featured ? 'pt-12 lg:pt-20' : 'pt-6 lg:pt-10'">
      <section v-for="[year, posts] in groups" :key="year">
        <h2 class="text-[15px] font-medium leading-[1.4] text-muted-foreground">
          {{ year }}
        </h2>
        <ul>
          <PostRow v-for="p in posts" :key="p.path" :post="p" />
        </ul>
      </section>
      <p v-if="!filtered.length" class="text-muted-foreground">
        Nothing here yet.
      </p>
    </div>
  </div>
</template>
