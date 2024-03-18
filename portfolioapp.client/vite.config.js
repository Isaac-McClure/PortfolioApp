/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    preview: {
        port: 443,
        strictPort: true,
    },
    server: {
        https: {
            key: '/etc/ssl/certs/privateKey.pem',
            cert: '/etc/ssl/certs/cert.pem'
        },
        port: 443,
        strictPort: true,
        host: true,
        origin: process.env.VITE_ORIGIN,
    }
})
