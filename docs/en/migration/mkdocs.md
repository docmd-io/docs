---
title: "Migrating from MkDocs"
description: "A comprehensive guide on moving your MkDocs (or Material for MkDocs) project to docmd."
---

# Migrating from MkDocs to docmd

MkDocs, particularly with the Material theme, is a popular Python-based documentation generator. `docmd` provides a similar Markdown-first experience, but relies on Node.js/Bun for incredibly fast builds and rich interactive features without the need for complex Python extensions.

## Step 1: Run the Migration Engine

Run the following command at the root of your existing MkDocs project (where your `mkdocs.yml` is located):

```bash
npx @docmd/core migrate --mkdocs
```

### What Happens Automatically

1.  **Backup**: Your entire project is safely moved into a new `mkdocs-backup/` directory.
2.  **Content Migration**: Your `docs/` folder is restored to the root directory for `docmd` to use.
3.  **Config Generation**: A `docmd.config.js` is generated, extracting your site `site_name` from your `mkdocs.yml`.

## Step 2: Test the Setup

Once the command finishes, preview your content in `docmd`:

```bash
npx @docmd/core dev
```

Your Markdown files will compile, but your navigation sidebar will be empty.

## Step 3: Manual Configuration

MkDocs uses `mkdocs.yml` to define site navigation and extensions. You'll need to translate this setup to `docmd`.

### 1. Navigation Setup

In MkDocs, navigation is strictly defined in the `nav` key of `mkdocs.yml`.

**Action required:** You must create a `navigation.json` inside your `docs/` folder.

**MkDocs (`mkdocs.yml`):**
```yaml
nav:
  - Home: index.md
  - Guide:
    - Setup: setup.md
    - Usage: usage.md
```

**docmd (`navigation.json`):**
```json
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

### 2. Replacing Python Markdown Extensions

If you used "Material for MkDocs", you likely relied on Python Markdown extensions like PyMdown Extensions for tabs, admonitions, or task lists.

**Action required:** Convert MkDocs-specific extension syntax to `docmd`'s native [Containers](/content/containers/callouts).

#### Example: Converting Admonitions

**MkDocs (PyMdown):**
```markdown
!!! note "Optional Title"
    This is an admonition content block.
```

**docmd:**
```markdown
::: note "Optional Title"
This is an admonition content block.
:::
```

#### Example: Converting Tabs

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

## Next Steps

- `docmd` has native search. You do not need to configure a search plugin.
- Explore the [Theming options](/theming/customization) to customize your site's colors to match your old Material theme.
