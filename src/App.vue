<script setup lang="ts">
import Footer from './components/Footer.vue'
import ImageViewer from './components/ImageViewer.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <Background />

  <!-- Main navigation bar -->
  <NavBar />

  <!-- Main content -->
  <main class="px-7 py-10 of-x-hidden">
    <!-- Router -->
    <RouterView />

    <!-- Footer -->
    <Footer />
  </main>

  <!-- Images visualizer -->
  <ImageViewer />
</template>
