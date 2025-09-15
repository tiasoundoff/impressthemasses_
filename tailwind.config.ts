// Path: /home/user/impressthemassess/tailwind.config.ts
import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

/**
 * ImpressTheMasses — Tailwind Brand System
 *
 * Brand pillars encoded as tokens:
 * - Foundation: charcoal + soft neutrals
 * - Accent: magenta/fuchsia spectrum
 * - Semantics: surface/overlay/cta/highlight tokens map to brand
 * - Backgrounds: Observatory Quiet, System Signals, Matte Modularity
 *
 * Dark mode is class-based to allow per-page control
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /**
       * --- Brand Typography --
       * Inter for UI; Playfair Display as elevated accent
       */
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        accent: ['Playfair Display', 'serif'],
      },

      /**
       * --- Core Brand Palette --
       * Keep raw brand tokens explicit; use semantic tokens below for UI mapping
       */
      colors: {
        // Foundation — Charcoal scale
        'brand-charcoal': '#111827',
        'brand-charcoal-600': '#1F2937',
        'brand-charcoal-900': '#000000',

        // Accent — Magenta spectrum (primary accent family)
        'brand-magenta': '#FF32A8',
        'brand-magenta-600': '#F83C68',

        // Neutrals — soft UI scaffolding
        'brand-neutral-50': '#F9FAFB',
        'brand-neutral-200': '#E5E7EB',
        'brand-neutral-600': '#4B5563',

        /**
         * CSS-variable driven system colors for theming (kept from shadcn preset)
         * These let us theme via :root and .dark without code changes
         */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      /**
       * --- Semantic Tokens --
       * Map UI roles to brand hues (change here for global re-skin)
       */
      textColor: {
        body: 'var(--color-text-body, #E5E7EB)', // default light text on charcoal
        subtle: 'var(--color-text-subtle, #9CA3AF)',
        heading: 'var(--color-text-heading, #F9FAFB)',
        accent: 'var(--color-text-accent, #FF32A8)',
      },
      backgroundColor: {
        surface: 'var(--color-surface, #111827)',
        overlay: 'var(--color-overlay, rgba(17,24,39,0.6))',
        elevated: 'var(--color-elevated, #1F2937)',
        cta: 'var(--color-cta, #FF32A8)',
        highlight: 'var(--color-highlight, #F83C68)',
      },
      borderColor: {
        subtle: 'var(--color-border-subtle, #1F2937)',
        strong: 'var(--color-border-strong, #4B5563)',
        accent: 'var(--color-border-accent, #FF32A8)',
      },

      /**
       * --- Radii mapped to CSS var for design system control --
       */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
      },

      /**
       * --- Background Identity (Brand Presets) --
       * NOTE: These are pure CSS gradients; swap with image assets if preferred
       */
      backgroundImage: {
        // Existing utility presets
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

        // Brand: Observatory Quiet — deep vignette with faint signal arcs
        'obs-quiet':
          'radial-gradient(1200px 800px at 60% 30%, rgba(255,50,168,0.08), transparent 60%),\n' +
          'radial-gradient(900px 600px at 20% 80%, rgba(248,60,104,0.06), transparent 60%),\n' +
          'radial-gradient(100% 100% at 50% 50%, rgba(255,255,255,0.03), rgba(0,0,0,0.9))',

        // Brand: System Signals — subtle diagonal sweep with magenta accents
        'system-signals':
          'linear-gradient(135deg, rgba(255,50,168,0.10), rgba(248,60,104,0.06) 40%, rgba(17,24,39,0.95) 70%)',

        // Brand: Matte Modularity — tile-like soft noise with elevated surface
        'matte-modularity':
          'radial-gradient(600px 400px at 20% 10%, rgba(255,255,255,0.04), transparent 55%),\n' +
          'radial-gradient(400px 300px at 80% 70%, rgba(255,50,168,0.07), transparent 60%),\n' +
          'linear-gradient(0deg, rgba(17,24,39,1), rgba(17,24,39,1))',
      },

      /**
       * --- Motion --
       */
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      /**
       * --- Shadows (matte, restrained) --
       */
      boxShadow: {
        surface: '0 1px 1px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.08)',
        elevated: '0 4px 12px rgba(0,0,0,0.18)',
        glow: '0 0 0 2px rgba(255,50,168,0.12)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config