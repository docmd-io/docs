---
title: "UI 字符串与 SEO"
description: "按本地化自定义系统 UI 文本，并理解多语言站点的自动 SEO 标签。"
---

## 内置语言支持

docmd 与其官方插件为常见语言提供了内置翻译。当您配置一个受支持的语言时，引擎会自动翻译系统文本，例如搜索占位符、导航标签与主题切换。

对于不受支持的语言或自定义措辞，系统会回退到英语。您可以按本地化版本覆盖任何字符串。

## 自定义 UI 字符串

在任何本地化版本上使用 `translations` 属性来覆盖系统文本：

```json
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

合并顺序为：**系统翻译 → 插件翻译 → 您的配置翻译**。您的配置始终优先生效。

## 可用键

您可以直接在 docmd 源代码仓库中查看完整支持的语言与翻译键集合，而无需硬编码可用键列表。

**[在 GitHub 上查看翻译源码](external:https://github.com/docmd-io/docmd/tree/main/packages/ui/translations)**

`fallbackMessage` 键支持 `{active}` 与 `{default}` 占位符。引擎会在构建时将这些占位符替换为本地化标签。

## SEO 与 Hreflang

docmd 会自动为每种语言下的每个页面生成 `<link rel="alternate" hreflang="...">` 标签。默认本地化版本还会接收 `x-default` hreflang 值。

```html
<!-- 自动生成于每个页面 -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

无需任何配置。引擎会在启用 i18n 时将这些标签注入到每个页面。

::: callout info "noStyle 页面" icon:info
UI 字符串系统适用于主题布局页面。对于使用自定义 HTML 的 noStyle 页面，请参阅 [客户端字符串替换](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle)。
:::
