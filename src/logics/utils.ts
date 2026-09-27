import dayjs from 'dayjs'

// "21 Aug", or "12 Sep 2026" with the year
export function formatDate(d: string | Date, withYear = false) {
  return dayjs(d).format(withYear ? 'D MMM YYYY' : 'D MMM')
}

// A filter value mirrored in the URL query (?key=value). The query is read
// after mount so the prerendered markup (default value) hydrates cleanly.
export function useQueryState(key: string, fallback: string) {
  const route = useRoute()
  const router = useRouter()
  const state = ref(fallback)

  onMounted(() => {
    const value = route.query[key]
    if (typeof value === 'string')
      state.value = value
  })

  watch(state, (value) => {
    router.replace({ query: { ...route.query, [key]: value === fallback ? undefined : value } })
  })

  return state
}

// Frontmatter durations look like "15min"; anything else passes through.
export function readTime(duration?: string) {
  if (!duration)
    return undefined
  const minutes = Number.parseInt(duration)
  return Number.isNaN(minutes) ? duration : `${minutes} min read`
}
