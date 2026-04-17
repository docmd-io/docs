---
title: "图标"
description: "如何在文档中使用并自定义 Lucide 图标。"
---

`docmd` 内置支持 [Lucide](https://lucide.dev/) 图标库。图标可用于导航侧边栏、按鈕和自定义组件，提供视觉提示并提升易扫读性。

## 导航图标

在 `docmd.config.js` 中为导航项指定图标。使用 Lucide 网站上任意图标的破折序写名称（kebab-case）。

```javascript
navigation: [
  { title: '首页', path: '/', icon: 'home' },
  { title: '安装', path: '/setup', icon: 'settings' }
]
```

## 按鈕图标

也可在按鈕标签中使用图标，可包含原始 HTML 或如果主题支持，使用标准 Lucide 命名方式。

```markdown
::: button "下载" /download icon:download
```

## CSS 样式化

所有图标以内联 SVG 形式渲染，带有 `.lucide-icon` 类。可在 `customCss` 中全局调整其大小或线条粗细：

```css
.lucide-icon {
  stroke-width: 1.5px; /* 更细的现代风格图标 */
  width: 1.2rem;
  height: 1.2rem;
}

/* 针对特定图标 */
.icon-rocket {
  color: #ff5733;
}
```

## 图标参考
我们支持完整的 Lucide 图标库。可在此处浏览数千个可用图标：
::: button "浏览 Lucide 图标" external:https://lucide.dev/icons