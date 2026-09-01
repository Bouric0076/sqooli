import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.antodb.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  resolve: { dedupe: ['react', 'react-dom', 'react/jsx-runtime'] },
  optimizeDeps: { include: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'] },
})
