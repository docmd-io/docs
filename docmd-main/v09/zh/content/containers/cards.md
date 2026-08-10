---
title: "卡片 (Cards)"
description: "在 docmd 中将信息组织到带边框、视觉独特的容器中，适用于功能网格和落地页。"
---

卡片将相关内容封装到一个独特的、带边框的框架中，可选带标题，为文档页面提供清晰的视觉层次结构。

## 容器语法 (Container Syntax)

```markdown
::: card [title:"标题文本"] [icon:图标名称] # 卡片容器开启
支持 Markdown、代码片段、按钮与标注的正文区块...
::: /card # 显式闭合标签
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **标题** | `"String"` \| `title:"..."` | 可选标题，渲染在卡片框架顶部（第 1 个位置参数或 `title:"..."`）。 |
| **图标显示** | `icon:NAME` | 可选。在标题文本旁边插入一个 [Lucide](external:https://lucide.dev/icons) 图标。 |
| **Markdown 内容** | 任意文本 | 支持任意 Markdown 元素、代码块、列表、按钮和嵌套容器。 |
| **闭合标签** | `::: /card`, `:::` | 支持显式命名闭合标签 `::: /card` 或通用 `:::`。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::


## 用例示例

### 功能亮点卡片

使用卡片框定具有明确标题和图标的单一技术功能：

```markdown
::: card title:"异步生成" icon:zap
核心引擎使用非阻塞 I/O 管道，可在毫秒内编译数千个页面。
::: /card
```

::: card "异步生成" icon:zap
核心引擎使用非阻塞 I/O 管道，可在毫秒内编译数千个页面。
:::

### 丰富内容组合

卡片接受任何 Markdown 内容，包括代码片段和按钮容器：

```markdown
::: card title:"即时本地化"
使用内置的 i18n 支持为全球受众准备文档。

```bash
npx @docmd/core build
```

::: button title:"本地化策略指南" url:"../getting-started/quick-start.md"
:::
````

::: card "即时本地化"
使用内置的 i18n 支持为全球受众准备文档。

```bash
npx @docmd/core build
```

::: button "本地化策略指南" ../getting-started/quick-start.md
:::

### 多列布局

将多个卡片包裹在 `grids` 容器中，以获得响应式多列布局：

```markdown
::: grids
    ::: grid
        ::: card title:"主节点"
        主实例的配置选项。
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"从节点"
        副本实例的配置选项。
        ::: /card
    ::: /grid
::: /grids
```

::: grids
    ::: grid
        ::: card "主节点"
        主实例的配置选项。
        :::
    :::
    ::: grid
        ::: card "从节点"
        副本实例的配置选项。
        :::
    :::
:::

::: callout tip "AI 的语义聚类" icon:lightbulb
在 `llms.txt` 上下文流中，卡片包裹的内容被解析为 **内聚主题集群**。使用卡片分割概念可防止跨无关章节的上下文泄露。
:::
