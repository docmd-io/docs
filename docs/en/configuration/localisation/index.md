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

The `default` locale renders at the site root (`/`). All other locales render at `/{id}/`. You choose the IDs, labels, and which locale is the default — there are no hardcoded assumptions. If you want Hindi as the default, set `default: 'hi'` and Hindi renders at `/` whilst English renders at `/en/`.

| Key | Type | Description |
|:----|:-----|:------------|
| `default` | `string` | Locale ID that renders at `/`. Defaults to the first locale if omitted. |
| `locales` | `array` | List of locale objects. Each must have an `id`. |
| `position` | `string` | Where the language switcher appears. `options-menu` (default), `sidebar-top`, or `sidebar-bottom`. |
| `stringMode` | `boolean` | When `true`, generates locale pages from a single source using `data-i18n` attribute replacement. Default `false`. |
| `inPlace` | `boolean` | When `true` (with client-side script), swaps strings without URL navigation. For SPAs/dashboards only. Default `false`. |

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

## Missing locale directories

If a locale is declared in `locales` but its source directory does not exist (e.g. no `docs/hi/` folder), docmd automatically **disables** that locale in the language switcher. The locale still appears in the dropdown — with an "N/A" badge and greyed-out styling — but clicking it does nothing.

This prevents 404 errors when you list planned languages before their content is ready.

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

## String Mode (noStyle pages only)

Standard i18n uses separate directories per locale (`docs/en/`, `docs/hi/`), each with its own markdown files. **String Mode** is a simpler alternative designed specifically for [noStyle pages](/content/no-style-pages/) — pages that use raw HTML instead of markdown.

```js
// docmd.config.js
export default {
  i18n: {
    default: 'en',
    stringMode: true,
    locales: [
      { id: 'en', label: 'English' },
      { id: 'zh', label: '中文' }
    ]
  }
}
```

With `stringMode: true`:

1. Source files stay in the root `docs/` directory (no locale subdirectories)
2. The default locale builds at `/` as normal
3. For each non-default locale, docmd clones the rendered HTML and applies **server-side string replacement** using JSON files from `assets/i18n/{locale}.json`
4. Output goes to `/{locale}/` — e.g. `/zh/index.html` — with full SEO (hreflang tags, correct `lang` attribute)
5. If a translation file is missing, the page renders with the default language text

For full details on the `data-i18n` attribute syntax and JSON file format, see [noStyle string replacement](/content/no-style-pages#string-replacement-i18n-for-nostyle).

::: callout warning "String Mode does not translate markdown content"
String replacement works by finding `data-i18n` attributes in the rendered HTML. Standard markdown content (`## Heading`, paragraphs, lists) renders to plain HTML tags without these attributes — so there is nothing for the replacer to find.

- **Documentation sites** → use directory mode (the default). Each locale has its own markdown files with fully translated prose.
- **Landing pages, marketing sites, dashboards** → use string mode. These are noStyle pages with custom HTML where you control every tag and can add `data-i18n` attributes.

If your site has both — for example, a noStyle landing page plus documentation — use directory mode for the docs and add `data-i18n` attributes to your noStyle page. String mode will translate the noStyle HTML while directory mode handles the documentation content.
:::

## Next steps

- [Translated content](./translated-content) — directory structure, writing translations, navigation
- [UI strings & SEO](./ui-strings) — customising system text, hreflang tags
- [noStyle string replacement](/content/no-style-pages#string-replacement-i18n-for-nostyle) — `data-i18n` attribute syntax and JSON format for noStyle pages