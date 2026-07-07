---
title: "Migration Overview"
description: "Learn how to easily migrate your existing documentation to docmd."
---

# Migrating to docmd

docmd provides a fully automated **migration engine**. Transition from legacy platforms with a single command. The engine eliminates the tedious work of moving Markdown files and restructuring directories.

## How It Works

The migration command will:

1. **Detect** your existing configuration file (e.g., `docusaurus.config.js`, `mkdocs.yml`).
2. **Extract** core metadata like your site's `title`.
3. **Backup** your existing files and directories safely into a `*-backup/` directory.
4. **Copy** your Markdown content into the standard docmd `docs/` directory.
5. **Generate** a fresh `docmd.config.json` tailored for your content.

> **0.8.10 polish** — lockfiles (`package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lock*`) stay in place during the backup; Docusaurus `staticDir` and MkDocs `site_dir` are preserved; MkDocs `nav:` is auto-translated to docmd's `navigation` (with multi-level `children`); and `--dry-run` previews the migration without writing. See the [0.8.10 release notes](../release-notes/0-8-10.md).

You can then run `npx @docmd/core dev` immediately to see your content rendered.

## What is Migrated

| Feature | Migrated Automatically? |
| :--- | :--- |
| **Markdown Files** | ✅ Yes, all `.md` and `.mdx` files are moved to `docs/` |
| **Directory Structure** | ✅ Yes, your folder nesting is preserved |
| **Site Title** | ✅ Yes, extracted from your config |
| **Container Syntax** | ✅ Yes, VitePress/Docusaurus containers work without changes |
| **Navigation / Sidebar** | ⚠️ Mostly — MkDocs `nav:` is auto-translated since 0.8.10; other sources still need manual mapping |
| **Localisation (i18n)** | ⚠️ **No**, requires manual mapping |
| **Versioning** | ⚠️ **No**, requires manual mapping |
| **Custom React/Vue Components** | ❌ No, these must be replaced with docmd Containers |

::: callout success "Container Syntax Compatibility"
Container syntax from **VitePress** (`:::tip`, `:::warning`, `:::danger`, `:::info`, `:::details`) and **Docusaurus** (`:::note`, `:::caution`) works without modification. Your existing admonitions and collapsible sections render correctly in docmd.

**MkDocs** uses `!!!` syntax, which requires manual conversion to `:::` format.
:::

## Why Navigation and i18n Aren't Automatically Migrated

Every platform handles navigation sidebars, translations, and multi-versioning differently. For example, Docusaurus uses complex JavaScript objects. MkDocs relies on strictly indented YAML structures.

Rather than risking a broken migration by guessing complex configurations, docmd moves your content safely. You must configure navigation, localisation, and versioning natively using docmd's JSON-based APIs.

- **Navigation:** Learn how to create a `navigation.json` in the [Navigation Setup](../configuration/navigation.md).
- **Localisation:** See the [Localisation Guide](../configuration/localisation/index.md) for setting up multi-language docs.
- **Versioning:** Refer to the [Versioning Setup](../configuration/versioning.md).

## Supported Platforms

Select your current platform for specific migration instructions:

- [Migrating from Docusaurus](./docusaurus.md)
- [Migrating from MkDocs](./mkdocs.md)
- [Migrating from VitePress](./vitepress.md)
- [Migrating from Astro Starlight](./starlight.md)
