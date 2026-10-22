import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // TODO(shalu): Update base to match your GitHub Pages repo name
  // e.g. '/portfolio/' if your repo is github.com/shaluidea11/portfolio
  base: './',
})
