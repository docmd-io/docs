---
title: "Migrating from VitePress"
description: "A comprehensive guide on moving your VitePress project to docmd."
---

VitePress is a Vue-powered static site generator. `docmd` delivers matching runtime speed while shipping zero client-side JavaScript framework overhead, eliminating Vue hydration delays.

::: steps

### 1. Run the Migration Engine

Run the following command at the root of your existing VitePress project:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --vitepress
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --vitepress
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --vitepress
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --vitepress
```
:::

#### What Happens Automatically

::: steps

1. **Backup**: Your entire project directory (excluding `node_modules`, `.git`, `package.json`, and lockfiles) is backed up safely into a new `vitepress-backup/` directory.
2. **Content Migration**: Your `docs/` folder (or root Markdown files) is restored to the project root directory. The hidden `.vitepress` configuration directory is stripped to prevent conflicts.
3. **Config Generation**: A `docmd.config.json` is generated, extracting your site `title` from `.vitepress/config.js`, `ts`, or `mjs`.

:::

### 2. Preview the Migration Output

Preview your Markdown content in `docmd` immediately:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

### 3. Manual Configuration & Component Replacement

VitePress configures navigation inside JavaScript config modules and allows embedding Vue components. Translate these to `docmd` containers.

#### Navigation Setup

VitePress uses an array of objects in `themeConfig.sidebar`. Create a `navigation.json` inside your `docs/` directory:

**VitePress (`.vitepress/config.js`):**
```javascript
themeConfig: {
  sidebar: [
    {
      text: "Guide",
      items: [
        { text: "Introduction", link: "/introduction" },
        { text: "Getting Started", link: "/getting-started" }
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

#### Replacing Vue Components & Container Syntax

Because `docmd` does not execute client-side Vue, replace custom components with `docmd` [Containers](../content/containers/callouts.md).

VitePress admonition containers work **out of the box** without modification:
- `:::tip` → renders as `callout tip`
- `:::warning` → renders as `callout warning`
- `:::danger` → renders as `callout danger`
- `:::info` → renders as `callout info`
- `:::details` → renders as `collapsible`

::: callout success "Zero Changes Required" icon:check-circle
VitePress container syntax is natively supported. Existing admonition blocks and collapsible details sections render correctly without editing your Markdown files.
:::

:::

## Next Steps

- Explore `docmd`'s [Deployment Guide](../deployment/index.md) to set up GitHub Actions, Vercel, Netlify, or Docker builds.
- Review the full set of visual [Containers](../content/containers/index.md).