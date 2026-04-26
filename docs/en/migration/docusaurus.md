---
title: "Migrating from Docusaurus"
description: "A comprehensive guide on moving your Docusaurus v2/v3 project to docmd."
---

# Migrating from Docusaurus to docmd

Docusaurus is a popular documentation framework built on React. `docmd` provides a fast, zero-config alternative that compiles significantly faster and doesn't require React components to render rich features.

## Step 1: Run the Migration Engine

Run the following command at the root of your existing Docusaurus project (where your `docusaurus.config.js` or `docusaurus.config.ts` is located):

```bash
npx @docmd/core migrate --docusaurus
```

### What Happens Automatically

1.  **Backup**: Your entire project (excluding `node_modules` and `.git`) is safely moved into a new `docusaurus-backup/` directory.
2.  **Content Migration**: Your `docs/` folder is restored to the root directory for `docmd` to use.
3.  **Config Generation**: A `docmd.config.js` is generated, extracting your site `title` from your Docusaurus configuration.

## Step 2: Test the Setup

Once the command finishes, you can immediately preview your Markdown content in `docmd`:

```bash
npx @docmd/core dev
```

Your Markdown files will compile, but your navigation sidebar will be empty.

## Step 3: Manual Configuration

Docusaurus has complex programmatic configurations that `docmd` does not try to guess. You will need to map these manually.

### 1. Navigation Setup

Docusaurus sidebars are often auto-generated or configured in `sidebars.js`.

**Action required:** Create a `navigation.json` inside your new `docs/` directory to structure your `docmd` sidebar. See the [Navigation Guide](../configuration/navigation.md).

### 2. Replacing MDX Components

Docusaurus relies heavily on MDX (`.mdx`) to render custom React components (like Tabs, Admonitions, or custom UI elements). `docmd` is purely Markdown-driven and does not use React.

**Action required:** You must convert any custom `<MyReactComponent />` tags into standard Markdown or use `docmd`'s native [Containers](../content/containers/callouts.md).

#### Example: Converting Admonitions

**Docusaurus:**
```markdown
:::tip My Tip
This is a helpful tip.
:::
```

**docmd:** (No change needed! `docmd` natively supports Docusaurus-style admonitions as Callouts).
```markdown
::: tip "My Tip"
This is a helpful tip.
:::
```

#### Example: Converting Tabs

**Docusaurus:**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple.
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange.
  </TabItem>
</Tabs>
```

**docmd:** (Convert to the native `docmd` tabs container syntax)
```markdown
::: tabs
== tab "Apple"
This is an apple.

== tab "Orange"
This is an orange.
:::
```

### 3. Localisation (i18n)

If you used Docusaurus's `i18n` features, your translated files were likely in `i18n/locale/docusaurus-plugin-content-docs/current/`.

**Action required:** Move these files into `docmd`'s directory structure (`docs/en/`, `docs/es/`, etc.) and configure the locales in `docmd.config.js`. See the [Localisation Guide](../configuration/localisation/index.md).

## Next Steps

- Explore the [Layout & UI](../configuration/layout-ui.md) settings to match your Docusaurus theme.
- Convert React-based hero headers into `docmd` [Hero Containers](../content/containers/hero.md).
