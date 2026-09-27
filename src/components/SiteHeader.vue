<script setup lang="ts">
import { site } from '~/site'

const nav = [
  { label: 'Work', to: '/projects', match: /^\/projects/ },
  { label: 'Experience', to: '/#experience' },
  { label: 'Writing', to: '/posts', match: /^\/(?:posts|notes|poems)/ },
  { label: 'Lab', to: '/lab', match: /^\/lab/ },
]

const route = useRoute()
const current = (item: typeof nav[number]) => item.match?.test(route.path) ?? false

// Mobile menu: a native modal <dialog> gives Esc-to-close and an inert page
// behind it; main.css locks page scroll while it is open.
const menu = ref<HTMLDialogElement>()
const open = ref(false)

function openMenu() {
  menu.value?.showModal()
  open.value = true
}

function closeMenu() {
  menu.value?.close()
}

watch(() => route.fullPath, closeMenu)
watch(useMediaQuery('(min-width: 1024px)'), desktop => desktop && closeMenu())
</script>

<template>
  <header class="sticky top-0 z-10 bg-background print:static">
    <div class="col flex items-center justify-between py-2.5 lg:py-7">
      <RouterLink to="/" class="link text-base font-medium leading-[1.4]">
        {{ site.name }}
      </RouterLink>

      <div class="hidden items-center gap-4 lg:flex">
        <nav aria-label="Main">
          <ul class="flex items-center gap-1">
            <li v-for="item in nav" :key="item.to">
              <RouterLink
                :to="item.to"
                class="block rounded-pill px-3 py-1.5 text-[15px] leading-[1.4] transition-colors duration-150 hover:bg-secondary"
                :class="current(item) && 'bg-secondary'"
                :aria-current="current(item) ? 'page' : undefined"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
        <a :href="`mailto:${site.email}`" class="btn-primary btn-sm">Email me</a>
        <ToggleTheme />
      </div>

      <button
        type="button"
        class="btn-secondary px-4! lg:hidden"
        aria-controls="mobile-menu"
        :aria-expanded="open"
        @click="openMenu"
      >
        Menu <span class="i-ph-list h-4! w-4!" aria-hidden="true" />
      </button>
    </div>

    <dialog
      id="mobile-menu"
      ref="menu"
      aria-label="Menu"
      class="menu m-0 h-full max-h-none w-full max-w-none border-0 bg-background p-0 text-foreground"
      @close="open = false"
    >
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between px-5 py-2.5">
          <RouterLink to="/" class="text-base font-medium leading-[1.4]" @click="closeMenu">
            {{ site.name }}
          </RouterLink>
          <button type="button" class="btn-secondary px-4!" aria-label="Close menu" @click="closeMenu">
            Close <span class="i-ph-x h-4! w-4!" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Main" class="px-5 pt-8">
          <ul>
            <li v-for="item in nav" :key="item.to">
              <RouterLink
                :to="item.to"
                class="flex items-center justify-between py-3.5 text-[32px] font-medium leading-[1.15]"
                :aria-current="current(item) ? 'page' : undefined"
                @click="closeMenu"
              >
                {{ item.label }}
                <span v-if="current(item)" class="text-sm font-normal text-muted-foreground">Current page</span>
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="mt-auto flex flex-col gap-4 px-5 pb-8">
          <div class="flex gap-2.5">
            <a :href="`mailto:${site.email}`" class="btn-primary flex-1">Email me</a>
            <a :href="site.resume" target="_blank" rel="noopener" class="btn-secondary flex-1">
              Resume <span class="i-ph-download-simple h-4! w-4!" aria-hidden="true" />
            </a>
          </div>
          <div class="flex items-center justify-between gap-2">
            <ProfileLinks />
            <ToggleTheme />
          </div>
        </div>
      </div>
    </dialog>
  </header>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .menu[open] {
    animation: menu-in 200ms ease-out;
  }
}

@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
}
</style>
