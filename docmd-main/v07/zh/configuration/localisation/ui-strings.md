---
title: "UI 字符串翻译"
description: "通过配置自定义翻译来自定义 docmd 用户界面中显示的文本（搜索占位符、导航标签等）。"
---

虽然 `docmd` 对常见语言有内置的翻译，但你可能希望为特定项目自定义 UI 文本（例如，将“Search”更改为“Find in Docs”）。

## 全局配置

你可以在 `docmd.config.js` 中直接定义特定语言环境的翻译。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  locales: {
    en: { title: 'English', label: 'English' },
    zh: { title: 'Chinese', label: '简体中文' }
  },
  plugins: {
    localisation: {
      translations: {
        zh: {
          'search.placeholder': '搜索文档...',
          'nav.next': '下一篇',
          'nav.prev': '上一篇',
          'toc.title': '本页目录'
        }
      }
    }
  }
});
```

## 可用的 UI 键名

以下是你可以覆盖的最常用 UI 字符串：

| 键名 | 默认值 (EN) | 描述 |
| :--- | :--- | :--- |
| `search.placeholder` | `Search...` | 搜索输入框中的占位符。 |
| `search.noResults` | `No results found` | 未找到匹配项时显示的文本。 |
| `nav.next` | `Next` | 分页器中“下一页”按钮的文本。 |
| `nav.prev` | `Previous` | 分页器中“上一页”按钮的文本。 |
| `toc.title` | `On this page` | 目录侧边栏顶部的标题。 |
| `theme.light` | `Light` | 主题切换器中“浅色”的标签。 |
| `theme.dark` | `Dark` | 主题切换器中“深色”的标签。 |
| `theme.system` | `System` | 主题切换器中“系统同步”的标签。 |

## 插件贡献

如果你正在 [开发插件](../../plugins/building-plugins.md)，你也可以通过 `translations` 钩子提供新的翻译键：

```javascript
export default {
  name: 'my-plugin',
  translations(localeId) {
    if (localeId === 'zh') {
      return { 'myplugin.status': '状态' };
    }
    return { 'myplugin.status': 'Status' };
  }
};
```

::: callout tip "AI 翻译建议"
当要求 AI 助手为你的网站添加新语言时，请提供上述 UI 键名列表。这可确保 AI 不仅翻译你的内容，还为你的 `.config.js` 文件提供一套匹配的本地化 UI 字符串。
:::