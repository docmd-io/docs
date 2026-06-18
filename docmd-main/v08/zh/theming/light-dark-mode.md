---
title: "亮色与暗色模式"
description: "如何配置默认查看模式并管理主题切换器，以获得最佳用户体验。"
---

`docmd` 自带亮色与暗色配色方案。它自动跟随用户的系统偏好，并允许用户通过 UI 切换按钮进行覆盖。

## 默认查看模式

您在 `docmd.config.json` 中指定文档的初始状态。

```json
{
  "theme": {
    "name": "sky",
    "appearance": "system"
  }
}
```

*   **`system`**（默认）：匹配用户的操作系统偏好（推荐）。
*   **`light`**：初始加载时强制使用亮色模式。
*   **`dark`**：初始加载时强制使用暗色模式。

## 配置切换按钮

主题切换器是**选项菜单**的一部分。您可以在 `layout` 对象中控制其可见性和位置。

```json
{
  "layout": {
    "optionsMenu": {
      "position": "header",
      "components": {
        "themeSwitch": true
      }
    }
  }
}
```

## 工作原理

引擎会在 `<body>` 标签上应用 `data-theme` 属性：

*   `<body data-theme="light">`
*   `<body data-theme="dark">`

如果您使用 `sky` 这类主题化设计，则该属性变为 `sky-light` 或 `sky-dark`。

### CSS 变量

主题对所有颜色都使用 CSS 变量。在您的自定义 CSS 中覆盖它们即可重新设置任一模式的样式。

```css
:root {
  --docmd-primary: #4f46e5; /* 亮色模式下的主强调色 */
}

html[data-theme="dark"] {
  --docmd-primary: #818cf8; /* 暗色模式下的主强调色 */
}
```

## 用户偏好持久化
当用户手动切换模式时，他们的偏好会存储在 `localStorage` 中。`docmd` 在每次页面加载时都会即时读取此值，以防止"主题闪烁"（FOUC）。

::: callout tip
生成内容时，LLM 偏好高对比度的结构。`docmd` 确保代码片段和标注在两种模式下都保持可访问性，确保 `llms-full.txt` 负载无论构建时处于哪种模式，都能被正确理解为语义块。
:::
