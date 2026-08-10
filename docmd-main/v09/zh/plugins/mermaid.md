---
title: "Mermaid 图表插件"
description: "Mermaid.js 图表的零配置集成，支持自动主题同步与按需加载 JavaScript 资源。"
---

`@docmd/plugin-mermaid` 插件将 [Mermaid.js](external:https://mermaid.js.org/) 无缝集成到 `docmd` 中。它同时注册了标准 Markdown 代码块解析器（` ```mermaid `）与显式的 `::: mermaid` 容器渲染器，为网页提供具备平移与缩放功能的交互式 SVG 图表。

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: mermaid` ... `::: /mermaid`）、显式的键值对属性（`title:"..."`、`align:center`）以及末尾的 `# 注释`。单图表的个性化定制通过容器语法处理，而全局默认值则在 `docmd.config.json` 中统一配置。
:::

## 插件配置项

在 `docmd.config.json` 中配置全局选项：

```json "docmd.config.json"
{
  "plugins": {
    "mermaid": {
      "enabled": true,
      "theme": "default",
      "darkTheme": "dark",
      "zoom": true
    }
  }
}
```

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 全局启用或禁用 Mermaid 图表渲染。 |
| `theme` | `string` | `"default"` | 浅色模式下的默认图表主题（`default`、`forest`、`neutral`）。 |
| `darkTheme` | `string` | `"dark"` | 深色模式下用于自动切换的主题。 |
| `zoom` | `boolean` | `true` | 默认启用交互式缩放和平移控件。 |

::: callout tip "禁用插件" icon:slash
若在 `docmd.config.json` 中将 `@docmd/plugin-mermaid` 禁用或移除，`::: mermaid` 容器渲染与 ` ```mermaid ` 代码块解析均将被彻底关闭，且不会在客户端注入任何 JavaScript 静态资源。
:::

## 图表编写与使用

`docmd` 支持图表的混合编写模式：

* **[Mermaid 容器指南](../content/containers/mermaid.md)**：探索推荐使用的 `::: mermaid` 容器语法，以实现单图表标题、对齐方式、自定义主题及显式闭合标签。
* **标准代码块**：使用标准 ` ```mermaid ` 代码块以保持 100% 的 GitHub Markdown (GFM) 兼容性。

### 快速示例

```markdown
::: mermaid title:"身份验证流程" align:center zoom:true # 容器
sequenceDiagram
    autonumber
    Client->>Server: POST /login
    Server-->>Client: 200 OK (Token)
::: /mermaid
```

如需获取完整的语法参考及高级单图表配置，请参阅 **[Mermaid 容器参考文档](../content/containers/mermaid.md)**。