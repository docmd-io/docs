---
title: "自定义与变量"
description: "docmd 的 CSS 变量和组件类的完整参考，用于高级样式定制。"
---

`docmd` 采用以 CSS 变量为先的架构。这意味着您只需在 `:root` 块中覆盖几个键即可重新设置整个站点的样式，而无需编写复杂的 CSS 选择器。

## 全局变量参考

| 变量 | 默认值（亮色） | 默认值（暗色） | 说明 |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#0d0d0f` | 主页面背景。 |
| `--text-color` | `#27272a` | `#d4d4d8` | 标准正文文字。 |
| `--text-heading` | `#09090b` | `#fafafa` | 标题与页头颜色。 |
| `--link-color` | `#068ad5` | `#38bdf8` | 主强调色 / 链接。 |
| `--border-color` | `#e4e4e7` | `#27272a` | 分隔线与边框。 |
| `--sidebar-bg` | `#fafafa` | `#09090b` | 导航背景。 |
| `--ui-border-radius` | `6px` | `6px` | 所有 UI 项目的圆角。 |
| `--sidebar-width` | `260px` | `260px` | 侧边栏列宽。 |

## 覆盖示例

要更改站点的主强调色，请将此代码添加到您的 `customCss` 中：

```css
:root {
  --link-color: #f43f5e; /* Rose 500 */
}

body[data-theme="dark"] {
  --link-color: #fb7185; /* Rose 400 */
}
```

## 组件定位

如果您需要为特定组件设置样式，请使用这些顶层类：

*   `.main-content`：所有 Markdown 内容的包装器。
*   `.sidebar-nav`：内部导航列表。
*   `.page-header`：顶部导航栏。
*   `.docmd-search-modal`：搜索浮层。
*   `.docmd-tabs`：标签页容器组件。
*   `.callout`：提示/注释框。

## 排查特异性问题
大多数 `docmd` 样式使用低特异性。如果您的覆盖样式未生效，请确保 `customCss` 注册正确，并检查添加 `body` 前缀（例如 `body .main-content`）是否有帮助。

::: callout tip
由于 `docmd` 使用标准 CSS 变量，您可以向 AI 提问：*"使用 --link-color 和 --bg-color 为 docmd 提供一套专业的配色方案"*。模型将能够提供即粘即用的 CSS，与内置主题完美集成。
:::

## 需要完全不同的布局？

如果 CSS 覆盖还不够，您可以编写一个 **模板插件** —— 一个附带自己的 `layout.ejs`（以及您想要覆盖的任何 partials）外加 CSS/JS bundle 的包。模板是具有 `capabilities: ['template']` 的一等公民插件，叠在现有 theme + customCss 系统之上。

完整指南和示例模板包结构请参阅 [模板](templates.md)。
