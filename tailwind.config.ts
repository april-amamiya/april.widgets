import type { Config } from 'tailwindcss'
import { fontFamily, transitionProperty } from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
  ],

  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      fontFamily: {
        'source-code-pro': ['Source Code Pro', 'monospace', ...fontFamily.mono],
        'fira-code': ['Fira Code', 'monospace', ...fontFamily.mono],
        'jetbrains-mono': ['JetBrains Mono', 'monospace', ...fontFamily.mono],
      },

      transitionProperty: {
        height: 'height',

        // https://github.com/tailwindlabs/tailwindcss/pull/10604
        DEFAULT: [transitionProperty.DEFAULT, 'outline-color'].join(', '),
        colors: [transitionProperty.colors, 'outline-color'].join(', '),
      },
    },
  },

  plugins: [],

} satisfies Config
