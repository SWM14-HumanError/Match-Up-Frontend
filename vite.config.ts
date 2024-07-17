import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

const TargetHost = 'localhost:8080';
// const TargetHost = 'localhost:3000';
const TargetServer = `http://${TargetHost}`;
const TargetServerWs = `ws://${TargetHost}`;
// const TargetServer = 'https://sidematch.co.kr';
// const TargetServerWs = 'wss://sidematch.co.kr';

export default defineConfig({
  define: {
    'global': {},
  },

  plugins: [react(), sentryVitePlugin({
    org: "humanerror",
    project: "match-up-frontend"
  }), sentryVitePlugin({
    org: "humanerror",
    project: "match-up-frontend"
  }), sentryVitePlugin({
    org: "humanerror",
    project: "match-up-frontend"
  })],

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
      },
      '/ws-stomp': {
        target: TargetServerWs,
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },

  build: {
    sourcemap: true
  }
})