import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})
