---
title: "Hero 区块"
description: "纯用 Markdown 构建高冲击力的落地页页眉和营销亮点区块。"
---

The `hero` container creates professional, visually striking landing page headers. It handles complex CSS requirements like **Split Layouts**, **Glow Effects**, and **Sliders** while keeping the authoring experience clean.

## 基本语法

默认情况下，`hero` 将内容居中对齐，非常适合横幅和简单标题。

```markdown
::: hero
# 更快地构建。
一条命令，从 Markdown 到生产文档。

::: button "开始使用" /intro color:blue
:::
```

## 高级布局

`hero` 容器支持用于控制结构行为的专用标志。

| 标志 | 效果 |
| :--- | :--- |
| `layout:split` | 将 hero 分为左侧文本区和右侧媒体区。在移动端垂直堆叠。 |
| `layout:slider` | 将 hero 转换为带滚动吸附行为的水平滑块。 |
| `glow:true` | 在背景中注入微妙的径向渐变发光效果。 |

### 分栏布局（`== side`）

使用 `== side` 分隔符定义主文本区和副"边栏"区（通常为图片或视频嵌入）的内容。

```markdown
::: hero layout:split glow:true
# docmd 2.0
同构执行。AI 优化。

::: button "快速开始" /getting-started/basic-usage color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd 2.0
同构执行。AI 优化。

::: button "快速开始" /getting-started/basic-usage color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### 滑块布局（`== slide`）

使用 `== slide` 分隔符在不同内容节点之间创建交互式 hero 滑块。

```markdown
::: hero layout:slider
== slide
# 同构核心
引擎在任意环境渲染。
== slide
# AI 优化
为 LLM 时代而生。
:::
```

::: hero layout:slider
== slide
# 同构核心
引擎在任意环境渲染。
== slide
# AI 优化
为 LLM 时代而生。
:::

## 响应式行为

`hero` 容器默认完全响应式：
- 在**桌面端**，`layout:split` 左右并排显示。
- 在**移动端**，自动切换为居中垂直堆叠以确保最佳可读性。

## 最佳实践

1.  **发光效果**：在深色模式站点上谨慎使用 `glow:true`，可打造高端"霓虹"质感。
2.  **媒体类型**：分栏布局的"边栏"内容非常适合 `::: embed` 组件、高质量 PNG 图片或原生 `<video>` 标签。
3.  **CTA 位置**：始终将 `::: button` 元素放置在主"Hero 文案"区域（`== side` 分隔符之前），确保在移动端第一眼看到。
