---
title: "Translated Content"
description: "Organise translations in locale subdirectories with per-file fallback and per-locale navigation."
---

## Directory structure

Every locale — including the default — lives in its own subdirectory inside the source directory. The folder name matches the locale `id` from your config.

```
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

The source directory is a clean container — it holds only locale folders. No content files sit at the root level when i18n is enabled.

::: callout info "Folder names are your choice"
The folder names come directly from the `id` values in your config. If your config says `{ id: 'fr-ca' }`, your folder is `docs/fr-ca/`. If Hindi is your default locale (`default: 'hi'`), then `docs/hi/` is the canonical content directory.
:::

## Per-file fallback

You don't need to translate every page. docmd scans the **default locale's directory** as the canonical list of pages. For every other locale, it checks whether a translated version of each page exists:

- If `docs/hi/getting-started/installation.md` exists → serves the Hindi translation
- If it doesn't exist → serves the default locale's version of that page

When a page falls back, docmd can display a translated callout informing viewers that the page is shown in the default language. This message is customisable via your [UI strings](./ui-strings) configuration.

## Locale-exclusive pages

A non-default locale can also have pages that don't exist in the default locale. These are rendered only for that locale — they don't appear in other locales.

## Translate the navigation

Each locale directory can have its own `navigation.json`. `docmd` uses a cascading priority system (Level 1-3) to resolve the sidebar.

For details on the resolution hierarchy and visual examples, see [Navigation Resolution Priority](../navigation#navigation-resolution-priority).

A locale's `navigation.json` uses the same format:

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

::: callout tip "Partial navigation"
You only need to create a locale `navigation.json` when you want translated labels. If it's missing, the default locale's navigation is used — pages still render, just with untranslated labels.
:::

## Versioning and i18n together

When both versioning and i18n are configured, the source structure is:

```
docs/                    ← current version (container)
  en/                    ← current version, default locale
  hi/                    ← current version, translated locale
docs-v1/                 ← old version
  index.md               ← old version content (no locale structure)
  navigation.json
```

Old versions that predate i18n work automatically — docmd reads them directly when no locale subdirectories are present. Only the default locale renders the old version. To add translations to an old version, create a locale subdirectory inside it:

```
docs-v1/
  hi/                    ← Hindi translation for v1
    index.md
    navigation.json
```

The output URLs nest locale first, then version:

```
/                        ← default locale, current version
/hi/                     ← translated locale, current version
/v1/                     ← default locale, old version
/hi/v1/                  ← translated locale, old version
```
