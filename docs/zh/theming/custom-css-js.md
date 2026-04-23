---
title: "自定义样式与脚本"
description: "注入自定义 CSS 和 JS 文件，扩展 docmd 的功能与品牌形象。"
---

虽然 `docmd` 主题具备高度的灵活性，你仍可能需要注入自定义样式表或交互脚本。通过在配置文件中设置 `theme.customCss` 和 `customJs` 数组即可实现。

## 自定义 CSS

使用 `theme.customCss` 覆盖现有样式或添加新样式。

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: [
      '/assets/css/branding.css' // 相对站点根目录的路径
    ]
  }
}
```

### 工作原理
1.  将 CSS 文件放入项目的 assets 文件夹（如 `docs/assets/css/branding.css`）。
2.  `docmd` 会自动将其复制到构建目录，并在每个页面中注入 `<link>` 标签。
3.  自定义 CSS 在主题样式**之后**加载，确保你的覆盖具有优先级。

## 自定义 JavaScript

使用顶级 `customJs` 数组添加行为性脚本或集成第三方服务。

```javascript
// docmd.config.js
export default {
  customJs: [
    '/assets/js/feedback-widget.js'
  ]
}
```

### 生命周期感知
脚本在 `<body>` 标签底部注入。由于 `docmd` 是**单页应用（SPA）**，需注意：
*   导航链接时页面不会完整重载。
*   你可能需要监听自定义生命周期事件，以便在新页面上重新初始化脚本。

有关完整的事件列表和用法示例，请参阅 [客户端事件](../api/client-side-events)。

::: callout tip
添加自定义 CSS 和 JS 后，AI 模型（如 ChatGPT）可提出更有针对性的 UI 优化建议。如果你说"我有一个自定义的 `branding.css` 文件"，模型可提供不会与引擎冲突的具体选择器。
:::