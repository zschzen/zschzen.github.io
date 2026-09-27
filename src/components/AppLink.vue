<script setup lang="ts">
// Internal paths render a RouterLink, http(s) opens in a new tab, mailto and
// files are plain anchors, and no `to` renders a button.
const props = defineProps<{ to?: string }>()

const kind = computed(() => {
  if (!props.to)
    return 'button'
  if (/^https?:\/\//.test(props.to))
    return 'external'
  if (props.to.startsWith('/') && !/\.\w+$/.test(props.to))
    return 'internal'
  return 'anchor'
})
</script>

<template>
  <RouterLink v-if="kind === 'internal'" :to="to!">
    <slot />
  </RouterLink>
  <a v-else-if="kind === 'external'" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <a v-else-if="kind === 'anchor'" :href="to">
    <slot />
  </a>
  <button v-else type="button">
    <slot />
  </button>
</template>
