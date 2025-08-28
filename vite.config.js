// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/mooz/',          // для GitHub Pages: https://stpatrik.github.io/mooz/
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // "@/..." -> "src/..."
    },
  },
  // не обязательно, просто удобно
  server: { open: true },
})