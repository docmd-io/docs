---
title: "提示框"
description: "使用语义化视觉块突出显示关键警告、专业提示和背景说明。"
---

Callouts are used to isolate information that requires the reader's immediate attention. `docmd` provides five semantic types, each featuring distinct visual styling and themed iconography.

## 语法参考

```markdown
::: callout type "可选标题"
技术内容或警告信息。
:::
```

### 支持的语义类型

| 类型 | 用途 | 视觉信号 |
| :--- | :--- | :--- |
| `info` | **通用说明** | 上下文背景或有用的非关键信息。 |
| `tip` | **优化提示** | 性能快捷方式或专业建议。 |
| `warning`| **注意事项** | 潜在问题或需要关注的已弃用功能。 |
| `danger` | **关键警告** | 数据丢失风险、破坏性变更或系统故障。 |
| `success`| **成功确认** | 配置或构建成功的确认信息。 |

## 示例画廊

### 1. 简约信息提示
```markdown
::: callout info
旧版配置格式仍受支持，但不再推荐使用。
:::
```
::: callout info
旧版配置格式仍受支持，但不再推荐使用。
:::

### 2. 带自定义标题的高优先级警告
```markdown
::: callout warning "破坏性变更目标"
自 `v0.7.0` 起，内部 WebSocket RPC 系统将正式弃用。
:::
```
::: callout warning "破坏性变更目标"
自 `v0.7.0` 起，内部 WebSocket RPC 系统将正式弃用。
:::

### 3. 富文本内容组合
提示框支持完整的 Markdown 语法，允许在警告中嵌入按钮和代码块。

````markdown
::: callout tip "优化本地测试"
使用 preserve 标志在开发会话期间保留构建文件：

```bash
docmd dev --preserve
```

::: button "CLI 标志参考" /cli-commands
:::
````

::: callout tip "优化本地测试"
使用 preserve 标志在开发会话期间保留构建文件：

```bash
docmd dev --preserve
```

::: button "CLI 标志参考" ./#cli-commands
:::

::: callout tip "AI 优先逻辑"
对于 LLMs 而言，提示框充当**高优先级锚点**。通过使用 `::: callout danger` 记录破坏性变更或系统约束，你向 AI 模型发出清晰信号，让其在推理和生成过程中优先处理这些信息。
:::
