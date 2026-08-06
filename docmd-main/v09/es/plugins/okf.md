---
title: "OKF Bundle Plugin"
description: "Generate Open Knowledge Format (OKF) knowledge bundles and interactive concept graphs for AI agents."
---

The `@docmd/plugin-okf` plugin builds an **[Open Knowledge Format][okf-spec]** (OKF) knowledge bundle during static compilation. OKF is an open, vendor-neutral specification for structuring documentation metadata, concept graphs, and domain context for AI agents and LLM tool chains.

The plugin is **enabled by default**. OKF bundles are placed in `site/okf/` during every site compilation.

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Architectural Overview

OKF formalises knowledge architecture into a portable directory structure containing YAML manifests, Markdown concept files, and visual force-directed graph assets.

### Design Principles

1. **Minimal Structural Requirements**: Every concept entry requires only a `type` field.
2. **Producer/Consumer Independence**: Human-authored Markdown files compile into standard schemas queryable by arbitrary LLM frameworks.
3. **Vendor Neutrality**: Independent of specific cloud providers, model hosts, or vector database engines.

## Generated Output Assets

Compilation produces the following directory tree:

```text
site/okf/
├── okf.yaml              ← Manifest summary file
├── index.md              ← Concept catalog grouped by type
├── graph/                ← Interactive graph assets (when graph: true)
│   ├── index.html        ← Force-directed graph visualiser
│   ├── graph.json        ← Graph nodes and edges
│   ├── graph.js          ← Standalone graph runtime
│   └── graph.css         ← Theme-aware styling
├── concepts/
│   └── <slug>.md         ← Individual concept Markdown files
└── _meta/
    ├── bundle.json       ← JSON mirror of okf.yaml
    └── lint-report.txt   ← Build linting reports
```

## Default Build Behaviour

The OKF plugin is loaded automatically during compilation:

* **Default-Locale Scope**: Emits concepts for the primary language at the bundle root.
* **Automatic Type Inference**: Classifies paths under `/api/`, `/guides/`, `/reference/`, `/concepts/`, `/runbooks/`, `/datasets/`, `/metrics/`, and `/tables/` into typed concepts.
* **Verbatim Markdown**: Copies page content and frontmatter into concept files.

### Opting Out

Disable OKF bundle generation in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "okf": false
  }
}
```

Alternatively, set `enabled: false`:

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "enabled": false
    }
  }
}
```

## Configuration Options

Configure OKF bundle parameters in `docmd.config.json`:

| Option | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable OKF bundle compilation. |
| `outputDir` | `string` | `'okf'` | Destination output directory relative to site root. |
| `bundleName` | `string` | `config.title` | Bundle identifier used inside `okf.yaml` and graph headers. |
| `defaultType` | `string` | `'concept'` | Fallback concept type for untagged pages. |
| `typeField` | `string` | `'type'` | Frontmatter key used for type classification. |
| `warnOnMissingType` | `boolean` | `true` | Emit CLI warnings for pages using `defaultType`. |
| `includeFullMarkdown` | `boolean` | `true` | Copy full Markdown body into concept files. |
| `graph` | `boolean` | `false` | Generate interactive force-directed graph visualiser under `graph/`. |
| `localeStrategy` | `'default-only' \| 'folders'` | `'default-only'` | Strategy for multi-language bundle compilation. |

### Global Configuration Example

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "outputDir": "knowledge",
      "defaultType": "concept",
      "graph": true
    }
  }
}
```

### Multi-Locale Folder Strategy

```json "docmd.config.json"
{
  "plugins": {
    "okf": {
      "localeStrategy": "folders"
    }
  }
}
```

Output directory structure:

```text
site/okf/                    ← Default locale (root)
├── okf.yaml
├── index.md
└── concepts/

site/okf/de/                 ← German locale (nested)
├── okf.yaml
└── concepts/
```

## Excluding Pages from OKF

Exclude specific pages using frontmatter flags:

```yaml
---
title: "Internal Operations Note"
okf: false # Excludes page exclusively from OKF bundles
---
```

To exclude a page globally across sitemaps, search, LLM files, and OKF, set `noindex: true`.

## Concept Type Resolution

The plugin determines concept types using top-down precedence:

1. `frontmatter.okf.type` — Nested explicit declaration.
2. `frontmatter.type` — Top-level explicit declaration.
3. `frontmatter.okfType` — Legacy alias.
4. **Path-prefix inference**: Automatic mapping for `/guides/`, `/api/`, `/reference/`, `/concepts/`, etc.
5. `defaultType` fallback (`'concept'`).

::: callout tip "Knowledge Graph Visualisation" icon:git-fork
Enable `graph: true` in your OKF plugin configuration to produce interactive force-directed graph visualisations (`site/okf/graph/index.html`) mapping cross-references and concept relationships.
:::