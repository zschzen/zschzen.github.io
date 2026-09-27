<script setup lang='ts'>
import { toggleDark } from '~/stores/theme'
</script>

<template>
  <button type="button" class="btn-icon" aria-label="Toggle color scheme" title="Toggle color scheme" @click="toggleDark">
    <span class="i-ph-sun dark:i-ph-moon h-4! w-4!" aria-hidden="true" />
  </button>
</template>
