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
      <Transition :name="route.meta?.transition || 'blur'" mode="out-in" appear>
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

/* Blur transition */
.blur-enter-active,
.blur-leave-active {
  transition: all 0.2s ease;
}

.blur-enter-from,
.blur-leave-to {
  filter: blur(0.5rem);
  opacity: 0;
}
</style>
