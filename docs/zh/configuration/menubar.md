---
title: "菜单栏"
description: "配置菜单栏结构、链接和下拉菜单。"
---

`menubar` 是一个高级导航层，可在整个文档网站中提供全局上下文。它可以固定在视口顶部，也可以作为相对定位组件置于页面头部上方。

## 配置

菜单栏在 `docmd.config.js` 的 `layout` 部分中进行配置。

```javascript
export default defineConfig({
  layout: {
    menubar: {
      enabled: true,
      position: 'top', // 'top'（固定）或 'header'（内联）
      left: [
        { type: 'title', text: '品牌', url: '/', icon: 'home' },
        { text: '文档', url: '/docs' },
        { 
          type: 'dropdown', 
          text: '生态', 
          items: [
            { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', external: true },
            { text: '实时编辑器', url: 'https://live.docmd.io' }
          ]
        }
      ],
      right: [
        { text: '支持', url: '/support', icon: 'help-circle' }
      ]
    }
  }
});
```

### 选项

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | 切换菜单栏的显示状态 |
| `position` | `String` | `'top'` | `'top'`（绝对固定在顶部）或 `'header'`（位于页面标题上方） |
| `left` | `Array` | `[]` | 左侧对齐的导航项 |
| `right` | `Array` | `[]` | 右侧对齐的导航项 |

## 项目类型

`left` 和 `right` 数组支持多种项目类型，以便更好地组织导航结构：

### 1. 标准链接
最常见的项目类型。
- `text`：显示标签。
- `url`：路径或外部 URL。
- `icon`：可选的 Lucide 图标名称。
- `external`：设为 `true` 则在新标签页打开。

### 2. 标题（品牌）
设置 `type: 'title'` 可为链接应用品牌样式（通常为粗体或特定字重）。

### 3. 下拉菜单
设置 `type: 'dropdown'` 并提供 `items` 数组即可创建嵌套菜单。

## 工具集成

通过将 `optionsMenu.position` 设为 `'menubar'`，可以将全局搜索和主题切换集成到菜单栏中。

```javascript
layout: {
  optionsMenu: {
    position: 'menubar'
  }
}
```

集成后，选项菜单将自动对齐到菜单栏的**右侧区域**，显示在 `right` 数组中定义的链接之后。

::: callout info
如果 `menubar` 被禁用，分配到该位置的工具组件将自动回退到 `sidebar-top` 位置。
:::

## 自定义样式

可在 `customCss` 文件中使用 CSS 变量精细调整菜单栏的外观：

```css
:root {
  --menubar-height: 56px;
  --menubar-bg: var(--docmd-bg-secondary);
  --menubar-border: var(--docmd-border-color);
  --menubar-text: var(--docmd-text-primary);
}
```