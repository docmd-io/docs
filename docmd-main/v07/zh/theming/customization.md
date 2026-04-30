---
title: "自定义与变量"
description: "docmd CSS 变量和组件类的完整参考，用于高级样式定制。"
---

`docmd` 采用 CSS 变量优先架构。这意味着只需在 `:root` 块中覆盖少数几个变量，无需编写复杂的 CSS 选择器，即可重新设计整个网站的样式。

## 全局变量参考

| 变量 | 亮色模式默认值 | 暗色模式默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#09090b` | 页面主背景色 |
| `--text-color` | `#3f3f46` | `#a1a1aa` | 正文文本颜色 |
| `--text-heading` | `#09090b` | `#fafafa` | 标题与页眉颜色 |
| `--link-color` | `#068ad5` | `#068ad5` | 主色调 / 链接颜色 |
| `--border-color` | `#e4e4e7` | `#27272a` | 分割线与边框颜色 |
| `--sidebar-bg` | `#fafafa` | `#09090b` | 导航背景色 |
| `--ui-border-radius` | `6px` | `6px` | 所有 UI 项的圆角大小 |
| `--sidebar-width` | `260px` | `260px` | 侧边栏列宽 |

## 覆盖示例

如需更改网站主色调，请将以下内容添加到 `customCss` 文件中：

```css
:root {
  --link-color: #f43f5e; /* Rose 500 */
}

body[data-theme="dark"] {
  --link-color: #fb7185; /* Rose 400 */
}
```

## 组件定向覆盖

如需对特定组件进行样式化，可使用以下顶级类名：

*   `.main-content`：所有 Markdown 内容的包裹容器。
*   `.sidebar-nav`：内部导航列表。
*   `.page-header`：顶部导航栏。
*   `.docmd-search-modal`：搜索弹框。
*   `.docmd-tabs`：标签组件容器。
*   `.callout`：提示/备注框。

## 优先级排查

大多数 `docmd` 样式的优先级较低。如果覆盖未生效，请确认 `customCss` 是否已正确注册，并尝试在选择器前增加 `body` 前缀（如 `body .main-content`）。

::: callout tip
由于 `docmd` 使用标准 CSS 变量，你可以直接询问 AI：*"为 docmd 的 --link-color 和 --bg-color 提供一套专业配色方案"*。模型将给出即用型 CSS，完美兼容内置主题。
:::