<script setup lang="ts">
import PostCard from './PostCard.vue'

interface BlogPost {
  id: number
  title: string
  date: string
  tags: string[]
  excerpt: string
  image?: string
}

// Example posts data
const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Vue 3 and TypeScript',
    date: '2024-03-15',
    tags: ['Vue', 'TypeScript', 'Frontend', 'Web Development'],
    excerpt: 'Learn how to build modern web applications using Vue 3\'s Composition API with TypeScript.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
  },
  {
    id: 2,
    title: 'Advanced State Management Patterns',
    date: '2024-03-10',
    tags: ['State Management', 'Pinia', 'Architecture'],
    excerpt: 'Explore sophisticated state management techniques for complex applications.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
  },
  {
    id: 3,
    title: 'Building Responsive Layouts with CSS Grid',
    date: '2024-03-05',
    tags: ['CSS', 'Grid', 'Responsive Design', 'Layout'],
    excerpt: 'Master the art of creating flexible, responsive layouts using CSS Grid.',
  },
  {
    id: 4,
    title: 'API Integration Best Practices',
    date: '2024-02-28',
    tags: ['API', 'HTTP', 'Error Handling', 'Performance'],
    excerpt: 'Learn how to integrate APIs effectively in your applications.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
  },
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-light text-gray-900 mb-12">
      Latest Posts
    </h1>

    <div class="space-y-2">
      <PostCard
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :is-first="index === 0"
      />
    </div>
  </div>
</template>
