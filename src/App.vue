<script setup lang="ts">
import Footer from './components/Footer.vue'
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
</template>

<style lang="css" scoped>
.page-wrapper {
  width: 100%;
}
</style>
