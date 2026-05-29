---
title: "UI 字符串与 SEO"
description: "为每种语言自定义系统界面文字，了解多语言网站的自动 SEO 标签生成。"
---

## 内置语言支持

docmd 及其官方插件内置了常见语言的翻译。配置受支持的语言后，引擎会自动翻译系统文字，例如搜索占位符、导航标签和主题切换按钮。

对于不支持的语言或需要自定义措辞，系统会回退到英文。你可以为每种语言单独覆盖任意字符串。

## 自定义 UI 字符串

在语言配置中使用 `translations` 属性来覆盖系统文字：

```json
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

合并顺序为：**系统翻译 → 插件翻译 → 你的配置翻译**。你的配置始终具有最高优先级。

## 可用键名

你可以直接在 docmd 源码仓库中查看所有支持的语言和翻译键。

**[在 GitHub 上查看翻译源码](external:https://github.com/docmd-io/docmd/tree/main/packages/ui/translations)**

`fallbackMessage` 键支持 `{active}` 和 `{default}` 占位符，引擎在构建时会将其替换为对应的语言标签。

## SEO 与 Hreflang

docmd 会为所有语言的每个页面自动生成 `<link rel="alternate" hreflang="...">` 标签。默认语言还会额外获得 `x-default` hreflang 值。

```html
<!-- 每个页面自动生成 -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

无需任何配置，启用 i18n 后引擎会自动注入这些标签。

::: callout info "noStyle 页面" icon:info
UI 字符串系统适用于使用主题布局的页面。对于使用自定义 HTML 的 noStyle 页面，请参阅[客户端字符串替换](../../content/no-style-pages.md#string-replacement-i18n-for-nostyle)。
:::
