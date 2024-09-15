import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    mockReset: true,
    testTimeout: 10000,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
