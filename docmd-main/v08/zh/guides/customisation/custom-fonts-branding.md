---
title: "自定义字体与品牌"
description: "如何借助 CSS 变量，让您的文档在外观上贴合企业品牌形象。"
---

## 问题

让您的文档平台轻松匹配企业品牌，对于专业形象至关重要。默认的字体栈与配色保证了通用可读性，但未必能反映您品牌的个性。

## 为什么重要

文档是品牌的关键触点之一。如果您的产品使用了特定字体（例如 "Outfit"）与鲜明的主色，文档也应体现这些选择。各 Web 资产之间的一致性能建立信任，并提供统一的用户体验。

## 方法

docmd 使用一套 CSS 自定义属性（变量）来定义布局的视觉令牌 (token)。您可以在自定义样式表中直接覆盖这些变量，而无需改动核心引擎。

## 实现

### 1. 创建自定义样式表

在源目录中创建名为 `custom.css` 的文件，覆盖 `:root` 中的变量。

```css
/* 引入品牌字体 */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

:root {
  /* 品牌字体 */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;
  
  /* 品牌配色（浅色模式） */
  --link-color: #8a2be2;      /* 您的主品牌色 */
  --link-colour-hover: #7b1fa2;
  --bg-color: #fcfcfd;        /* 淡淡的背景色调 */
}

/* 深色模式覆盖 */
:root[data-theme="dark"] {
  --bg-color: #0d1117;
  --link-color: #a855f7;
}
```

### 2. 注册样式表

将自定义 CSS 文件加入 `docmd.config.json` 的 `theme.customCss` 数组中。

```json
  "theme": {
    "customCss": ["/custom.css"]
  }
```

## 取舍

引入外部字体（如 Google Fonts）会增加首次页面加载的延迟。为优化性能，建议将字体文件部署在本地。同时使用 `font-display: swap` 来避免在自定义字体加载期间出现"无样式文字闪烁 (FOUT)"。
