import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

import autoImports from 'unplugin-auto-import/vite'
import autoIcons from 'unplugin-icons/vite'
import autoComponents from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import autoRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    autoRouter({
      dts: './.types/auto-routes.d.ts',
    }),
    vue(),
    autoImports({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          '@vueuse/router': ['useRouteParams', 'useRouteQuery'],
          'uuid': [['v4', 'createIdentity']],
        },
      ],
      dts: './.types/auto-imports.d.ts',
    }),
    autoComponents({
      dts: './.types/auto-components.d.ts',
      directoryAsNamespace: true,
    }),
    autoIcons({
      autoInstall: true,
    }),
  ],

  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },

  server: {
    host: true,
  },
})
