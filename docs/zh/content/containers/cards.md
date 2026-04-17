---
title: "卡片"
description: "将信息整理为带边框、视觉鲜明的容器，非常适合功能网格和落地页。"
---

Cards are the primary structural building blocks in `docmd`. They encapsulate related content into a distinct, bordered frame with optional headers, providing a clear visual hierarchy for your documentation.

## 语法参考

```markdown
::: card "可选标题"
这是卡片的主要内容区域。
:::
```

## 实际应用示例

### 1. 功能展示
使用卡片突出重要技术优势或模块功能。
```markdown
::: card "异步生成"
`docmd` 核心引擎使用非阻塞 I/O 管道，能在毫秒内生成数千个页面。
:::
```
::: card "异步生成"
`docmd` 核心引擎使用非阻塞 I/O 管道，能在毫秒内生成数千个页面。
:::

### 2. 多组件集成
卡片可容纳任意标准 Markdown 元素，包括语法高亮代码和行动号召按钮。

````markdown
::: card "即时本地化"
使用内置 i18n 支持为全球受众准备文档。

```bash
docmd add i18n
```

::: button "L10n 策略指南" /guides/localization
:::
````

::: card "即时本地化"
使用内置 i18n 支持为全球受众准备文档。

```bash
docmd add i18n
```

::: button "L10n 策略指南" ./#localization
:::

## 多列布局（栅格）

你可以利用原生 `grids` 容器将卡片组织成整洁的响应式多列布局，无需接触任何 HTML。

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

::: callout tip "AI 语义聚类"
在 `llms-full.txt` 流中，包裹在 `card` 中的内容会被 AI Agent 视为**内聚主题集群**。使用卡片分隔同页面上的不相关技术概念，防止上下文泄漏，确保 LLM 生成的摘要保持逻辑隔离和准确性。
:::
