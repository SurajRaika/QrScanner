import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
    VitePWA({
      injectRegister: 'auto',
     manifest: {
       theme_color: "#ffffff",
       background_color: "#ffffff",
       display: 'fullscreen',
       scope: '/',
       start_url: '/',
       name: '"QR Scanner',
       short_name: '"QR Scanner',
       description:  "QR Scanner is a Pwa Application which can scan Qr Code Fast .",
       icons: [
         {
           src: '/icons/icon-192x192.png',
           sizes: '192x192',
           type: 'image/png'
         },
         {
           src: '/icons/icon-256x256.png',
           sizes: '256x256',
           type: 'image/png'
         },
         {
           src: '/icons/icon-384x384.png',
           sizes: '384x384',
           type: 'image/png'
         },
         {
           src: '/icons/icon-512x512.png',
           sizes: '512x512',
           type: 'image/png'
         },
         {
             src: '/icons/maskable_icon.png',
             sizes: '281x281',
             type: 'image/png',
             purpose: 'maskable'
         }
       ]
     },
     registerType: 'autoUpdate',
     workbox: {
       globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
       clientsClaim: true,
       skipWaiting: true
     },
     devOptions: {
       enabled: true
     }
   })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
