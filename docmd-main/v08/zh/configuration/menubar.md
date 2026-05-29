---
title: "菜单栏"
description: "构建和定位你的菜单栏，管理导航链接，以及配置下拉菜单。"
---

`menubar` 是一个高级导航层。它在你的网站上提供全局上下文。将其定位为固定栏在视口顶部，或相对位于页面头部上方。

## 配置

在 `docmd.config.json` 的 `layout` 部分配置菜单栏。

```json
{
  "layout": {
    "menubar": {
      "enabled": true,
      "position": "top", 
      "left": [
        { "type": "title", "text": "品牌", "url": "/", "icon": "home" },
        { "text": "文档", "url": "/docs" },
        { 
          "type": "dropdown", 
          "text": "生态", 
          "items": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" },
            { "text": "实时编辑器", "url": "https://live.docmd.io" }
          ]
        }
      ],
      "right": [
        { "text": "支持", "url": "/support", "icon": "help-circle" }
      ]
    }
  }
}
```

### 选项

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | 切换菜单栏可见性。 |
| `position` | `String` | `'top'` | `'top'`（固定在绝对顶部）或 `'header'`（位于页面标题上方）。 |
| `left` | `Array` | `[]` | 左对齐的导航项。 |
| `right` | `Array` | `[]` | 右对齐的导航项。 |

## 项目类型

`left` 和 `right` 数组支持各种项目类型。

### 1. 标准链接
最常见的项目类型。
- `text`：显示标签。
- `url`：路径或外部 URL。
- `icon`：可选的 Lucide 图标名称。
- `external`：设为 `true` 在新标签页打开。

### 2. 标题（品牌）
设置 `type: 'title'` 以应用品牌样式（例如粗体字体）。

### 3. 下拉菜单
设置 `type: 'dropdown'` 并提供 `items` 数组以创建嵌套菜单。

## 工具集成

将全局搜索和主题切换托管在菜单栏中。将 `optionsMenu.position` 设为 `'menubar'`。

```json
{
  "layout": {
    "optionsMenu": {
      "position": "menubar"
    }
  }
}
```

选项菜单自动对齐到**右侧区域**。它出现在 `right` 数组中定义的任何链接之后。

::: callout info "自动回退"
如果 `menubar` 被禁用，分配的实用工具会自动回退到 `sidebar-top` 位置。
:::

## 自定义样式

在自定义样式表中使用 CSS 变量来覆盖菜单栏外观。详见[自定义 CSS 与 JS](../theming/custom-css-js.md)。

```css
:root {
  --menubar-height: 56px;
  --menubar-bg: var(--docmd-bg-secondary);
  --menubar-border: var(--docmd-border-color);
  --menubar-text: var(--docmd-text-primary);
}
```