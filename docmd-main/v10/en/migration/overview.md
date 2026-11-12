---
title: "Migration Overview"
description: "Learn how to easily migrate your existing documentation project to docmd using the built-in migration CLI engine."
---

`docmd` provides an automated **migration engine** that transitions your documentation from legacy platforms with a single command. The engine eliminates manual file copying and directory restructuring.

## How It Works

::: steps

1. **Detect source configuration**: The engine identifies existing framework configuration files (e.g. `docusaurus.config.js`, `mkdocs.yml`, `.vitepress/config.js`, or `astro.config.mjs`).
2. **Extract metadata & project structure**: Core site properties such as `title`, output paths, and top-level navigation blocks are extracted automatically.
3. **Safeguard existing files**: Your original project directory (excluding `node_modules`, `.git`, `package.json`, and package manager lockfiles) is backed up safely into a `*-backup/` directory.
4. **Restore documentation content**: Markdown source content is extracted and moved into the standard `docmd` root `docs/` directory.
5. **Generate `docmd.config.json`**: A fresh `docmd.config.json` is generated with options extracted directly from your original configuration.

:::

::: callout tip "Dry Run Migration Preview" icon:help-circle
Append `--dry-run` to any migration command to preview planned file movements and generated configuration without writing changes to disk:
```bash
npx @docmd/core migrate --docusaurus --dry-run
```
:::

You can run `npx @docmd/core dev` immediately after migration to view your site.

## Feature Migration Support Matrix

| Feature | Automated Support | Details |
| :--- | :---: | :--- |
| **Markdown Files** | ✅ Yes | Moves all `.md` and `.mdx` content to `docs/` |
| **Directory Structure** | ✅ Yes | Preserves existing folder hierarchy |
| **Site Metadata** | ✅ Yes | Extracts site `title` and output directories |
| **Container Syntax** | ✅ Yes | Native support for VitePress and Docusaurus admonition containers |
| **Navigation / Sidebar** | ⚠️ Partial | Auto-translates MkDocs `nav:` blocks; other frameworks require `navigation.json` |
| **Localisation (i18n)** | ⚠️ Manual | Requires mapping directory locales in `docmd.config.json` |
| **Versioning** | ⚠️ Manual | Requires placing versioned content in `vXX/` subdirectories |
| **React / Vue Components** | ❌ Manual | Framework components must be replaced with native `docmd` containers |

::: callout success "Container Syntax Compatibility" icon:check-circle
Container syntax from **VitePress** (`:::tip`, `:::warning`, `:::danger`, `:::info`, `:::details`) and **Docusaurus** (`:::note`, `:::caution`) works out of the box. Existing admonitions render without manual editing.

**MkDocs** uses `!!!` syntax, which requires converting to standard `:::` format.
:::

## Navigation and Localisation Setup

Because each framework structures navigation sidebars, translations, and multi-versioning differently, `docmd` moves your raw content safely so you can configure navigation and i18n using `docmd`'s JSON schema:

- **Navigation:** Learn how to define sidebar links in the [Navigation Guide](../configuration/navigation.md).
- **Localisation:** Configure multi-language documentation in the [Localisation Guide](../configuration/localisation/index.md).
- **Versioning:** Structure versioned documentation in the [Versioning Setup](../configuration/versioning.md).

## Supported Migration Targets

::: grids
    ::: grid
        ::: card "Docusaurus" icon:arrow-right-left
        Migrate from Docusaurus v2/v3 React documentation sites.
        [Read Guide](./docusaurus.md)
        :::
    :::
    ::: grid
        ::: card "MkDocs" icon:arrow-right-left
        Migrate from MkDocs and Material for MkDocs Python projects.
        [Read Guide](./mkdocs.md)
        :::
    :::
    ::: grid
        ::: card "VitePress" icon:arrow-right-left
        Migrate from Vue-powered VitePress documentation setups.
        [Read Guide](./vitepress.md)
        :::
    :::
    ::: grid
        ::: card "Astro Starlight" icon:arrow-right-left
        Migrate from Astro Starlight framework projects.
        [Read Guide](./starlight.md)
        :::
    :::
:::
