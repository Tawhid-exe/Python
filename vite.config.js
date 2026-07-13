import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    base: '/Python/',
    plugins: [react()],
    assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.ogg'],
    build: {
        assetsInlineLimit: 0,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@features': path.resolve(__dirname, './src/features'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@data': path.resolve(__dirname, './src/data'),
            '@types': path.resolve(__dirname, './src/types'),
            '@store': path.resolve(__dirname, './src/store'),
            '@services': path.resolve(__dirname, './src/services'),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
