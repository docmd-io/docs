---
title: "Linking & Referencing"
description: "Master internal cross-linking, external resources, and reliable asset referencing with docmd's automatic URL normalisation."
---

`docmd` provides a robust, filesystem-aware linking system. Write links to your source `.md` files naturally — using any format you prefer — and the engine will automatically normalise them into clean, SEO-optimised URLs for production.

::: callout info "Write Naturally, Ship Perfectly"
You do not need to follow any special linking conventions. Whether you write `overview.md`, `overview/`, or just `overview`, the build engine produces the same clean, trailing-slash URL. Every internal link is automatically normalised at build time so you can focus on content, not URL formatting.
:::

## How URL Normalisation Works

During the build process, the engine applies a consistent set of rules to every internal link — in Markdown text, button containers, tags, and navigation configuration alike:

| What You Write | What Gets Rendered | Why |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | `.md` extension stripped, trailing `/` added |
| `overview` | `overview/` | Trailing `/` added automatically |
| `overview/` | `overview/` | Already correct — no change |
| `api/commands.md` | `api/commands/` | Subdirectory link normalised |
| `localisation/index.md` | `localisation/` | `index` stripped — folder is the canonical URL |
| `../index.md` | `../` | Parent directory index resolved cleanly |
| `overview.md#settings` | `overview/#settings` | Hash fragment preserved through normalisation |
| `./guide.md` | `./guide/` | Relative prefix preserved |
| `https://example.com` | `https://example.com` | External links pass through untouched |

::: callout tip "SEO Best Practice"
All internal pages are served as directory-style URLs ending with a trailing slash (e.g., `/configuration/overview/`). This is the industry standard for static sites, prevents 301 redirect chains, and ensures consistent canonical URLs for search engine indexing.
:::

## Internal Link Resolution

Link to other pages in your documentation using relative paths to the source `.md` files. The engine resolves them correctly regardless of directory depth.

| Targeting Strategy | Markdown Syntax |
| :--- | :--- |
| **Sibling Page** | `[System Overview](overview.md)` |
| **Subdirectory** | `[API Reference](api/node-api.md)` |
| **Subdirectory Index** | `[Localisation](localisation/index.md)` |
| **Parent Directory** | `[Back to Home](../index.md)` |

## Section Anchors (Deep Linking)

Navigate directly to specific headings using standard URL hash fragments.

*   **Intra-page Anchor**: `[Jump to Roadmap](#project-roadmap)`
*   **Cross-page Anchor**: `[Review CLI Flags](../cli-commands.md#available-flags)`

Hash fragments are preserved through the normalisation process. The link above renders as `../cli-commands/#available-flags` in production.

## Opening Links in a New Tab

Use the `external:` prefix on any link to force it to open in a new tab. This works universally — in standard Markdown links, button containers, tags, and anywhere else you can write a URL.

```markdown
<!-- Standard Markdown (auto-external)-->
[Open Externally](https://github.com/docmd-io/docmd)

<!-- Special prefix for internal links to open in a new tab -->
[Open in New Tab](external:./configuration/overview.md)
```

Links starting with `https://` or `http://` are automatically detected as external and open in a new tab without needing the `external:` prefix.

The `external:` prefix is **stripped** from the rendered URL — it is purely a build-time signal.

## Linking to Raw Files

By default, the engine strips `.md` extensions and normalises paths. If you genuinely need to link to a raw `.md` file (for example, a downloadable source file), use the `raw:` prefix:

```markdown
[View Raw Source](raw:docs/readme.md)
```

The `raw:` prefix bypasses all normalisation — the extension and path are preserved exactly as written. Like `external:`, the prefix itself is stripped from the rendered URL.

## Button Containers

The `::: button` container supports the same linking conventions as standard Markdown links — including `external:` and `raw:` prefixes:

```markdown
::: button "Get Started" ./getting-started/quick-start.md icon:rocket

::: button "View on GitHub" https://github.com/docmd-io/docmd icon:github

::: button "Download Source" raw:docs/readme.md icon:download
```

## Tag Links

Tags with `link:` values also benefit from the unified normaliser:

```markdown
::: tag "v0.7.6" link:release-notes/0-7-6.md icon:tag color:#22c55e

::: tag "GitHub" link:https://github.com/docmd-io/docmd icon:github

::: tag "Open Externally" link:external:./configuration/overview.md icon:external-link
```

## Navigation Configuration

Paths defined in `navigation.json` and `docmd.config.js` are also normalised at build time. You can write them in any format:

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

All three entries above produce the same canonical URL: `/configuration/overview/`.

For navigation items that should open in a new tab, use the `external` flag:

```json "navigation.json"
[
  {
    "title": "GitHub",
    "path": "https://github.com/docmd-io/docmd",
    "external": true
  }
]
```

::: callout warning "Index Pages in Navigation"
When linking to a directory's index page, use the folder path rather than explicitly referencing `index.md`. Both work identically, but the folder path is cleaner:

```markdown
<!-- Preferred -->
[Localisation](localisation/)

<!-- Also works (auto-normalised) -->
[Localisation](localisation/index.md)
```
:::

## Protocols & External Resources

The engine respects standard browser protocols for external resources. These links are never modified but are automatically detected as external (opening in a new tab).

*   **Global HTTPS**: `[docmd Homepage](https://docmd.io)`
*   **Mail Protocol**: `[Support Channel](mailto:help@docmd.io)` — not opened in a new tab
*   **Asset Protocol**: `[Download CLI Binary](/assets/bin/docmd-mac.zip)` — not normalised

## Static Asset Referencing

To provide downloads or reference raw source files, place them within the `assets/` directory of your project. The `docmd` builder ensures these files are moved to the production root without path modifications.

```markdown
[Download Documentation PDF](/assets/pdf/handbook.pdf)
[View Raw Global Config](/assets/config/docmd.config.js)
```

::: callout tip "Semantic Linkage for AI"
When cross-linking technical modules, prioritise **Descriptive Anchors** (e.g., `[Optimise PWA caching](../plugins/pwa.md)`) over generic text (e.g., `[Read more](../plugins/pwa.md)`). Detailed link labels provide AI agents with a high-fidelity map of the semantic relationships between different documentation nodes in the `llms-full.txt` context.
:::