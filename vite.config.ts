import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

const TargetServer = 'http://localhost:8080';
// const TargetServer = 'https://match-up.xyz';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: TargetServer,
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      },
      // '/login/token/refresh': {
      //   target: TargetServer,
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true
      // },
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
