---
title: "自定义样式与脚本"
description: "注入您自己的 CSS 与 JS 文件以扩展 docmd 的功能与品牌。"
---

虽然 `docmd` 主题已经非常灵活，但您可能希望注入自己的样式表或交互式脚本。这可以通过配置中的 `theme.customCss` 和 `theme.customJs` 数组来完成。

## 自定义样式与脚本配置

自定义样式表与客户端脚本均对称组织在 `theme` 配置块下：

```json "docmd.config.json"
{
  "theme": {
    "name": "default",
    "customCss": [
      "/assets/css/branding.css"
    ],
    "customJs": [
      "/assets/js/feedback-widget.js"
    ]
  }
}
```

::: callout info title:"向后兼容性" icon:history
在 docmd 的早期版本中，自定义 JavaScript 通过顶层 `"customJs"` 数组配置，自定义 CSS 通过 `"customCss"` 配置。这两个顶层键作为回退依然完全受支持，但推荐采用嵌套在 `"theme"` 下的现代标准。
:::

## 自定义 CSS

使用 `theme.customCss` 来覆盖现有样式或添加新样式。

```json "docmd.config.json"
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

使用 `theme.customJs` 数组来注入客户端脚本，添加交互功能或集成第三方分析服务：

```json "docmd.config.json"
{
  "theme": {
    "customJs": [
      "/assets/js/feedback-widget.js"
    ]
  }
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

## 层叠顺序

样式表与脚本按可预测的三阶段顺序加载，以确保您的自定义规则始终拥有最高优先级：

1. **核心与主题**：基础样式和主题配色优先加载。
2. **模板与插件**：结构布局模板和插件资源随后加载。
3. **自定义 CSS 与 JS**：您的 `customCss` 和 `customJs` 文件最后加载，确保您的自定义声明覆盖默认样式。

了解更多关于结构布局自定义的内容，请参阅 [模板](templates.md)。