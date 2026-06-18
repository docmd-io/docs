---
title: "UI Strings & SEO"
description: "Customise system UI text per locale and understand automatic SEO tags for multi-language sites."
---

## Built-in Language Support

docmd and its official plugins ship with built-in translations for common languages. When you configure a supported locale, the engine automatically translates system text like search placeholders, navigation labels, and theme toggles.

For unsupported languages or custom phrasing, the system falls back to English. You can override any string per locale.

## Custom UI Strings

Use the `translations` property on any locale to override system text:

```json "docmd.config.json"
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      {
        "id": "ar",
        "label": "العربية",
        "dir": "rtl",
        "translations": {
          "onThisPage": "في هذه الصفحة",
          "previous": "السابق",
          "next": "التالي",
          "search": "بحث",
          "toggleTheme": "تبديل المظهر",
          "editThisPage": "تعديل هذه الصفحة",
          "selectLanguage": "اختر اللغة",
          "selectVersion": "اختر الإصدار",
          "fallbackMessage": "هذه الصفحة غير متاحة بعد باللغة {active}. عرض اللغة الافتراضية ({default})."
        }
      }
    ]
  }
```

The merge order is: **system translations → plugin translations → your config translations**. Your config always wins.

## Available Keys

Instead of hardcoding a list of available keys, you can review the complete set of supported languages and translation keys directly in the docmd source repository.

**[View Translation Source on GitHub](external:https://github.com/docmd-io/docmd/tree/main/packages/ui/translations)**

The `fallbackMessage` key supports `{active}` and `{default}` placeholders. The engine replaces these with locale labels at build time.

## SEO and Hreflang

docmd automatically generates `<link rel="alternate" hreflang="...">` tags for every page across all locales. The default locale also receives the `x-default` hreflang value.

```html
<!-- Generated automatically on every page -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

No configuration is required. The engine injects these tags into every page when i18n is enabled.

::: callout info "noStyle Pages" icon:info
The UI strings system applies to themed layout pages. For noStyle pages using custom HTML, see [Client-Side String Replacement](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle).
:::