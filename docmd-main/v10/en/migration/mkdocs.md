---
title: "Migrating from MkDocs"
description: "A comprehensive guide on moving your MkDocs (or Material for MkDocs) project to docmd."
---

MkDocs is a Python-based static site generator. `docmd` provides a fast, Markdown-first experience built on Node.js/Bun without complex Python virtual environments or extra pip dependencies.

::: steps

### 1. Run the Migration Engine

Run the following command at the root of your existing MkDocs project:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --mkdocs
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --mkdocs
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --mkdocs
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --mkdocs
```
:::

#### What Happens Automatically

::: steps

1. **Backup**: Your entire project directory (excluding `node_modules`, `.git`, `package.json`, and lockfiles) is backed up safely into a new `mkdocs-backup/` directory.
2. **Content Migration**: Your `docs/` folder is restored to the root directory for `docmd` to use.
3. **Config Generation**: A `docmd.config.json` is generated, extracting your `site_name` and `site_dir` from `mkdocs.yml`.
4. **Navigation Auto-Translation**: The top-level `nav:` block in `mkdocs.yml` is parsed and translated into `docmd`'s `navigation` array format (including nested `children`).

:::

### 2. Preview the Migration Output

Preview your content in `docmd` immediately:

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

### 3. Manual Configuration & Extension Mapping

MkDocs uses `mkdocs.yml` to define navigation structure and PyMdown extensions. Translate any custom setup to `docmd` containers.

#### Navigation Setup

Top-level `nav:` blocks in `mkdocs.yml` are translated to `docmd`'s `navigation` array automatically. If you require advanced navigation features (such as custom icons or external URLs), create a `navigation.json` in your `docs/` folder:

```yaml "mkdocs.yml"
nav:
  - Home: index.md
  - Guide:
    - Setup: setup.md
    - Usage: usage.md
```

```json "navigation.json"
[
  {
    "title": "Home",
    "path": "/"
  },
  {
    "title": "Guide",
    "collapsible": true,
    "children": [
      { "title": "Setup", "path": "/setup" },
      { "title": "Usage", "path": "/usage" }
    ]
  }
]
```

#### Replacing Python Markdown Extensions

Convert MkDocs PyMdown extension syntax to `docmd`'s native [Containers](../content/containers/callouts.md).

##### Converting Admonitions

MkDocs uses `!!!` block syntax, which requires conversion to `:::` format.

**MkDocs (PyMdown):**
```markdown
!!! note "Optional Title"
    This is an admonition content block.
```

**docmd:**
```markdown
::: callout info "Optional Title"
This is an admonition content block.
:::
```

##### Converting Tabs

**MkDocs (SuperFences):**
```markdown
=== "Tab 1"
    Content for tab 1.

=== "Tab 2"
    Content for tab 2.
```

**docmd:**
```markdown
::: tabs
== tab "Tab 1"
Content for tab 1.

== tab "Tab 2"
Content for tab 2.
:::
```

:::

## Next Steps

- `docmd` features built-in search. No extra search plugins or external indexers are required.
- Explore the [Theming options](../theming/customisation.md) to customise colours and branding to match your previous theme.