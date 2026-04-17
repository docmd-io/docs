---
title: "图片与视觉媒体"
description: "掌握媒体管理：响应式图片、样式属性与自动 Lightbox 效果。"
---

`docmd` 使用标准 Markdown 语法集成媒体资源。建议将媒体资源集中存放在项目源目录的 `assets/images/` 文件夹中。

```markdown
![技术架构图](/assets/images/architecture.png "可选提示标题")
```

## 样式属性参考

使用 `{ .class }` 属性语法可直接为图片添加 CSS 类。

### 动态缩放
```markdown
![小尺寸](/assets/icon.png){ .size-small }
![标准视图](/assets/preview.png){ .size-medium }
![全尺寸](/assets/banner.png){ .size-large }
```

### 对齐与布局
```markdown
![居中](/assets/img.png){ .align-center }
![右对齐](/assets/img.png){ .align-right .with-shadow .with-border }
```

![高级样式示例](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium .align-center}

## 结构化媒体元素

### 图片标题
对于精确的可访问性媒体标注，建议使用标准 HTML5 `<figure>` 元素。
```html
<figure>
  <img src="/assets/diagram.png" alt="云基础架构图">
  <figcaption>图 1.1：核心系统基础架构。</figcaption>
</figure>
```

### 图片画廊
使用 `image-gallery` 类将多张图片整理到响应式均衡网格中。

```html
<div class="image-gallery">
  <figure>
    <img src="/assets/screen1.jpg" alt="用户仪表盘视图">
    <figcaption>应用性能监控</figcaption>
  </figure>
  <figure>
    <img src="/assets/screen2.jpg" alt="配置面板视图">
    <figcaption>项目全局设置</figcaption>
  </figure>
</div>
```

## 交互式 Lightbox 缩放

开启 `mainScripts` 组件（默认开启）后，`docmd` 会自动为画廊内的图片或带有 `.lightbox` 类的图片应用全屏缩放效果。

```markdown
![深层纹理分析](/assets/sample.png){ .lightbox }
```

::: callout tip "AI 上下文与可访问性"
媒体内容始终要提供全面的 **Alt 文本**。虽然高级 AI 模型具备视觉能力，但 Markdown 源文件中的描述性文本为模型推理引擎提供了直接、高保真的信号，有助于增强 `llms-full.txt` 流中的架构分析和功能理解。
:::