---
title: "折叠区块"
description: "为常见问题、深度内容和隐藏内容嵌入交互式手风琴折叠切换。"
---

The `collapsible` container creates an interactive, toggleable section (accordion). This pattern is ideal for FAQs, detailed technical configuration, or any secondary information that should be accessible without cluttering the primary documentation flow.

## 语法

```markdown
::: collapsible [open] "标题文本"
主要内容在此处。
:::
```

### 选项参考
- **`open`**：（可选）指定后，折叠区域初始时为展开状态。
- **`"标题"`**：交互式切换栏上显示的文本。省略时默认为"点击展开"。

## 详细实现示例

### 标准用法（初始状态：折叠）
主要用于常见问题或减少技术页面的视觉密度。

```markdown
::: collapsible "如何升级 docmd？"
运行 `npm update -g @docmd/core` 以获取最新稳定引擎。
:::
```
::: collapsible "如何升级 docmd？"
运行 `npm update -g @docmd/core` 以获取最新稳定引擎。
:::

### 可选可见性（初始状态：展开）
适合默认应可见但允许用户最小化以获得更简洁视图的章节。

```markdown
::: collapsible open "环境先决条件"
1.  Node.js v18+（推荐 LTS 版本）
2.  PNPM 包管理器
:::
```
::: collapsible open "环境先决条件"
1.  Node.js v18+（推荐 LTS 版本）
2.  PNPM 包管理器
:::

### 嵌套技术数据
折叠区块可包含复杂 Markdown 元素，包括语法高亮代码块。

````markdown
::: collapsible "分析示例 JSON 响应"
```json
{
  "status": "success",
  "data": { "version": "0.6.2" }
}
```
:::
````
::: collapsible "分析示例 JSON 响应"
```json
{
  "status": "success",
  "data": { "version": "0.6.2" }
}
```
:::

::: callout tip
虽然 `collapsible` 中的内容对人类用户可能是隐藏的，但它对 `docmd` 搜索索引完全可见，并包含在统一的 `llms-full.txt` 流中。这确保了 AI Agent 可以基于隐藏的技术细节提供全面答案，同时人类界面保持简洁和有序。
:::
