---
title: "Linking & Referencing"
description: "Master internal cross-linking, URL normalisation, external new-tab triggers, and static asset references in docmd."
---

`docmd` provides a filesystem-aware linking system. Write links referencing source `.md` files naturally—the compiler normalises target paths into clean, canonical URLs automatically.

::: callout info "Automatic Path Normalisation" icon:info
Write target paths using `.md` extensions, trailing slashes, or direct filenames (`overview.md`, `overview/`, or `overview`). The build compiler resolves them to identical canonical URLs.
:::

## URL Normalisation Mechanics

During build compilation, `docmd` normalises internal link targets automatically across Markdown prose, button containers, tags, and navigation trees:

| Input Path | Compiled Output URL | Resolution Rule |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | Strips `.md` extension, appends trailing `/`. |
| `overview` | `overview/` | Appends trailing `/` automatically. |
| `overview/` | `overview/` | Retains existing canonical format. |
| `api/commands.md` | `api/commands/` | Normalises subdirectory route. |
| `localisation/index.md` | `localisation/` | Strips `index`, resolves directory root. |
| `../index.md` | `../` | Resolves parent directory root. |
| `overview.md#settings` | `overview/#settings` | Preserves URL hash fragment. |
| `https://example.com` | `https://example.com` | Retains external URL untouched. |

## Internal Document Links

Reference internal documents using relative filesystem paths:

| Link Target | Syntax Example |
| :--- | :--- |
| **Sibling Page** | `[System Overview](overview.md)` |
| **Subdirectory Page** | `[API Reference](api/node-api.md)` |
| **Directory Index** | `[Localisation](localisation/index.md)` |
| **Parent Directory** | `[Back to Home](../index.md)` |

## Section Anchor Links

Navigate to specific document headings using URL hash fragments:

```markdown
<!-- Intra-page section anchor -->
[Jump to Roadmap](#project-roadmap)

<!-- Cross-page section anchor -->
[Review CLI Flags](../api/cli-commands.md#available-flags)
```

Hash fragments are preserved through URL normalisation. The cross-page link above compiles to `../api/cli-commands/#available-flags`.

## Opening External Links in New Tabs

Prepend `external:` to any URL target to force the link to open in a new browser tab (`target="_blank"`):

```markdown
[Open in New Tab](external:./configuration/overview.md)
[GitHub Repository](external:https://github.com/docmd-io/docmd)
```

The `external:` prefix string is stripped from rendered HTML href attributes.

## Direct Unprocessed Asset Links (`raw:`)

Use the `raw:` prefix to bypass URL normalisation and target static downloadable files directly:

```markdown
[Download Raw Source](raw:docs/readme.md)
```

## Rich Containers & Interactive Elements

Button (`::: button`) and Tag (`::: tag`) containers support all linking prefixes, including `external:` and `raw:` modifiers:

```markdown
::: button "Quick Start Guide" ./getting-started/quick-start.md icon:rocket
::: button "GitHub Repository" external:https://github.com/docmd-io/docmd icon:github
::: button "Download Manifest" raw:docs/manifest.json icon:download

::: tag "v0.9.0 Release" link:release-notes/0-9-0.md icon:tag color:#22c55e
::: tag "External Site" link:external:https://docmd.io icon:external-link
:::
```

## Navigation Configuration Links

Route entries in `navigation.json` and `docmd.config.json` are normalised automatically during build compilation:

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

To force a navigation item to open in a new tab, set `"external": true`:

```json "navigation.json"
[
  {
    "title": "GitHub",
    "path": "https://github.com/docmd-io/docmd",
    "external": true
  }
]
```

::: callout tip "Linking to Category Directories" icon:lightbulb
When linking to a subdirectory's index page, reference the folder path directly (`localisation/`) rather than appending `index.md`.
:::

## Protocols & Asset Paths

The compiler preserves standard network protocols and static asset paths:

- **HTTPS Protocols**: `[docmd Homepage](https://docmd.io)` (opens in same tab unless `external:` is prefixed).
- **Mail Protocols**: `[Support Desk](mailto:help@docmd.io)` (triggers email client).
- **Static Assets**: `[Download Asset](/assets/bin/docmd-mac.zip)` (bypasses URL normalisation).

::: callout tip "Descriptive Anchors for AI Context" icon:sparkles
Use **descriptive anchor text** (`[Configure PWA caching](../plugins/pwa.md)`) instead of generic labels (`[Read more](../plugins/pwa.md)`). Explicit link text improves semantic understanding for search indexers and AI agents.
:::