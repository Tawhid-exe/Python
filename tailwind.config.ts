/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Base neutrals — charcoal spectrum
        surface: {
          DEFAULT: '#0a0a0f',  // page background
          50:  '#f4f4f8',
          100: '#e9e9f0',
          200: '#d0d0de',
          300: '#a8a8bf',
          400: '#7878a0',
          500: '#555580',
          600: '#3d3d66',
          700: '#2a2a4d',
          800: '#1a1a33',
          900: '#0f0f1a',
          950: '#0a0a0f',
        },
        // Glass / panel backgrounds
        glass: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          hover:   'rgba(255,255,255,0.07)',
          border:  'rgba(255,255,255,0.08)',
          strong:  'rgba(255,255,255,0.10)',
        },
        // Primary accent — electric blue-violet
        primary: {
          DEFAULT: '#6366f1',
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Secondary — cyan for code highlights
        cyan: {
          DEFAULT: '#22d3ee',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Success — emerald
        emerald: {
          DEFAULT: '#10b981',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        // Warning — amber
        amber: {
          DEFAULT: '#f59e0b',
          400: '#fbbf24',
          500: '#f59e0b',
        },
        // Destructive — rose
        rose: {
          DEFAULT: '#f43f5e',
          400: '#fb7185',
          500: '#f43f5e',
        },
        // Text hierarchy
        text: {
          primary:   'rgba(255,255,255,0.95)',
          secondary: 'rgba(255,255,255,0.60)',
          tertiary:  'rgba(255,255,255,0.35)',
          disabled:  'rgba(255,255,255,0.20)',
          inverse:   'rgba(0,0,0,0.90)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
        'sidebar-glow': 'radial-gradient(ellipse 60% 40% at 0% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'glow-sm':  '0 0 12px rgba(99,102,241,0.25)',
        'glow-md':  '0 0 24px rgba(99,102,241,0.30)',
        'glow-lg':  '0 0 48px rgba(99,102,241,0.20)',
        'glow-xl':  '0 0 80px rgba(99,102,241,0.15)',
        'card':     '0 1px 3px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'modal':    '0 25px 80px rgba(0,0,0,0.6)',
        'sidebar':  '1px 0 0 rgba(255,255,255,0.06)',
        'navbar':   '0 1px 0 rgba(255,255,255,0.06)',
        'button':   '0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'button-primary': '0 0 0 1px rgba(99,102,241,0.4), 0 4px 16px rgba(99,102,241,0.25)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':    'spin 8s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'progress':     'progressFill 1s ease-out forwards',
        'slide-down':   'slideDown 0.3s ease-out',
        'slide-up':     'slideUp 0.3s ease-out',
        'fade-in':      'fadeIn 0.3s ease-out',
        'scale-in':     'scaleIn 0.2s ease-out',
        'ripple':       'ripple 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(99,102,241,0.3)' },
          '50%':      { boxShadow: '0 0 28px rgba(99,102,241,0.6)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        progressFill: {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--progress-value)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        ripple: {
          '0%':   { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '80px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 'none',
            code: {
              color: '#a5b4fc',
              backgroundColor: 'rgba(99,102,241,0.1)',
              borderRadius: '0.25rem',
              padding: '0.1em 0.3em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
