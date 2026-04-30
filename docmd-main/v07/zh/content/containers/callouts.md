---
title: "标注 (Callouts)"
description: "使用语义化的视觉区块突出显示关键警告、专业技巧和背景信息。"
---

标注用于隔离那些需要读者立即注意的信息。`docmd` 提供了五种语义类型，每种都具有独特的视觉样式和主题图标。

## 语法参考

```markdown
::: callout 类型 "可选标题"
技术内容或警告放在这里。
:::
```

添加可选的 `icon:` 参数，可以用任何 [Lucide](external:https://lucide.dev/icons) 图标覆盖默认的类型图标：
```markdown
::: callout info "自定义图标" icon:sparkles
此标注使用自定义图标而不是默认的 info 图标。
:::
```

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
:::
```
::: callout info
旧版配置架构仍然受支持，但不再推荐使用。
:::

### 2. 带有自定义标题的高优先级警报
```markdown
::: callout warning "破坏性变更目标"
自 `v0.7.0` 起，内部 WebSocket RPC 系统将正式弃用。
:::
```
::: callout warning "破坏性变更目标"
自 `v0.7.0` 起，内部 WebSocket RPC 系统将正式弃用。
:::

### 3. 丰富内容组合
标注支持全方位的 Markdown，允许你在警报中嵌入按钮和代码块。

````markdown
::: callout tip "优化的本地测试" icon:command
在开发过程中使用 preserve 标志来保留构建文件：

```bash
docmd dev --preserve
```

::: button "CLI 标志参考" /cli-commands
:::
````

::: callout info "优化的本地测试" icon:command
使用 preserve 标志来保留构建文件：

```bash
docmd dev --preserve
```

::: button "CLI 标志参考" ./#cli-commands
:::

::: callout tip "AI 的优先逻辑"
对于 LLM，标注充当 **高优先级锚点 (High-Priority Anchors)**。通过使用 `::: callout danger` 来记录破坏性变更或系统限制，你可以提供一个清晰的信号，即 AI 模型在推理和生成过程中必须优先处理此信息。
:::
