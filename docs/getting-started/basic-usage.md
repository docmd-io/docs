---
title: "Basic Usage"
description: "A quick-start guide to initializing a project, writing content, and building your site."
---

# Basic Usage

Once you have `docmd` installed, creating a beautiful documentation site takes only a few minutes. This guide walks you through the standard workflow.

## 1. Initialize the Project

Create a new folder for your documentation and navigate into it using your terminal.

```bash
mkdir my-docs
cd my-docs
```

Run the initialization command:

```bash
docmd init
```

`docmd` will scaffold a ready-to-use project. Your directory will now look like this:

```text
my-docs/
├── assets/                 # Place custom images, CSS, and JS here
├── docs/                   # Your Markdown files live here
│   └── index.md            # The homepage of your documentation
├── docmd.config.js         # The main configuration file
└── package.json            # Contains helpful NPM scripts
```

## 2. Start the Development Server

You don't need to build the site blindly. `docmd` includes a blazing-fast development server that updates your browser the moment you save a file.

Run the dev command:

```bash
docmd dev
```

Open your browser to `http://localhost:3000`. You will see your newly generated documentation site. Keep this server running in your terminal while you work.

## 3. Write Your Content

Open the `docs/` folder in your favorite code editor (like VS Code). 

`docmd` uses standard Markdown. Any `.md` file you create inside the `docs/` folder will automatically be converted into a web page. 

Try opening `docs/index.md` and changing the `# Welcome` text. When you save the file, your browser will instantly refresh to show the change.

::: callout tip Organizing Content
You can create subfolders inside `docs/` (e.g., `docs/api/endpoints.md`). `docmd` will automatically mirror this folder structure when generating your website's URLs.
:::

## 4. Configure the Sidebar

By default, `docmd` doesn't guess what your navigation should look like. You define it explicitly to maintain perfect control over your users' experience.

Open `docmd.config.js` and locate the `navigation` array. You can add new links, create dropdown categories, and assign SVG icons here.

```javascript
navigation:[
  { title: 'Home', path: '/', icon: 'home' },
  {
    title: 'Guides',
    icon: 'book',
    collapsible: true,
    children:[
      { title: 'Quick Start', path: '/quick-start' },
      { title: 'Advanced', path: '/advanced' }
    ]
  }
]
```

## 5. Build for Production

When you are ready to share your documentation with the world, stop the development server (press `Ctrl + C` in your terminal) and run the build command:

```bash
docmd build
```

`docmd` will process all your Markdown, generate an offline search index, minify your assets, and output a highly optimized static website into a new folder called `site/`.

You can now upload the contents of that `site/` folder to any web host (GitHub Pages, Netlify, Vercel, or a traditional server). See our [Deployment Guide](/deployment) for specific instructions.