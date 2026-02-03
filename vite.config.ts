import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { BootstrapVueNextResolver } from 'bootstrap-vue-next';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/rizz_v/",
  build: {
    outDir: 'dist/rizz_v',
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
    {
      name: 'move-index-html',
      closeBundle() {
        const sourceIndex = path.resolve(__dirname, 'dist/rizz_v/index.html');
        const targetIndex = path.resolve(__dirname, 'dist/index.html');
        
        if (fs.existsSync(sourceIndex)) {
          fs.mkdirSync(path.dirname(targetIndex), { recursive: true });
          fs.copyFileSync(sourceIndex, targetIndex);
          fs.unlinkSync(sourceIndex);
          console.log('✓ index.html movido a dist/');
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
