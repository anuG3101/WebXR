// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/WebXR/', // <-- Set to your GitHub repo name
  plugins: [react()],
});