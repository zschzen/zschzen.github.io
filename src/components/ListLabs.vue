<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'
import { demoItems } from '../../lab/data'

const breakpoints = useBreakpoints(breakpointsTailwind)

const cols = computed(() => {
  if (breakpoints.xl.value)
    return 3
  if (breakpoints.lg.value)
    return 2
  return 1
})

const parts = computed(() => {
  const result = Array.from({ length: cols.value }, () => [] as typeof demoItems)
  demoItems.forEach((item, i) => {
    result[i % cols.value].push(item)
  })
  return result
})
</script>

<template>
  <div grid="~ cols-1 lg:cols-2 xl:cols-3 gap-4">
    <div v-for="(items, idx) of parts" :key="idx" flex="~ col gap-4">
      <component
        :is="comp"
        v-for="{ comp, date, media } of items"
        :key="date"
        :date="date"
        :media="media"
        class="slide-enter"
        :style="{
          '--enter-stage': idx + 1,
        }"
      />
    </div>
  </div>
</template>
