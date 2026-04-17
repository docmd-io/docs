---
title: "明暗模式"
description: "如何配置默认浏览模式并管理主题切换器，以提供最佳用户体验。"
---

`docmd` 内置支持明色和暗色配色方案。它会自动检测用户的系统偏好，并允许通过 UI 切换按鈕手动覆盖。

## 默认浏览模式

在 `docmd.config.js` 中指定文档的初始状态。

```javascript
// docmd.config.js
export default {
  theme: {
    name: 'sky',
    appearance: 'system' // 可选值：'light'、'dark'、'system'（默认）
  }
}
```

*   **`system`**：匹配用户的操作系统偏好（推荐）。
*   **`light`**：首次加载时强制使用亮色模式。
*   **`dark`**：首次加载时强制使用暗色模式。

## 配置切换按鈕

主题切换器是**选项菜单**的组成部分。可通过 `layout` 对象控制其可见性和位置。

```javascript
layout: {
  optionsMenu: {
    position: 'header', // 可选：'header'、'sidebar-top'、'sidebar-bottom'
    components: {
      themeSwitch: true  // 显示或隐藏太阳/月亮切换按鈕
    }
  }
}
```

## 工作原理（技术详解）

主题引擎会向 `<body>` 标签添加 `data-theme` 属性：

*   `<body data-theme="light">`
*   `<body data-theme="dark">`

如果使用类似 `sky` 这样的主题设计，属性值将为 `sky-light` 或 `sky-dark`。

### CSS 变量
`docmd` 主题为所有颜色使用 CSS 变量。可在自定义 CSS 中覆盖这些变量，自定义任意模式的外观。

```css
/* 自定义 CSS 覆盖 */
:root {
  --docmd-primary: #4f46e5; /* 亮色模式主色调 */
}

body[data-theme="dark"] {
  --docmd-primary: #818cf8; /* 暗色模式主色调 */
}
```

## 用户偏好持久化
用户手动切换模式后，居好将存入 `localStorage`。`docmd` 在每次页面加载时即时读取该值，防止“主题闪烁”（FOUC）。

::: callout tip
生成内容时，LLM 偏幽高对比结构。`docmd` 确保代码片段和提示框在两种模式下均可正常访问，保证 `llms-full.txt` 内容无论在哪种模式下构建，都能被正确解析为语义块。
:::