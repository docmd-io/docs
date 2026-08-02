---
title: "菜单栏"
description: "构建并定位您的菜单栏，管理导航链接，配置下拉菜单。"
---

`menubar` 是一个高级导航层。它在整个站点中提供全局上下文。可将其定位为视口顶部的固定栏，或定位在页面标题之上的相对位置。

## 配置

在 `docmd.config.json` 的 `layout` 部分中配置菜单栏。

```json "docmd.config.json"
{
  "layout": {
    "menubar": {
      "enabled": true,
      "position": "top", 
      "left": [
        { "type": "title", "text": "Brand", "url": "/", "icon": "home" },
        { "text": "Documentation", "url": "/docs" },
        { 
          "type": "dropdown", 
          "text": "Ecosystem", 
          "items": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" },
            { "text": "Live Editor", "url": "https://live.docmd.io" }
          ]
        }
      ],
      "right": [
        { "text": "Support", "url": "/support", "icon": "help-circle" }
      ]
    }
  }
}
```

### 选项

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | 切换菜单栏的可见性。 |
| `position` | `String` | `'top'` | `'top'`（固定在视口绝对顶部）或 `'header'`（定位在页面标题之上）。 |
| `left` | `Array` | `[]` | 左对齐的导航条目。 |
| `right` | `Array` | `[]` | 右对齐的导航条目。 |

## 条目类型

`left` 与 `right` 数组支持多种条目类型。

### 1. 标准链接
最常见的条目类型。
- `text`：显示文字。
- `url`：路径或外部 URL。
- `icon`：可选的 Lucide 图标名称。
- `external`：设为 `true` 在新标签页中打开。

### 2. 标题（品牌）
设置 `type: 'title'` 以应用品牌样式（例如加粗字体）。

### 3. 下拉菜单
设置 `type: 'dropdown'` 并提供 `items` 数组，以创建嵌套菜单。

## 实用工具集成

将全局搜索与主题切换托管在菜单栏中。将 `optionsMenu.position` 设为 `'menubar'`。

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "menubar"
    }
  }
}
```

选项菜单会自动对齐至**右侧区域**。它会出现在 `right` 数组中定义的任何链接之后。

::: callout info "自动回退"
如果 `menubar` 被禁用，分配给它的实用工具会自动回退到 `sidebar-top` 位置。
:::

## 自定义样式

在自定义样式表中使用 CSS 变量覆盖菜单栏外观。详情请参阅 [自定义 CSS 与 JS](../theming/custom-css-js.md)。

```css
:root {
  --menubar-h: 56px;
  --menubar-bg: var(--bg-color);
  --menubar-border: var(--border-color);
  --menubar-text: var(--text-color);
}
```