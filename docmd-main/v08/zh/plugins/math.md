---
title: "Math 插件"
description: "docmd 的原生 KaTeX/LaTeX 数学集成。"
---

**Math 插件** 为您的 docmd 站点添加原生 LaTeX 和 KaTeX 支持。

它使用与 `katex` 计算引擎集成的 `markdown-it-texmath`。这能流畅地渲染行内和块级方程，无需复杂的客户端 JavaScript 库。

## 配置

Math 插件是可选插件。通过 CLI 安装：

```bash
npx @docmd/core add math
```

在您的 `docmd.config.json` 中启用它：

### 示例

```json "docmd.config.json"
{
  "plugins": {
    "math": {}
  }
}
```

## 工作原理

1. 通过您的 `docmd.config.json` 启用该插件。
2. 用 `$`（行内）或 `$$`（块）包裹您的标准 LaTeX 数学公式。
3. 引擎在构建过程中完全像处理原始静态 HTML 标签一样处理这些规则。
4. 极少的注入 CSS 自动为这些类添加样式。这能在页面加载时立即呈现。

## 条件性资源加载（0.8.7 新增）

KaTeX 样式表（约 30 KB）仅在实际渲染数学的页面上加载。没有公式的页面完全跳过获取，因此一个仅有 5 个数学页面的 100 页文档站点只需在这 5 个页面上承担 CSS 成本。检测会扫描每个页面渲染后的 HTML 中是否存在 `class="katex"` 或 `class="katex-display"` 标记，并有条件地注入资源。无需配置 —— 该行为是自动的。

## 用法

### 行内数学

使用单个美元符号 `$` 在段落中注入标准方程：

```markdown
Here is an inline equation: $E = mc^2$
```

Here is an inline equation: $E = mc^2$

### 块级数学

对于更宽的数学证明或不同的形式化表示，使用双美元符号 `$$` 进行块级格式化：

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$