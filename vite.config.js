import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Set BASE_PATH=/Qbot_Revamp/ when deploying to a GitHub Pages project subpath.
  // Left as '/' so local dev and any root-domain host work untouched.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: { assetsInlineLimit: 0 },
})
