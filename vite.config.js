import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'performance-marketing-software': resolve(__dirname, 'performance-marketing-software.html'),
        'features-ad-spend-tracker': resolve(__dirname, 'features/ad-spend-tracker.html'),
        'features-facebook-ads-manager': resolve(__dirname, 'features/facebook-ads-manager.html'),
        'features-google-ads-manager': resolve(__dirname, 'features/google-ads-manager.html'),
        'features-marketing-dashboard': resolve(__dirname, 'features/marketing-dashboard.html'),
        'features-utm-tracker': resolve(__dirname, 'features/utm-tracker.html'),
        'blog-best-ppc-management-software': resolve(__dirname, 'blog/best-ppc-management-software.html'),
        'blog-index': resolve(__dirname, 'blog/index.html'),
      },
    },
  },
})
