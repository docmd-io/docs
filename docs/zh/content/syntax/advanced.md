---
title: "高级 Markdown 语法"
description: "充分利用 docmd 的扩展功能：自定义属性、GFM 扩展与语义定义。"
---

除标准 Markdown 外，`docmd` 还支持多种源自 GitHub Flavored Markdown (GFM) 和自定义属性插件的高保真扩展。这些工具可让你完全掌控文档的结构与样式。

## GFM 扩展

### 任务列表
创建可交互或只读的检查列表，适用于路线跟踪。
```markdown
- [x] 引擎优化完成
- [ ] 插件 API 内容确定
```
- [x] 引擎优化完成
- [ ] 插件 API 内容确定

### 自动链接识别
标准 URL 和电子邮件地址会被自动识别并转化为链接，无需额外标记：`https://docmd.io`

### 短代码 Emoji
`docmd` 支持标准短代码，可为文档增添视觉趣味。
> 我们 :heart: 高性能文档！:rocket: :smile:

## 自定义元素属性

使用花括号 `{}` 语法可甄气向标题、图片和链接添加唯一 ID 和 CSS 类。这是应用[自定义 CSS 样式](/theming/custom-css-js)的主要方式。

### 唯一语义 ID
用于直接定位到技术子章节的深层链接。
```markdown
## 性能基准测试 {#benchmarks-2026}
```

### CSS 功能类
为特定元素应用样式工具。
```markdown
## 居中对齐章节 {.text-center .text-blue}
```

### 按鈕链接
将任意标准 Markdown 链接转化为样式化的行动履用按鈕。
```markdown
[下载最新版本](/download){.docmd-button}
```

## 引用与定义

### 脚注引用
添加引用或技术深层内容[^1]，自动收集并在页跟渲染。

```markdown
架构决策记录在 RFC[^1] 中。

[^1]: RFC-42: 同构渲染流水线。
```

### 定义列表
非常适合 API 参数说明和词汇表。

```markdown
PropName
: 该配置项的唯一标识符。
```

PropName
: 该配置项的唯一标识符。

### 节略词生成
在页面中全局定义节略词，悬停时显示完整定义。

```markdown
*[SPA]: Single Page Application
docmd 路由器带来流畅的 SPA 体验。
```
*[SPA]: Single Page Application
docmd 路由器带来流畅的 SPA 体验。

::: callout tip "AI 上下文精确性"
使用**定义**和**节略词**可为 AI Agent 提供高质量的技术信号。当 AI 处理你的 `llms-full.txt` 上下文时，这些明确的定义可防止词义模糊，确保模型为项目特定术语生成逻辑正确的解释。
:::