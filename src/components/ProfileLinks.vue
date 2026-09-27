<script setup lang="ts">
import { site } from '~/site'
</script>

<template>
  <ul class="flex flex-wrap items-center gap-2">
    <li v-for="p in site.profiles" :key="p.href">
      <AppLink :to="p.href" class="btn-icon" :aria-label="p.label" :title="p.label">
        <span :class="p.icon" class="h-4! w-4!" aria-hidden="true" />
      </AppLink>
    </li>
  </ul>
</template>
