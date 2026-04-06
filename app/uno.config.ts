import { defineConfig, presetUno, presetWebFonts } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      bg: { DEFAULT: '#1C1C1E', card: '#2C2C2E', inset: '#232326', elevated: '#38383A' },
      fg: { DEFAULT: '#D1D1D6', strong: '#F5F5F7', muted: '#98989D', faint: '#636366' },
      ai: { DEFAULT: '#6CB4EE', light: '#6CB4EE20' },
      cta: { DEFAULT: '#FF6B6B', light: '#FF6B6B20' },
      success: { DEFAULT: '#4ADE80', light: '#4ADE8020' },
      warning: { DEFAULT: '#FBBF24', light: '#FBBF2420' },
      error: { DEFAULT: '#F87171', light: '#F8717120' },
      accent: { DEFAULT: '#A78BFA', light: '#A78BFA20' },
    },
    fontFamily: {
      jp: '"Noto Sans JP", sans-serif',
      kr: '"Noto Sans KR", sans-serif',
      en: '"Inter", sans-serif',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
    },
    boxShadow: {
      xs: '0 1px 2px rgba(0,0,0,0.3)',
      sm: '0 2px 8px rgba(0,0,0,0.4)',
      md: '0 4px 16px rgba(0,0,0,0.5)',
      lg: '0 12px 32px rgba(0,0,0,0.6)',
      'glow-ai': '0 0 24px rgba(108,180,238,0.25)',
      'glow-cta': '0 0 24px rgba(255,107,107,0.25)',
      'glow-success': '0 0 24px rgba(74,222,128,0.3)',
      'glow-accent': '0 0 24px rgba(167,139,250,0.25)',
    },
  },
  shortcuts: {
    'btn': 'px-5 py-2.5 rounded-sm font-600 transition-all duration-150 cursor-pointer select-none active:scale-98',
    'btn-primary': 'btn bg-ai text-bg-DEFAULT hover:shadow-glow-ai font-700',
    'btn-cta': 'btn bg-cta text-bg-DEFAULT hover:shadow-glow-cta font-700',
    'btn-outline': 'btn border border-fg-faint/40 text-fg hover:bg-fg/8',
    'card': 'bg-card rounded-md border border-fg-faint/15 transition-all duration-200',
    'badge': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-600',
  },
})
