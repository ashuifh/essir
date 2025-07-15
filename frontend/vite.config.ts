// filepath: c:\Users\ayush\Downloads\essir\frontend\vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});