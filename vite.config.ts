import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      workbox: {
        globPatterns: ['**/*'],
        runtimeCaching: [
          {
            urlPattern: new RegExp('^/api/majorDecision'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-major-decision-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 15, // 15일
              },
            },
          },
        ],
      },
      includeAssets: ['**/*'],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@type',
        replacement: resolve(__dirname, './src/@types'),
      },
      {
        find: '@apis',
        replacement: resolve(__dirname, './src/apis'),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@config',
        replacement: resolve(__dirname, './src/config'),
      },
      {
        find: '@constants',
        replacement: resolve(__dirname, './src/constants'),
      },
      {
        find: '@contexts',
        replacement: resolve(__dirname, './src/contexts'),
      },
      {
        find: '@styles',
        replacement: resolve(__dirname, './src/styles'),
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, './src/utils'),
      },
      {
        find: '@hooks',
        replacement: resolve(__dirname, './src/hooks'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, './src/pages'),
      },
      {
        find: '@assets',
        replacement: resolve(__dirname, './public/assets'),
      },
    ],
  },
});
