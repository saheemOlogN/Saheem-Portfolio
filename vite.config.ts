import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { portfolioSearchHtml } from './seo.js'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    { name: 'portfolio-search-html', transformIndexHtml: portfolioSearchHtml },
  ],
  optimizeDeps: { include: ['gsap'] },
})
