import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        digimon: resolve(__dirname, 'src/digimon/index.html'),
        pokemon: resolve(__dirname, 'src/pokemon/index.html'),
      },
    },
  },
});