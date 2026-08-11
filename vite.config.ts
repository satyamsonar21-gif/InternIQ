import { defineConfig } from 'vite'
// @ts-ignore
import react from '@vitejs/plugin-react'
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    // @ts-ignore
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})
