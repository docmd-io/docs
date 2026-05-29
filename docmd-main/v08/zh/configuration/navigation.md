---
title: "导航配置"
description: "构建你的侧边栏、分类链接，并为读者和搜索引擎配置图标。"
---

编译器提供对你网站导航的明确控制。清晰的导航层级创建了逻辑阅读序列。这优化了 SPA 体验，并为搜索索引和 AI 模型提供了清晰的上下文映射。

## 1. 导航架构

你 `docmd.config.json` 文件中的链接对象数组控制侧边栏。每个对象是一个直接链接或嵌套分类组。

<!-- SCREENSHOT: The sidebar navigation menu showing a two-level hierarchy with Lucide icons, an active page highlighted, and a collapsible section. -->

```json
{
  "navigation": [
    { "title": "概览", "path": "/", "icon": "home" },
    { "title": "快速开始", "path": "/getting-started/quick-start", "icon": "rocket" }
  ]
}
```

## 2. 支持的属性

每个项目都支持以下设置：

| 属性 | 类型 | 必需 | 描述 |
| :--- | :--- | :--- | :--- |
| `title` | `String` | 是 | 侧边栏菜单中显示的文本。 |
| `path` | `String` | 否 | 目标 URL。相对本地路径必须以正斜杠 (`/`) 开头。 |
| `icon` | `String` | 否 | 任何 [Lucide 图标](https://lucide.dev/icons) 的名称，使用 kebab-case 格式（例如 `git-branch`）。 |
| `children` | `Array` | 否 | 嵌套导航项数组，用于建立子菜单。 |
| `collapsible`| `Boolean`| 否 | 当为 `true` 时，用户可以展开或折叠分类文件夹。 |
| `external` | `Boolean`| 否 | 当为 `true` 时，在新浏览器标签页中打开链接。 |

## 3. 组织分类组

使用两种主要分组方法构建你的侧边栏：

### 点击分组（直接页面 + 子文件夹）
为分类头部指定 `path` 以及 `children`。点击标题会加载首页并展开子链接。

```json
{
  "title": "云服务",
  "path": "/cloud/overview", 
  "children": [
    { "title": "AWS 设置", "path": "/cloud/aws" },
    { "title": "GCP 设置", "path": "/cloud/gcp" }
  ]
}
```

### 静态标签（仅分类头部）
省略 `path` 参数。头部作为不可点击的标题来分组相关链接。用于在没有一个着陆页的情况下划分主要技术分类。

```json
{
  "title": "格式与元素",
  "icon": "layout-grid",
  "children": [
    { "title": "语法指南", "path": "/content/syntax" },
    { "title": "丰富容器", "path": "/content/containers" }
  ]
}
```

## 4. 自动面包屑

引擎为每个页面自动生成上下文面包屑。这些直接显示在主页面头部上方，以帮助快速定位。

<!-- SCREENSHOT: The breadcrumb navigation bar showing 'Overview > Configuration > Navigation' in a clean, small grey font above the H1 page header. -->

### 关键行为
*   **自动解析**：引擎通过导航树追踪活动路由来构建层级结构。
*   **活动指示器**：当前页面是最后一个未链接的面包屑项目。
*   **移动端优化**：面包屑在小屏幕上会简化或动态隐藏以节省屏幕空间。

### 禁用面包屑
面包屑默认启用。更新你的网站布局选项以全局禁用它们：

```json
{
  "layout": {
    "breadcrumbs": false
  }
}
```

## 5. 导航解析层叠

编译器使用"最近文件获胜"的层叠解析系统。这支持多个版本或语言，而不会使你的全局配置膨胀。

```text
my-project/
├── docmd.config.json           [级别 3：全局配置] - 默认后备
├── docs-v1.0/ 
│   ├── navigation.json       [级别 2：版本导航] - 覆盖全局
│   └── zh/
│       └── navigation.json   [级别 1：语言导航] - 绝对优先
```

1.  **级别 1：语言特定**（语言文件夹内的 `navigation.json`）：覆盖此特定语言和版本的所有设置。
2.  **级别 2：版本特定**（版本文件夹内的 `navigation.json`）：覆盖此版本在所有语言中的全局配置。
3.  **级别 3：全局配置**（`config.navigation`）：中央配置文件中的基础后备定义。

### 智能断链预防
引擎在级别 2 或 3 导航后备时自动检查目标文件是否存在。缺失的文件会动态从侧边栏中过滤掉。这消除了旧版本或缺失翻译的断链。

## 6. 图标集成

编译器包含完整的 **Lucide 图标** 系统。使用官方 Lucide 名称（kebab-case 格式，例如 `settings`、`folder-open`、`book-marked-line`）来应用图标。

::: callout tip "优化侧边栏标签" icon:sparkles
保持侧边栏标题清晰且描述性强。简洁的导航结构允许 AI 代理从编译的 `llms.txt` 提要轻松解析你的站点地图。
:::