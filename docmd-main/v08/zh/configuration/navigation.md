---
title: "导航配置"
description: "构建侧边栏、为链接分类，并为读者与搜索引擎配置图标。"
---

编译器对站点导航提供显式的控制能力。清晰的导航层级会形成合理的阅读顺序。它能优化 SPA 体验，并为搜索索引与 AI 模型提供清晰的上下文映射。

## 1. 导航 Schema

`docmd.config.json` 中的一个链接对象数组控制着侧边栏。每个对象既可以是直接链接，也可以是嵌套的分组。

<img width="260" class="with-border" src="/assets/previews/navigation-hierarchy.webp">

```json
{
  "navigation": [
    { "title": "Overview", "path": "/", "icon": "home" },
    { "title": "Quick Start", "path": "/getting-started/quick-start", "icon": "rocket" }
  ]
}
```

## 2. 支持的属性

每个条目都支持以下设置：

| 属性 | 类型 | 必需 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String` | 是 | 显示在侧边栏菜单中的文字。 |
| `path` | `String` | 否 | 目标 URL。相对本地路径必须以正斜杠 `/` 开头。 |
| `icon` | `String` | 否 | 任何 [Lucide 图标](external:https://lucide.dev/icons) 的名称，使用 kebab-case 格式（例如 `git-branch`）。 |
| `children` | `Array` | 否 | 一组嵌套的导航条目，用于建立子菜单。 |
| `collapsible`| `Boolean`| 否 | 为 `true` 时，用户可展开或收起该分组。 |
| `external` | `Boolean`| 否 | 为 `true` 时，在新浏览器标签页中打开链接。 |

## 3. 组织分区分组

使用两种主要的分组方式构建侧边栏：

### 点击分组（直接页面 + 子文件夹）
为分组标题同时指定 `path` 与 `children`。点击标题会加载落地页并展开子链接。

```json
{
  "title": "Cloud Services",
  "path": "/cloud/overview", 
  "children": [
    { "title": "AWS Setup", "path": "/cloud/aws" },
    { "title": "GCP Setup", "path": "/cloud/gcp" }
  ]
}
```

### 静态标签（仅作为分组标题）
省略 `path` 参数。标题作为不可点击的分组标题对相关链接进行归类。在没有单一落地页时，可以使用它来划分主要的技术分类。

```json
{
  "title": "Formatting & Elements",
  "icon": "layout-grid",
  "children": [
    { "title": "Syntax Guide", "path": "/content/syntax" },
    { "title": "Rich Containers", "path": "/content/containers" }
  ]
}
```

## 4. 自动面包屑

引擎会自动为每一页生成上下文面包屑。它们显示在主页面标题的正上方，便于快速定位。

<img width="500" class="with-border" src="/assets/previews/navigation-breadcrumb.webp">

### 关键行为
*   **自动解析**：引擎会沿着您的导航树追踪当前路由，构建层级。
*   **活动指示器**：当前页面是最后一个、未带链接的面包屑项。
*   **移动端优化**：在小视口上，面包屑会动态简化或隐藏，以节省屏幕空间。

### 禁用面包屑
面包屑默认启用。更新站点布局选项即可全局禁用：

```json
{
  "layout": {
    "breadcrumbs": false
  }
}
```

## 5. 导航解析级联

编译器使用"就近文件胜出"的级联解析系统。这支持多版本或多语言场景，而无需让全局配置变得臃肿。

```text
my-project/
├── docmd.config.json           [Level 3: 全局配置] - 默认回退
├── docs-v1.0/ 
│   ├── navigation.json       [Level 2: 版本导航] - 覆盖全局
│   └── zh/
│       └── navigation.json   [Level 1: 语言导航] - 绝对优先
```

1.  **Level 1: 语言特定**（locale 文件夹内的 `navigation.json`）：覆盖该语言与该版本的所有设置。
2.  **Level 2: 版本特定**（版本文件夹内的 `navigation.json`）：覆盖该版本在所有语言下的全局配置。
3.  **Level 3: 全局配置**（`config.navigation`）：中心配置文件中的基础回退定义。

### 智能失效链接防护
在 Level 2 或 Level 3 导航回退过程中，引擎会自动检查目标文件是否存在。缺失的文件会从侧边栏中动态过滤掉。这能彻底消除旧版本或缺失翻译带来的失效链接。

## 6. 图标集成

编译器内置完整的 **Lucide 图标** 系统。使用官方 Lucide 名称（kebab-case 格式，例如 `settings`、`folder-open`、`book-marked-line`）即可应用图标。

::: callout tip "优化侧边栏标签" icon:sparkles
保持侧边栏标题清晰且具有描述性。简洁的导航结构让 AI 智能体能够轻松从编译后的 `llms.txt` 订阅中解析您的站点地图。
:::
