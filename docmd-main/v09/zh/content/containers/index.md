---
title: "自定义交互式容器"
description: "docmd 结构化 UI 容器和交互组件的完整指南与目录。"
---

标准 Markdown 在基础文本格式化方面表现出色，但技术文档需要结构化组件来表达复杂的逻辑。`docmd` 扩展了 Markdown，提供了一整套**同构容器**。

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::

::: callout tip "从其他文档引擎迁移？" icon:sparkles
`docmd` 开箱即用支持来自 **VitePress** 和 **Docusaurus** 的语法别名。像 `:::tip`、`:::warning`、`:::note`、`:::details` 和 `:::caution` 这样的容器无需修改即可直接使用。
:::

## 统一块级语法参考

所有容器均采用统一且感知嵌套深度的块级语法，支持显式的开启与关闭标签、内联注释以及通用的键值对属性：

```markdown
::: containerType title:"标头标题" icon:rocket # 带有注释的容器标头
::: subContainer title:"条目标题" icon:code-2 # 显式子容器条目
这是主要内容区域。
它支持 **Markdown**、图像和深度组件嵌套。
::: /subContainer # 显式子容器闭合标签
::: /containerType # 显式主容器闭合标签
```

| 组件 | 关键字 | 主要应用场景 |
| :--- | :--- | :--- |
| **[Callouts 提示框](callouts.md)** | `callout` | 技巧、警告和关键通知的语义化提示。 |
| **[Cards 卡片](cards.md)** | `card` | 特性网格和落地页布局的带框结构容器。 |
| **[Grids 网格](grids.md)** | `grids` | 自动自适应的多列 Flexbox 布局组。 |
| **[Tabs 选项卡](tabs.md)** | `tabs` | 包含显式 `::: tab` 条目的交互式可切换面板。 |
| **[Steps 步骤](steps.md)** | `steps` | 包含显式 `::: step` 条目的可视化编号时间线。 |
| **[Collapsibles 手风琴](collapsible.md)** | `collapsible` | 用于 FAQ 和深层技术数据的交互式折叠面板。 |
| **[Buttons 按钮](buttons.md)** | `button` | 自闭合的显著行动号召导航链接。 |
| **[Tags 标签](tags.md)** | `tag` | 用于版本标签或状态标识的自闭合彩色徽章。 |
| **[Hero 区块](hero.md)** | `hero` | 支持分割布局与 `::: slide` 轮播的高冲击力落地页头部。 |
| **[URL 嵌入](embed.md)** | `embed` | 通过 `embed-lite` 实现零延迟的视频、社交与交互式媒体嵌入。 |
| **[Mermaid 图表](mermaid.md)** | `mermaid` | 包含单图表控制的流程图、时序图与架构映射图。 |
| **[嵌套容器](nested-containers.md)** | - | 复杂多组件布局的递归组合模式。 |

## 通用属性与键值对解析 (Universal Attribute & Key-Value Parsing)

所有容器标头均支持位置参数、命名键值对属性以及末尾内联注释（`# 注释`）：

```markdown
::: button title:"文档" url:"/docs/getting-started" icon:book color:#3b82f6 # 命名属性模式
::: card title:"架构概览" icon:cpu # 位置标题 + 图标属性
::: callout warning title:"安全策略" # 位置标题 + 注释
```

- **位置参数退避逻辑**：带双引号的字符串（`"我的标题"`）根据容器类型自动映射至 `title` 或 `url`。
- **命名覆盖**：`title:"..."`、`url:"..."`、`icon:...`、`color:#...` 允许以任意顺序指定属性。
- **内联注释**：容器标头行末尾的 `# 注释` 将在解析前自动剥离。

## 容器的战略优势 (Strategic Benefits of Containers)

容器带来的不仅是视觉改善；它们为 `docmd` 编译器及下游 AI 智能体提供了高质量的**语义信号**：

1. **AI 上下文映射**：将块标记为 `callout warning` 会明确指示 LLM 在推理和响应生成过程中优先处理该警告。
2. **结构完整性**：结合 `cards` 与 `grids` 允许直接在 Markdown 中编写复杂的落地页，而无需嵌入冗长的 HTML 标签。
3. **源码可维护性**：消除原生 HTML 标记，保持 `.md` 文件整洁、易读且易于机器解析。

## 递归组合与显式闭合标签 (Recursive Composition & Explicit Closers)

`docmd` 支持**无限嵌套深度**以及使用命名闭合标签（`::: /card`、`::: /tabs`）的确定性闭合解析：

```markdown
::: card title:"架构概览" # 父级卡片
    ::: callout info title:"异步 I/O" # 内层提示框
    该模块采用异步非阻塞 I/O 管道。
    ::: /callout # 闭合内层提示框
    ::: button title:"探索核心引擎架构" url:"/#architecture"
::: /card # 闭合父级卡片
```

[掌握嵌套指南](nested-containers.md)