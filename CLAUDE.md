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
├── _templates/                # Page templates (DO NOT DEPLOY)
│   ├── page-template.html    # Feature/general page template
│   └── blog-post-template.html # Blog post template
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

---

## Page Templates

Templates are stored in `_templates/` and ensure consistent navigation, modals, and layout across all pages.

### Available Templates

| Template | Use For | Location |
|----------|---------|----------|
| `page-template.html` | Feature pages, landing pages, general pages | `_templates/page-template.html` |
| `blog-post-template.html` | Blog articles, guides, tutorials | `_templates/blog-post-template.html` |

### How to Use Templates

#### Creating a New Feature/General Page:
1. Copy `_templates/page-template.html` to the target location (e.g., `features/new-feature.html`)
2. Search for `CUSTOMIZE:` comments and replace placeholder values
3. Add entry to `vite.config.js` rollupOptions.input
4. Run `npm run build` to verify

#### Creating a New Blog Post:
1. Copy `_templates/blog-post-template.html` to `blog/your-post-slug.html`
2. Search for `CUSTOMIZE:` comments and replace ALL placeholder values:
   - `BLOG_TITLE` → Your article title
   - `BLOG_URL_SLUG` → URL-friendly slug (e.g., `google-ads-tips`)
   - `META_DESCRIPTION` → 150-160 character description
   - `BREADCRUMB_NAME` → Short title for breadcrumb
   - `ARTICLE_TYPE` → e.g., "Ultimate Guide", "Tutorial", "Tips"
   - `PRIMARY_KEYWORD` → Main SEO keyword
   - `READ_TIME` → Estimated read time in minutes
   - `WORD_COUNT` → Approximate word count
   - Section headings, content, FAQ items, etc.
3. Add entry to `vite.config.js` rollupOptions.input
4. Add blog card to `blog/index.html`
5. Run `npm run build` to verify

### Template Sections

Each template has clearly marked sections:

| Marker | Meaning |
|--------|---------|
| `<!-- CUSTOMIZE: ... -->` | Edit this section for each new page |
| `<!-- DO NOT MODIFY ... -->` | Keep exactly as-is for consistency |

**DO NOT MODIFY sections include:**
- Navigation (desktop and mobile)
- Waitlist modal
- Footer
- Mobile menu script

### Optional Schema.org Markup (Blog Template)

The blog template includes optional structured data that can be enabled:

- **FAQPage Schema** - Uncomment if your article has an FAQ section
- **HowTo Schema** - Uncomment if your article is a step-by-step guide

### Content Patterns (Blog Template)

The blog template includes example patterns you can copy/reuse:

- **Callout boxes** - Tips, warnings, important notes
- **Comparison cards** - Side-by-side feature comparisons
- **Data tables** - Structured data presentation
- **Step-by-step sections** - Numbered instructions
- **FAQ accordion** - Expandable Q&A section

### Bulk Page Creation Workflow

When creating multiple pages at once:

1. **Prepare a spreadsheet** with all placeholder values for each page
2. **Copy template** for each new page
3. **Find/replace placeholders** using your spreadsheet data
4. **Add all entries** to `vite.config.js` at once
5. **Run single build** to verify all pages
6. **Commit and deploy**

This ensures all pages have:
- ✅ Identical Pattern A navigation (desktop + mobile)
- ✅ Consistent footer
- ✅ Working waitlist modal
- ✅ Proper schema.org markup
- ✅ Correct meta tags structure

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

### Bug: Waitlist Modal Not Working (Session 2026-01-04)

**Symptoms:** Clicking "Try marketingOS free" CTA button on `best-ppc-software.html` did nothing.

**Root Cause:** The page had an old inline waitlist modal with incorrect HTML structure that didn't match what `main.js` expects.

**Broken modal structure:**
```html
<!-- BROKEN - missing required IDs and attributes -->
<div id="waitlist-modal" class="hidden ...">
  <form>  <!-- Missing id="waitlist-form" and onsubmit -->
    <input type="email" />  <!-- Missing id="waitlist-email" -->
    <button>Join</button>  <!-- Missing id="waitlist-submit-btn" -->
  </form>
  <!-- Missing #waitlist-success and #waitlist-error divs -->
</div>
```

**Fix:** Replaced with the standard modal structure from the template.

**Prevention:**
1. **ALWAYS copy modal from `_templates/blog-post-template.html`** - Never write modal HTML manually
2. **Required element IDs for modal to work:**
   - `id="waitlist-modal"` on the container
   - `id="waitlist-form"` with `onsubmit="submitWaitlistForm(event)"`
   - `id="waitlist-email"` on the email input
   - `id="waitlist-submit-btn"` on the submit button
   - `id="waitlist-success"` for success state
   - `id="waitlist-error"` and `id="waitlist-error-message"` for error state

### Debugging Tips

1. **Check browser console first** - JavaScript errors stop script execution
2. **Verify element IDs match** - Compare HTML `id` attributes with what JS expects
3. **Test on all page types** - Homepage, feature pages, and blog pages may have different HTML structures
4. **For modal issues** - Verify the modal HTML structure matches the template exactly

### URL Structure Best Practice

Feature pages and blog posts should use **exact-match keyword URLs**:
- `/features/google-ads-management-tool.html` (primary keyword: "google ads management tool")
- `/blog/best-ppc-software.html` (primary keyword: "best ppc software")

When renaming URLs:
1. Update the HTML filename
2. Update `vite.config.js` rollupOptions.input
3. Update internal links across all pages
4. Sitemap auto-updates on build

### CRITICAL: Navigation Pattern A is the Standard

**All pages MUST use Pattern A navigation.** This is the only approved navigation pattern for the site.

**Pattern A Navigation includes:**
- **Desktop:** Product dropdown (with feature submenu) → Blog → Roadmap → "Get on the waitlist" CTA button
- **Mobile:** Full-screen slide-in overlay menu with Product Overview, Features section, Blog, Roadmap links, and CTA button

**Reference file:** Use `blog/ppc-reporting-best-practices.html` as the template for navigation and header structure.

**Navigation Structure:**
```html
<nav class="sticky top-0 left-0 right-0 backdrop-blur-sm border-b border-gray-200 z-50 py-4 md:py-6 px-4 md:px-6" style="background-color: #FFFCF5;">
  <!-- Logo + Hamburger button + Desktop nav with Product dropdown -->
</nav>

<!-- Mobile Menu Overlay - MUST be outside nav to avoid backdrop-filter containing block issue -->
<div id="mobile-menu" class="fixed inset-0 bg-black/60 z-40 opacity-0 invisible...">
  <!-- Slide-in panel with all feature links -->
</div>

<!-- Mobile Menu Script -->
<script>
  // openMobileMenu(), closeMobileMenu() functions
</script>

<main>
```

**Critical Notes:**
1. Mobile menu overlay MUST be placed OUTSIDE the `<nav>` element
2. Script for mobile menu goes BEFORE `<main>`
3. CTA button uses `onclick="openWaitlistModal()"` (not href links)
4. Product dropdown shows feature links on hover

**Do NOT use Pattern B (flat nav with Apps, Blog, Pricing, FAQ, Login).** It has been deprecated.

### CRITICAL: Standardized Blog Header Format

**All blog posts MUST use this exact header format.** This prevents visual inconsistencies across blog posts.

**Reference file:** `blog/ppc-reporting-best-practices.html`

**Required Header Structure:**
```html
<header class="py-16 px-6 border-b border-gray-200">
  <div class="max-w-6xl mx-auto lg:pr-[296px]">
    <!-- Badge: uppercase, tracking-wide (NOT rounded pill) -->
    <span class="inline-block text-brand-blue text-sm font-semibold uppercase tracking-wide mb-6">ARTICLE TYPE</span>

    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-8 leading-tight">
      Article Title Here
    </h1>

    <p class="text-xl text-deep-gray mb-8 leading-relaxed max-w-3xl">
      Article description/subtitle here.
    </p>

    <!-- Author info with | separators -->
    <div class="flex flex-wrap items-center gap-6 text-sm text-deep-gray mb-10">
      <div class="flex items-center gap-2">
        <img src="/founder picture.png" alt="Maxim Baeten" class="w-10 h-10 rounded-full object-cover" />
        <a href="https://www.linkedin.com/in/maximbaeten/" target="_blank" rel="noopener" class="font-medium text-brand-dark hover:text-brand-blue transition-colors">Maxim Baeten</a>
      </div>
      <span class="text-gray-400">|</span>
      <span>January 2026</span>
      <span class="text-gray-400">|</span>
      <span>X min read</span>
    </div>

    <!-- Two CTAs: primary button + secondary link -->
    <div class="flex flex-wrap gap-4">
      <button onclick="openWaitlistModal()" class="bg-brand-blue hover:bg-opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer">Try marketingOS free</button>
      <a href="#first-section-id" class="border border-gray-300 hover:border-brand-blue text-brand-dark hover:text-brand-blue font-semibold px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2">
        Start reading
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </a>
    </div>
  </div>
</header>
```

**Critical Requirements:**
1. ✅ **White background** - NO gray (`bg-soft-gray`) or beige backgrounds
2. ✅ **Left-aligned content** - Use `lg:pr-[296px]` for sidebar space, NOT centered
3. ✅ **Uppercase badge** - Use `uppercase tracking-wide`, NOT rounded pill with `rounded-full px-4 py-1`
4. ✅ **Author photo** - 10x10 rounded circle with LinkedIn link
5. ✅ **Pipe separators** - Use `<span class="text-gray-400">|</span>` between author/date/read time
6. ✅ **Two CTAs** - Primary blue button + secondary "Start reading" link with down arrow
7. ✅ **Anchor target** - Add `id="first-section-id"` to the first h2 section for "Start reading" link

**Common Mistakes to Avoid:**
- ❌ Using `bg-soft-gray` or inline `style="background-color: #..."` on header
- ❌ Centering the header content with `text-center`
- ❌ Using rounded pill badges: `rounded-full bg-brand-blue/10 px-4 py-1`
- ❌ Missing the "Start reading" secondary CTA
- ❌ Missing the anchor ID on the first content section

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
