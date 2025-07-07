import type { Component } from 'vue'

// Import local media files as URLs
const videos = import.meta.glob('./*.mp4', { eager: true, query: '?url' }) as Record<string, { default: string }>
const images = import.meta.glob('./*.{png,jp{,e}g,gif}', { eager: true, query: '?url' }) as Record<string, { default: string }>

export const demoItems = Array.from(Object.entries(import.meta.glob('./*.md', { eager: true })))
  .map(([path, page]: any) => {
    const baseName = path.slice(2, -3) // Extracts 'filename' from './filename.md'
    let media: { type: 'video' | 'image' | 'embed', content: string } | undefined

    // Check for an associated file in order of priority: video, image, then embed.
    const videoKey = Object.keys(videos).find(key => key.startsWith(`./${baseName}.`))
    const imageKey = Object.keys(images).find(key => key.startsWith(`./${baseName}.`))

    if (videoKey) {
      media = { type: 'video', content: videos[videoKey].default }
    }
    else if (imageKey) {
      media = { type: 'image', content: images[imageKey].default }
    }

    return {
      date: baseName as string,
      comp: page.default as Component,
      media,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))
