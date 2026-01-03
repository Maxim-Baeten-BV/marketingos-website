import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'performance-marketing-software': resolve(__dirname, 'performance-marketing-software.html'),
        'features-budget-checker': resolve(__dirname, 'features/budget-checker.html'),
        'features-meta-ads-manager': resolve(__dirname, 'features/meta-ads-manager.html'),
        'features-google-ads-manager': resolve(__dirname, 'features/google-ads-manager.html'),
        'features-analytics-reporter': resolve(__dirname, 'features/analytics-reporter.html'),
        'features-utm-organizer': resolve(__dirname, 'features/utm-organizer.html'),
        'blog-best-ppc-management-software': resolve(__dirname, 'blog/best-ppc-management-software.html'),
        'blog-index': resolve(__dirname, 'blog/index.html'),
      },
    },
  },
})
