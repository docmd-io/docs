---
title: "布局与 UI 区域"
description: "通过管理头部、侧边栏和功能 UI 插槽来控制界面结构。"
---

一个标准页面包含六个主要功能区域：

1.  **菜单栏**：用于全局站点链接的全宽顶部导航栏。
2.  **头部**：一个持久的辅助栏。它包含页面标题和工具按钮。
3.  **侧边栏**：主要导航树，通常在左侧。
4.  **内容区**：中心的 Markdown 渲染区域。包含**面包屑**。
5.  **目录（TOC）**：右侧当前页面的标题导航。
6.  **页脚**：底部版权、品牌和全站链接区域。

## 全局组件配置

引擎使用模块化布局系统。在 `docmd.config.json` 的 `layout` 部分配置大多数 UI 区域。

### 菜单栏
菜单栏提供高层导航层。支持品牌标题、常规链接和嵌套下拉菜单。

*   **位置**：固定在 `top` 或内联在 `header` 中。
*   **文档**：有关架构和样式，请参阅[菜单栏配置](menubar.md)。

### 页面头部
头部显示页面标题、面包屑和工具菜单。

*   **控制**：通过 `layout.header` 全局启用或禁用头部。通过 `layout.breadcrumbs` 切换面包屑。
*   **覆盖**：在你的[页面 Frontmatter](../content/frontmatter.md) 中使用 `hideTitle: true` 来本地隐藏标题区域。

### 复制小部件（AI 集成）
为了方便开发者和 LLM Agent 处理你的文档，docmd 在面包屑导航栏中提供了集成的复制按钮。这些按钮允许用户快速复制页面的原始 Markdown 内容，或合并后的 LLM 上下文。

在 `docmd.config.json` 的 `theme.copyWidgets` 设置块下配置这些按钮：

```json
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

*   `enabled`：设置为 `false` 可以完全禁用复制小部件栏。
*   `raw`：设置为 `false` 可以隐藏“复制 Markdown”按钮。
*   `context`：设置为 `false` 可以隐藏“复制上下文”按钮。

### 工具菜单（选项菜单）
`optionsMenu` 将**全局搜索**、**主题切换**和**赞助链接**等核心实用功能分组。

```json
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
如果所选位置针对的是已禁用的容器，引擎会将选项菜单移动到 `sidebar-top`。这确保实用功能保持可访问。
:::

### 侧边栏与导航
侧边栏是主要导航树。在配置或外部 JSON 文件中定义其结构。

*   **行为**：支持动画、可折叠组和自动路径保留。
*   **文档**：请参阅[导航配置](navigation.md)。

### 页脚
引擎为你的网站页脚提供 **minimal** 和 **complete** 布局。

```json
{
  "layout": {
    "footer": {
      "style": "complete", 
      "description": "使用 docmd 构建的文档。",
      "branding": true,
      "columns": [
        {
          "title": "社区",
          "links": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" }
          ]
        }
      ]
    }
  }
}
```

::: callout tip "界面层级" icon:lightbulb
将你的**菜单栏**用于全局链接。将你的**侧边栏**用于逻辑文档结构。AI 代理依靠这个层级来理解模块之间的关系。
:::