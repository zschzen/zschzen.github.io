<script setup lang="ts">
defineProps<{
  href: string
  icon: string
  platform: string
  handle: string
}>()
</script>

<template>
  <a class="contact-card group" :href="href" target="_blank" rel="noopener">
    <span class="flex-none op75" :class="icon" />
    <span class="flex flex-auto min-w-0 flex-col gap-0.5">
      <span class="truncate text-xs leading-none op60">{{ platform }}</span>
      <span class="text-base font-bold leading-tight [overflow-wrap:anywhere]">{{ handle }}</span>
    </span>
    <span
      class="ml-auto flex-none op50 transition duration-150 i-ri-arrow-right-up-line group-hover:(op85 translate-x-[2px] translate-y-[-2px]) group-focus-visible:(op85 translate-x-[2px] translate-y-[-2px])"
      aria-hidden="true"
    />
  </a>
</template>
