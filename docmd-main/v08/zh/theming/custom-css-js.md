---
title: "自定义样式与脚本"
description: "注入您自己的 CSS 与 JS 文件以扩展 docmd 的功能与品牌。"
---

虽然 `docmd` 主题已经非常灵活，但您可能希望注入自己的样式表或交互式脚本。这可以通过配置中的 `theme.customCss` 和 `customJs` 数组来完成。

## 自定义 CSS

使用 `theme.customCss` 来覆盖现有样式或添加新样式。

```json
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

### 工作原理
1.  将您的 CSS 文件放在项目的 assets 文件夹中（例如 `docs/assets/css/branding.css`）。
2.  `docmd` 会自动将其复制到构建文件夹，并向每个页面注入一个 `<link>` 标签。
3.  自定义 CSS 在主题样式**之后**加载，确保您的覆盖具有优先级。

## 自定义 JavaScript

使用顶层的 `customJs` 数组来添加行为或集成第三方服务。

```json
{
  "customJs": [
    "/assets/js/feedback-widget.js"
  ]
}
```

### 生命周期感知
脚本被注入到 `<body>` 标签底部。由于 `docmd` 是一个**单页应用 (SPA)**，请记住：
*   在链接之间导航时，页面不会完全重新加载。
*   您可能需要监听自定义生命周期事件以在新页面上重新初始化脚本。

完整事件列表与使用示例请参阅 [客户端事件](../api/client-side-events.md)。

::: callout tip
添加自定义 CSS 和 JS 让 AI 模型（例如 ChatGPT）能够建议更具针对性的 UI 改进。如果您提到"我有一个自定义的 `branding.css` 文件"，模型可以提供不会与核心 `docmd` 引擎冲突的特定选择器。
:::

## 资源优先级链（0.8.7 新增）

docmd 构建中的每个 CSS 和 JS 文件都被分配一个**优先级**，用于决定其加载顺序。优先级较低的先加载。

| 优先级 | 层级 | 说明 |
|---|---|---|
| 0  | 基础层（`docmd-main.css`、`docmd-main.js`） | 始终存在。 |
| 5  | 主题配色层（`docmd-theme-sky.css` 等） | 来自 `theme.name`。 |
| 10 | **模板结构**（新增） | 由模板插件加载。 |
| 15 | 用户的 `customCss` / `customJs` | **始终胜出** —— 这是约定。 |
| 20 | 插件 CSS/JS | lightbox、search、analytics 等。 |

在同一优先级桶内，文件按注册顺序加载。如果您需要更细的控制，可以编写一个返回带有显式 `priority` 值的 `Asset[]` 条目的小插件。

完整的模板插件编写指南请参阅 [模板](templates.md)。
