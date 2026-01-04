#!/usr/bin/env python3
"""
Script to unify all footers across the marketingOS website.
Uses the home page footer as the standard template.
"""

import os
import re

# The standard footer from the home page
STANDARD_FOOTER = '''    <!-- Footer -->
    <footer class="py-12 px-6 bg-soft-gray border-t border-gray-200">
      <div class="max-w-5xl mx-auto text-center">
        <a href="/" class="font-semibold text-brand-dark text-lg mb-2 inline-block hover:text-brand-blue transition-colors">marketingOS</a>
        <p class="text-deep-gray text-sm mb-4">The operating system for modern marketers</p>
        <nav class="flex justify-center gap-6 text-sm text-deep-gray mb-4">
          <a href="/performance-marketing-software" class="hover:text-brand-blue transition-colors">Product</a>
          <a href="/blog" class="hover:text-brand-blue transition-colors">Blog</a>
        </nav>
        <div class="flex justify-center gap-4 mb-4">
          <a href="https://x.com/marketingOS_com" target="_blank" rel="noopener" class="text-deep-gray hover:text-brand-blue transition-colors" aria-label="Follow us on X">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://www.reddit.com/user/marketingOS/" target="_blank" rel="noopener" class="text-deep-gray hover:text-brand-blue transition-colors" aria-label="Follow us on Reddit">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
          </a>
        </div>
        <p class="text-deep-gray text-sm">&copy; <span id="current-year"></span> marketingOS. All rights reserved.</p>
      </div>
    </footer>'''

def get_html_files():
    """Get all HTML files excluding the dist folder."""
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Skip dist folder
        if 'dist' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return sorted(html_files)

def fix_footer(filepath):
    """Replace the footer in a file with the standard footer."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if file already has the standard footer (index.html)
    if filepath == './index.html':
        print(f"SKIP: {filepath} (reference file)")
        return

    # Find the footer section
    # Pattern: <!-- Footer --> or <footer to </footer>
    footer_comment_pattern = r'(\s*<!-- Footer -->\s*)'
    footer_tag_pattern = r'<footer[^>]*>.*?</footer>'

    # First, let's see if there's a footer
    footer_match = re.search(r'<footer[^>]*>', content)

    if not footer_match:
        print(f"WARNING: {filepath} - No footer found!")
        return

    # Find where footer starts (including comment if present)
    footer_start = footer_match.start()

    # Check if there's a <!-- Footer --> comment before it
    before_footer = content[:footer_start]
    comment_match = re.search(r'<!-- Footer -->\s*$', before_footer)
    if comment_match:
        footer_start = comment_match.start()

    # Find where footer ends
    footer_end_match = re.search(r'</footer>', content[footer_start:])
    if not footer_end_match:
        print(f"ERROR: {filepath} - No closing </footer> tag found!")
        return

    footer_end = footer_start + footer_end_match.end()

    # Check what comes after the footer - we need to preserve modals and scripts
    after_footer = content[footer_end:]

    # Extract the old footer content to check for issues
    old_footer = content[footer_start:footer_end]

    # Replace the footer
    new_content = content[:footer_start] + STANDARD_FOOTER + after_footer

    # Write the file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"FIXED: {filepath}")

def main():
    os.chdir('/Users/maximbaeten/Documents/dev/External projects/marketingOSwebsite-claude/marketingos-website')

    html_files = get_html_files()
    print(f"Found {len(html_files)} HTML files to process:\n")

    for filepath in html_files:
        fix_footer(filepath)

if __name__ == '__main__':
    main()
