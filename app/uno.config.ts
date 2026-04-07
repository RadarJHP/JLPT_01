import { defineConfig, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

/**
 * All colors are CSS variables so we can swap themes (light / dark / stealth)
 * by toggling `html[data-theme="…"]`. Channel format `R G B` lets UnoCSS apply
 * its `/<alpha>` opacity modifier (`bg-ai/20`, etc.).
 */
const cssVar = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      bg: {
        DEFAULT: cssVar('bg-default'),
        card: cssVar('bg-card'),
        inset: cssVar('bg-inset'),
        elevated: cssVar('bg-elevated'),
      },
      fg: {
        DEFAULT: cssVar('fg-default'),
        strong: cssVar('fg-strong'),
        muted: cssVar('fg-muted'),
        faint: cssVar('fg-faint'),
      },
      ai:      { DEFAULT: cssVar('ai'),      soft: cssVar('ai-soft'),      light: 'rgb(var(--ai) / 0.10)' },
      cta:     { DEFAULT: cssVar('cta'),     soft: cssVar('cta-soft'),     light: 'rgb(var(--cta) / 0.10)' },
      sakura:  { DEFAULT: cssVar('sakura'),  soft: cssVar('sakura-soft'),  light: 'rgb(var(--sakura) / 0.10)' },
      matcha:  { DEFAULT: cssVar('matcha'),  soft: cssVar('matcha-soft'),  light: 'rgb(var(--matcha) / 0.10)' },
      yama:    { DEFAULT: cssVar('yama'),    soft: cssVar('yama-soft'),    light: 'rgb(var(--yama) / 0.10)' },
      success: { DEFAULT: cssVar('success'), soft: cssVar('success-soft'), light: 'rgb(var(--success) / 0.10)' },
      warning: { DEFAULT: cssVar('yama'),    light: 'rgb(var(--yama) / 0.10)' },
      error:   { DEFAULT: cssVar('error'),   soft: cssVar('error-soft'),   light: 'rgb(var(--error) / 0.10)' },
      accent:  { DEFAULT: cssVar('accent'),  light: 'rgb(var(--accent) / 0.10)' },
    },
    fontFamily: {
      jp: '"Noto Sans JP", "Yu Mincho", serif',
      kr: '"Pretendard", "Noto Sans KR", sans-serif',
      en: '"Inter", sans-serif',
    },
    borderRadius: {
      xs: '6px', sm: '10px', md: '14px', lg: '20px', xl: '28px', '2xl': '36px',
    },
    boxShadow: {
      xs: '0 1px 2px rgba(0,0,0,0.06)',
      sm: '0 2px 8px rgba(0,0,0,0.08)',
      md: '0 6px 20px rgba(0,0,0,0.10)',
      lg: '0 16px 40px rgba(0,0,0,0.12)',
      'glow-ai':      '0 0 28px rgb(var(--ai) / 0.22)',
      'glow-cta':     '0 0 28px rgb(var(--cta) / 0.22)',
      'glow-sakura':  '0 0 28px rgb(var(--sakura) / 0.22)',
      'glow-matcha':  '0 0 28px rgb(var(--matcha) / 0.22)',
      'glow-yama':    '0 0 28px rgb(var(--yama) / 0.22)',
      'glow-success': '0 0 28px rgb(var(--success) / 0.22)',
      'glow-accent':  '0 0 28px rgb(var(--accent) / 0.20)',
    },
  },
  shortcuts: {
    'btn': 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-600 transition-all duration-200 cursor-pointer select-none active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed min-h-11',
    'btn-primary': 'btn bg-ai text-white hover:shadow-glow-ai',
    'btn-cta':     'btn bg-cta text-white hover:shadow-glow-cta',
    'btn-sakura':  'btn bg-sakura text-white hover:shadow-glow-sakura',
    'btn-matcha':  'btn bg-matcha text-white hover:shadow-glow-matcha',
    'btn-yama':    'btn bg-yama text-white hover:shadow-glow-yama',
    'btn-ghost':   'btn border-2 border-fg-faint/25 text-fg hover:bg-fg/5 hover:border-fg-faint/40',
    'card':        'bg-card rounded-lg border border-fg-faint/12 shadow-xs transition-all duration-200',
    'card-hover':  'card hover:shadow-md hover:-translate-y-0.5',
    'badge':       'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-600',
    'pill':        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-600',
    'tag-n5':      'pill bg-success-soft text-success',
    'tag-n4':      'pill bg-ai-soft text-ai',
    'tag-n3':      'pill bg-sakura-soft text-sakura',
    'tap-area':    'min-h-11 min-w-11', // mobile touch target
  },
  safelist: [
    'bg-ai', 'bg-cta', 'bg-sakura', 'bg-matcha', 'bg-yama', 'bg-accent',
    'text-ai', 'text-cta', 'text-sakura', 'text-matcha', 'text-yama', 'text-accent',
    'bg-ai-light', 'bg-cta-light', 'bg-sakura-light', 'bg-matcha-light', 'bg-yama-light',
    'bg-ai-soft', 'bg-cta-soft', 'bg-sakura-soft', 'bg-matcha-soft', 'bg-yama-soft',
    'bg-success', 'bg-success-soft', 'bg-error', 'bg-error-soft',
    'shadow-glow-ai', 'shadow-glow-cta', 'shadow-glow-sakura', 'shadow-glow-matcha', 'shadow-glow-yama',
    'border-ai/30', 'border-cta/30', 'border-sakura/30', 'border-matcha/30', 'border-yama/30',
    'btn-primary', 'btn-cta', 'btn-sakura', 'btn-matcha', 'btn-yama', 'btn-ghost',
  ],
})
