// Run from the project: node public/home3/collections/build.mjs
// The generated runtime is kept here, so the root build can copy HOME 3 unchanged.
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('.', import.meta.url));
await build({
  configFile: false,
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  root,
  publicDir: false,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'runtime',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./entry.tsx', import.meta.url)),
      formats: ['es'],
      fileName: () => 'collections.js',
      cssFileName: 'collections',
    },
    minify: true,
  },
});
