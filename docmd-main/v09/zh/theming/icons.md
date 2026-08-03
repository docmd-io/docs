---
title: "图标"
description: "如何在您的文档中使用和自定义 Lucide 图标。"
---

`docmd` 内置支持 [Lucide](external:https://lucide.dev/) 图标库。图标可用于您的导航侧边栏、按钮和自定义组件中，以提供视觉提示并提高可扫描性。

## 导航图标

在 `docmd.config.json` 中为任何导航项分配图标。使用 Lucide 网站上找到的任何图标的 kebab-case 名称。

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Home", "path": "/", "icon": "home" },
    { "title": "Setup", "path": "/setup", "icon": "settings" }
  ]
}
```

## 容器中的图标

您也可以在按钮、标签、标签页和其他容器中使用图标，通过包含原始 HTML 或在 docmd 中跨容器使用标准的 `icon:` 前缀。

```markdown
::: button "Download" /download icon:download
```

## CSS 样式

所有图标都作为内联 SVG 渲染，并带有 `.lucide-icon` 类。您可以在 `customCss` 中全局更改它们的大小或描边粗细：

```css
.lucide-icon {
  stroke-width: 1.5px; /* 更细的图标，呈现现代感 */
  width: 1.2rem;
  height: 1.2rem;
}

/* 针对特定图标 */
.icon-rocket {
  color: #ff5733;
}
```

## 图标参考

我们支持整个 Lucide 库。您可以在这里浏览数千个可用图标：

::: button "浏览 Lucide 图标" external:https://lucide.dev/icons icon:globe