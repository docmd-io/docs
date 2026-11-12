---
title: "Math 插件"
description: "docmd 的原生 KaTeX/LaTeX 数学集成。"
---

`@docmd/plugin-math` 插件为 docmd 提供原生的 LaTeX 和 KaTeX 数学公式渲染。该插件基于 `markdown-it-texmath` 和 KaTeX 构建，公式会被编译为带有可选 CSS 资源注入的静态 HTML 元素。

## 安装与设置

通过 CLI 安装该插件：

```bash
npx @docmd/core add math
```

在 `docmd.config.json` 中启用该插件：

```json "docmd.config.json"
{
  "plugins": {
    "math": {}
  }
}
```

## 核心能力

* **行内与块级解析**: 解析由单个 `$`（行内）或双 `$$`（块级）定界符包围的公式。
* **条件性资源注入**: KaTeX 样式表（~30 KB）仅在包含公式元素（`class="katex"` 或 `class="katex-display"`）的页面上注入。无公式页面产生零资源开销。
* **快速初始化**: 数学标记在构建阶段完成评估，确保页面加载时零布局偏移（CLS）。

## 用法与语法

### 行内数学公式

使用单个美元符号 (`$`) 在正文中嵌入表达式：

```markdown
质能方程是 $E = mc^2$。
```

质能方程是 $E = mc^2$。

### 块级数学公式

使用双美元符号 (`$$`) 渲染多行证明与居中显示公式：

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$

::: callout tip "性能优化" icon:zap
由于 KaTeX 资源在每个页面按需条件加载，因此在部分页面中添加数学公式不会影响整个文档站点其他页面的加载速度。
:::