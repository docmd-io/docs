---
title: "LLM Context Plugin"
description: "Optimise documentation for AI agents and LLM ingestion via automated llms.txt and llms-full.txt generation."
---

The `@docmd/plugin-llms` plugin implements the `llms.txt` standard to generate machine-readable context files during build compilation. AI tools, IDE extensions (such as Cursor and Copilot), and autonomous agents ingest these generated files to build high-precision context models of your site.

The plugin is **enabled by default**. Set the [`url`](../configuration/overview.md) property in `docmd.config.json` to ensure absolute URLs are emitted.

## Generated Output Assets

During site compilation, three files are placed at the build output root:

* `llms.txt` — Structured overview listing page titles, descriptions, and canonical URLs.
* `llms-full.txt` — Complete documentation context with raw Markdown bodies appended to each entry.
* `llms.json` — Machine-readable JSON manifest containing typed metadata (title, URL, description, priority).

Discovery `<link>` tags are automatically injected into page `<head>` headers.

## Configuration Options

Configure LLM context parameters in `docmd.config.json`:

| Option | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable LLM context file generation. |
| `fullContext` | `boolean` | `true` | Generate `llms-full.txt` containing full Markdown bodies. |
| `maxTokenLimit` | `number` | `null` | Optional character/token ceiling for context bundle outputs. |
| `i18n` | `boolean` | `false` | Write per-locale files (`llms.<locale>.txt`) alongside the default set. |

### Global Configuration Example

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "llms": {
      "fullContext": true,
      "i18n": false
    }
  }
}
```

## Default Locale Behaviour

By default, the plugin generates unsuffixed files (`llms.txt`, `llms-full.txt`, `llms.json`) for the **default locale**. This maintains compatibility with AI tools expecting standard root filenames.

For single-locale sites, a single set of root files is produced. For multi-locale sites, default-locale content is served at the unsuffixed root paths.

## Multi-Locale Context Bundles

To generate dedicated context files for secondary languages, set `i18n: true`:

```json "docmd.config.json"
{
  "plugins": {
    "llms": {
      "i18n": true
    }
  }
}
```

When enabled, the build output includes:

```text
site/llms.txt          ← Default locale (unsuffixed)
site/llms-full.txt     ← Default locale (unsuffixed)
site/llms.json         ← Default locale (unsuffixed)
site/llms.de.txt       ← German locale (suffixed)
site/llms-full.de.txt  ← German locale (suffixed)
site/llms.zh.txt       ← Chinese locale (suffixed)
site/llms-full.zh.txt  ← Chinese locale (suffixed)
```

The default locale retains unsuffixed paths so external integrations continue functioning seamlessly.

## Security & Sanitisation

All user-controlled strings (titles and descriptions) undergo strict sanitisation prior to bundle output:

* **Link Integrity**: Markdown control characters (`` ` ``, `[`, `]`, newlines) in page titles are escaped to prevent broken `[title]\(target-path\)` syntax.
* **CSV/Spreadsheet Injection Defense**: Strings starting with `=`, `+`, `-`, or `@` are prepended with a single quote (`'`) to neutralize cell formula execution.

## Excluding Content Pages

To exclude internal notes, draft pages, or security-sensitive documents from AI context files, set `llms: false` in [Page Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Internal Release Checklist"
llms: false # Excludes page from llms.txt and llms-full.txt
---
```

Excluded pages remain visible in standard HTML output and local site search.

::: callout tip "Structured Knowledge Graphs" icon:cpu
For deeply structured AI context graph bundles (including typed concept graphs and node visualisations), pair this plugin with the [OKF Bundle Plugin](./okf.md).
:::