import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // target: 'http://15.165.24.191:8080',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      },
      '^/login$': {
        target: 'http://localhost:80',
        // target: 'http://15.165.24.191:8080',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '^/logout$': {
        target: 'http://localhost:80',
        // target: 'http://15.165.24.191:8080',
        changeOrigin: true,
        secure: false,
        ws: true
      },
    }
  }
})
