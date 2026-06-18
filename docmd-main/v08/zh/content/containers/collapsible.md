---
title: "可折叠区块"
description: "为 FAQ、深度内容和剧透嵌入交互式手风琴式切换。"
---

`collapsible` 容器创建一个交互式的、可切换的手风琴。它非常适合 FAQ 和详细的技术配置，使次要信息可访问而不会使主视图变得杂乱。

::: callout info "VitePress 别名"
如果您正在从 VitePress 迁移，请使用 `:::details` 作为 `:::collapsible` 的别名。无空格语法如 `:::collapsible` 同样有效。
:::

## 语法参考

```markdown
::: collapsible [open] "Title text" [property:value...]
Main content goes here.
:::
```

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| **打开状态** | `open` | 可选。如果提供，则该部分以展开状态初始化。 |
| **标题** | `"String"` | 在切换栏上渲染的文字。默认为 "Click to expand"。 |
| **图标** | `icon:NAME` | 可选。在标题文字前添加一个 [Lucide](external:https://lucide.dev/icons) 图标。 |

## 示例

### 默认状态

可折叠部分默认是关闭的。非常适合 FAQ 和降低视觉密度。

```markdown
::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::
```

::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::

### 默认展开

使用 `open` 标志标记那些应该默认可见但允许用户最小化的部分。

```markdown
::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
:::
```

::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
:::

### 富内容

可折叠部分可以包含任何 Markdown，包括语法高亮的代码块。

````markdown
::: collapsible "Sample JSON Response"
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
