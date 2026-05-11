---
title: "卡片 (Cards)"
description: "将信息组织到有框的、视觉上截然不同的容器中。非常适合功能网格和落地页。"
---

卡片是 `docmd` 中的主要结构化构建块。它们将相关内容封装到一个独特的、带边框的框架中，并带有可选的页眉，为你的文档提供清晰的视觉层次结构。

## 语法参考

```markdown
::: card "可选页眉标题"
这是卡片的主要内容区域。
:::
```

添加可选的 `icon:` 参数以在页眉中显示 [Lucide](external:https://lucide.dev/icons) 图标：
```markdown
::: card "设置" icon:rocket
几秒钟内即可开始使用。
:::
```
::: card "设置" icon:rocket
几秒钟内即可开始使用。
:::

## 实际应用示例

### 1. 功能展示
使用卡片来突出关键技术优势或模块功能。
```markdown
::: card "异步生成"
`docmd` 核心引擎利用非阻塞 I/O 流水线，能够在几毫秒内生成数千个页面。
:::
```
::: card "异步生成"
`docmd` 核心引擎利用非阻塞 I/O 流水线，能够在几毫秒内生成数千个页面。
:::

### 2. 多组件集成
卡片可以容纳任何标准的 Markdown 元素，包括语法高亮的代码和呼吁操作按钮。

````markdown
::: card "即时本地化"
使用内置的 i18n 支持为全球受众准备你的文档。

```bash
docmd add i18n
```

::: button "L10n 策略指南" /guides/localization
:::
````

::: card "即时本地化"
使用内置的 i18n 支持为全球受众准备你的文档。

```bash
docmd add i18n
```

::: button "L10n 策略指南" ./#localization
:::

## 多列布局 (网格)

你可以利用原生的 `grids` 容器将你的卡片组织成整洁、响应式的多列布局，而无需触碰任何 HTML。

```markdown
::: grids
    ::: grid
        ::: card "主节点"
            主实例的配置。
        :::
    :::
    ::: grid
        ::: card "从节点"
            冗余从实例的配置。
        :::
    :::
:::
```

::: callout tip "针对 AI 的语义聚类"
在 `llms-full.txt` 流中，包装在 `card` 中的内容被 AI 代理视为 **内聚的主题集群 (Cohesive Topic Cluster)**。利用卡片对同一页面上不相关的技术概念进行细分，可以防止上下文泄漏，并确保 LLM 生成的摘要逻辑隔离且准确。
:::
