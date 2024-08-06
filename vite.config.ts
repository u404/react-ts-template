import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import pxToRemOrVwPlugin from 'vite-plugin-px-rem-vw'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.url, '')
  return {
    base: env.BASE_URL || '',
    server: {
      proxy: {
        '/api': {
          target: 'http://10.0.0.69:8081/',
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/urule/, '')
        }
      }
    },
    plugins: [
      react(),
      pxToRemOrVwPlugin({
        type: 'vw',
        options: {
          viewportWidth: 375,
          mediaQuery: false // 媒体查询里的不转换
        }
      }),
      mockDevServerPlugin()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";'
        }
      }
    }
  }
})
