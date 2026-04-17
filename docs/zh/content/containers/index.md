---
title: "自定义交互容器"
description: "docmd 中所有可用交互式 UI 构建块的完整目录。"
---

Standard Markdown excels at basic text formatting, but professional technical documentation requires rich structural components to effectively communicate complex logic. `docmd` extends Markdown with a suite of **isomorphic containers** that render into responsive, high-fidelity UI elements.

<!-- SCREENSHOT: Montage of all container types on a single page — callouts (info, warning, danger, tip), tabs with code, steps, cards grid, hero section, and collapsible sections. -->


## 块语法参考

所有容器均采用一致的块语法，确保整个项目中可预测的编写体验。

```markdown
::: type "可选标题"
这是主要内容区域。
它支持 **Markdown**、图片和深度组件嵌套。
:::
```

| 组件 | 关键字 | 主要使用场景 |
| :--- | :--- | :--- |
| **[提示框](./callouts)** | `callout` | 提示、警告和告警的语义高亮。 |
| **[卡片](./cards)** | `card` | 用于功能网格和布局控制的框架结构块。 |
| **[栅格](./grids)** | `grids` | 自动调整的多列结构组。 |
| **[标签页](./tabs)** | `tabs` | 用于备选平台说明的交互式可切换面板。 |
| **[步骤](./steps)** | `steps` | 用于操作指南和教程的可视化编号时间线。 |
| **[按钮](./buttons)** | `button` | 自闭合、突出的行动号召导航链接。 |
| **[折叠区块](./collapsible)**| `collapsible`| 用于常见问题和深度技术数据的交互式手风琴切换。 |
| **[更新日志](./changelogs)** | `changelog` | 结构化、基于时间线的版本历史和发布说明。 |
| **[Hero](./hero)** | `hero` | 支持布局和滑块的高冲击力落地页章节。 |

## 容器的战略意义

容器不仅仅是视觉美化工具；它们还为 `docmd` 引擎和下游 AI Agent 提供高保真的**语义信号**：

1.  **AI 上下文映射**：将块标记为 `callout warning` 明确告知 LLM 在推理和生成阶段优先处理该信息。
2.  **结构完整性**：将 `cards` 与标准 CSS 结合，无需离开 Markdown 环境即可创建复杂的落地页。
3.  **源码可维护性**：消除文档源码中的"HTML 臃肿"，保持 `.md` 文件简洁且机器可读。

## 递归组合

`docmd` 支持**无限嵌套深度**。你可以在任意容器内嵌套另一个容器，纯用 Markdown 构建复杂的交互式文档节点。

```markdown
::: card "架构概览"
    ::: callout info
        此模块使用异步 I/O 管道。
    :::
    ::: button "深入了解核心引擎" /advanced/developer-guide
:::
```

[掌握嵌套指南 →](./nested-containers)
