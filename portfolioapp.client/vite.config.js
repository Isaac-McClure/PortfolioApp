/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin(), mkcert()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    preview: {
        port: 5173,
        strictPort: true,
    },
    server: {
        https: true,
        port: 5173,
        strictPort: true,
        host: true,
        origin: "https://portfolioapp-client:5173",
    }
})
