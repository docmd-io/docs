---
title: "布局与界面分区"
description: "通过管理头部、侧边栏和功能插槽来控制界面结构。"
---

一个标准的 `docmd` 页面分为六个主要功能分区：

1. **菜单栏**：全宽顶部导航栏，用于全局站点链接。
2. **头部**：含页面标题和工具按鈕的固定导航栏。
3. **侧边栏**：主要导航树（通常在左侧）。
4. **内容区**：中心 Markdown 渲染区，包含**面包屑**。
5. **目录（TOC）**：当前页面的右侧标题导航。
6. **页脚**：底部版权、品牌和全局链接區域。

## 全局组件

大多数 UI 分区通过 `docmd.config.js` 的 `layout` 属性选来配置。

### 菜单栏

菜单栏在文档上方提供高层跟踪导航。

```javascript
layout: {
  menubar: {
    enabled: true,
    position: 'top', // 'top'(固定) 或 'header'(随内容流)
    left: [
      { type: 'title', text: '品牌', url: '/', icon: 'home' },
      { text: '功能特性', url: '/features' }
    ],
    right: [
      { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', icon: 'github' }
    ]
  }
}
```

### 页面头部

头部默认开启。可全局关闭，也可在页面层级的 frontmatter 中隐藏特定元素。

```javascript
// docmd.config.js
layout: {
  header: {
    enabled: true // 设为 false 则全局隐藏顶部头部
  },
  breadcrumbs: true // 设为 false 则全局隐藏面包屑
}
```

**页面级覆盖（Frontmatter）：**
```yaml
---
title: "特殊页面"
hideTitle: true # 隐藏该页固定头部中的标题
---
```

## 工具菜单（选项菜单）

`optionsMenu` 将搜索、主题切换和赞助等实用功能整合在一起。

```javascript
layout: {
  optionsMenu: {
    position: 'header', // 可选值：'header'、'sidebar-top'、'sidebar-bottom'、'menubar'
    components: {
      search: true,      // 启用全文搜索
      themeSwitch: true, // 启用明暗模式切换
      sponsor: 'https://github.com/sponsors/your-profile'
    }
  }
}
```

::: callout info "容器回退"
如果所选位置对应的容器已禁用，`docmd` 将自动将选项菜单渲染到 `sidebar-top` 插槽，确保实用功能持续可用。
:::

## 侧边栏与页脚控制

### 侧边栏行为
```javascript
layout: {
  sidebar: {
    enabled: true,
    collapsible: true,       // 启用展开/折叠动画
    defaultCollapsed: false,  // 设置侧边栏初始状态
    position: 'left'
  }
}
```

### 页脚品牌
`docmd` 提供了两种页脚样式：**minimal**（简洁）和 **complete**（完整）。

```javascript
layout: {
  footer: {
    style: 'complete',
    description: '本文档由 docmd 构建。',
    branding: true, // 控制 "Built with docmd" 徽标的显示
    columns: [
      {
        title: '社区',
        links: [{ text: 'GitHub', url: '...' }]
      }
    ]
  }
}
```

::: callout tip "AI 优化界面"
在设计自定义布局时，建议将**搜索**组件放在 `optionsMenu` 的显著位置。AI 模型在浏览文档时经常把搜索作为定位特定技术上下文的主要入口。
:::