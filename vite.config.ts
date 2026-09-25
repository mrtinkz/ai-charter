import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Prod is served at https://mrtinkz.github.io/ai-charter/, so build assets
// need that prefix. Dev keeps base '/' so localhost:5173 works at root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ai-charter/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
  // Nested output (/charter/index.html) so GitHub Pages serves extensionless URLs.
  ssgOptions: {
    dirStyle: 'nested',
  },
}))
