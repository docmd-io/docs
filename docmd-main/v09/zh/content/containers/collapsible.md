---
title: "可折叠区块"
description: "为 FAQ、深度内容和剧透嵌入交互式手风琴式切换。"
---

`collapsible` 容器创建一个交互式的、可切换的手风琴。它非常适合 FAQ 和详细的技术配置，使次要信息可访问而不会使主视图变得杂乱。

## 容器语法 (Container Syntax)

```markdown
::: collapsible [open] [title:"摘要切换文本"] [icon:图标名称] # 折叠区块开启
交互式内部内容（Markdown 文本、代码块、列表、提示框）...
::: /collapsible # 显式闭合标签
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **展开标识** | `open` | 可选。在页面初始加载时将手风琴初始化为展开状态。 |
| **摘要标题** | `"String"` \| `title:"..."` | 渲染在摘要切换栏上的标题文本（第 1 位置参数或 `title:"..."`）。 |
| **图标支持** | `icon:名称` | 可选。在摘要标题文本前添加 [Lucide](external:https://lucide.dev/icons) 图标。 |
| **容器别名** | `::: details` | 原生支持 `::: details` 以及无空格语法 `:::collapsible`。 |
| **闭合标签** | `::: /collapsible`, `::: /details`, `:::` | 支持显式命名闭合标签或通用 `:::` 闭合标记。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::


## 示例

### 默认状态

可折叠部分默认是关闭的。非常适合 FAQ 和降低视觉密度。

```markdown
::: collapsible title:"How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
::: /collapsible
```

::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::

### 默认展开

使用 `open` 标志标记那些应该默认可见但允许用户最小化的部分。

```markdown
::: collapsible open title:"Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
::: /collapsible
```

::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
:::

### 富内容

可折叠部分可以包含任何 Markdown，包括语法高亮的代码块。

````markdown
::: collapsible title:"Sample JSON Response"
```json
{
  "status": "success",
  "data": { "version": "0.8.2" }
}
```
:::
````

::: collapsible "Sample JSON Response"
```json
{
  "status": "success",
  "data": { "version": "0.8.2" }
}
```
:::

::: callout tip
`collapsible` 内的内容会被搜索引擎完整索引，并包含在 `llms.txt` 流中。AI 智能体可以基于隐藏的技术细节回答问题，同时保持面向人类的界面整洁。
:::