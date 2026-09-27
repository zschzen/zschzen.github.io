<script setup lang="ts">
import type { Project } from '~/types'
import { projectMedia, useProjects } from '~/logics/content'

// Case study layout for pages/projects/*.md (see wrapperComponent in vite.config.ts).
const props = defineProps<{ frontmatter: Record<string, any> }>()

const route = useRoute()
const projects = useProjects()
const i = projects.findIndex(p => p.path === route.path)
const project: Project = projects[i] ?? { ...props.frontmatter, path: route.path, title: props.frontmatter.display || props.frontmatter.title }
const next = i >= 0 && projects.length > 1 ? projects[(i + 1) % projects.length] : undefined

const media = projectMedia(project)
const hasVideo = media.some(m => m.video)
const carousel = ref<{ playFirstVideo: () => void }>()
</script>

<template>
  <article>
    <header class="col flex flex-col items-start gap-3 lg:gap-4">
      <RouterLink to="/projects" class="link-arrow mt-3 py-3 lg:mt-10 lg:py-0">
        <span class="i-ph-arrow-left h-4! w-4!" aria-hidden="true" /> All projects
      </RouterLink>
      <h1 class="h-display-lg pt-3 lg:pt-8">
        {{ project.title }}
      </h1>
      <p class="text-[17px] leading-[1.5] text-muted-foreground lg:text-xl">
        {{ project.description }}
      </p>
      <div v-if="hasVideo || project.link" class="flex w-full flex-col gap-2.5 pt-2 sm:w-auto sm:flex-row">
        <button v-if="hasVideo" type="button" class="btn-primary flex-1 px-4! lg:flex-none lg:px-5!" @click="carousel?.playFirstVideo()">
          Watch clip <span class="i-ph-play-fill h-4! w-4!" aria-hidden="true" />
        </button>
        <AppLink
          v-if="project.link"
          :to="project.link"
          :class="hasVideo ? 'btn-secondary' : 'btn-primary'"
          class="flex-1 px-4! lg:flex-none lg:px-5!"
        >
          {{ project.linkLabel ?? 'Visit project' }} <span class="i-ph-arrow-up-right h-4! w-4!" aria-hidden="true" />
        </AppLink>
      </div>
    </header>

    <dl v-if="project.facts" class="col grid grid-cols-2 gap-4 pt-8 lg:grid-cols-3 lg:gap-y-6 lg:pt-12">
      <div v-for="(value, label) in project.facts" :key="label" class="flex flex-col gap-0.5">
        <dt class="text-[13px] leading-[1.4] text-muted-foreground lg:text-sm">
          {{ label }}
        </dt>
        <dd class="text-[15px] leading-[1.45] lg:text-base">
          {{ value }}
        </dd>
      </div>
    </dl>

    <MediaCarousel v-if="media.length" ref="carousel" :items="media" :label="`${project.title} media`" class="pt-8 lg:pt-14" />

    <div class="pt-14 lg:pt-24">
      <slot />
    </div>

    <div v-if="frontmatter.disableComments !== true" class="col mt-16 print:hidden">
      <GiscusComments />
    </div>

    <nav v-if="next" aria-label="Next case study" class="col flex flex-col gap-3 pt-18 print:hidden lg:gap-4 lg:pt-30">
      <p class="text-sm leading-[1.4] text-muted-foreground lg:text-[15px]">
        Next case study
      </p>
      <RouterLink :to="next.path" class="group flex items-center gap-3.5 lg:gap-5">
        <ProjectThumb :project="next" class="h-[54px] w-24 shrink-0 rounded-md! lg:h-[90px] lg:w-40" />
        <span class="flex min-w-0 flex-1 flex-col gap-0.5">
          <span class="text-xl font-medium leading-[1.3] decoration-1 underline-offset-4 group-hover:underline lg:text-2xl">{{ next.title }}</span>
          <span class="text-[13px] leading-[1.4] text-muted-foreground lg:text-[15px]">{{ [next.role, next.year].filter(Boolean).join(', ') }}</span>
        </span>
        <span class="btn-icon lg:h-12! lg:w-12!" aria-hidden="true">
          <span class="i-ph-arrow-right h-4! w-4!" />
        </span>
      </RouterLink>
    </nav>
  </article>
</template>
