<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="mt-10 mb-6 prose m-auto flex slide-enter animate-delay-1200!">
    <span class="text-sm op50">
      <a
        target="_blank"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        style="color: inherit;"
      >
        CC BY-NC-SA 4.0
      </a>
      2020–{{ currentYear }} © Leandro Peres. All rights reversed.
    </span>
    <div class="flex-auto" />
  </div>
</template>
