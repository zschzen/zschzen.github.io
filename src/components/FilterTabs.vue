<script setup lang="ts">
// Toggle buttons that filter a list. aria-pressed buttons instead of a
// tablist: a list filter has no tab panels to move focus into.
defineProps<{
  label: string
  options: { value: string, label: string, count: number }[]
}>()

const model = defineModel<string>({ required: true })

// On narrow screens the row scrolls sideways: keep the selected tab in view,
// e.g. when opened from /lab?category=simulation. Scrolls the row only, never the page.
const group = ref<HTMLElement>()

function reveal(behavior: ScrollBehavior) {
  const el = group.value
  const tab = el?.querySelector<HTMLElement>('[aria-pressed="true"]')
  if (!el || !tab || el.scrollWidth <= el.clientWidth)
    return
  const row = el.getBoundingClientRect()
  const box = tab.getBoundingClientRect()
  const inset = Number.parseFloat(getComputedStyle(el).paddingLeft)
  if (box.left < row.left + inset)
    el.scrollBy({ left: box.left - row.left - inset, behavior })
  else if (box.right > row.right - inset)
    el.scrollBy({ left: box.right - row.right + inset, behavior })
}

onMounted(() => reveal('auto'))
watch(model, () => nextTick(() => reveal('smooth')))
</script>

<template>
  <div ref="group" role="group" :aria-label="label" class="no-scrollbar flex gap-2 overflow-x-auto">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      :aria-pressed="model === o.value"
      class="inline-flex shrink-0 items-center gap-1.5 rounded-pill px-3.5 py-2 text-[15px] font-medium leading-[1.4] transition-colors duration-150"
      :class="model === o.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary-hover'"
      @click="model = o.value"
    >
      {{ o.label }}
      <span
        class="text-sm font-normal"
        :class="model === o.value ? 'text-primary-muted-foreground' : 'text-secondary-muted-foreground'"
      >{{ o.count }}</span>
    </button>
  </div>
</template>
