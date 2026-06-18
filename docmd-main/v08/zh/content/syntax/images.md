---
title: "图片与视觉媒体"
description: "嵌入响应式图片，应用样式属性，并启用交互式灯箱缩放。"
---

docmd 使用标准的 Markdown 语法处理图片。请将媒体资源集中放在项目源中的 `assets/images/` 目录下，便于引用且保持一致。

```markdown
![Alt text](/assets/images/architecture.png "Optional tooltip title")
```

![Advanced Styling Example](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium .align-centre}

## 尺寸

使用 `{ }` 属性语法应用尺寸类。三种预定义尺寸可用。

```markdown
![Small icon](/assets/icon.png){ .size-small }
![Standard view](/assets/preview.png){ .size-medium }
![Full width banner](/assets/banner.png){ .size-large }
```

## 对齐与装饰

将对齐与装饰类组合在单个属性块中。

```markdown
![Centred diagram](/assets/img.png){ .align-centre }
![Floating right with shadow](/assets/img.png){ .align-right .with-shadow .with-border }
```

## 图题

使用标准的 HTML5 `<figure>` 元素实现精确、可访问的图片标题。

```html
<figure>
  <img src="/assets/diagram.png" alt="Cloud Infrastructure Diagram">
  <figcaption>Figure 1.1: Core System Infrastructure Architecture.</figcaption>
</figure>
```

## 图片画廊

将多个 `<figure>` 包裹在 `div.image-gallery` 中，即可生成响应式、均衡的网格。

```html
<div class="image-gallery">
  <figure>
    <img src="/assets/screen1.jpg" alt="User Dashboard View">
    <figcaption>Live Performance Monitor</figcaption>
  </figure>
  <figure>
    <img src="/assets/screen2.jpg" alt="Configuration Panel View">
    <figcaption>Project Global Settings</figcaption>
  </figure>
</div>
```

## 灯箱缩放

当 `mainScripts` 处于激活状态时，docmd 会自动对任何标记 `.lightbox` 类或放置在画廊内的图片应用全屏缩放效果。

```markdown
![Deep texture analysis](/assets/sample.png){ .lightbox }
```

::: callout tip "AI 上下文与可访问性" icon:sparkles
始终为每张图片提供描述性的 **alt 文本**。有意义的 alt 文本是 AI 智能体解析 `llms.txt` 流时的直接、高保真信号，并能为屏幕阅读器用户提升可访问性。
:::
