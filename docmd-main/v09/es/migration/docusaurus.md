---
title: "Migrating from Docusaurus"
description: "A comprehensive guide on moving your Docusaurus v2/v3 project to docmd."
---

Docusaurus is a React-based documentation framework. `docmd` provides a fast, zero-config alternative that compiles significantly faster and does not require React components to render rich documentation features.

### 1. Run the Migration Engine

Run the following command at the root of your existing Docusaurus project:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --docusaurus
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --docusaurus
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --docusaurus
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --docusaurus
```
:::

#### What Happens Automatically

::: steps

1. **Backup**: Your entire project directory (excluding `node_modules`, `.git`, `package.json`, and lockfiles) is backed up safely into a new `docusaurus-backup/` directory.
2. **Content Migration**: Your `docs/` folder is restored to the project root directory.
3. **Frontmatter Translation**: Docusaurus `sidebar_label` frontmatter tags are automatically translated to `docmd`'s `nav_title`, and legacy `id` tags are safely stripped.
4. **Config Generation**: A `docmd.config.json` is generated, extracting your site `title` and static directory options from `docusaurus.config.js` or `docusaurus.config.ts`.

:::

### 2. Preview the Migration Output

Preview your Markdown content immediately in `docmd`:

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

Docusaurus uses programmatic JavaScript configurations and React components that must be mapped to native Markdown and `docmd` containers.

#### Navigation Setup

Docusaurus sidebars are often auto-generated or declared in `sidebars.js`. Create a `navigation.json` inside your `docs/` directory to define explicit sidebar navigation. See the [Navigation Guide](../configuration/navigation.md).

#### Replacing MDX & React Components

Convert custom `<MyReactComponent />` tags into standard Markdown or use `docmd`'s native [Containers](../content/containers/callouts.md).

##### Admonition Container Aliases

Docusaurus admonitions work **out of the box** without file modifications:
- `:::note` → renders as `callout info`
- `:::tip` → renders as `callout tip`
- `:::info` → renders as `callout info`
- `:::caution` → renders as `callout warning`
- `:::danger` → renders as `callout danger`

::: callout tip "Native Container Syntax" icon:sparkles
For enhanced features (such as custom icons or custom badge colors), convert Docusaurus admonitions to native `docmd` syntax:
```markdown
::: callout tip "Custom Title" icon:sparkles
This is a tip container.
:::
```
:::

##### Tabbed Code Blocks

**Docusaurus (React MDX):**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    Apple content.
  </TabItem>
  <TabItem value="orange" label="Orange">
    Orange content.
  </TabItem>
</Tabs>
```

**docmd (Native Container):**
```markdown
::: tabs
== tab "Apple" icon:apple
Apple content.

== tab "Orange" icon:citrus
Orange content.
:::
```

#### Localisation (i18n)

If you used Docusaurus's `i18n` features, move translated files from `i18n/<locale>/docusaurus-plugin-content-docs/current/` into `docmd`'s locale directories (`docs/en/`, `docs/de/`, `docs/zh/`, etc.) and define locale codes in `docmd.config.json`. See the [Localisation Guide](../configuration/localisation/index.md).

## Next Steps

- Customise site appearance in the [Layout & UI Guide](../configuration/layout-ui.md).
- Replace custom React hero landing pages with native [Hero Containers](../content/containers/hero.md).