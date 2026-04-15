---
title: "Localisation"
description: "Serve documentation in multiple languages with locale-first routing, translated navigation, and automatic fallback."
---

Add multi-language support to your documentation site. docmd serves each locale at its own URL prefix, translates system UI strings, and falls back gracefully when a translation is missing.

## Add languages to your config

```js
// docmd.config.js
export default {
  i18n: {
    default: 'en',
    locales: [
      { id: 'en', label: 'English' },
      { id: 'hi', label: 'हिन्दी' },
      { id: 'zh', label: '中文' }
    ]
  }
}
```

The `default` locale renders at root (`/`). All other locales render at `/{locale}/`. This mirrors how versioning treats the current version — the default stays at root, alternatives get a prefix.

| Key | Type | Description |
|:----|:-----|:------------|
| `default` | `string` | Locale ID that renders at `/`. Defaults to the first locale. |
| `locales` | `array` | List of locale objects. Each must have `id`. |
| `position` | `string` | Where the language switcher appears. `options-menu` (default), `sidebar-top`, or `sidebar-bottom`. |

Each locale object accepts:

| Key | Type | Default | Description |
|:----|:-----|:--------|:------------|
| `id` | `string` | — | Language code (e.g. `en`, `hi`, `ar`). Required. |
| `label` | `string` | Same as `id` | Display name shown in the language switcher. |
| `dir` | `string` | `ltr` | Text direction. Set to `rtl` for Arabic, Hebrew, etc. |
| `translations` | `object` | `{}` | Custom UI string overrides (see [Custom UI strings](#provide-custom-ui-strings)). |

## URL structure

The default locale has no prefix. Non-default locales are nested under `/{locale}/`. When combined with versioning, the URL is `/{locale}/{version}/page`.

```
/                       ← English (default), current version
/getting-started        ← English page
/05/                    ← English, old version
/hi/                    ← Hindi, current version
/hi/getting-started     ← Hindi page
/hi/05/                 ← Hindi, old version
```

The language switcher preserves your current page and version when you switch locales. The version switcher preserves your current locale.

## Write translated content

Every locale lives in its own subdirectory inside the source directory. The default locale (e.g. `en`) goes in `docs/en/`, translations go in `docs/hi/`, `docs/zh/`, etc.

```
docs/
├── en/                     ← Default language (English)
│   ├── index.md
│   ├── navigation.json
│   └── getting-started/
│       └── installation.md
├── hi/                     ← Hindi translation
│   ├── index.md            ← Translated homepage
│   ├── navigation.json     ← Translated navigation labels
│   └── getting-started/
│       └── installation.md ← Translated page
└── zh/                     ← Chinese translation
    └── index.md            ← Only the homepage translated
```

This is cleaner than mixing locale folders alongside content folders — your source directory contains only locale directories, each self-contained.

You don't need to translate every page. docmd uses a **per-file fallback** system:

- If `docs/hi/getting-started/installation.md` exists → serves the Hindi translation
- If it doesn't exist → serves the English original with a warning callout at the top

The callout message itself is translated using the system's UI strings:

> **हिन्दी:** "यह पृष्ठ अभी हिन्दी में उपलब्ध नहीं है। डिफ़ॉल्ट भाषा (English) दिखा रहा है।"

## Translate the navigation

Each locale has its own `navigation.json` inside its directory. If a locale doesn't have a `navigation.json`, it falls back to the default locale's navigation.

```
docs/
├── en/
│   └── navigation.json     ← Default navigation (English labels)
└── hi/
    └── navigation.json     ← Hindi navigation (translated labels)
```

The resolution priority follows a clear hierarchy:

1. **Locale-specific navigation** — `docs/hi/navigation.json` (if it exists)
2. **Default locale navigation** — `docs/en/navigation.json` (the fallback)
3. **Version-specific navigation** — `docs-04/navigation.json` (if versioned and no locale dirs)
4. **Root config navigation** — the global `navigation` from `docmd.config.js`

A locale navigation file uses the same format as the root one:

```json
[
  {
    "title": "शुरू करें",
    "children": [
      { "title": "इंस्टालेशन", "path": "/getting-started/installation" },
      { "title": "स्थानीयकरण", "path": "/getting-started/localisation" }
    ]
  }
]
```

::: callout tip "Partial translation"
You only need to include entries you want to translate. If a path appears in the default navigation but not the locale navigation, it still renders — the label just stays in the default language. Drop a locale `navigation.json` only when you want full control over the labels.
:::

## Provide custom UI strings

By default, docmd and its official plugins (like Search and Threads) automatically detect and support standard language codes such as `en` (English), `hi` (Hindi), and `zh` (Chinese). When you configure one of these locales, all system strings, search placeholders, and thread UI elements are immediately translated without any extra work.

For languages that docmd doesn't yet support out-of-the-box (or if you want to change existing phrasing), the system gracefully falls back to English. You can override any UI string manually using the `translations` property on your locale config:

```js
// docmd.config.js
export default {
  i18n: {
    default: 'en',
    locales: [
      { id: 'en', label: 'English' },
      { id: 'ar', label: 'العربية', dir: 'rtl', translations: {
        onThisPage: 'في هذه الصفحة',
        previous: 'السابق',
        next: 'التالي',
        search: 'بحث',
        toggleTheme: 'تبديل المظهر',
        editThisPage: 'تعديل هذه الصفحة',
        selectLanguage: 'اختر اللغة',
        selectVersion: 'اختر الإصدار',
        fallbackMessage: 'هذه الصفحة غير متاحة بعد باللغة {active}. عرض اللغة الافتراضية ({default}).'
      }}
    ]
  }
}
```

The merge order is: **system translations → plugin translations → your config translations**. Your config always wins.

Available keys you can override:

| Key | English default |
|:----|:----------------|
| `skipToContent` | Skip to main content |
| `toggleSidebar` | Toggle Sidebar |
| `previous` | Previous |
| `next` | Next |
| `onThisPage` | On This Page |
| `search` | Search |
| `toggleTheme` | Toggle theme |
| `selectLanguage` | Select Language |
| `selectVersion` | Select Version |
| `editThisPage` | Edit this page |
| `builtWith` | Built with |
| `copyCode` | Copy code |
| `copiedToClipboard` | Copied! |
| `mainNavigation` | Main Navigation |
| `fallbackMessage` | This page is not yet available in {active}. Showing default language ({default}). |

The `fallbackMessage` key supports `{active}` and `{default}` placeholders, which are replaced with the locale labels at build time.

## Position the language switcher

Control where the language switcher appears using the `position` option:

```js
i18n: {
  position: 'options-menu',  // default
  // ...
}
```

| Position | Behaviour |
|:---------|:----------|
| `options-menu` | Compact globe icon alongside theme toggle and search. Default. |
| `sidebar-top` | Full dropdown with label at the top of the sidebar. |
| `sidebar-bottom` | Full dropdown with label at the bottom of the sidebar. |

## Source directory vs URL structure

The source directory and the output URL deliberately use different nesting orders. This is by design.

**Source** (how you organise files):
```
docs/                    ← source directory (container)
  en/                    ← current version, default locale content
  hi/                    ← current version, Hindi content
docs-04/                 ← old version (no locale dirs = English only)
docs-04/hi/              ← old version, Hindi translation (optional)
```

**Output URLs** (what users see):
```
/                        ← default locale, current version
/hi/                     ← Hindi, current version
/04/                     ← default locale, old version
/hi/04/                  ← Hindi, old version
```

Each locale is its own self-contained directory. Old versions that predate i18n work automatically — docmd reads them directly when no locale subdirectories are found. You can add locale support to old versions at any time by creating a locale subdirectory inside them.

## SEO and hreflang

docmd automatically generates `<link rel="alternate" hreflang="...">` tags for every page across all locales. The default locale receives the `x-default` hreflang value.

```html
<!-- Generated on the root (English) page -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

No configuration is required. These tags are injected into every page when i18n is enabled.