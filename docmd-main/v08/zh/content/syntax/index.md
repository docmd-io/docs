---
title: "Markdown 语法基础"
description: "适用于所有 docmd 内容的基线格式规则：排版、结构、列表与表格。"
---

`docmd` 遵循标准的 **GitHub 风格 Markdown (GFM)** 规范。本页涵盖适用于您项目中每个页面的核心格式原语。

## 排版

| 样式 | 语法 | 渲染效果 |
| :--- | :--- | :--- |
| **加粗** | `**text**` | **强调** |
| *斜体* | `*text*` | *弱化强调* |
| ~~删除线~~ | `~~text~~` | ~~已弃用内容~~ |
| `行内代码` | `` `text` `` | `engine.initialise()` |

## 标题层级

`docmd` 会从您 frontmatter 中的 `title` 字段自动派生出页面的 `<h1>`。请从 `##` 开始构建标题层级。

```markdown
## 二级 - 主要章节
### 三级 - 功能细节
#### 四级 - 子细节
```

::: callout tip "AI 的逻辑完整性"
AI 模型与搜索引擎依赖严格的标题层级来构建您项目的精确心智模型。避免跳过层级（例如从 `##` 跳到 `####`），以保持 `llms-full.txt` 上下文流的逻辑清晰。
:::

## 列表

使用无序列表表示可扫描的项目，使用有序列表表示顺序步骤。对于编号教程，请考虑使用更具表现力的 [Steps 容器](../containers/steps.md)。

```markdown
*   无序项
*   另一个项

1.  第一步
2.  第二步
```

## 引用块

标准的 `>` 语法用于突出外部引用或背景上下文。

```markdown
> docmd 引擎重新定义了静态站点生成与动态应用交付之间的边界。
```

> docmd 引擎重新定义了静态站点生成与动态应用交付之间的边界。

## 表格

```markdown
| 参数 | 类型 | 默认值 |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |
```

| 参数 | 类型 | 默认值 |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |

## 嵌入 HTML

docmd 启用了原始 HTML 解析。在 Markdown 文件中直接注入自定义布局或独特样式以满足特殊 UI 需求。

```html
<div style="padding: 2rem; border: 1px solid var(--border-colour); border-radius: 12px; text-align: centre;">
  Bespoke UI elements live here.
</div>
```
