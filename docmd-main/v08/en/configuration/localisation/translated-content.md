---
title: "Translated Content"
description: "Organise translations in locale subdirectories with per-file fallback and per-locale navigation."
---

## Directory Structure

Every locale lives in its own subdirectory inside the source directory. The folder name matches the locale `id` from your config.

```text
docs/
├── en/                     ← default locale content
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← second locale
│   ├── index.md            ← translated homepage
│   ├── navigation.json     ← translated navigation labels
│   └── getting-started/
│       └── installation.md ← translated page
└── zh/                     ← third locale
    └── index.md            ← only the homepage translated
```

The source directory holds only locale folders. No content files sit at the root level when i18n is enabled.

::: callout info "Folder Names Are Your Choice" icon:info
Folder names match the `id` values in your config. If your config sets `{ id: 'fr-ca' }`, your folder is `docs/fr-ca/`.
:::

## Per-file Fallback

You do not need to translate every page. docmd scans the **default locale directory** as the canonical structure. For every other locale, it checks for a translated page:

- If `docs/hi/getting-started/installation.md` exists → serves the Hindi translation.
- If it does not exist → serves the default locale version.

When a page falls back, docmd displays a translated callout. This informs viewers the page is shown in the default language. Customise this message via your [UI strings](ui-strings.md) configuration.

## Locale-Exclusive Pages

A non-default locale can host pages that do not exist in the default locale. These render only for that specific locale.

## Translate the Navigation

Each locale directory can include its own `navigation.json`. docmd uses a cascading priority system to resolve the sidebar.

For details on the resolution hierarchy, see [Navigation Configuration](../navigation.md).

A locale's `navigation.json` uses the standard format:

```json
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

::: callout tip "Partial Navigation" icon:info
Create a locale `navigation.json` only when you want translated labels. If missing, the default navigation is used.
:::

## Versioning and i18n

When combining versioning and i18n, structure the source directories hierarchically:

```text
docs/                    ← current version
  en/                    ← current version, default locale
  hi/                    ← current version, translated locale
docs-v1/                 ← previous version
  en/                    ← v1, default locale
  hi/                    ← v1, translated locale
```

The output URLs nest locale first, then version:

```text
/                        ← default locale, current version
/hi/                     ← translated locale, current version
/v1/                     ← default locale, previous version
/hi/v1/                  ← translated locale, previous version
```