<script setup lang="ts">
import { useProjects } from '~/logics/content'

const props = defineProps<{
  position: string
  org: string
  dates: string
  description?: string
  // Paths of project pages made in this role, e.g. /projects/simulador-arduino.
  projects?: string[]
}>()

const titles = new Map(useProjects().map(p => [p.path, p.title]))
const links = (props.projects ?? []).filter(to => titles.has(to)).map(to => ({ to, title: titles.get(to) }))
</script>

<template>
  <!-- Mobile: position, then org | dates. Desktop: position | dates, then org. -->
  <li class="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1">
    <h3 class="col-span-2 text-base font-medium leading-[1.4] lg:col-span-1 lg:text-[17px]">
      {{ position }}
    </h3>
    <p class="text-[15px] leading-[1.45] lg:order-3 lg:col-span-2 lg:leading-[1.4]">
      {{ org }}
    </p>
    <p class="text-right text-sm leading-[1.45] text-muted-foreground lg:order-2 lg:text-[15px] lg:leading-[1.4]">
      {{ dates }}
    </p>
    <p v-if="description" class="order-4 col-span-2 text-[15px] leading-[1.55] text-muted-foreground">
      {{ description }}
    </p>
    <ul v-if="links.length" :aria-label="`Projects at ${org}`" class="order-5 col-span-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] leading-[1.55]">
      <li v-for="l in links" :key="l.to">
        <RouterLink :to="l.to" class="link underline">
          {{ l.title }}
        </RouterLink>
      </li>
    </ul>
  </li>
</template>
