import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Served at https://mrtinkz.github.io/ai-charter/, so assets and routes
// must be prefixed with the repo name.
export default defineConfig({
  base: '/ai-charter/',
  plugins: [react(), tailwindcss()],
})
