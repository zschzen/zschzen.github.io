import NProgress from 'nprogress'
import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg'

import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import { dragScroll } from './logics/dragScroll'
import '@unocss/reset/tailwind.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-class.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/markdown.css'
import './styles/code-block.css'
import 'uno.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, saved) {
      if (saved)
        return saved
      if (to.hash) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        return { el: to.hash, behavior: reduce ? 'auto' : 'smooth' }
      }
      // Filters and search only rewrite the query; keep the scroll position.
      if (to.path === from.path)
        return false
      return { top: 0 }
    },
  },
  ({ router, app, isClient }) => {
    app.use(createPinia())
    app.directive('drag-scroll', dragScroll)

    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  },
)
