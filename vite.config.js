import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Sito statico multi-pagina: ogni pagina è un file HTML che monta la stessa app React.
// La pagina da mostrare viene scelta da src/lib/routes.js in base all'URL.
const pages = [
  'index',
  'squadre',
  'serie-c-maschile',
  'prima-divisione-femminile',
  'giovanili-maschili',
  'giovanili-femminili',
  'minivolley',
  'dal-1976',
  'partite-risultati',
  'galleria',
  'il-club',
  'sponsor',
  'contatti',
];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((name) => [name, resolve(import.meta.dirname, `${name}.html`)])),
    },
  },
});
