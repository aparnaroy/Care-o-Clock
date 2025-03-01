import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // Allow external access on Railway
    host: '0.0.0.0',
    allowedHosts: ['care-o-clock.up.railway.app']
  },
})
