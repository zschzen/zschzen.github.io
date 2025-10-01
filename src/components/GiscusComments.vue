<script setup lang="ts">
import type { BooleanString, InputPosition, Loading, Mapping } from '@giscus/vue'
import Giscus from '@giscus/vue'
import { computed } from 'vue'
import { isDark } from '~/stores/theme'

const GISCUS_CONFIG = {
  repo: 'zschzen/zschzen.github.io',
  repoId: 'R_kgDOPBD6Wg',
  category: 'Show and tell',
  categoryId: 'DIC_kwDOPBD6Ws4CwEgG',
  mapping: 'pathname' as Mapping,
  reactionsEnabled: '1' as BooleanString,
  emitMetadata: '1' as BooleanString,
  inputPosition: 'top' as InputPosition,
  lang: 'pt',
  loading: 'lazy' as Loading,
} as const

const giscusTheme = computed(() => isDark.value ? 'dark' : 'light')
</script>

<template>
  <ClientOnly>
    <Giscus id="comments" v-bind="GISCUS_CONFIG" :theme="giscusTheme" />
  </ClientOnly>
</template>
