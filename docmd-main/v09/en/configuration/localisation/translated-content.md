---
title: "Translated Content & i18n Routing"
description: "Organise multi-language documentation directories, fallback mechanics, and localised navigation structures in docmd."
---

`docmd` provides multi-language support (i18n) by organising content into dedicated locale subdirectories. You can manage localized content, fall back seamlessly to default languages, and provide localised navigation sidebars.

## Directory Structure

Every locale resides in its own subdirectory inside the source root (`src`). Folder names match the locale `id` defined in your configuration:

```text
docs/
├── en/                     ← default locale content
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← secondary locale (Hindi)
│   ├── index.md            ← translated homepage
│   ├── navigation.json     ← translated navigation labels
│   └── getting-started/
│       └── installation.md ← translated installation guide
└── zh/                     ← tertiary locale (Chinese)
    └── index.md            ← translated homepage
```

When i18n is enabled, all Markdown source content lives inside locale directories. No content files sit at the root level.

::: callout info "Custom Directory Identifiers" icon:info
Subdirectory names correspond directly to `id` values in your configuration. If your config defines `{ "id": "fr-ca" }`, the corresponding content directory is `docs/fr-ca/`.
:::

## Per-File Fallback Resolution

`docmd` does not require translating every document upfront. The engine treats the **default locale directory** as the canonical content tree. When a requested page is missing in a secondary locale:

1. If `docs/hi/getting-started/installation.md` exists → serves the Hindi translation.
2. If `docs/hi/getting-started/installation.md` is missing → falls back to `docs/en/getting-started/installation.md`.

When falling back to the default locale, `docmd` displays an informative callout banner to readers. Customise this message via your [UI Strings Configuration](./ui-strings.md).

## Locale-Exclusive Pages

Secondary locales can host unique documents that do not exist in the default locale directory. These pages render exclusively within their respective language routes.

## Localising Sidebar Navigation

Each locale directory can include an independent `navigation.json` manifest. `docmd` uses a cascading priority resolution system for sidebars. Refer to [Navigation Configuration](../navigation.md) for full hierarchy details.

```json "navigation.json"
[
  {
    "title": "शुरू करें",
    "children": [
      { "title": "इंस्टालेशन", "path": "/getting-started/installation" },
      { "title": "स्थानीयकरण", "path": "/configuration/localisation" }
    ]
  }
]
```

::: callout tip title:"Partial Navigation Overrides" icon:lightbulb
Provide a `navigation.json` file inside a locale directory only when translating menu labels. If omitted, the default locale's navigation tree applies automatically.
::: /callout

## Combining Versioning with Localisation

When combining versioning and multi-language routing, organize directories hierarchically with locales nested inside version folders:

```text
docs/                    ← current release
  en/                    ← default locale
  hi/                    ← translated locale
docs-v1/                 ← legacy release
  en/                    ← default locale
  hi/                    ← translated locale
```

The output URL hierarchy prioritises locale prefixes, followed by version routes:

```text
/                        ← default locale, current version
/hi/                     ← translated locale, current version
/v1/                     ← default locale, legacy version
/hi/v1/                  ← translated locale, legacy version
```