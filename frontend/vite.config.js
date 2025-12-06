import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://auto-pro-backend-git-main-gauravdeepgd12007-1986s-projects.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
