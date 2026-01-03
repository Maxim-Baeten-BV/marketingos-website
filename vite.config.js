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
        'blog-index': resolve(__dirname, 'blog/index.html'),
        'blog-best-ppc-software': resolve(__dirname, 'blog/best-ppc-software.html'),
        'blog-ppc-reporting-best-practices': resolve(__dirname, 'blog/ppc-reporting-best-practices.html'),
        'blog-optmyzr-alternative': resolve(__dirname, 'blog/optmyzr-alternative.html'),
        'blog-marketingos-vs-optmyzr': resolve(__dirname, 'blog/marketingos-vs-optmyzr.html'),
        'blog-best-marketing-budget-tracking-tools': resolve(__dirname, 'blog/best-marketing-budget-tracking-tools.html'),
        'blog-adalysis-alternative': resolve(__dirname, 'blog/adalysis-alternative.html'),
        'blog-best-meta-ads-tools': resolve(__dirname, 'blog/best-meta-ads-tools.html'),
        'blog-google-ads-quality-score-guide': resolve(__dirname, 'blog/google-ads-quality-score-guide.html'),
        'roadmap': resolve(__dirname, 'roadmap/index.html'),
      },
    },
  },
})
