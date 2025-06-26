<script setup lang="ts">
import type { Post } from '~/types'
import { useRouter } from 'vue-router/auto'
import { englishOnly } from '~/stores/lang'
import RouteList from './RouteEntry.vue'

const props = defineProps<{
  type?: string
  posts?: Post[]
  extra?: Post[]
}>()

const router = useRouter()
const routes: Post[] = router.getRoutes()
  .filter(i => i.path.startsWith(`/${props.type}`) && i.meta.frontmatter.date && !i.meta.frontmatter.draft)
  .filter(i => !i.path.endsWith('.html') && (i.meta.frontmatter.type || 'blog').split('+').includes(props.type))
  .map(i => ({
    path: i.meta.frontmatter.redirect || i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    lang: i.meta.frontmatter.lang,
    duration: i.meta.frontmatter.duration,
    recording: i.meta.frontmatter.recording,
    upcoming: i.meta.frontmatter.upcoming,
    redirect: i.meta.frontmatter.redirect,
    place: i.meta.frontmatter.place,
  }))

const posts = computed(() =>
  [...(props.posts || routes), ...props.extra || []]
    .filter(i => !englishOnly.value || !i.lang || i.lang === 'en')
    .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a: Post, b?: Post) {
  return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p: Post) {
  if (isFuture(p.date))
    return 'Upcoming'
  return getYear(p.date)
}

// Group posts by year/upcoming
const groupedPosts = computed(() => {
  const groups: Array<{ name: string, posts: Post[], startIndex: number }> = []

  posts.value.forEach((post, idx) => {
    if (!isSameGroup(post, posts.value[idx - 1])) {
      groups.push({
        name: getGroupName(post),
        posts: [post],
        startIndex: idx,
      })
    }
    else {
      groups[groups.length - 1].posts.push(post)
    }
  })

  return groups
})
</script>

<template>
  <div v-if="!posts.length" py2 op50>
    { nothing here yet }
  </div>

  <template v-else>
    <template v-for="group in groupedPosts" :key="group.name">
      <div
        select-none relative h20 pointer-events-none slide-enter z--1
        :style="{
          '--enter-stage': group.startIndex - 2,
          '--enter-step': '60ms',
        }"
      >
        <span text-4em absolute left--3rem top-1rem op25 dark:op10 font-year>{{ group.name }}</span>
      </div>

      <RouteList
        :routes="group.posts"
        :start-index="group.startIndex"
      />
    </template>
  </template>
</template>
