---
title: "折叠区块 (Collapsible Sections)"
description: "为常见问题、深度内容和剧透内容嵌入交互式手风琴式切换按钮。"
---

`collapsible` 容器创建一个交互式的、可切换的区域（手风琴）。这种模式非常适合常见问题 (FAQ)、详细的技术配置，或任何应该在不干扰主要文档流程的情况下可以访问的次要信息。

## 语法

```markdown
::: collapsible [open] "标题文本"
  主要内容放在这里。
:::
```

### 选项参考
- **`open`**: (可选) 如果指定，该区域初始化时处于展开状态。
- **`"标题"`**: 渲染在交互式切换栏上的文本。如果省略，默认显示为 "点击以展开"。
- **`icon:NAME`**: (可选) 在标题文本前添加一个 [Lucide](external:https://lucide.dev/icons) 图标。

## 详细实现示例

### 标准用法 (初始状态：关闭)
主要用于常见问题或降低技术页面的视觉密度。

```markdown
::: collapsible "如何升级 docmd?"
  运行 `npm update -g @docmd/core` 来获取最新的稳定引擎。
:::
```
::: collapsible "如何升级 docmd?"
  运行 `npm update -g @docmd/core` 来获取最新的稳定引擎。
:::

### 选择性可见 (初始状态：打开)
非常适合那些默认应该可见，但允许用户将其最小化以获得更整洁视图的区域。

```markdown
::: collapsible open "环境先决条件"
  1.  Node.js v18+ (推荐 LTS)
  2.  PNPM 包管理器
:::
```
::: collapsible open "环境先决条件"
1.  Node.js v18+ (推荐 LTS)
2.  PNPM 包管理器
:::

### 嵌套技术数据
折叠区块可以包含复杂的 Markdown 元素，包括语法高亮的代码块。

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
虽然 `collapsible` 内部的内容可能对人类用户隐藏，但它对 `docmd` 搜索索引保持完全可见，并包含在统一的 `llms-full.txt` 流中。这确保了 AI 代理可以根据隐藏的技术细节提供全面的答案，同时人类界面保持整洁并具有优先级。
:::
