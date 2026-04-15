#!/usr/bin/env node
/**
 * Add screenshot placeholders and container improvements to key doc pages.
 * Run: node scripts/add-screenshots.js
 */
import fs from 'fs';
import path from 'path';

const EN = path.resolve(import.meta.dirname, '../docs/en');

function insertAfter(content, marker, insertion) {
  const idx = content.indexOf(marker);
  if (idx === -1) return content;
  const end = idx + marker.length;
  // Find end of line
  const nl = content.indexOf('\n', end);
  if (nl === -1) return content + '\n' + insertion + '\n';
  return content.slice(0, nl + 1) + '\n' + insertion + '\n' + content.slice(nl + 1);
}

function insertBefore(content, marker, insertion) {
  const idx = content.indexOf(marker);
  if (idx === -1) return content;
  return content.slice(0, idx) + insertion + '\n\n' + content.slice(idx);
}

function appendToFile(content, insertion) {
  return content.trimEnd() + '\n\n' + insertion + '\n';
}

const edits = [
  // ──────────── QUICK START ────────────
  {
    file: 'getting-started/quick-start.md',
    transforms: [
      (c) => insertAfter(c, 'npx @docmd/core dev', '\n<!-- SCREENSHOT: Terminal output after running `npx @docmd/core dev` showing the local dev server URL and build summary with page count. -->'),
      (c) => insertAfter(c, 'localhost', '\n<!-- SCREENSHOT: Browser showing the docmd default page at localhost:3000 — the auto-generated homepage with sidebar navigation visible. -->'),
    ]
  },
  // ──────────── INSTALLATION ────────────
  {
    file: 'getting-started/installation.md',
    transforms: [
      (c) => {
        // Add tabs for package managers if not already present
        if (c.includes('::: tabs')) return c;
        return c.replace(
          /```bash\nnpm install @docmd\/core\n```/,
          `::: tabs
== tab "npm"
\`\`\`bash
npm install @docmd/core
\`\`\`
== tab "pnpm"
\`\`\`bash
pnpm add @docmd/core
\`\`\`
== tab "yarn"
\`\`\`bash
yarn add @docmd/core
\`\`\`
== tab "bun"
\`\`\`bash
bun add @docmd/core
\`\`\`
:::`
        );
      },
    ]
  },
  // ──────────── PROJECT STRUCTURE ────────────
  {
    file: 'getting-started/project-structure.md',
    transforms: [
      (c) => insertAfter(c, '---\n\n', '<!-- SCREENSHOT: VS Code or file explorer showing the standard docmd project structure — docs/ folder with markdown files, docmd.config.js at root, and assets/ directory. -->\n'),
    ]
  },
  // ──────────── GENERAL CONFIG ────────────
  {
    file: 'configuration/general.md',
    transforms: [
      (c) => insertAfter(c, '## Layout & Appearance', '\n<!-- SCREENSHOT: Full page with sidebar, header, breadcrumbs, table of contents, and footer — annotated with arrows pointing to each configurable area. -->'),
    ]
  },
  // ──────────── NAVIGATION ────────────
  {
    file: 'configuration/navigation.md',
    transforms: [
      (c) => insertAfter(c, '## The Navigation Array', '\n<!-- SCREENSHOT: Sidebar navigation showing a two-level hierarchy with icons, an active page highlighted, and a collapsible group. -->'),
      (c) => insertAfter(c, '## Automated Breadcrumbs', '\n<!-- SCREENSHOT: Breadcrumb bar above the page title showing "Home > Getting Started > Installation" with clickable links. -->'),
    ]
  },
  // ──────────── VERSIONING ────────────
  {
    file: 'configuration/versioning.md',
    transforms: [
      (c) => insertAfter(c, '## Configuration', '\n<!-- SCREENSHOT: Version switcher dropdown in the sidebar showing "v2.x (Latest)" selected, with "v1.x" as an option. -->'),
      (c) => insertAfter(c, '### 3. Sticky Switching', '\n<!-- SCREENSHOT: Two browser windows side by side — left showing v2 of a page, right showing the same page path in v1 after switching, demonstrating path preservation. -->'),
    ]
  },
  // ──────────── LOCALISATION INDEX ────────────
  {
    file: 'configuration/localisation/index.md',
    transforms: [
      (c) => insertAfter(c, '## Position the language switcher', '\n<!-- SCREENSHOT: Three variants of the language switcher — options-menu (globe icon in header), sidebar-top (dropdown at top of sidebar), sidebar-bottom (dropdown at bottom). Show all three side by side. -->'),
    ]
  },
  // ──────────── SEARCH ────────────
  {
    file: 'plugins/search.md',
    transforms: [
      (c) => insertAfter(c, '## How It Works', '\n<!-- SCREENSHOT: Search modal open with a query typed, showing matching results with highlighted titles and deep-linked headings. The keyboard shortcut hint (Ctrl+K or /) should be visible. -->'),
    ]
  },
  // ──────────── PWA ────────────
  {
    file: 'plugins/pwa.md',
    transforms: [
      (c) => insertAfter(c, '### 2. Mobile Installation', '\n<!-- SCREENSHOT: Mobile device (iOS or Android) showing the "Add to Home Screen" prompt for a docmd-powered site, and the resulting app icon on the home screen. -->'),
    ]
  },
  // ──────────── LLMs ────────────
  {
    file: 'plugins/llms.md',
    transforms: [
      (c) => insertAfter(c, '## Configuration', '\n<!-- SCREENSHOT: Browser showing the raw llms.txt output at /llms.txt — the structured summary with page titles, URLs, and descriptions in plain text format. -->'),
    ]
  },
  // ──────────── THREADS ────────────
  {
    file: 'plugins/threads.md',
    transforms: [
      (c) => insertAfter(c, '## How It Works', '\n<!-- SCREENSHOT: The thread creation flow — (1) text selected on page, (2) comment popover appearing, (3) highlighted text with thread card below. Show the flow as 3 numbered steps. -->'),
    ]
  },
  // ──────────── THEMING ────────────
  {
    file: 'theming/available-themes.md',
    transforms: [
      (c) => {
        // Add screenshot for each theme if not already present
        if (c.includes('<!-- SCREENSHOT')) return c;
        return insertAfter(c, '---\n\n', '<!-- SCREENSHOT: Gallery grid showing all available themes — each theme rendered as a small preview card with the theme name below. Show at least the default, minimal, and docs themes in both light and dark variants. -->\n');
      }
    ]
  },
  // ──────────── LIGHT/DARK MODE ────────────
  {
    file: 'theming/light-dark-mode.md',
    transforms: [
      (c) => insertAfter(c, '---\n\n', '<!-- SCREENSHOT: Split-screen showing the same documentation page in light mode (left) and dark mode (right), with the theme toggle button circled in both. -->\n'),
    ]
  },
  // ──────────── DEPLOYMENT ────────────
  {
    file: 'deployment/index.md',
    transforms: [
      (c) => {
        // Add deployment platform tabs if there are platform-specific instructions
        if (c.includes('::: tabs') || !c.includes('Vercel') && !c.includes('Netlify')) return c;
        return c;
      }
    ]
  },
  // ──────────── CONTAINERS INDEX ────────────
  {
    file: 'content/containers/index.md',
    transforms: [
      (c) => insertAfter(c, '---\n\n', '<!-- SCREENSHOT: Montage of all container types on a single page — callouts (info, warning, danger, tip), tabs with code, steps, cards grid, hero section, and collapsible sections. -->\n'),
    ]
  },
  // ──────────── FRONTMATTER ────────────
  {
    file: 'content/frontmatter.md',
    transforms: [
      (c) => {
        // Add callout about required title field
        if (c.includes('callout warning "Title')) return c;
        return insertBefore(c, '## Visibility', '\n::: callout warning "Title is important"\nWhile not strictly required, the `title` field is strongly recommended. Without it, docmd falls back to the first `# H1` heading or the filename — which can produce less ideal `<title>` tags and search results.\n:::\n');
      }
    ]
  },
  // ──────────── COMPARISON ────────────
  {
    file: 'comparison.md',
    transforms: [
      // Already has screenshot comments from earlier
      (c) => c,
    ]
  },
  // ──────────── LIVE PREVIEW ────────────
  {
    file: 'content/live-preview.md',
    transforms: [
      (c) => insertAfter(c, '---\n\n', '<!-- SCREENSHOT: A live preview window embedded in a documentation page, showing a code editor on the left and the rendered HTML output on the right, with the preview updating in real-time. -->\n'),
    ]
  },
];

let filesEdited = 0;
for (const edit of edits) {
  const filePath = path.join(EN, edit.file);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⏭️  Skipped (not found): ${edit.file}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  for (const transform of edit.transforms) {
    content = transform(content);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`  ✅ Updated: ${edit.file}`);
    filesEdited++;
  } else {
    console.log(`  ➖ No changes: ${edit.file}`);
  }
}

console.log(`\n${filesEdited} files updated.`);
