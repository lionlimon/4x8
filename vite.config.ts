import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');
// https://vitejs.dev/config/
export default defineConfig((env) => {
  const baseUrl = env.mode === 'production' ? '/4x8' : '/';

  return {
    plugins: [
      vue(),
      createSvgSpritePlugin({
        include: '**/icons/**/*.svg',
        symbolId: '[name]'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/style/_mixins.scss";`
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url))
      }
    },

    base: baseUrl,
  }
});
