---
title: "英雄区块 (Hero Sections)"
description: "纯粹用 Markdown 构建高影响力的落地页页眉和营销亮点。"
---

`hero` 容器可以创建专业且视觉冲击力强的落地页页眉。它可以处理复杂的 CSS 需求，如 **分割布局 (Split Layouts)**、**发光效果 (Glow Effects)** 和 **滑块 (Sliders)**，同时保持简洁的编写体验。

## 基本语法

默认情况下，`hero` 会将其内容居中，非常适合横幅和简单的标题。

```markdown
::: hero
    # 构建更快。
    一行命令，从 Markdown 到生产文档。

    ::: button "开始使用" /intro color:blue
:::
```

## 高级布局

`hero` 容器支持专门的标志来控制其结构行为。

| 标志 | 效果 |
| :--- | :--- |
| `layout:split` | 将 hero 分为文本区域（左侧）和媒体区域（右侧）。在移动端垂直堆叠。 |
| `layout:slider` | 将 hero 转换为具有滚动捕捉行为的水平滑块。 |
| `glow:true` | 在背景中注入微妙的径向渐变发光。 |

### 分割布局 (`== side`)

使用 `== side` 分隔符来定义哪些内容放入主文本区域，哪些内容放入次要的“侧边”区域（通常是图像或视频嵌入）。

```markdown
::: hero layout:split glow:true
    # docmd 2.0
    同构执行。针对 AI 优化。

    ::: button "快速开始" /getting-started/basic-usage color:blue

    == side
        ::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd 2.0
同构执行。针对 AI 优化。

::: button "快速开始" /getting-started/basic-usage color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### 滑块布局 (`== slide`)

通过在不同的内容节点之间使用 `== slide` 分隔符来创建交互式 hero 滑块。

```markdown
::: hero layout:slider
    == slide
        # 同构核心
        引擎可在任何地方渲染。
    == slide
        # AI 优化
        为 LLM 时代而生。
:::
```

::: hero layout:slider
    == slide
        # 同构核心
        引擎可在任何地方渲染。
    == slide
        # AI 优化
        为 LLM 时代而生。
:::

## 响应式行为

`hero` 容器默认完全响应：
- 在 **桌面端**，`layout:split` 并排显示。
- 在 **移动端**，它会自动转换为居中的垂直堆叠，以确保最佳的可读性。

## 最佳实践

1.  **发光效果**：在暗黑模式网站上谨慎使用 `glow:true`，以获得高级的“霓虹灯”感。
2.  **媒体类型**：分割布局的“侧边”内容非常适合 `::: embed` 组件、高质量 PNG 或原始 `<video>` 标签。
3.  **CTA 放置**：始终将 `::: button` 元素放置在主“Hero 副本”部分（在 `== side` 分隔符之前），以确保它们是用户在移动端看到的第一件东西。
