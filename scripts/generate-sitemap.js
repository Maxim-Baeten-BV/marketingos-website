import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const SITE_URL = 'https://www.flywithmarketingos.com';

// Directories to scan for HTML files
const SCAN_DIRS = [
  rootDir,           // Root directory (index.html, etc.)
  join(rootDir, 'features'),
  join(rootDir, 'blog'),
];

// Files/directories to exclude
const EXCLUDE = [
  'node_modules',
  'dist',
  'analytics-setup',
  'keyword-research-output',
  '.git',
  '_templates',
];

// Priority mapping based on path depth and type
function getPriority(urlPath) {
  if (urlPath === '/') return '1.0';
  if (urlPath.includes('/features/')) return '0.8';
  if (urlPath.includes('/blog/')) return '0.7';
  return '0.6';
}

// Change frequency based on content type
function getChangeFreq(urlPath) {
  if (urlPath === '/') return 'weekly';
  if (urlPath.includes('/blog/')) return 'monthly';
  return 'monthly';
}

function findHtmlFiles(dir, files = []) {
  if (!statSync(dir).isDirectory()) return files;

  const items = readdirSync(dir);

  for (const item of items) {
    if (EXCLUDE.includes(item)) continue;

    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

function generateSitemap() {
  const htmlFiles = new Set();

  for (const dir of SCAN_DIRS) {
    try {
      findHtmlFiles(dir, []).forEach(f => htmlFiles.add(f));
    } catch (e) {
      // Directory might not exist
    }
  }

  // Convert file paths to URLs
  const urls = [...htmlFiles].map(file => {
    let urlPath = '/' + relative(rootDir, file);

    // Convert index.html to directory path
    if (urlPath === '/index.html') {
      urlPath = '/';
    } else if (urlPath.endsWith('/index.html')) {
      // /blog/index.html → /blog/
      urlPath = urlPath.replace('/index.html', '/');
    } else {
      // Remove .html extension for clean URLs
      urlPath = urlPath.replace('.html', '');
    }

    return urlPath;
  });

  // Deduplicate and sort URLs for consistent output
  const uniqueUrls = [...new Set(urls)].sort();

  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map(urlPath => {
  const fullUrl = urlPath === '/'
    ? SITE_URL + '/'
    : SITE_URL + urlPath;

  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangeFreq(urlPath)}</changefreq>
    <priority>${getPriority(urlPath)}</priority>
  </url>`;
}).join('\n')}
</urlset>
`;

  // Write to public directory (for dev) and check if it changed
  const sitemapPath = join(rootDir, 'public', 'sitemap.xml');
  writeFileSync(sitemapPath, sitemap);

  console.log(`✅ Sitemap generated with ${uniqueUrls.length} URLs:`);
  uniqueUrls.forEach(url => console.log(`   ${SITE_URL}${url === '/' ? '/' : url}`));
  console.log(`\n📁 Written to: ${sitemapPath}`);
}

generateSitemap();
