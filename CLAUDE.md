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
├── src/
│   ├── main.js               # Main JavaScript (waitlist modal, etc.)
│   └── style.css             # Global styles
└── dist/                     # Production build output
```

## Waitlist Modal

The waitlist modal is handled by `src/main.js`. When adding new pages:

### Required HTML structure for modal to work:
```html
<!-- Modal container -->
<div id="waitlist-modal" class="hidden ...">
  <div id="waitlist-form-container">
    <form id="waitlist-form" onsubmit="submitWaitlistForm(event)">
      <input type="email" id="waitlist-email" ... />
      <button type="submit" id="waitlist-submit-btn">Join the waitlist</button>
    </form>
  </div>
  <div id="waitlist-success" class="hidden">...</div>
  <div id="waitlist-error" class="hidden">
    <p id="waitlist-error-message"></p>
  </div>
</div>
```

### Required button onclick:
```html
<button onclick="openWaitlistModal()">Join the Waitlist</button>
```

### Common Mistakes to Avoid:
1. **Wrong element IDs** - The JavaScript expects exact IDs like `waitlist-form`, NOT `waitlistForm`
2. **Missing modal HTML** - Every page with CTA buttons needs the modal HTML structure
3. **Copy from working page** - When creating new pages, copy the modal HTML from `index.html` or a working feature page

---

## Lessons Learned (Session 2026-01-03)

### Bug: Blog CTAs Not Working

**Symptoms:** Clicking "Join the Waitlist" buttons on blog pages did nothing.

**Root Cause:** `main.js` had a line that crashed on pages missing the `current-year` element:
```javascript
// BROKEN - crashes if element doesn't exist
document.getElementById('current-year').textContent = new Date().getFullYear()
```

When this line threw an error, the entire script stopped executing before defining the modal functions.

**Fix:** Made all `getElementById` calls defensive with null checks:
```javascript
// FIXED - safe on any page
const currentYearEl = document.getElementById('current-year')
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear()
}
```

**Prevention:** Always use null checks when accessing DOM elements that may not exist on all pages.

### Debugging Tips

1. **Check browser console first** - JavaScript errors stop script execution
2. **Verify element IDs match** - Compare HTML `id` attributes with what JS expects
3. **Test on all page types** - Homepage, feature pages, and blog pages may have different HTML structures

### URL Structure Best Practice

Feature pages and blog posts should use **exact-match keyword URLs**:
- `/features/google-ads-management-tool.html` (primary keyword: "google ads management tool")
- `/blog/best-ppc-software.html` (primary keyword: "best ppc software")

When renaming URLs:
1. Update the HTML filename
2. Update `vite.config.js` rollupOptions.input
3. Update internal links across all pages
4. Sitemap auto-updates on build

### CRITICAL: vite.config.js Must Include All Pages

**Problem:** New HTML files won't be included in the production build unless explicitly added to `vite.config.js`.

**Symptoms:**
- New pages return 404 after deployment
- Build output shows fewer files than expected
- Sitemap lists the page but it's not accessible

**Solution:** Every new `.html` file MUST be added to `vite.config.js`:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // ADD EVERY NEW PAGE HERE:
        'blog-new-post': resolve(__dirname, 'blog/new-post.html'),
      },
    },
  },
})
```

**Checklist for Adding New Pages:**
1. ✅ Create the HTML file
2. ✅ Add entry to `vite.config.js` rollupOptions.input
3. ✅ Update blog/index.html if it's a blog post (add card)
4. ✅ Run `npm run build` to verify it's included in dist/
5. ✅ Commit and deploy
