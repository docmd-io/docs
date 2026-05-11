---
title: "Math 插件"
description: "docmd 的原生 KaTeX/LaTeX 数学公式集成。"
---

**Math 插件**为你的 docmd 网站添加原生 LaTeX 和 KaTeX 支持。

它将 `markdown-it-texmath` 与 `katex` 计算引擎安全集成，平滑渲染内联和块级数学公式，无需复杂的客户端 JavaScript 库。

## 安装

```bash
docmd add math
```

```javascript
plugins: {
  math: {}
}
```

## 工作原理

1. 通过 `docmd.config.js` 启用插件。
2. 用 `$`（内联）或 `$$`（块级）标识符包裹标准 LaTeX 数学公式。
3. 服务器在静态站点构建时以原始静态 HTML 标签的形式智能处理这些数学规则。
4. 注入的极简 CSS 自动为这些类设置作用域，用户访问页面时即刻呈现可视化效果！

## 用法

### 内联数学公式

使用单个美元符号 `$` 在段落中无缝注入标准方程式：

```markdown
这是一个内联方程式：$E = mc^2$
```

这是一个内联方程式：$E = mc^2$

### 块级数学公式

对于较宽的数学证明或独立公式，使用双美元符号 `$$` 进行块级格式化：

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
