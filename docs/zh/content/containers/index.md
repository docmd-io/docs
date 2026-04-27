---
title: "容器概览 (Containers Overview)"
description: "使用内置的交互式组件扩展标准的 Markdown，使你的文档从静态页面转变为功能丰富的应用。"
---

`docmd` 容器允许你在不编写任何 HTML 或 CSS 的情况下，将复杂的 UI 元素（如按钮、卡片、折叠区块和选项卡）直接注入到你的文档源文件中。

## 块语法参考

所有容器都使用一致的块语法，确保在整个项目中拥有可预测的编写体验。

```markdown
::: 类型 "可选页眉标题"
这是主要内容区域。
它支持 **Markdown**、图像和深层组件嵌套。
:::
```

| 组件 | 关键字 | 主要用例 |
| :--- | :--- | :--- |
| **[标注 (Callouts)](callouts.md)** | `callout` | 用于技巧、警告和警报的语义化突出显示。 |
| **[卡片 (Cards)](cards.md)** | `card` | 用于功能网格和布局控制的有框结构块。 |
| **[网格 (Grids)](grids.md)** | `grids` | 自动调整的多列结构组。 |
| **[选项卡 (Tabs)](tabs.md)** | `tabs` | 用于替代平台说明的交互式可切换面板。 |
| **[步骤 (Steps)](steps.md)** | `steps` | 用于“如何操作”指南和教程的视觉数字时间线。 |
| **[标签 (Tags)](tags.md)** | `tag` | 用于版本、状态或突出的自闭合彩色标签。 |
| **[按钮 (Buttons)](buttons.md)** | `button` | 自闭合、突出的呼吁操作导航链接。 |
| **[折叠区块 (Collapsibles)](collapsible.md)**| `collapsible`| 用于 FAQ 和深度技术数据的交互式手风琴切换。 |
| **[变更日志 (Changelogs)](changelogs.md)** | `changelog` | 结构化、基于时间线的版本历史和发布说明。 |
| **[英雄区块 (Hero)](hero.md)** | `hero` | 具有布局和滑块支持的高影响力落地页部分。 |

## 容器的战略重要性

容器的作用不仅仅是视觉上的点缀；它们向 `docmd` 引擎和下游 AI 代理提供高保真的 **语义信号 (Semantic Signals)**：

1.  **AI 上下文映射**：将一个块标记为 `callout warning` 会明确告诉 LLM 在其推理和生成阶段优先考虑该信息。
2.  **结构完整性**：将 `cards` 与标准 CSS 结合使用，可以在不离开 Markdown 环境的情况下创建复杂的落地页。
3.  **源码可维护性**：消除文档源码中的“HTML 臃肿”，保持 `.md` 文件整洁且机器可读。

## 递归组合

`docmd` 支持 **无限嵌套深度**。你可以在一个容器内组合任何其他容器，纯粹用 Markdown 构建复杂的交互式文档节点。

```markdown
::: card "架构概览"
    ::: callout info
        此模块利用异步 I/O 流水线。
    :::
    ::: button "深入核心引擎" /advanced/developer-guide
:::
```
