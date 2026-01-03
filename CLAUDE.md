# marketingOS Website - Claude Instructions

## Project Overview
This is the marketing website for marketingOS, built with Vite, TailwindCSS, and vanilla HTML/JS.

**Live URL:** https://www.flywithmarketingos.com

## Key Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (auto-generates sitemap)
- `npm run preview` - Preview production build
- `npm run sitemap` - Manually regenerate sitemap.xml

## Sitemap Management

The sitemap is **automatically generated** during the build process.

### How it works:
1. The script `scripts/generate-sitemap.js` scans for all `.html` files
2. It generates `public/sitemap.xml` with all discovered URLs
3. This runs automatically on every `npm run build`

### When adding new pages:
1. Create the new `.html` file in the appropriate directory:
   - Root level: `*.html` (e.g., `about.html`)
   - Features: `features/*.html`
   - Blog: `blog/*.html`
2. Add the page to `vite.config.js` in the `rollupOptions.input` object
3. Run `npm run build` or `npm run sitemap` to update the sitemap

### Directory structure for pages:
```
/                           → index.html (priority: 1.0)
/features/*.html            → Feature pages (priority: 0.8)
/blog/*.html                → Blog posts (priority: 0.7)
/*.html                     → Other pages (priority: 0.6)
```

### Excluded from sitemap:
- `node_modules/`
- `dist/`
- `analytics-setup/`
- `keyword-research-output/`

## Adding a New Page Checklist
- [ ] Create the HTML file
- [ ] Add entry to `vite.config.js` rollupOptions.input
- [ ] Run `npm run build` to regenerate sitemap
- [ ] Verify sitemap includes new URL

## File Structure
```
├── index.html                 # Homepage
├── features/                  # Feature pages
├── blog/                      # Blog posts
├── public/
│   ├── sitemap.xml           # Auto-generated sitemap
│   └── robots.txt            # Robots file
├── scripts/
│   └── generate-sitemap.js   # Sitemap generator
├── src/                      # Source files (CSS, etc.)
└── dist/                     # Production build output
```
