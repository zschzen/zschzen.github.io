<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router/auto'
import { englishOnly } from '~/stores/lang'
import RouteEntry from './RouteEntry.vue'

// Composables
const router = useRouter()
const route = useRoute()

// Constants
const BASE_PATH = computed(() => `${route.matched[0]?.path || ''}/`)

// Computed properties
const currentSlug = computed(() => {
  const path = route.path
  const basePath = BASE_PATH.value

  if (!path.startsWith(basePath))
    return ''

  const remainingPath = path.replace(basePath, '')
  const segments = remainingPath.split('/').filter(Boolean)

  return segments[0] || ''
})

const Routes = computed(() => {
  const slug = currentSlug.value
  const basePath = BASE_PATH.value

  if (!slug || !basePath)
    return []

  return router
    .getRoutes()
    .filter((route) => {
      if (!route.path.startsWith(basePath))
        return false

      const routeSlug = route.path.replace(basePath, '')
      return routeSlug.startsWith(slug) && routeSlug !== slug
    })
    .filter(i => !englishOnly.value || !i.meta.frontmatter.lang || i.meta.frontmatter.lang === 'en')
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
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
})

defineExpose({
  currentSlug,
  Routes,
})
</script>

<template>
  <div v-if="!Routes.length" py2 op50 prose>
    { nothing here yet... }
  </div>

  <RouteEntry v-else :routes="Routes" />
</template>
