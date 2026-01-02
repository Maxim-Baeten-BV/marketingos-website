import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'performance-marketing-software': resolve(__dirname, 'performance-marketing-software.html'),
        'features-budget-checker': resolve(__dirname, 'features/budget-checker.html'),
      },
    },
  },
})
