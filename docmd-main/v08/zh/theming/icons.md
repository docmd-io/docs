---
title: "图标 (Icons)"
description: "如何在你的文档中使用和自定义 Lucide 图标。"
---

`docmd` 内置支持 [Lucide](external:https://lucide.dev/) 图标库。图标可以用于你的导航侧边栏、按钮和自定义组件，以提供视觉线索并提高可扫描性。

## 导航图标

在 `docmd.config.js` 中为任何导航项分配一个图标。请使用 Lucide 网站上找到的任何图标的短横线命名法 (kebab-case) 名称。

```javascript
navigation: [
  { title: '首页', path: '/', icon: 'home' },
  { title: '设置', path: '/setup', icon: 'settings' }
]
```

## 容器中的图标

你也可以通过包含原始 HTML 或在整个 docmd 中使用标准的 `icon:` 前缀，在按钮、标签、选项卡和其他容器内部使用图标。

```markdown
::: button "下载" /download icon:download
```

## CSS 样式

所有图标都渲染为带有 `.lucide-icon` 类的行内 SVG。你可以在你的 `customCss` 中全局更改它们的大小或线条粗细：

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

我们支持整个 Lucide 库。你可以在这里浏览数千个可用的图标：

::: button "浏览 Lucide 图标" external:https://lucide.dev/icons icon:globe