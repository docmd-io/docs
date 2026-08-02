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

### 复制小部件
面包屑栏包含两个复制按钮。一个复制页面的原始 Markdown，另一个复制包含 URL、标题与描述的结构化上下文块。便于粘贴到 AI 对话窗口或支持工单中。

在 `docmd.config.json` 的 `theme.copyWidgets` 下配置这些按钮：

```json "docmd.config.json"
{
  "theme": {
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    }
  }
}
```

*   `enabled`：设为 `false` 完全禁用该栏。
*   `raw`：设为 `false` 隐藏"复制 Markdown"按钮。
*   `context`：设为 `false` 隐藏"复制上下文"按钮。

### 实用菜单（选项菜单）
`optionsMenu` 将核心实用工具（**全局搜索**、**主题切换**、**赞助链接**）归为一组。

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header", 
      "components": {
        "search": true,      
        "themeSwitch": true, 
        "sponsor": "https://github.com/sponsors/mgks"
      }
    }
  }
}
```

::: callout info "自动回退" icon:sparkles
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