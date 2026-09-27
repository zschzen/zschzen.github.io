<script setup lang="ts">
import { useQueryState } from '~/logics/utils'
import { demoItems } from '../../lab/data'

// With `limit`: the home page rail, minus `exclude` (lab dates already shown
// elsewhere on the page). Without: the /lab page with filters.
const props = defineProps<{ limit?: number, exclude?: string[] }>()

const category = useQueryState('category', 'all')
const categories = [...new Set(demoItems.map(i => i.category))].sort()
const tabs = [
  { value: 'all', label: 'All', count: demoItems.length },
  ...categories.map(c => ({ value: c.toLowerCase(), label: c, count: demoItems.filter(i => i.category === c).length })),
]

const items = computed(() => props.limit
  ? demoItems.filter(i => !props.exclude?.includes(i.date)).slice(0, props.limit)
  : demoItems.filter(i => category.value === 'all' || i.category.toLowerCase() === category.value))
</script>

<template>
  <ul v-if="limit" v-drag-scroll class="rail">
    <li v-for="item in items" :key="item.date" class="w-[220px] lg:w-[300px]">
      <component :is="item.comp" :date="item.date" :media="item.media" />
    </li>
  </ul>

  <div v-else>
    <header class="page-intro">
      <h1 class="h-display">
        Lab
      </h1>
      <p class="page-sub">
        Small experiments in rendering, simulation and emulation. Most of them took an evening.
      </p>
      <a href="https://www.linkedin.com/in/leandroperes/recent-activity/all/" target="_blank" rel="noopener" class="link-arrow py-2.5 lg:py-0">
        More on LinkedIn <span class="i-ph-arrow-up-right h-4! w-4!" aria-hidden="true" />
      </a>
    </header>

    <div class="pt-4 lg:col lg:pt-10">
      <FilterTabs v-model="category" :options="tabs" label="Filter experiments by category" class="px-col" />
    </div>

    <ul class="col grid grid-cols-2 gap-x-2 gap-y-7 pt-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-10 lg:pt-10">
      <li v-for="item in items" :key="item.date">
        <component :is="item.comp" :date="item.date" :media="item.media" />
      </li>
    </ul>
  </div>
</template>
