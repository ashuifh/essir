import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
<<<<<<< HEAD
      '/api': 'http://localhost:3000', 
=======
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
>>>>>>> aa85e29c7aeac4d148e9834642dd6af029d54aa5
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
