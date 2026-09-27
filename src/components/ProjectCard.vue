<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{ project: Project }>()
</script>

<template>
  <li class="w-65 lg:w-85">
    <RouterLink :to="project.path" class="group flex flex-col gap-3 lg:gap-3.5">
      <ProjectThumb :project="project" class="aspect-[4/3]" />
      <div class="flex flex-col gap-0.5">
        <div class="flex items-center justify-between gap-3">
          <h3 class="text-base font-medium leading-[1.4] decoration-1 underline-offset-4 group-hover:underline lg:text-[17px]">
            {{ project.title }}
          </h3>
          <span class="shrink-0 text-sm leading-[1.4] text-muted-foreground lg:text-[15px]">{{ project.status ?? project.year }}</span>
        </div>
        <p class="line-clamp-2 text-sm leading-[1.5] text-muted-foreground lg:text-[15px]">
          {{ project.subtitle }}
        </p>
      </div>
    </RouterLink>
  </li>
</template>
