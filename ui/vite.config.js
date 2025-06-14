import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [tanstackRouter({ autoCodeSplitting: true }), viteReact(), tailwindcss()],
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
    build: { outDir: 'build' },
    server: {
        proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } },
        host: 'localhost',
        port: 3001,
    },
});
