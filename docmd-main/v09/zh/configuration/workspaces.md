---
title: "多项目工作区"
description: "在 docmd 中从单个仓库构建并部署多项目文档站点，享受共享资源和项目切换器。"
---

工作区允许你从单个仓库构建并部署多个独立的文档项目。每个子项目维护其自己的配置选项，同时继承工作区根目录定义的全局默认值。

```text
docs.example.com/           → 主产品文档
docs.example.com/sdk/       → SDK API 参考
docs.example.com/cli/       → CLI 工具指南
```

## 目录搭建

将你的仓库组织为单独的项目子目录。共享的静态资源和全局工作区配置保存在仓库根目录：

```text
my-docs/
├── assets/                   ← 共享静态资源（被所有项目继承）
├── main-docs/
│   ├── docmd.config.json     ← 项目级配置（覆盖根默认值）
│   └── docs/                 ← 主项目 Markdown 内容
├── sdk-docs/
│   ├── docmd.config.json     ← SDK 项目配置
│   └── docs/                 ← SDK 项目 Markdown 内容
├── docmd.config.json         ← 工作区根配置
└── package.json
```

## 工作区配置架构

根 `docmd.config.json` 文件使用 `workspace` 键声明项目。顶层参数（如 `theme`、`menubar`、`logo`）作为所有子项目的 **全局默认值**：

```json "docmd.config.json"
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK Reference" }
    ],
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  },
  "theme": { "name": "default", "appearance": "system" },
  "logo": {
    "light": "assets/logo-dark.svg",
    "dark": "assets/logo-light.svg"
  },
  "menubar": [
    { "text": "GitHub", "url": "https://github.com/docmd-io/docmd", "external": true }
  ]
}
```

### `workspace` 选项

| 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| `projects` | `Array` | 项目条目列表。必须且仅有一个项目指定 `prefix: "/"`。 |
| `switcher` | `Object` | 控制 [项目切换器](#项目切换器-ui) 的位置与渲染。 |

### 项目条目字段

| 字段 | 类型 | 是否必填 | 描述 |
| :--- | :--- | :--- | :--- |
| `prefix` | `String` | 是 | URL 路由前缀。根项目使用 `"/"`。 |
| `src` | `String` | 是 | 包含项目内容和可选 `docmd.config.json` 的子目录路径。 |
| `title` | `String` | 否 | 在项目切换器 UI 下拉菜单中显示的名称。 |

## 项目级覆盖

子项目可以维护专用的 `docmd.config.json` 清单。在项目级定义的参数将 **覆盖** 工作区根默认值：

```json "docmd.config.json"
{
  "title": "SDK Reference",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {}
  }
}
```

如果子项目省略了本地配置文件，编译器会使用工作区默认值应用零配置自动路由。

## 配置层叠层级

配置选项通过 3 层优先级模型层叠生效：

| 层级 | 优先级 | 描述 |
| :--- | :--- | :--- |
| **根工作区配置** | 基础默认值 | 首先应用到所有工作区项目。 |
| **项目配置 (`docmd.config.json`)** | 较高 | 覆盖该特定项目的根工作区默认值。 |
| **项目导航 (`navigation.json`)** | 最高优先级 | 始终优先于渲染侧边栏。 |

::: callout info "导航优先级" icon:info
项目级 `navigation.json` 清单 **始终优先** 于根工作区配置中定义的任何全局 `navigation` 数组。
:::

## 项目切换器 UI

项目切换器会渲染一个无障碍下拉组件，允许读者在工作区子项目之间切换：

```json "docmd.config.json"
{
  "workspace": {
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  }
}
```

| 位置 | 渲染位置 |
| :--- | :--- |
| `sidebar-top`（默认） | 固定在侧边栏顶部，导航链接上方。 |
| `sidebar-bottom` | 固定在侧边栏底部。 |
| `options-menu` | 集成到标头选项菜单中，置于搜索和主题切换旁边。 |

当声明了两个或更多工作区项目时，项目切换器会自动渲染。

## 资源管理

- **共享资源**: 将 Logo、Favicon 和全局自定义 CSS 放在根 `assets/` 目录中。所有工作区项目在开发和构建编译期间均继承这些资源。
- **项目资源**: 子项目可以维护本地 `assets/` 子目录。发生文件名冲突时，项目特定的资源会覆盖共享根资源。

## 开发与构建命令

::: tabs
== tab "开发服务器" icon:play
运行多项目开发服务器：
```bash
npx @docmd/core dev
```
构建所有工作区项目并在单个 HTTP 端口上服务。文件编辑会触发有针对性的按项目热更新，而无需重建整个工作区。
== tab "生产构建" icon:box
生成生产包：
```bash
npx @docmd/core build
```
输出单个统一静态目录。所有项目编译到各自的子路径中，无需反向代理设置。
:::

## 工作区约束

1. **根项目要求**: 必须且仅有一个项目分配 `prefix: "/"`。
2. **唯一路由前缀**: 每个项目必须使用唯一的 URL 前缀字符串。
3. **根级 `out` 控制**: 输出目录 (`out`) 仅在工作区根级配置；子项目配置不得指定 `out`。

## 配置架构迁移

要将旧工作区定义升级到现代 `workspace` 架构格式，请执行自动化 CLI 迁移助手：

::: callout tip "自动配置升级" icon:sparkles
运行 `npx @docmd/core migrate --upgrade` 自动将旧配置文件重写为 v0.9.0 工作区架构。
:::
