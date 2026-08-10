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


::: hero layout:slider
::: slide
# 同构核心引擎
静态渲染，客户端无缝执行。
::: /slide

::: slide
# AI 上下文优化
针对 LLM 代理的结构感知解析。
::: /slide
::: /hero