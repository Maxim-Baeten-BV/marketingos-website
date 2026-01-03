import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'performance-marketing-software': resolve(__dirname, 'performance-marketing-software.html'),
        'features-ad-spend-tracker': resolve(__dirname, 'features/ad-spend-tracker.html'),
        'features-facebook-ads-management-software': resolve(__dirname, 'features/facebook-ads-management-software.html'),
        'features-google-ads-management-tool': resolve(__dirname, 'features/google-ads-management-tool.html'),
        'features-marketing-dashboard': resolve(__dirname, 'features/marketing-dashboard.html'),
        'features-utm-tracking-tool': resolve(__dirname, 'features/utm-tracking-tool.html'),
        'blog-best-ppc-software': resolve(__dirname, 'blog/best-ppc-software.html'),
        'blog-index': resolve(__dirname, 'blog/index.html'),
        'roadmap': resolve(__dirname, 'roadmap/index.html'),
      },
    },
  },
})
