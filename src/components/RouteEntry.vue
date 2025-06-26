<script setup lang="ts">
import { formatDate } from '~/logics/utils'

// Props
defineProps({
  routes: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <ul>
    <template v-for="(route, idx) in routes" :key="route.path">
      <div
        class="slide-enter" :style="{
          '--enter-stage': idx * 2,
          '--enter-step': '60ms',
        }"
      >
        <component
          :is="route.path.includes('://') ? 'a' : 'RouterLink'" v-bind="route.path.includes('://') ? {
            href: route.path,
            target: '_blank',
            rel: 'noopener noreferrer',
          } : {
            to: route.path,
          }
          " class="item block font-normal mb-6 mt-2 no-underline"
        >
          <li class="no-underline" flex="~ col md:row gap-2 md:items-center">
            <div class="title text-lg leading-1.2em" flex="~ gap-2 wrap">
              <span
                v-if="route.lang === 'pt'" align-middle flex-none
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 ml--12 mr2 my-auto hidden md:block"
              >PT-BR</span>
              <span align-middle>{{ route.title || route.path }}</span>
              <span
                v-if="route.redirect" align-middle op50 flex-none text-xs ml--1.5 i-carbon-arrow-up-right
                title="External"
              />
            </div>
            <div flex="~ gap-2 items-center">
              <span v-if="route.inperson" align-middle op50 flex-none i-ri:group-2-line title="In person" />
              <span
                v-if="route.recording || route.video" align-middle op50 flex-none i-ri:film-line
                title="Provided in video"
              />
              <span text-sm op50 ws-nowrap>
                {{ formatDate(route.date, { short: true }) }}
              </span>
              <span v-if="route.duration" text-sm op40 ws-nowrap>· {{ route.duration }}</span>
              <span v-if="route.platform" text-sm op40 ws-nowrap>· {{ route.platform }}</span>
              <span v-if="route.place" text-sm op40 ws-nowrap md:hidden>· {{ route.place }}</span>
              <span
                v-if="route.lang === 'pt'" align-middle flex-none
                class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 my-auto md:hidden"
              >PT-BR</span>
            </div>
          </li>
          <div v-if="route.place" op50 text-sm hidden mt--2 md:block>
            {{ route.place }}
          </div>
        </component>
      </div>
    </template>
  </ul>
</template>
