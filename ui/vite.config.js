import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact()],
    resolve: { alias: { '@': resolve(__dirname, './src') } },
    build: { outDir: 'build' },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
        host: 'localhost',
        port: 3001,
    },
});
