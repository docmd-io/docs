---
title: "标注 (Callouts)"
description: "使用语义化的视觉区块突出显示关键警告、专业技巧和背景信息。"
---

标注用于隔离那些需要读者立即注意的信息。`docmd` 提供了五种语义类型，每种都具有独特的视觉样式和主题图标。

## 容器语法 (Container Syntax)

```markdown
# 标准标注容器模式
::: callout 类型 ["标题文本"] [icon:图标名称] # 容器开启
支持 Markdown、代码块与按钮的正文内容...
::: /callout # 显式闭合标签

# 迁移别名模式
::: 类型 ["标题文本"] [icon:图标名称]
正文内容...
::: /类型
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **语义类型** | `info` \| `tip` \| `warning` \| `danger` \| `success` | 基础语义类型，定义默认背景样式、边框颜色与主题图标。 |
| **标题文本** | `"String"` \| `title:"..."` | 可选标题（第 2 个位置参数或 `title:"..."`）。将覆盖默认语义标题。 |
| **图标覆盖** | `icon:NAME` | 可选。使用自定义 [Lucide](external:https://lucide.dev/icons) 图标覆盖默认类型图标。 |
| **迁移别名** | `::: tip`, `::: warning`, `::: danger`, `::: info`, `::: note`, `::: caution` | 无缝兼容 VitePress 和 Docusaurus 的开箱即用别名。 |
| **闭合标签** | `::: /callout`, `::: /tip`, `:::` | 支持显式命名闭合标签或通用 `:::` 闭合标记。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::

::: callout info "迁移友好的别名"
如果您从 **VitePress** 或 **Docusaurus** 迁移，可以直接使用它们的原生语法：
- `:::tip`、`:::warning`、`:::danger`、`:::info`（VitePress）
- `:::note`、`:::caution`（Docusaurus）

这些别名的渲染效果与 `docmd` 等效语法完全相同。无空格语法如 `:::callout` 也同样支持。
:::


### 支持的语义类型

| 类型 | 意图 | 视觉信号 |
| :--- | :--- | :--- |
| `info` | **通用数据** | 上下文背景或有用的非关键信息。 |
| `tip` | **优化** | 性能捷径或“专业技巧”。 |
| `warning`| **警告** | 潜在问题或需要关注的弃用功能。 |
| `danger` | **危险** | 数据丢失风险、破坏性变更或系统故障。 |
| `success`| **成功** | 成功配置或构建的确认。 |

## 实现展示

### 1. 极简信息说明
```markdown
::: callout info
旧版配置架构仍然受支持，但不再推荐使用。
::: /callout
```
::: callout info
旧版配置架构仍然受支持，但不再推荐使用。
:::

### 2. 带有自定义标题的高优先级警报
```markdown
::: callout warning title:"破坏性变更目标"
自 `v0.7.0` 起，内部 WebSocket RPC 系统将正式弃用。
::: /callout
```
::: callout warning "破坏性变更目标"
自 `v0.7.0` 起，内部 WebSocket RPC 系统将正式弃用。
:::

### 3. 丰富内容组合
标注支持全方位的 Markdown，允许你在警报中嵌入按钮和代码块。

````markdown
::: callout tip title:"优化的本地测试" icon:command
在开发过程中使用 preserve 标志来保留构建文件：

```bash
docmd dev --preserve
```

::: button title:"CLI 标志参考" url:"/cli-commands"
:::
````

::: callout info "优化的本地测试" icon:command
使用 preserve 标志来保留构建文件：

```bash
npx @docmd/core dev --preserve
```

::: button "CLI 标志参考" ./#cli-commands
:::

::: callout tip "AI 的优先逻辑"
对于 LLM，标注充当 **高优先级锚点 (High-Priority Anchors)**。通过使用 `::: callout danger` 来记录破坏性变更或系统限制，你可以提供一个清晰的信号，即 AI 模型在推理和生成过程中必须优先处理此信息。
:::