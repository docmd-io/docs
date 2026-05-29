---
title: "Linking & Referencing"
description: "Master internal cross-linking, external resources, new-tab behaviour, and static asset referencing."
---

docmd provides a reliable, filesystem-aware linking system. Write links to your source `.md` files naturally in any format - the engine normalises them into clean, SEO-optimised URLs automatically.

::: callout info "Write Naturally, Ship Perfectly"
You do not need special linking conventions. Write `overview.md`, `overview/`, or `overview` - the build engine produces the exact same clean, trailing-slash URL in every case.
:::

## URL Normalisation

During the build process, the engine normalises every internal link automatically. This applies to Markdown text, button containers, tags, and navigation configuration.

| What You Write | What Gets Rendered | Why |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | `.md` extension stripped, trailing `/` added. |
| `overview` | `overview/` | Trailing `/` added automatically. |
| `overview/` | `overview/` | Already correct. No change. |
| `api/commands.md` | `api/commands/` | Subdirectory link normalised. |
| `localisation/index.md` | `localisation/` | `index` stripped, the folder is the canonical URL. |
| `../index.md` | `../` | Parent directory index resolved cleanly. |
| `overview.md#settings` | `overview/#settings` | Hash fragment preserved. |
| `https://example.com` | `https://example.com` | External links pass through untouched. |

## Internal Links

Link to other pages using relative paths to the source `.md` files. The engine resolves them correctly regardless of directory depth.

| Target | Example |
| :--- | :--- |
| Sibling page | `[System Overview](overview.md)` |
| Subdirectory page | `[API Reference](api/node-api.md)` |
| Subdirectory index | `[Localisation](localisation/index.md)` |
| Parent directory | `[Back to Home](../index.md)` |

## Section Anchors

Navigate directly to a heading using standard URL hash fragments.

```markdown
<!-- Intra-page anchor -->
[Jump to Roadmap](#project-roadmap)

<!-- Cross-page anchor -->
[Review CLI Flags](../api/cli-commands.md#available-flags)
```

Hash fragments are preserved through normalisation. The cross-page link above renders as `../api/cli-commands/#available-flags` in production.

## Opening in a New Tab

Prepend `external:` to any link URL to force it to open in a new browser tab. This works in standard Markdown links, buttons, and tags.

```markdown
[Open in New Tab](external:./configuration/overview.md)
[GitHub](external:https://github.com/docmd-io/docmd)
```

The `external:` prefix is stripped from the rendered URL. By default, all links open in the same window.

## Linking to Raw Files

Use the `raw:` prefix to bypass normalisation and link directly to a downloadable file. The extension and path are preserved exactly as written.

```markdown
[View Raw Source](raw:docs/readme.md)
```

## Buttons & Tags

The `::: button` and `::: tag` containers support all standard linking conventions, including `external:` and `raw:` prefixes.

```markdown
::: button "Get Started" ./getting-started/quick-start.md icon:rocket
::: button "View on GitHub" external:https://github.com/docmd-io/docmd icon:github
::: button "Download Source" raw:docs/readme.md icon:download

::: tag "v0.8.2" link:release-notes/0-8-2.md icon:tag colour:#22c55e
::: tag "Open Externally" link:external:./configuration/overview.md icon:external-link
```

## Navigation Configuration

Paths defined in `navigation.json` and `docmd.config.json` are normalised at build time. Write them in any format - all three entries below produce the identical canonical URL.

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

For items that should open in a new tab, set the `external` flag.

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
When linking to a directory's index page, use the folder path rather than explicitly referencing `index.md`. Both work identically, but the folder path is cleaner.

```markdown
<!-- Preferred -->
[Localisation](localisation/)

<!-- Also works -->
[Localisation](localisation/index.md)
```
:::

## Protocols & External Resources

The engine respects standard browser protocols for external resources and never modifies these links.

*   **HTTPS** - `[docmd Homepage](https://docmd.io)` - opens in the same tab.
*   **Mail** - `[Support](mailto:help@docmd.io)` - opens the email client.
*   **Assets** - `[Download CLI Binary](/assets/bin/docmd-mac.zip)` - not normalised.

## Static Assets

Place downloadable files within your project's `assets/` directory. The builder moves these files to the production root without path modifications.

```markdown
[Download Documentation PDF](/assets/pdf/handbook.pdf)
[View Raw Global Config](/assets/config/docmd.config.json)
```

::: callout tip "Semantic Linkage for AI"
Prefer **descriptive anchor text** (e.g., `[Optimise PWA caching](../plugins/pwa.md)`) over generic labels (e.g., `[Read more](../plugins/pwa.md)`). Detailed link labels give AI agents a high-fidelity map of semantic relationships in the `llms.txt` stream.
:::