---
title: "高级 Markdown 语法"
description: "扩展格式功能：任务列表、自定义元素属性、脚注与语义定义。"
---

除标准 Markdown 外，docmd 还支持源自 GitHub 风格 Markdown (GFM) 与自定义属性插件的高保真扩展。这些工具提供对文档结构和样式的细粒度控制。

## 任务列表

为路线图追踪和发布规划创建交互式或只读的清单。

```markdown
- [x] Engine optimisation complete
- [ ] Plugin API finalisation
- [ ] Documentation audit
```

- [x] Engine optimisation complete
- [ ] Plugin API finalisation
- [ ] Documentation audit

## Emoji

使用标准的短代码添加视觉个性。Emoji 代码与周围文本内联渲染。

```markdown
We :heart: high-performance documentation! :rocket: :sparkles:
```

We :heart: high-performance documentation! :rocket: :sparkles:

## 自定义元素属性

使用 `{}` 语法为标题、图片和链接分配唯一的 ID 和 CSS 类。

### 自定义 ID

便于深度链接到具体的技术子章节。

```markdown
## Performance Benchmarks {#benchmarks-2026}
```

### CSS 类

无需触及 CSS 即可对特定元素应用样式工具类。

```markdown
## Centre-Aligned Section {.text-centre .text-blue}
```

### 按钮式链接

将任何标准的 Markdown 链接转换为带样式的号召性用语按钮。

```markdown
[Download Latest Release](#download){.docmd-button}
```

## 脚注

以脚注形式添加引用或技术深度内容。引擎会自动收集并在页面底部渲染它们。

```markdown
Architectural decisions are documented in the RFC.[^1]

[^1]: RFC-42: Isomorphic Rendering Pipeline.
```

Architectural decisions are documented in the RFC.[^1]

[^1]: RFC-42: Isomorphic Rendering Pipeline.

## 定义列表

非常适合 API 参数描述和术语表。

```markdown
PropName
: The unique identifier for the configuration key.

DefaultValue
: The value used when no override is specified.
```

PropName
: The unique identifier for the configuration key.

DefaultValue
: The value used when no override is specified.

## 缩写

在页面内全局定义缩写。将鼠标悬停在术语上即可显示其完整定义。

```markdown
*[SPA]: Single Page Application
The docmd router enables a seamless SPA experience.
```

*[SPA]: Single Page Application
The docmd router enables a seamless SPA experience.

::: callout tip "AI 的上下文精确性"
定义和缩略语为 AI 智能体提供了高质量的技术信号。明确的语义定义可防止 `llms.txt` 上下文流中的词义歧义。
:::