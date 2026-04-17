---
title: "实用技巧：集成自定义字体"
description: "通过 Google Fonts 和 CSS 变量覆盖为网站添加特色排版。"
---

`docmd` 采用健壮的 CSS 变量系统管理设计标识。自定义字体排版需要导入外部字体资源并覆盖核心根变量。

## 1. 定义字体清单

在项目中建立自定义 CSS 文件（如 `assets/css/typography.css`）。

在 [Google Fonts](https://fonts.google.com) 上找到目标字体并使用 `@import` 指令获取资源，然后将字体映射到 `docmd` 的排版标识上。

```css
/* assets/css/typography.css */

/* 1. 导入字体资源 */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=JetBrains+Mono&display=swap');

:root {
  /* 2. 覆盖主无衬心字体堆 */
  --font-family-sans: "Outfit", -apple-system, system-ui, sans-serif;
  
  /* 3. 覆盖等宽字体（代码块）堆 */
  --font-family-mono: "JetBrains Mono", monospace;
}
```

## 2. 注册样式表

通过 `docmd.config.js` 文件将自定义清单注入构建流水线。

```javascript
export default {
  // ...
  theme: {
    name: 'sky',
    appearance: 'dark',
    customCss: [
      '/assets/css/typography.css' // 路径相对于 site/ 目录
    ]
  }
}
```

## 3. 验证效果

运行 `docmd dev` 预览排版变化。引擎会自动打包自定义 CSS 并将变量覆盖应用到所有文档节点。