<script setup lang="ts">
import { projectMedia, useProjects } from '~/logics/content'
import { site } from '~/site'

const projects = useProjects()
  .filter(p => p.featured)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
</script>

<template>
  <ul class="flex flex-col gap-18 lg:gap-28">
    <li v-for="p in projects" :key="p.path" class="flex flex-col gap-4 lg:gap-6">
      <MediaCarousel :items="projectMedia(p)" :label="`${p.title} media`" />
      <!-- Head (title + meta), body (description + tags), then the action. -->
      <div class="col flex flex-col gap-3 lg:gap-6">
        <div class="flex flex-col gap-3 lg:gap-4">
          <div class="flex flex-col gap-1">
            <div class="flex items-baseline justify-between gap-4">
              <h3 class="min-w-0 flex-1 text-balance text-xl font-medium leading-[1.3] tracking-[-0.3px] lg:text-2xl">
                <template v-if="p.nda">
                  {{ p.title }}
                </template>
                <RouterLink v-else :to="p.path" class="link">
                  {{ p.title }}
                </RouterLink>
              </h3>
              <span class="shrink-0 text-sm leading-[1.4] text-muted-foreground lg:text-[15px]">{{ p.status ?? p.year }}</span>
            </div>
            <p v-if="p.role || p.nda" class="text-sm leading-[1.4] text-muted-foreground lg:text-[15px]">
              {{ [p.role, p.nda && 'Under NDA'].filter(Boolean).join(' · ') }}
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <p class="max-w-[34rem] text-pretty text-base leading-[1.6] lg:text-[17px]">
              {{ p.description }}
            </p>
            <ul v-if="p.tags?.length" class="flex flex-wrap gap-2">
              <li v-for="tag in p.tags" :key="tag" class="tag">
                {{ tag }}
              </li>
            </ul>
          </div>
        </div>
        <a v-if="p.nda" :href="`mailto:${site.email}?subject=${encodeURIComponent(p.title)}`" class="link-arrow self-start py-2.5 lg:py-0">
          Ask me for details<span class="sr-only"> about {{ p.title }}</span> <span class="i-ph-envelope-simple h-4! w-4!" aria-hidden="true" />
        </a>
        <RouterLink v-else :to="p.path" class="link-arrow self-start py-2.5 lg:py-0">
          Read case study <span class="i-ph-arrow-right h-4! w-4!" aria-hidden="true" />
        </RouterLink>
      </div>
    </li>
  </ul>
</template>
