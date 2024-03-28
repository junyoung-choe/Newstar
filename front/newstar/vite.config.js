import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg','apple-touch-icon.png'],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'react-newstar',
        short_name: '뉴스타',
        description: '개인 맞춤형 뉴스 추천 플랫폼',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ]
      }
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://newstar.world/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      }
    }
  }
})
