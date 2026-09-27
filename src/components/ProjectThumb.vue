<script setup lang="ts">
import type { Component } from 'vue'
import type { Project } from '~/types'
import { resolveMedia } from '~/logics/content'
import Dura2D from './icons/Dura2D.vue'
import LeveGL from './icons/LeveGL.vue'
import Vulkano from './icons/Vulkano.vue'

const props = defineProps<{ project: Project }>()

const icons: Record<string, Component> = { dura2d: Dura2D, levegl: LeveGL, vulkano: Vulkano }

// Cover, else the first still from the project's media, else icon or initial.
const src = computed(() => props.project.cover ?? resolveMedia(props.project.media).find(m => !m.video)?.src)
</script>

<template>
  <!-- Decorative: the project title always sits next to it. -->
  <div class="media flex items-center justify-center" aria-hidden="true">
    <img v-if="src" :src="src" alt="" loading="lazy" class="h-full w-full object-cover">
    <component :is="icons[project.icon]" v-else-if="project.icon && icons[project.icon]" class="h-1/3 w-1/3" />
    <span v-else class="text-[2em] font-medium text-muted-foreground">{{ project.title[0] }}</span>
  </div>
</template>
