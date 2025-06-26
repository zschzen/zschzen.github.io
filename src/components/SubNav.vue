<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router/auto'
import { englishOnly } from '~/stores/lang'

// Configuration
const navigationConfig = {
  styles: {
    inactive: 'opacity-20 hover:opacity-50',
    active: 'opacity-100 underline',
    link: '!border-none',
  },
  links: [
    { path: '/posts', label: 'Blog' },
    { path: '/notes', label: 'Notes' },
    { path: '/poems', label: 'Poems' },
  ],
} as const

// Composables
const route = useRoute()

// Computed properties
const getLinkClass = computed(() => (linkPath: string) => {
  const isActive = route.path.startsWith(linkPath)
  return [
    navigationConfig.styles.link,
    isActive ? navigationConfig.styles.active : navigationConfig.styles.inactive,
  ]
})

function toggleEnglishOnly() {
  englishOnly.value = !englishOnly.value
}
</script>

<template>
  <nav class="prose m-auto mb-8 select-none animate-none! op100!">
    <!-- Language Toggle -->
    <button
      class="flex items-center gap-1 mb-2 opacity-30 text-sm"
      :aria-pressed="englishOnly"
      aria-label="Toggle English only mode"
      @click="toggleEnglishOnly"
    >
      <div
        :class="englishOnly ? 'i-carbon-checkbox-checked' : 'i-carbon-checkbox'"
        aria-hidden="true"
      />
      English Only
    </button>

    <!-- Navigation Links -->
    <div class="mb-0 flex flex-col gap-1 sm:flex-row sm:gap-3 sm:flex-wrap text-3xl">
      <RouterLink
        v-for="link in navigationConfig.links"
        :key="link.path"
        :to="link.path"
        :class="getLinkClass(link.path)"
        :aria-current="route.path === link.path ? 'page' : undefined"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>
