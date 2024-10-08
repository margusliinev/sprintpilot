import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    splitting: true,
    sourcemap: true,
    minify: true,
    clean: true
});
