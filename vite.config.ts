import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

const TargetServer = 'http://localhost:8080';
// const TargetServer = 'http://15.165.24.191:8080';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: TargetServer,
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      },
      '^/(login|logout)$': {
        target: TargetServer,
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/oauth2': {
        target: TargetServer,
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
