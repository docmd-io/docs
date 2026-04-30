---
title: "Basic Usage"
description: "Learn how to initialize a project, organize your markdown files, and build your documentation site."
---

Getting started with `docmd` is designed to be instantaneous. This guide explains the core workflow from initialization to final production build.

## 1. Initialize Your Project

To start a new documentation project, create an empty directory and run the `init` command.

```bash
mkdir my-guide && cd my-guide
docmd init
```
### The Project Structure

After initialization, your project will follow this clean, intuitive structure:

| Folder / File | Purpose |
| :--- | :--- |
| `docs/` | **Source Folder.** Put all your `.md` files here. |
| `assets/` | Static files (images, custom CSS, JS). |
| `docmd.config.js` | Your site's brain. Branding, navigation, and plugins. |
| `site/` | **Output Folder.** Generated after you run `docmd build`. |

## 2. Launching the Preview

You can see your changes in real-time without building the site. Launch the development server:

```bash
docmd dev
```

*   **URL**: `http://localhost:3000`
*   **Hot Reload**: Every time you save a `.md` or `.config.js` file, the browser updates instantly.

## 3. Organizing Content

Every markdown file inside the `docs/` folder becomes a URL. Subfolders are respected automatically.

*   `docs/index.md` → `/` (Home)
*   `docs/api.md` → `/api`
*   `docs/guides/setup.md` → `/guides/setup`

> [!TIP]
> Use standard Markdown syntax. `docmd` will automatically extract the first `H1` header of your file to use as the page title if not specified in the frontmatter.

## 4. Configuring Navigation

`docmd` gives you absolute control over the sidebar. Edit the `navigation` array in `docmd.config.js` to structure your site.

```javascript
navigation:[
  { title: 'Introduction', path: '/', icon: 'home' },
  {
    title: 'Advanced',
    icon: 'settings',
    collapsible: true, // Allow users to collapse this section
    children:[
      { title: 'Configuration', path: '/configuration' },
      { title: 'Plugins', path: '/plugins' }
    ]
  }
]
```

## 5. Building for Production

When you are ready to deploy, run the build command:

```bash
docmd build
```

This generates a highly optimized Single Page Application (SPA) inside the `site/` directory. It is completely static so you can host it on GitHub Pages, Vercel, Netlify, or even a local USB drive.

### Verification Step
To verify your production build locally, you can use any static server or run:
```bash
docmd dev --preserve
```
::: callout tip
The `--preserve` flag prevents the dev server from overwriting your production `site/` folder with dev-mode assets.
:::