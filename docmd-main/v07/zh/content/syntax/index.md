---
title: "Markdown 语法基础"
description: "掌握 docmd 的基础格式规则：标题、排版样式和技术块。"
---

`docmd` 遵循标准 **GitHub Flavored Markdown (GFM)** 规范。本指南建立了在整个文档网站中编写核心内容的基准标准。

## 排版样式

| 属性 | Markdown 语法 | 视觉效果 |
| :--- | :--- | :--- |
| **强调** | `**Text**` | **粗体技术术语** |
| **斜体** | `*Text*` | *斜体变量* |
| **删除线** | `~~Text~~` | ~~已废弃逻辑~~ |
| **内联代码** | `` `code` `` | `engine.initialize()` |

## 结构元素

### 语义化标题层次

```markdown
# 一级标题（通过 Frontmatter 自动生成）
## 二级标题（主要章节）
### 三级标题（功能细节）
```

::: callout tip "AI 逻辑完整性"
高级 AI 模型和搜索索引器依靠严格的标题层次结构来建立对项目的精确理解。避免"跳级标题"（如从 H2 直接跳到 H4），可确保 `llms-full.txt` 上下文流在时序和逻辑上保持连贯。
:::

### 导航与引用

内部文档节点和外部资源均使用标准链接语法。

```markdown
[外部资源](https://docmd.io)
[内部模块](../api/node-api.md)
```

### 枚举与列表

*   **无序列表**：使用 `*` 或 `-` 创建易于扫描的项目符号。
*   **有序逻辑**：使用 `1.`、`2.` 等表示有序步骤。（对于教程，建议使用高级**[步骤容器](../containers/steps)**。)

## 技术块级元素

### 引用块
标准 `>` 语法非常适合突出显示外部引用或背景上下文。

> docmd 引擎重新定义了静态站点生成与动态应用交付之间的边界。

### 数据表格

| 属性 | 数据类型 | 默认值 |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |

## 原生 HTML 支持

`docmd` 启用了原生 HTML 解析，你可以直接在 Markdown 文件中嵌入复杂布局或特殊样式，满足个性化 UI 需求。

```html
<div style="padding: 2rem; border: 1px solid var(--border-color); border-radius: 12px; text-align: center;">
  自定义 UI 元素放在这里。
</div>
```