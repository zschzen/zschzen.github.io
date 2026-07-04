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

    <div
      v-for="(items, key, cidx) in projects" :key="key"
      slide-enter :style="{ '--enter-stage': cidx + 1 }"
    >
      <div :id="slug(key)" select-none relative h18 mt5 pointer-events-none>
        <span text-5em color-transparent absolute left--1rem top-0 font-bold leading-1em text-stroke-1.5 text-stroke-hex-aaa op35 dark:op20>{{ key }}</span>
      </div>

      <div grid="~ cols-1 sm:cols-2 lg:cols-3 gap-4" py2 text-left>
        <component
          :is="item.path ? 'RouterLink' : item.link ? 'a' : 'div'"
          v-for="item in items"
          :key="item.name"
          v-bind="item.path
            ? { to: item.path }
            : item.link
              ? { href: item.link, target: '_blank', rel: 'noopener' }
              : {}"
          class="group mb4 flex flex-col of-hidden border border-base rounded-md bg-[#8881] color-base font-normal no-underline transition duration-200 hover:bg-[#8882]"
        >
          <div class="aspect-video flex items-center justify-center of-hidden border-b border-base">
            <img v-if="item.image" :src="item.image" alt="" aria-hidden="true" loading="lazy" class="h-full w-full object-cover">
            <Dura2D v-else-if="item.icon === 'dura2d'" class="h-16 w-16 op60 transition duration-200 group-hover:op100" />
            <LeveGL v-else-if="item.icon === 'levegl'" class="h-16 w-16 op60 transition duration-200 group-hover:op100" />
            <Vulkano v-else-if="item.icon === 'vulkano'" class="h-16 w-16 op60 transition duration-200 group-hover:op100" />
            <span v-else aria-hidden="true" class="text-3em font-bold op10 transition duration-200 group-hover:op20">{{ item.name[0] }}</span>
          </div>
          <div class="flex flex-1 flex-col gap1 p3">
            <span>{{ item.name }}</span>
            <span class="text-sm op50 line-clamp-2">{{ item.desc }}</span>
            <div v-if="item.tags?.length" class="mt-auto flex flex-wrap gap1 pt2">
              <span v-for="tag in item.tags" :key="tag" class="border border-base rounded px1.5 py0.5 text-xs font-mono op50">{{ tag }}</span>
            </div>
          </div>
        </component>
      </div>
    </div>

    <div text-center mt8 pb5>
      <a href="https://github.com/search?o=desc&s=updated&type=repositories&q=user%3Azschzen+user%3ASOHNE" target="_blank" op50 hover:op75>
        All open-source projects, sorted by recent updates
      </a>
    </div>
  </div>
</template>

<style scoped></style>
