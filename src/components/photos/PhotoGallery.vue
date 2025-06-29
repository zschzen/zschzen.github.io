<script setup lang="ts">
import type { Photo } from '../../../photos/data'
import { computed } from 'vue'
import allPhotos from '../../../photos/data'
import PhotoSlide from './PhotoSlide.vue'

const props = defineProps<{
  photoNames: string[]
}>()

const resolvedPhotos = computed<Photo[]>(() => {
  if (!props.photoNames) {
    return []
  }

  return props.photoNames
    .map(nameToFind =>
      // For each name, find the matching photo object in the master list.
      allPhotos.find(p => p.url.includes(nameToFind)),
    )
    .filter(Boolean) as Photo[]
})
</script>

<template>
  <PhotoSlide :photos="resolvedPhotos" />
</template>
