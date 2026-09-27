<script setup lang="ts">
import ImageViewer from './components/ImageViewer.vue'
</script>

<template>
  <ClientOnly>
    <Background />
  </ClientOnly>

  <SiteHeader />

  <main id="top">
    <RouterView />
  </main>

  <SiteFooter />

  <ImageViewer />
</template>
