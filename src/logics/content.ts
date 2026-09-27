import type { MediaItem, Post, PostKind, Project } from '~/types'
import { demoItems } from '../../lab/data'

// Page frontmatter is injected into route meta by `extendRoute` in
// vite.config.ts, so every list reads straight from the router.

const startYear = (p: Project) => Number.parseInt(String(p.year ?? 0)) || 0

export function useProjects(): Project[] {
  return useRouter().getRoutes().filter(r => r.path.startsWith('/projects/') && r.meta.frontmatter).map((r) => {
    const fm = r.meta.frontmatter as Record<string, any>
    return { ...fm, path: r.path, title: fm.display || fm.title } as Project
  }).sort((a, b) => startYear(b) - startYear(a) || (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title))
}

const kinds: PostKind[] = ['post', 'note', 'poem']

// Posts, notes and poems. `under` limits the list to one folder (/notes/2024).
export function usePosts(under?: string): Post[] {
  return useRouter().getRoutes().filter((r) => {
    const fm = r.meta.frontmatter as Record<string, any> | undefined
    return fm?.date && !fm.draft && !r.path.endsWith('.html')
      && (!under || r.path.startsWith(`${under}/`))
  }).map((r) => {
    const fm = r.meta.frontmatter as Record<string, any>
    const kind = String(fm.type || 'post').split('+').find(k => kinds.includes(k as PostKind)) as PostKind | undefined
    return {
      path: fm.redirect || r.path,
      title: fm.title,
      date: fm.date,
      kind,
      lang: fm.lang,
      duration: fm.duration,
      place: fm.place,
      excerpt: fm.description,
      cover: fm.cover || `/og/${r.path.split('/').pop()}.png`,
      external: Boolean(fm.redirect),
    } as Post
  }).filter(p => p.kind).sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

// Resolves `lab` references to the lab clip or image they point at, and marks
// YouTube slides as video (poster defaults to the YouTube thumbnail).
export function resolveMedia(items: MediaItem[] = []): MediaItem[] {
  return items.flatMap((item) => {
    if (item.youtube)
      return [{ ...item, video: true, poster: item.poster ?? `https://i.ytimg.com/vi/${item.youtube}/hqdefault.jpg` }]
    if (!item.lab)
      return [item]
    const lab = demoItems.find(i => i.date === item.lab)
    if (!lab?.media)
      return []
    return [{ ...item, src: lab.media.content, video: lab.media.type === 'video', alt: item.alt ?? lab.title }]
  })
}

// Carousel content for a project: its media, else its cover.
export function projectMedia(p: Project): MediaItem[] {
  const media = resolveMedia(p.media)
  if (media.length)
    return media
  return p.cover ? [{ src: p.cover, alt: p.title }] : []
}
