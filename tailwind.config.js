/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ink — the navigation rail and primary text. Deep, cool, non-black.
        ink: {
          900: '#0B1220',
          800: '#0F1A2B',
          700: '#16243A',
          600: '#1E3049',
          500: '#2A3444',
        },
        // Brass — the single accent. Chosen because gold is a literal asset
        // class in this domain, not because it is decorative.
        brass: {
          600: '#8F6829',
          500: '#B8873B',
          400: '#C9A05B',
          100: '#F5EBD8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          sunken: '#F6F7F9',
          raised: '#FFFFFF',
        },
        line: {
          DEFAULT: '#E4E7EC',
          strong: '#CDD3DC',
        },
        muted: '#6B7686',
        // Financial semantics — never used for generic UI state.
        gain: { DEFAULT: '#1B7F5A', soft: '#E7F4EF' },
        loss: { DEFAULT: '#C2453D', soft: '#FBEBEA' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        figure: ['2.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'figure-sm': ['1.75rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,26,43,0.04), 0 1px 3px rgba(15,26,43,0.06)',
        raised: '0 4px 12px rgba(15,26,43,0.08)',
      },
      borderRadius: { card: '0.75rem' },
    },
  },
  plugins: [],
};
