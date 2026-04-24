---
title: "自定义字体和品牌"
description: "如何使用 CSS 变量使您的文档外观与企业形象保持一致。"
---

## 问题

确保您的文档平台与企业形象无缝匹配，对于维护专业外观至关重要。默认的字体堆栈和配色方案旨在提供通用可读性，但可能无法反映您的特定品牌个性。

## 为什么重要

文档是一个关键的品牌触点。如果您的主产品使用了特定的字体（如 "Outfit"）和独特的颜色，您的文档也应该反映这些相同的选择。所有 Web 资产的一致性可以建立信任，并提供更具凝聚力的用户体验。

## 方法

`docmd` 使用一套 CSS 自定义属性（变量），这些属性定义了布局的视觉标记。您可以轻松地在自定义样式表中覆盖这些变量，而无需修改核心引擎。

## 实施

### 1. 创建自定义样式表

在您的源目录（或任何子目录）中创建一个名为 `custom.css` 的文件，并覆盖 `:root` 变量。

```css
/* 导入您的品牌字体 */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

:root {
  /* 品牌字体 */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;
  
  /* 品牌颜色 (浅色模式) */
  --link-color: #8a2be2;      /* 您的主品牌颜色 */
  --link-color-hover: #7b1fa2;
  --bg-color: #fcfcfd;        /* 细微的背景底色 */
}

/* 深色模式覆盖 */
:root[data-theme="dark"] {
  --bg-color: #0d1117;
  --link-color: #a855f7;
}
```

### 2. 注册样式表

将您的自定义 CSS 文件添加到 `docmd.config.js` 中的 `theme.customCss` 数组中。

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: ['/custom.css']
  }
};
```

## 权衡

导入外部字体（如 Google Fonts）会为初始页面加载增加少量的延迟。为了优化性能，请考虑将字体文件本地托管在您的项目中，并使用 `font-display: swap` 来防止自定义字体加载时的“无样式文本闪烁 (FOUT)”。
