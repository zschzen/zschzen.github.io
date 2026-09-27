import type { Component } from 'vue'

interface LabModule {
  default: Component
  // Named frontmatter exports (exportFrontmatter in vite.config.ts)
  title?: string
  category?: string
  link?: string
}

export interface LabItem {
  date: string
  comp: Component
  title: string
  category: string
  link?: string
  media?: { type: 'video' | 'image', content: string }
}

// Import local media files as URLs
const videos = import.meta.glob('./*.mp4', { eager: true, query: '?url' }) as Record<string, { default: string }>
const images = import.meta.glob('./*.{png,jp{,e}g,gif}', { eager: true, query: '?url' }) as Record<string, { default: string }>
const pages = import.meta.glob<LabModule>('./*.md', { eager: true })

function findMedia(baseName: string): LabItem['media'] {
  const videoKey = Object.keys(videos).find(key => key.startsWith(`./${baseName}.`))
  if (videoKey)
    return { type: 'video', content: videos[videoKey].default }
  const imageKey = Object.keys(images).find(key => key.startsWith(`./${baseName}.`))
  if (imageKey)
    return { type: 'image', content: images[imageKey].default }
}

export const demoItems: LabItem[] = Object.entries(pages)
  .map(([path, page]) => {
    const date = path.slice(2, -3) // './2025-03-04.md' -> '2025-03-04'
    return {
      date,
      comp: page.default,
      title: page.title ?? date,
      category: page.category ?? 'Other',
      link: page.link,
      media: findMedia(date),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))
