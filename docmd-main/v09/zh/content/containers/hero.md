---
title: "Hero 头部区块"
description: "在 docmd 中使用 Markdown 构建高视觉冲击力的落地页头部和营销亮点。"
---

`hero` 容器为落地页创建视觉震撼的头部，支持媒体分割布局和轮播组件。

## 容器语法 (Container Syntax)

```markdown
::: hero [layout:split|slider] [glow:true|false] # Hero 容器开启
::: slide # 单个轮播面板开启
# 同构核心引擎
静态渲染，客户端无缝执行。
::: /slide # 显式面板闭合

::: slide # 第二个面板开启
# AI 上下文优化
针对 LLM 代理的结构感知解析。
::: /slide
::: /hero # 显式 Hero 闭合
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **布局变体** | `layout:split` \| `layout:slider` | `split` 将内容拆分为主文本与媒体区；`slider` 创建水平滚动轮播。 |
| **辉光效果** | `glow:true` \| `glow:false` | 在 Hero 头部背景注入微妙的径向渐变辉光。 |
| **子容器包装** | `::: slide` ... `::: /slide` | 定义轮播中的单个面板。传统 `== slide` 标记亦获支持。 |
| **闭合标签** | `::: /hero`, `::: /slide`, `:::` | 支持显式命名闭合标签或通用 `:::` 闭合标记。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::

## 使用示例 (Usage Examples)

### 分割布局 (Split Layout)

使用 `== side` 分隔符将内容划分为主 Hero 文本区域和次要媒体区域：

```markdown
::: hero layout:split glow:true # 分割 Header 布局
# docmd
同构执行引擎，AI 优化的文档。

::: button title:"快速开始指南" url:"../../getting-started/quick-start.md" color:blue

== side
::: embed url:"https://www.youtube.com/watch?v=0CSyIBHQy9g"
::: /hero
```

::: hero layout:split glow:true
# docmd
同构执行引擎，AI 优化的文档。

::: button "快速开始指南" ../../getting-started/quick-start.md color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
::: /hero

### 滑块布局 (Slider Layout)

使用显式 `::: slide` 子容器构建 Hero 内容面板的交互式轮播：

```markdown
::: hero layout:slider # 交互式轮播容器
::: slide # 面板 1
# 同构核心引擎
静态渲染，并在客户端无缝执行。
::: /slide

::: slide # 面板 2
# AI 上下文优化
面向 LLM 智能体的感知结构解析。
::: /slide
::: /hero
```

::: hero layout:slider
::: slide
# 同构核心引擎
静态渲染，并在客户端无缝执行。
::: /slide

::: slide
# AI 上下文优化
面向 LLM 智能体的感知结构解析。
::: /slide
::: /hero

::: callout tip "Hero 设计最佳实践" icon:lightbulb
在深色主题站点上使用 `glow:true` 可获得高级视觉效果。在 `== side` 之前的主文本区域放置 `::: button` 元素，以保证移动端正确的堆叠顺序。
:::