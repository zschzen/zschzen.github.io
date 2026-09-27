<script setup lang="ts">
import { site } from '~/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="col flex flex-col gap-18 pb-3 pt-24 lg:gap-30 lg:pb-8 lg:pt-40 print:hidden">
    <div class="flex flex-col gap-4 lg:gap-5">
      <h2 class="h-section">
        Get in touch
      </h2>
      <p class="page-sub">
        Email is the fastest way to reach me.
      </p>
      <div class="flex flex-col gap-4 pt-2 lg:flex-row lg:items-center lg:gap-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
          <a :href="`mailto:${site.email}`" class="btn-primary">Email me</a>
          <span class="text-[15px] leading-[1.4] text-muted-foreground">{{ site.email }}</span>
        </div>
        <ProfileLinks />
      </div>
    </div>

    <div class="flex items-center justify-between gap-4 text-[13px] leading-[1.4] text-muted-foreground lg:text-sm">
      <p>
        © 2020–{{ year }} {{ site.name }} ·
        <a class="link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>
      </p>
      <a href="#top" class="link-arrow py-3 text-sm!">
        Back to top <span class="i-ph-arrow-up h-4! w-4!" aria-hidden="true" />
      </a>
    </div>
  </footer>
</template>
