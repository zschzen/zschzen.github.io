import {
  createLocalFontProcessor,
} from '@unocss/preset-web-fonts/local'
import { defineConfig, presetAttributify, presetIcons, presetWebFonts, presetWind3, transformerDirectives } from 'unocss'

// Design tokens live as CSS custom properties in src/styles/main.css (light on
// :root, dark on html.dark). Utilities reference them, never raw hex.
const tokens = [
  'background',
  'foreground',
  'muted-foreground',
  'primary',
  'primary-foreground',
  'primary-muted-foreground',
  'secondary',
  'secondary-foreground',
  'secondary-muted-foreground',
  'secondary-hover',
  'overlay',
  'overlay-foreground',
]

export default defineConfig({
  content: {
    pipeline: {
      // Default set plus src/*.ts, where icon class names live (src/site.ts).
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/, /\/src\/.*\.ts$/],
    },
  },
  theme: {
    colors: Object.fromEntries(tokens.map(t => [t, `var(--${t})`])),
    borderRadius: {
      md: '10px',
      lg: '12px',
      pill: '9999px',
    },
  },
  shortcuts: {
    'border-base': 'border-[#8884]',

    // Layout
    'col': 'mx-auto w-full max-w-[720px] px-5 lg:px-0',
    'section': 'pt-24 lg:pt-40',
    'section-head': 'col flex items-center justify-between gap-4',
    'page-intro': 'col flex flex-col items-start gap-3 pt-8 lg:gap-4 lg:pt-24',
    'page-sub': 'text-base leading-[1.6] text-muted-foreground lg:text-[17px]',
    'media': 'relative overflow-hidden rounded-lg bg-secondary',

    // Type
    'h-display': 'text-[30px] font-medium leading-[1.15] tracking-[-0.025em] text-foreground lg:text-[40px]',
    'h-display-lg': 'text-[32px] font-medium leading-[1.1] tracking-[-0.025em] text-foreground lg:text-[48px]',
    'h-section': 'text-[22px] font-medium leading-[1.3] tracking-[-0.3px] text-foreground lg:text-2xl',

    // Actions
    'btn': 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill px-5 py-[13px] text-[15px] font-medium leading-[1.45] no-underline! transition duration-150 select-none lg:py-[11px] disabled:op45',
    'btn-primary': 'btn bg-primary text-primary-foreground hover:op90',
    'btn-secondary': 'btn bg-secondary text-secondary-foreground hover:bg-secondary-hover',
    'btn-sm': 'px-4! py-2! text-sm!',
    'btn-icon': 'inline-flex shrink-0 items-center justify-center w-11 h-11 rounded-pill bg-secondary text-secondary-foreground transition-colors duration-150 hover:bg-secondary-hover lg:w-10 lg:h-10 disabled:op45',
    'link': 'underline-offset-4 decoration-1 hover:underline',
    'link-arrow': 'link inline-flex items-center gap-1.5 text-[15px] font-medium leading-[1.45] text-foreground',
    'tag': 'rounded-pill bg-secondary px-3 py-1 text-[13px] leading-[1.4] text-secondary-foreground',

    // Media overlays
    'badge-overlay': 'absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-pill bg-overlay py-0.5 pl-[5px] pr-1.5 text-[11px] leading-[1.4] text-overlay-foreground lg:bottom-4 lg:left-4',
    'play-overlay': 'absolute inset-0 m-auto flex items-center justify-center w-11 h-11 rounded-pill bg-overlay text-overlay-foreground lg:w-14 lg:h-14',
  },
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
  ],
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetAttributify(),
    presetWind3(),
    presetWebFonts({
      fonts: {
        sans: { name: 'Schibsted Grotesk', weights: ['400', '500'] },
        mono: 'DM Mono',
        condensed: 'Roboto Condensed',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  safelist: [
    'i-ri-menu-2-fill',
  ],
})
