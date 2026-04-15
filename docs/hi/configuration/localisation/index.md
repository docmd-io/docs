---
title: "स्थानीयकरण"
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

The `default` locale renders at the site root (`/`). All other locales render at `/{id}/`. You choose the IDs, labels, and which locale is the default — there are no hardcoded assumptions. If you want Hindi as the default, set `default: 'hi'` and Hindi renders at `/` whilst English renders at `/en/`.

| Key | Type | Description |
|:----|:-----|:------------|
| `default` | `string` | Locale ID that renders at `/`. Defaults to the first locale if omitted. |
| `locales` | `array` | List of locale objects. Each must have an `id`. |
| `position` | `string` | Where the language switcher appears. `options-menu` (default), `sidebar-top`, or `sidebar-bottom`. |

Each locale object accepts:

| Key | Type | Default | Description |
|:----|:-----|:--------|:------------|
| `id` | `string` | — | Any identifier you choose (e.g. `en`, `hi`, `fr-ca`). Used as the folder name and URL prefix. Required. |
| `label` | `string` | Same as `id` | Display name shown in the language switcher. |
| `dir` | `string` | `ltr` | Text direction. Set to `rtl` for Arabic, Hebrew, etc. |
| `translations` | `object` | `{}` | Custom UI string overrides (see [Custom UI strings](./ui-strings)). |

## URL structure

The default locale has no URL prefix. Non-default locales are nested under `/{id}/`. When combined with [versioning](../versioning), the URL is `/{locale}/{version}/page`.

```
/                       ← default locale, current version
/getting-started        ← default locale page
/05/                    ← default locale, old version
/hi/                    ← non-default locale, current version
/hi/getting-started     ← non-default locale page
/hi/05/                 ← non-default locale, old version
```

The language switcher preserves your current page and version when you switch locales. The version switcher preserves your current locale.

## Position the language switcher


<!-- SCREENSHOT: Three variants of the language switcher — options-menu (globe icon in header), sidebar-top (dropdown at top of sidebar), sidebar-bottom (dropdown at bottom). Show all three side by side. -->

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

## Next steps

- [Translated content](./translated-content) — directory structure, writing translations, navigation
- [UI strings & SEO](./ui-strings) — customising system text, hreflang tags
