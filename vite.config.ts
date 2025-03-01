import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // Allow external access on Railway
    host: '0.0.0.0',
    // Optionally, you can specify a port (Railway usually sets PORT automatically):
    // port: 4173,
    // Add the domain you want to allow
    allowedHosts: ['care-o-clock.up.railway.app']
  },
})
