import { sentryVitePlugin } from '@sentry/vite-plugin';
import {ConfigEnv, defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default ({mode}: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const TargetHost = env.VITE_TARGET_HOST ?? 'localhost:8080';
  const TargetServer = `https://${TargetHost}`;
  const TargetServerWs = `ws://${TargetHost}`;

  return defineConfig({
    define: {
      'global': {},
    },

    plugins: [react(), sentryVitePlugin({
      org: 'humanerror',
      project: 'match-up-frontend'
    })],

    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'assets'),
        '@public': path.resolve(__dirname, 'public'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@constant': path.resolve(__dirname, 'src/constant'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles')
      }
    },

    server: {
      host: '0.0.0.0',
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
  });
}