---
title: "Migrating from VitePress"
description: "A comprehensive guide on moving your VitePress project to docmd."
---

# Migrating from VitePress to docmd

VitePress is a fast Vue-powered SSG framework. docmd is equally fast, but it ships zero JavaScript framework logic to the client. This eliminates Vue hydration overhead.

## Step 1: Run the Migration Engine

Run the following command at the root of your existing VitePress project:

```bash
npx @docmd/core migrate --vitepress
```

### What Happens Automatically

1.  **Backup**: Your entire project is safely moved into a new `vitepress-backup/` directory.
2.  **Content Migration**: Your `docs/` folder is restored to the root directory for docmd to use. The `.vitepress` hidden configuration folder is completely stripped to prevent conflicts.
3.  **Config Generation**: A `docmd.config.json` is generated, extracting your site `title` from `.vitepress/config.js` or `.ts`.

## Step 2: Test the Setup

Once the command finishes, preview your content in docmd:

```bash
npx @docmd/core dev
```

Your Markdown files will compile, but your navigation sidebar will be empty.

## Step 3: Manual Configuration

VitePress configures navigation in its config file and uses Vue components inside Markdown. You must translate these to docmd.

### 1. Navigation Setup

VitePress uses an array of objects in `themeConfig.sidebar`.

**Action required:** Create a `navigation.json` inside your `docs/` directory.

**VitePress (`.vitepress/config.js`):**
```javascript
themeConfig: {
  "sidebar": [
    {
      "text": "Guide",
      "items": [
        { "text": "Introduction", "link": "/introduction" },
        { "text": "Getting Started", "link": "/getting-started" }
      ]
    }
  ]
}
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guide",
    "collapsible": true,
    "children": [
      { "title": "Introduction", "path": "/introduction" },
      { "title": "Getting Started", "path": "/getting-started" }
    ]
  }
]
```

### 2. Replacing Vue Components

VitePress allows authors to embed Vue components directly in Markdown files. Because docmd does not run Vue on the client, you must remove custom components or replace them with native Markdown.

**Action required:** Replace Vue-specific UI components with docmd [Containers](../content/containers/callouts.md).

#### Example: Admonitions (Custom Containers)

VitePress uses a markdown-it custom block syntax that looks similar to docmd.

**VitePress:**
```markdown
::: info
This is an info box.
:::
```

**docmd:**
```markdown
::: info
This is an info box.
:::
```

::: callout success "Zero Changes Required"
VitePress container syntax works **without any modification**. The following aliases are fully supported:
- `:::tip` → renders as `callout tip`
- `:::warning` → renders as `callout warning`
- `:::danger` → renders as `callout danger`
- `:::info` → renders as `callout info`
- `:::details` → renders as `collapsible`

Spaceless syntax is also supported. Your existing VitePress content will render correctly in docmd without changes.
:::

## Next Steps

- Explore docmd's [Build & Deploy](../deployment/index.md) guide. docmd does not rely on Vite's build pipeline.
- Review the full list of [docmd Containers](../content/containers/index.md) for additional UI components.
