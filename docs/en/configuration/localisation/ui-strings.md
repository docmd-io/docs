---
title: "UI Strings & SEO"
description: "Customise system UI text per locale and understand automatic SEO tags for multi-language sites."
---

## Built-in language support

docmd and its official plugins (Search, Threads, etc.) ship with built-in translations for common languages. When you configure a supported locale, all system text — search placeholders, navigation labels, theme toggles — is automatically translated.

For unsupported languages or custom phrasing, the system falls back to English. You can override any string per locale.

## Custom UI strings

Use the `translations` property on any locale to override system text:

```js
export default {
  i18n: {
    default: 'en',
    locales: [
      { id: 'en', label: 'English' },
      {
        id: 'ar',
        label: 'العربية',
        dir: 'rtl',
        translations: {
          onThisPage: 'في هذه الصفحة',
          previous: 'السابق',
          next: 'التالي',
          search: 'بحث',
          toggleTheme: 'تبديل المظهر',
          editThisPage: 'تعديل هذه الصفحة',
          selectLanguage: 'اختر اللغة',
          selectVersion: 'اختر الإصدار',
          fallbackMessage: 'هذه الصفحة غير متاحة بعد باللغة {active}. عرض اللغة الافتراضية ({default}).'
        }
      }
    ]
  }
}
```

The merge order is: **system translations → plugin translations → your config translations**. Your config always wins.

## Available keys

| Key | Default (English) |
|:----|:-------------------|
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

The `fallbackMessage` key supports `{active}` and `{default}` placeholders, replaced with locale labels at build time.

## SEO and hreflang

docmd automatically generates `<link rel="alternate" hreflang="...">` tags for every page across all locales. The default locale also receives the `x-default` hreflang value.

```html
<!-- Generated automatically on every page -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

No configuration is required — these tags are injected into every page when i18n is enabled.

::: callout info "noStyle Pages"
The UI strings system described above applies to themed layout pages (server-side). For noStyle pages that use custom HTML, see the [client-side string replacement](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle) system which uses `data-i18n` attributes and JSON files in `assets/i18n/`.
:::