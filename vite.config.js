import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss(),
],
base: '/', // important for Vercel SPA routes
server: {
    historyApiFallback: true, // Ensures all routes are served to index.html
  },
})

