---
title: "Migrating from Astro Starlight"
description: "A comprehensive guide on moving your Astro Starlight project to docmd."
---

# Migrating from Astro Starlight to docmd

Starlight is an excellent documentation theme built on the Astro framework. `docmd` provides a similar zero-JavaScript-by-default experience, but eliminates the need to configure a full web framework (Astro), dramatically reducing the learning curve for technical writers.

## Step 1: Run the Migration Engine

Run the following command at the root of your existing Starlight project (where your `astro.config.mjs` is located):

```bash
npx @docmd/core migrate --starlight
```

### What Happens Automatically

1.  **Backup**: Your entire project is safely moved into a new `starlight-backup/` directory.
2.  **Content Migration**: Starlight keeps documentation in `src/content/docs/`. The migration engine automatically extracts this specific directory and moves its contents to the root `docs/` folder for `docmd` to use.
3.  **Config Generation**: A `docmd.config.js` is generated, extracting your site `title` from the Starlight integration inside `astro.config.mjs`.

## Step 2: Test the Setup

Once the command finishes, preview your content in `docmd`:

```bash
npx @docmd/core dev
```

Your Markdown files will compile, but your navigation sidebar will be empty.

## Step 3: Manual Configuration

### 1. Navigation Setup

Starlight defines navigation in `astro.config.mjs` via the `sidebar` array.

**Action required:** You must create a `navigation.json` inside your new `docs/` folder.

**Starlight (`astro.config.mjs`):**
```js
sidebar: [
  {
    label: 'Guides',
    items: [
      { label: 'Setup', link: '/guides/setup/' }
    ],
  },
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

### 2. Replacing Astro Components (MDX/Markdoc)

Starlight uses Astro components (`<Tabs>`, `<Card>`, etc.) embedded via MDX or Markdoc. Because `docmd` relies on pure Markdown syntax instead of UI components, these must be converted.

**Action required:** Replace Astro components with `docmd` [Containers](/content/containers/callouts).

#### Example: Converting Tabs

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
== tab "Stars"
Sirius, Vega, Betelgeuse

== tab "Moons"
Io, Europa, Ganymede
:::
```

#### Example: Converting Asides (Admonitions)

**Starlight:**
```mdx
:::note[Optional Title]
Some note content.
:::
```

**docmd:**
```markdown
::: note "Optional Title"
Some note content.
:::
```

### 3. Frontmatter Mapping

Starlight has strict frontmatter typing via Astro content collections. `docmd` frontmatter is simpler.
If you used `hero` or `banner` frontmatter properties in Starlight for landing pages, you will need to replace them with `docmd`'s [Hero Sections](/content/containers/hero) written directly in the Markdown body.

## Next Steps

- Explore `docmd`'s built-in [Search plugin](/plugins/search) (Starlight uses Pagefind, while `docmd` ships with a highly optimized local search indexer natively).
