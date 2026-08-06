---
title: "卡片 (Cards)"
description: "在 docmd 中将信息组织到带边框、视觉独特的容器中，适用于功能网格和落地页。"
---

卡片将相关内容封装到一个独特的、带边框的框架中，可选带标题，为文档页面提供清晰的视觉层次结构。

## 语法参考

```markdown
::: card "标题文本" [属性:值...]
这是卡片的主要内容区域。
:::
```

| 参数 | 类型 | 描述 |
| :--- | :--- | :--- |
| **Title** | `"String"` | 可选的标头标题，渲染在卡片框架顶部。 |
| **Icon** | `icon:名称` | 可选。在标头标题文本旁边添加一个 [Lucide](external:https://lucide.dev/icons) 图标。 |

## 用例示例

### 功能亮点卡片

使用卡片框定具有明确标题和图标的单一技术功能：

```markdown
::: card "异步生成" icon:zap
核心引擎使用非阻塞 I/O 管道，可在毫秒内编译数千个页面。
:::
```

::: card "异步生成" icon:zap
核心引擎使用非阻塞 I/O 管道，可在毫秒内编译数千个页面。
:::

### 丰富内容组合

卡片接受任何 Markdown 内容，包括代码片段和按钮容器：

```markdown
::: card "即时本地化"
使用内置的 i18n 支持为全球受众准备文档。

```bash
npx @docmd/core build
```

::: button "本地化策略指南" ../getting-started/quick-start.md
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
