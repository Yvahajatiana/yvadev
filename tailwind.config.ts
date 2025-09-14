import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#8b5cf6',
        background: '#ffffff',
        foreground: '#0a0a0a',
        muted: '#f1f5f9',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        content: '720px',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            maxWidth: '720px',
            lineHeight: '1.75',
            color: theme('colors.foreground'),
            h1: {
              color: theme('colors.foreground'),
              fontWeight: '800',
            },
            h2: {
              color: theme('colors.foreground'),
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.foreground'),
              fontWeight: '600',
            },
            'h4,h5,h6': {
              color: theme('colors.foreground'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: theme('colors.foreground'),
              backgroundColor: theme('colors.muted'),
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.foreground'),
              color: theme('colors.background'),
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
              color: theme('colors.background'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;