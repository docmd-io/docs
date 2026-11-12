---
title: "布局与界面分区"
description: "通过管理页头、侧边栏与功能界面插槽来控制界面结构。"
---

一个标准页面包含六个主要功能分区：

1.  **菜单栏 (Menubar)**：全局站点链接的整宽顶部导航栏。
2.  **页头 (Header)**：常驻的辅助栏，包含页面标题与实用按钮。
3.  **侧边栏 (Sidebar)**：主导航树，通常位于左侧。
4.  **内容区 (Content Area)**：中央的 Markdown 渲染区域，包含**面包屑**。
5.  **目录 (TOC)**：当前页面右侧的标题导航。
6.  **页脚 (Footer)**：底部区域，用于版权、品牌与全站链接。

## 全局组件配置

引擎采用模块化的布局系统。在 `docmd.config.json` 的 `layout` 部分配置大多数界面分区。

### 菜单栏 (Menubar)
菜单栏提供高层级的导航层。它支持品牌标题、普通链接以及嵌套下拉。

*   **位置**：固定在 `top`，或内嵌于 `header` 中。
*   **文档**：schema 与样式请参阅 [菜单栏配置](menubar.md)。

### 页面页头 (Header)
页头显示页面标题、面包屑与实用菜单。

*   **控制**：通过 `layout.header` 全局启用或禁用页头。通过 `layout.breadcrumbs` 切换面包屑。
*   **局部覆盖**：在 [页面 Frontmatter](../content/frontmatter.md) 中使用 `hideTitle: true` 可在局部隐藏标题区。

### 标题格式与分隔符

配置文档模板中如何组合页面标题与站点标题：

```json "docmd.config.json"
{
  "layout": {
    "titleSeparator": "-",
    "titleAppend": true
  }
}
```

- `titleSeparator`: 浏览器标签页 `<title>` 与社交卡片预览中页面标题与站点标题之间的分隔符。默认为标准短划线 (`"-"`)。编译器会自动在非空分隔符两侧填充单空格 (`" - "`)，因此您只需输入 `"-"` 或 `"|"` 等简单字符。
- `titleAppend`: 决定是否在页面标题后追加站点标题（默认为 `true`）。设为 `false` 则仅输出页面标题。亦可在页面 Frontmatter 中按页覆盖 (`titleAppend: false`)。

### 复制与打印小部件
在正文内容正上方，`docmd` 提供上下文阅读实用小部件：一键复制原始 Markdown 源码、结构化 AI 提示词上下文，以及页面打印功能：

```json "docmd.config.json"
{
  "layout": {
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    },
    "print": false
  }
}
```

*   `copyWidgets.enabled`：设为 `false` 完全禁用该小部件栏。
*   `copyWidgets.raw`：设为 `false` 隐藏"复制 Markdown"按钮。
*   `copyWidgets.context`：设为 `false` 隐藏"复制上下文"按钮。
*   `print`：默认禁用（`false`）。启用（`true`）后，将在复制小部件旁显示打印按钮（并在专注模式工具栏中显示）。打印按钮绝不会出现在页眉或菜单栏中。

### 专注模式（无干扰阅读）

专注模式收起侧边栏、页眉、目录树及浮动控件，提供专门针对技术长文优化的纯净阅读界面：

```json "docmd.config.json"
{
  "layout": {
    "focusMode": false
  }
}
```

*   **默认状态**：默认禁用（`false`）。
*   **启用后**：在选项菜单中显示专注模式切换按钮，并启用快捷键 <kbd>Alt</kbd>+<kbd>F</kbd>。
*   **专注模式中的控件**：右上角仅保留三个核心控制项：打印（若 `layout.print` 已启用）、亮暗主题切换，以及退出专注模式（<kbd>Esc</kbd> 或 <kbd>Alt</kbd>+<kbd>F</kbd>）。

::: callout info title:"向后兼容性" icon:sparkles
对于现有项目，docmd 会自动解析早期配置（包括根级别的 `print`、`focusMode`、`customJs` 以及 `theme.copyWidgets`），实现完全向后兼容。
:::

### 实用菜单（选项菜单）
`optionsMenu` 将核心实用工具（**全局搜索**、**主题切换**、**专注模式**、**赞助链接**）归为一组。

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header", 
      "components": {
        "search": true,      
        "themeSwitch": true,
        "focusMode": true,
        "sponsor": "https://github.com/sponsors/mgks"
      }
    }
  }
}
```

::: callout info title:"自动回退" icon:sparkles
若所选位置对应的容器被禁用，引擎会将选项菜单移至 `sidebar-top`。这能保证实用工具始终可访问。
:::

### 侧边栏与导航
侧边栏是主导航树。其结构可在配置或外部 JSON 文件中定义。

*   **行为**：支持动画、可折叠分组以及自动路径保留。
*   **文档**：请参阅 [导航配置](navigation.md)。

### 页脚 (Footer)
引擎为站点页脚提供 **minimal**（简约）与 **complete**（完整）两种布局。

```json "docmd.config.json"
{
  "layout": {
    "footer": {
      "style": "complete", 
      "description": "Documentation built with docmd.",
      "branding": true,
      "columns": [
        {
          "title": "Community",
          "links": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" }
          ]
        }
      ]
    }
  }
}
```

::: callout tip "界面分层" icon:lightbulb
将菜单栏用于全局链接，将侧边栏用于文档结构。这种分层让真人读者与爬虫都能预测导航。
:::