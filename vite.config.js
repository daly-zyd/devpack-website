import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'  // Laissez comme ça, c'est correct
  },
  server: {
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok.io',
      '.ngrok.app'
    ]
  }
})