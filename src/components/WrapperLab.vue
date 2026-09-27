<script setup lang="ts">
import dayjs from 'dayjs'
import { useProjects } from '~/logics/content'

// Lab entries render as cards (lab/*.md). Clicking a card opens a dialog with
// the clip, the markdown notes, and links to the post, source or case study.
const props = defineProps<{
  frontmatter: Record<string, any>
  date: string
  media?: { type: 'video' | 'image', content: string }
}>()

const video = ref<HTMLVideoElement>()
const motionOk = useMediaQuery('(prefers-reduced-motion: no-preference)')

// Clips loop only while visible, and never with reduced motion.
useIntersectionObserver(video, ([entry]) => {
  if (!video.value)
    return
  if (entry?.isIntersecting && motionOk.value)
    video.value.play().catch(() => {})
  else
    video.value.pause()
})

const dialog = ref<HTMLDialogElement>()
// Mounts the full-size clip only while the dialog is open.
const open = ref(false)
const titleId = `lab-${props.date}-title`

function show() {
  open.value = true
  dialog.value?.showModal()
}

// The dialog has no padding, so a click on it (not its content) is the backdrop.
function onDialogClick(e: MouseEvent) {
  if (e.target === dialog.value)
    dialog.value?.close()
}

const project = useProjects().find(p => p.media?.some(m => m.lab === props.date))

const links = computed(() => {
  const list: { to: string, label: string, icon: string }[] = []
  const link = props.frontmatter.link as string | undefined
  if (link) {
    const label = link.includes('linkedin.com')
      ? 'See the post'
      : link.includes('github.com') ? 'Source on GitHub' : 'Open link'
    list.push({ to: link, label, icon: 'i-ph-arrow-up-right' })
  }
  if (project)
    list.push({ to: project.path, label: `${project.title} case study`, icon: 'i-ph-arrow-right' })
  return list
})
</script>

<template>
  <div>
    <button type="button" aria-haspopup="dialog" class="group flex w-full flex-col gap-2.5 text-left lg:gap-3" @click="show">
      <span class="media block aspect-square">
        <video
          v-if="media?.type === 'video'"
          ref="video"
          :src="`${media.content}#t=0.1`"
          preload="metadata"
          loop
          muted
          playsinline
          aria-hidden="true"
          class="h-full w-full object-cover"
        />
        <img v-else-if="media" :src="media.content" alt="" loading="lazy" class="h-full w-full object-cover">
      </span>
      <span class="flex flex-col">
        <span class="text-[15px] font-medium leading-[1.45] decoration-1 underline-offset-4 group-hover:underline">
          {{ frontmatter.title }}
        </span>
        <span class="text-[13px] leading-[1.45] text-muted-foreground lg:text-sm">
          {{ frontmatter.category }}, {{ dayjs(date).format('MMM YYYY') }}
        </span>
      </span>
    </button>

    <dialog
      ref="dialog"
      :aria-labelledby="titleId"
      class="lab-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[720px] overflow-y-auto rounded-xl border border-base bg-background p-0 text-foreground"
      @close="open = false"
      @click="onDialogClick"
    >
      <div class="flex flex-col gap-5 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-0.5">
            <h2 :id="titleId" class="text-xl font-medium leading-[1.3] tracking-[-0.3px] lg:text-2xl">
              {{ frontmatter.title }}
            </h2>
            <p class="text-sm leading-[1.45] text-muted-foreground lg:text-[15px]">
              {{ frontmatter.category }}, {{ dayjs(date).format('MMMM YYYY') }}
            </p>
          </div>
          <button type="button" class="btn-icon" aria-label="Close" @click="dialog?.close()">
            <span class="i-ph-x h-4! w-4!" aria-hidden="true" />
          </button>
        </div>

        <div v-if="open && media" class="media">
          <video
            v-if="media.type === 'video'"
            :src="media.content"
            controls
            loop
            muted
            playsinline
            :autoplay="motionOk"
            class="max-h-[60dvh] w-full bg-black object-contain"
          />
          <img v-else :src="media.content" :alt="frontmatter.title" class="max-h-[60dvh] w-full object-contain">
        </div>

        <!-- The markdown body: already wrapped in `.prose` by vite.config.ts. -->
        <slot />

        <ul v-if="links.length" class="flex flex-wrap gap-2.5">
          <li v-for="l in links" :key="l.to">
            <AppLink :to="l.to" class="btn-secondary btn-sm">
              {{ l.label }} <span :class="l.icon" class="h-4! w-4!" aria-hidden="true" />
            </AppLink>
          </li>
        </ul>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.lab-dialog::backdrop {
  background: rgb(0 0 0 / 0.6);
}
</style>
