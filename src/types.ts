export type PostKind = 'post' | 'note' | 'poem'

export interface Post {
  path: string
  title: string
  date: string
  kind: PostKind
  lang?: string
  duration?: string
  place?: string
  excerpt?: string
  cover: string
  external: boolean
}

// One carousel slide. `lab` points at a lab entry by date (e.g. '2025-03-04')
// and reuses its clip or image instead of duplicating the file. `youtube` is a
// video ID, embedded muted once the slide is clicked.
export interface MediaItem {
  src?: string
  lab?: string
  youtube?: string
  alt?: string
  caption?: string
  video?: boolean
  poster?: string
  duration?: string
}

// Frontmatter of pages/projects/*.md
export interface Project {
  path: string
  title: string
  subtitle?: string
  description?: string
  category?: string
  year?: string | number
  status?: string
  role?: string
  tags?: string[]
  link?: string
  linkLabel?: string
  cover?: string
  icon?: string
  featured?: boolean
  // Under NDA: no case study link, home asks visitors to email instead.
  nda?: boolean
  facts?: Record<string, string>
  media?: MediaItem[]
  order?: number
}
