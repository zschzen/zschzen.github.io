<script setup lang="ts">
import type { Post } from '~/types'
import { formatDate } from '~/logics/utils'

// Archive rows sit under a year heading; other lists (home) need the year
// on anything older than this year.
const props = defineProps<{ post: Post, showYear?: boolean }>()

const labels = { post: 'Post', note: 'Note', poem: 'Poem' }
const withYear = props.showYear && new Date(props.post.date).getFullYear() !== new Date().getFullYear()
</script>

<template>
  <li>
    <AppLink :to="post.path" class="group flex flex-col gap-0.5 py-3 lg:flex-row lg:items-center lg:gap-6 lg:py-3.5">
      <span :lang="post.lang" class="flex-1 text-base leading-[1.45] text-foreground decoration-1 underline-offset-4 group-hover:underline lg:text-[17px]">
        {{ post.title }}
        <span v-if="post.external" class="i-ph-arrow-up-right h-4! w-4! text-muted-foreground" aria-label="(external)" />
      </span>
      <span class="flex shrink-0 items-center gap-1 text-sm leading-[1.4] text-muted-foreground lg:gap-3 lg:text-[15px]">
        <span v-if="post.lang === 'pt'" class="rounded-pill bg-secondary px-1.5 text-[11px] leading-[1.6] text-secondary-foreground" title="Em português">PT</span>
        <span>{{ labels[post.kind] }}<span class="lg:hidden">,</span></span>
        <span :class="withYear ? 'lg:w-24' : 'lg:w-14'">{{ formatDate(post.date, withYear) }}</span>
      </span>
    </AppLink>
  </li>
</template>
