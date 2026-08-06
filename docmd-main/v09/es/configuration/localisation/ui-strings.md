---
title: "UI Strings & SEO Localisation"
description: "Customise system UI strings per locale and understand automated hreflang SEO meta tags in docmd."
---

`docmd` ships with built-in translations for common system strings across major languages. When configuring a supported locale, system labels—such as search placeholders, navigation buttons, and theme mode toggles—translate automatically.

For unsupported languages or custom phrasing, the system falls back to English while allowing custom string overrides per locale.

## Customising UI Strings

Define custom labels in the `translations` object of any locale configuration:

```json "docmd.config.json"
{
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
}
```

Translation resolution follows a strict priority order: **system defaults → plugin strings → configuration overrides**. User configuration always takes highest precedence.

## Available Translation Keys

The complete set of supported languages and system translation keys is available directly in the core source repository:

**[View Translation Source on GitHub](external:https://github.com/docmd-io/docmd/tree/main/packages/ui/translations)**

The `fallbackMessage` string supports `{active}` and `{default}` template placeholders, which are substituted dynamically at build time with active locale labels.

## Automated SEO Meta Tags (`hreflang`)

When i18n is enabled, `docmd` automatically generates `<link rel="alternate" hreflang="...">` tags for every page across all configured locales. The default locale is assigned the `x-default` fallback tag:

```html
<!-- Injected automatically into HTML document headers -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

No manual configuration is required; the engine injects these tags into all generated static pages automatically.

::: callout info "Un-styled Custom Pages" icon:info
The UI strings translation system applies to standard themed pages. For standalone custom HTML pages using `noStyle: true`, refer to [No-Style Example Pages](../../content/no-style-example.md).
:::