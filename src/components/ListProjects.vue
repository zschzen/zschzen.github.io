<script setup lang="ts">
defineProps<{ projects: Record<string, any[]> }>()

function slug(name: string) {
  return name.toLowerCase().replace(/[\s\\/]+/g, '-')
}
</script>

<template>
  <div class="max-w-300 mx-auto">
    <p text-center mt--6 mb5 op50 text-lg italic>
      Projects that I created or maintaining.
    </p>
    <div class=" pb5 mx-auto mt10 text-center">
      <div flex="~ gap-2 justify-center">
        <a
          href="https://github.com/zschzen"
          target="_blank"
          class="group btn-[#78A9FF] inline-block"
        >
          <div
            i-ph-github-logo-duotone
            group-hover="i-ph-github-logo-fill text-[#78A9FF]"
          />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/leandroperes/"
          target="_blank"
          class="group btn-[#33B1FF] inline-block"
        >
          <div
            i-ph-linkedin-logo-duotone
            group-hover="i-ph-linkedin-logo-fill text-[#33B1FF]"
          />
          LinkedIn
        </a>
        <a
          href="https://releases.peres.dev"
          target="_blank"
          class="group btn-[#FF6F00] inline-block"
        >
          <div
            i-ph-rocket-launch-duotone
            group-hover="i-ph-rocket-launch-fill text-[#FF6F00]"
          />
          Recent Releases
        </a>
      </div>
    </div>
    <div
      v-for="key, cidx in Object.keys(projects)" :key="key" slide-enter
      :style="{ '--enter-stage': cidx + 1 }"
    >
      <div
        :id="slug(key)"
        select-none relative h18 mt5 pointer-events-none slide-enter
        :style="{
          '--enter-stage': cidx - 2,
          '--enter-step': '60ms',
        }"
      >
        <span text-5em color-transparent absolute left--1rem top-0rem font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>{{ key }}</span>
      </div>
      <div
        class="project-grid py-2 max-w-500 w-max mx-auto"
        grid="~ cols-1 md:cols-2 gap-4 lg:cols-3"
      >
        <a
          v-for="item, idx in projects[key]"
          :key="idx"
          class="item relative flex items-center"
          :href="item.link"
          target="_blank"
          :title="item.name"
        >
          <span v-if="item.icon" class="pt-2 pr-5 opacity-50 group-hover:opacity-100">
            <Dura2D v-if="item.icon === 'dura2d'" class="h-15 w-15 text-4xl" />
            <Vulkano v-else-if="item.icon === 'vulkano'" class="h-15 w-15 text-4xl" />
            <LeveGL v-else-if="item.icon === 'levegl'" class="h-15 w-15 text-4xl" />
            <div v-else class="text-3xl opacity-50" :class="item.icon || 'i-carbon-unknown'" />
          </span>
          <div class="flex-auto">
            <div class="text-normal">{{ item.name }}</div>
            <div class="desc text-sm opacity-50 font-normal" v-html="item.desc" />
          </div>
        </a>
      </div>
    </div>

    <div class="prose pb5 mx-auto mt10 text-center">
      <div block mt-5>
        <a href="https://github.com/search?o=desc&s=updated&type=repositories&q=user%3Azschzen+user%3ASOHNE" target="_blank" op50>All Open-source projects sort by recent updates</a>
      </div>
      <hr>
    </div>
  </div>
  <div>
    <div class="table-of-contents">
      <div class="table-of-contents-anchor">
        <div class="i-ri-menu-2-fill" />
      </div>
      <ul>
        <li v-for="key of Object.keys(projects)" :key="key">
          <a :href="`#${slug(key)}`">{{ key }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.project-grid a.item {
  background: transparent;
  font-size: 1.1rem;
  width: 350px;
  max-width: 100%;
  padding: 0.5rem 0.875rem 0.875rem;
  border-radius: 6px;
}

.project-grid a.item:hover {
  background: #88888811;
}
</style>
