import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import UnoCSS from 'unocss/vite'

import { VueRouterAutoImports } from 'unplugin-vue-router'

import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
  },
  plugins: [UnoCSS(), VueRouter({
    extensions: ['.vue', '.md'],
    routesFolder: 'pages',
    // logs: true,
    extendRoute(route) {
      const path = route.components.get('default')
      if (!path)
        return

      if (!path.includes('projects.md') && path.endsWith('.md')) {
        const { data } = matter(fs.readFileSync(path, 'utf-8'))
        route.addToMeta({
          frontmatter: data,
        })
      }
    },
  }), Vue({
    include: [/\.vue$/, /\.md$/],
  })],
})
