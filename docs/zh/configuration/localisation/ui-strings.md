---
title: "UI 字符串与 SEO"
description: "按语言区域自定义系统 UI 文字，并了解多语言站点的自动 SEO 标签机制。"
---

## 内置语言支持

docmd 及其官方插件（搜索、Threads 等）为常见语言内置了翻译。配置受支持的区域后，所有系统文本——搜索占位符、导航标签、主题切换等——会自动翻译。

对于不受支持的语言或自定义措辞，系统将回退到英语。你可以按区域覆盖任意字符串。

## 自定义 UI 字符串

使用任意区域上的 `translations` 属性覆盖系统文本：

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

合并顺序为：**系统翻译 → 插件翻译 → 你的配置翻译**。你的配置始终优先。

## 可用键

| 键 | 默认值（英语） |
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

`fallbackMessage` 键支持 `{active}` 和 `{default}` 占位符，在构建时替换为区域标签。

## SEO 与 hreflang

docmd 自动为所有区域的每个页面生成 `<link rel="alternate" hreflang="...">` 标签。默认区域还会获得 `x-default` hreflang 值。

```html
<!-- 在每个页面自动生成 -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

无需任何配置——启用 i18n 后，这些标签会自动注入每个页面。
