// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/mooz/',   // ⚡ Важно для GitHub Pages
  plugins: [vue()],
})