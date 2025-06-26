<script setup lang="ts">
import Footer from './components/Footer.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <!-- Main navigation bar -->
  <NavBar />

  <!-- Main content -->
  <main class="px-7 py-10 of-x-hidden">
    <!-- Router -->
    <RouterView v-slot="{ Component, route }">
      <!-- Transition -->
      <Transition :name="route.meta?.transition || 'fade'" mode="out-in">
        <!-- Page -->
        <div :key="route.path" class="page-wrapper">
          <component :is="Component" />

          <!-- Footer -->
          <Footer />
        </div>
      </Transition>
    </RouterView>
  </main>
</template>

<style lang="css" scoped>
.page-wrapper {
  width: 100%;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
