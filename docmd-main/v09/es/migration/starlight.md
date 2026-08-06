---
title: "Migrating from Astro Starlight"
description: "A comprehensive guide on moving your Astro Starlight project to docmd."
---

Starlight is a documentation theme built on Astro. `docmd` delivers a similar zero-JavaScript-by-default experience without requiring full web framework configurations or complex Astro integrations.

::: steps

### 1. Run the Migration Engine

Run the following command at the root of your existing Starlight project:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --starlight
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --starlight
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --starlight
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --starlight
```
:::

#### What Happens Automatically

::: steps

1. **Backup**: Your entire project directory (excluding `node_modules`, `.git`, `package.json`, and lockfiles) is backed up safely into a new `starlight-backup/` directory.
2. **Content Migration**: Starlight stores documentation in `src/content/docs/`. The migration engine extracts this folder and moves its contents to the root `docs/` folder.
3. **Config Generation**: A `docmd.config.json` is generated, extracting your site `title` from the Starlight integration inside `astro.config.mjs` or `astro.config.ts`.

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

#### Navigation Setup

Starlight defines navigation sidebars in `astro.config.mjs` via the `sidebar` array. Create a `navigation.json` inside your `docs/` directory:

**Starlight (`astro.config.mjs`):**
```javascript
sidebar: [
  {
    label: "Guides",
    items: [
      { label: "Setup", link: "/guides/setup/" }
    ]
  }
]
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guides",
    "collapsible": true,
    "children": [
      { "title": "Setup", "path": "/guides/setup" }
    ]
  }
]
```

#### Replacing Astro Components (MDX / Markdoc)

Starlight uses Astro components embedded via MDX or Markdoc. Replace these with native `docmd` [Containers](../content/containers/callouts.md).

##### Converting Tab Components

**Starlight:**
```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="Stars">Sirius, Vega, Betelgeuse</TabItem>
  <TabItem label="Moons">Io, Europa, Ganymede</TabItem>
</Tabs>
```

**docmd:**
```markdown
::: tabs
== tab "Stars" icon:sparkles
Sirius, Vega, Betelgeuse

== tab "Moons" icon:moon
Io, Europa, Ganymede
:::
```

##### Converting Asides (Admonitions)

**Starlight:**
```mdx
:::note[Optional Title]
Some note content.
:::
```

**docmd:**
```markdown
::: callout info "Optional Title"
Some note content.
:::
```

#### Frontmatter Mapping

Starlight enforces strict frontmatter typing via Astro content collections. If you used `hero` or `banner` frontmatter properties for landing pages, replace them with `docmd`'s native [Hero Sections](../content/containers/hero.md) written directly in the Markdown body.

:::

## Next Steps

- Explore `docmd`'s built-in [Search plugin](../plugins/search.md). While Starlight relies on Pagefind integration, `docmd` includes a fast, zero-config local search indexer out of the box.