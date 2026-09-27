<script setup lang="ts">
import { useProjects } from '~/logics/content'
import { useQueryState } from '~/logics/utils'

const projects = useProjects()
const type = useQueryState('type', 'all')
const sort = useQueryState('sort', 'newest')

const categories = [...new Set(projects.map(p => p.category).filter(Boolean))].sort() as string[]
const tabs = [
  { value: 'all', label: 'All', count: projects.length },
  ...categories.map(c => ({ value: c.toLowerCase(), label: c, count: projects.filter(p => p.category === c).length })),
]

const list = computed(() => {
  const items = type.value === 'all'
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === type.value)
  return sort.value === 'oldest' ? [...items].reverse() : items
})
</script>

<template>
  <div>
    <header class="page-intro">
      <h1 class="h-display">
        Projects
      </h1>
      <p class="page-sub">
        Engines, games, tools and emulators I've built since 2011.
      </p>
    </header>

    <div class="flex flex-col gap-1 pt-6 lg:col lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:pt-10">
      <FilterTabs v-model="type" :options="tabs" label="Filter projects by type" class="px-col" />
      <div class="px-col">
        <label class="relative inline-flex items-center">
          <span class="sr-only">Sort projects</span>
          <select v-model="sort" class="cursor-pointer appearance-none bg-transparent py-3 pr-6 text-[15px] font-medium leading-[1.4] lg:py-2">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
          <span class="i-ph-caret-down pointer-events-none absolute right-0 h-4! w-4!" aria-hidden="true" />
        </label>
      </div>
    </div>

    <ul class="col flex flex-col gap-6 pt-4 lg:gap-10 lg:pt-10">
      <li v-for="p in list" :key="p.path">
        <RouterLink :to="p.path" class="group flex gap-4 lg:gap-6">
          <ProjectThumb :project="p" class="h-18 w-32 shrink-0 rounded-md! lg:h-[149px] lg:w-66 lg:rounded-lg!" />
          <div class="flex min-w-0 flex-1 flex-col gap-1 lg:gap-2">
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-base font-medium leading-[1.35] decoration-1 underline-offset-4 group-hover:underline lg:text-xl lg:leading-[1.3] lg:tracking-[-0.2px]">
                {{ p.title }}
              </h2>
              <span class="hidden shrink-0 text-[15px] leading-[1.4] text-muted-foreground lg:block">{{ p.status ?? p.year }}</span>
            </div>
            <p class="text-sm leading-[1.45] text-muted-foreground lg:text-[15px] lg:leading-[1.4]">
              <span v-if="p.status ?? p.year" class="lg:hidden">{{ p.status ?? p.year }}<template v-if="p.role">. </template></span>{{ p.role }}
            </p>
            <p class="text-sm leading-[1.5] lg:text-[15px] lg:leading-[1.55]">
              {{ p.subtitle }}
            </p>
            <ul v-if="p.tags?.length" class="hidden flex-wrap gap-1.5 pt-1 lg:flex">
              <li v-for="tag in p.tags" :key="tag" class="tag">
                {{ tag }}
              </li>
            </ul>
          </div>
        </RouterLink>
      </li>
    </ul>

    <p class="col pt-10 lg:pt-14">
      <a
        href="https://github.com/search?o=desc&s=updated&type=repositories&q=user%3Azschzen+user%3ASOHNE"
        target="_blank"
        rel="noopener"
        class="link-arrow py-2.5 lg:py-0"
      >
        All open-source projects <span class="i-ph-arrow-up-right h-4! w-4!" aria-hidden="true" />
      </a>
    </p>
  </div>
</template>
