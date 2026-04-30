---
title: "Basic Usage"
description: "Learn how to initialize a project, organize your Markdown files, and build your documentation site."
---

Getting started with `docmd` is designed to be instantaneous. This guide walks you through the core workflow, from initial setup to the final production build.

## 1. Project Initialization

To start a new documentation project, create a directory and execute the `init` command.

```bash
mkdir my-docs && cd my-docs
npx @docmd/core init
```

### Project Structure

After initialization, your project will follow a clean and predictable structure:

| File / Directory | Description |
| :--- | :--- |
| `docs/` | **Source Directory.** Place all your `.md` files here. |
| `assets/` | Static assets (images, custom CSS, or client-side JavaScript). |
| `docmd.config.js` | **Configuration File.** Define branding, navigation, and plugins. |
| `site/` | **Output Directory.** Contains the generated static site after running `build`. |

## 2. Real-Time Development

You can preview your changes instantly without manual rebuilding. Start the development server with:

```bash
npx @docmd/core dev
```

*   **Access**: `http://localhost:3000`
*   **Live Reload**: Changes to `.md` files or `docmd.config.js` are reflected instantly in the browser via Hot Module Replacement.

## 3. Content Organization

`docmd` maps the file structure of your `docs/` folder directly to URLs. Subdirectories are handled automatically.

*   `docs/index.md` → `/` (Home)
*   `docs/api.md` → `/api`
*   `docs/guides/setup.md` → `/guides/setup`

::: callout tip "Use standard Markdown"
Use standard Markdown. If a page title is not defined in the frontmatter, `docmd` will automatically extract the first `H1` header as the title.
:::

## 4. Customizing Navigation

The sidebar navigation is controlled via the `navigation` array in `docmd.config.js`. This allows you to define a logical hierarchy for your content.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  navigation: [
    { title: 'Introduction', path: '/', icon: 'home' },
    {
      title: 'Advanced',
      icon: 'settings',
      collapsible: true,
      children: [
        { title: 'Configuration', path: '/configuration' },
        { title: 'Plugins', path: '/plugins' }
      ]
    }
  ]
});
```

## 5. Production Build

When you are ready to deploy, generate a production-ready static site:

```bash
npx @docmd/core build
```

This command produces a highly optimized Single Page Application (SPA) in the `site/` directory. The output is entirely static and can be hosted on platforms like GitHub Pages, Vercel, Netlify, or even served from a local file system.

### Verification

To verify your production build locally, you can use any static file server (e.g., `npx serve site`) to ensure all links and assets are functioning correctly before deployment.