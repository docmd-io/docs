---
title: "多项目配置"
description: "从单个 docmd 实例构建多个独立文档项目，具有全局配置层叠和内置项目切换器。"
---

多项目配置让你从单个仓库构建和部署多个文档项目。每个项目保持自己的配置。在工作区根目录定义的全局设置自动层叠到每个项目。

```text
docs.example.com/           → 主文档
docs.example.com/sdk/       → SDK 参考
docs.example.com/cli/       → CLI 文档
```

## 设置

### 1. 目录结构

每个项目一个目录。共享资源和全局配置位于仓库根目录。

```text
my-docs/
├── assets/                   ← 共享资源（所有项目继承这些）
├── main-docs/
│   ├── docmd.config.json     ← 项目配置（覆盖根默认值）
│   └── docs/                 ← 项目内容
├── sdk-docs/
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← 工作区根配置
└── package.json
```

### 2. 根工作区配置

根 `docmd.config.json` 使用 `workspace` 键。任何顶层键（例如 `theme`、`menubar`、`logo`）作为每个项目的**全局默认值**。

```json
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "文档" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK 参考" }
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
    { "text": "GitHub", "url": "https://github.com/my-org/my-repo", "external": true }
  ]
}
```

#### `workspace` 选项

| 键 | 类型 | 描述 |
| :-- | :--- | :---------- |
| `projects` | `Array` | 项目条目列表。至少一个必须使用 `prefix: "/"`。 |
| `switcher` | `Object` | 控制[项目切换器](#项目切换器)的可见性和位置。 |

#### 项目条目字段

| 键 | 类型 | 必需 | 描述 |
| :-- | :--- | :------- | :---------- |
| `prefix` | `String` | ✅ | URL 前缀。根项目使用 `"/"`。 |
| `src` | `String` | ✅ | 包含项目内容和可选 `docmd.config.json` 的目录路径（相对于 CWD）。 |
| `title` | `String` | - | 在项目切换器 UI 中显示的名称。 |

### 3. 项目级配置

每个项目目录可以有自己的 `docmd.config.json`。在这里定义的设置**覆盖**工作区根默认值。

```json
{
  "title": "SDK 参考",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {}
  }
}
```

如果未找到本地配置文件，引擎将使用工作区默认值应用零配置自动路由。

### 4. 全局配置层叠

在工作区根配置中定义的任何键自动应用于每个项目。项目配置可以选择性地覆盖这些全局设置。

| 层级 | 优先级 |
| :---- | :--------- |
| 根工作区配置 | 最低（首先应用作为默认值） |
| 项目 `docmd.config.json` | 更高（覆盖根默认值） |
| 项目 `navigation.json` | 最高（导航始终以此为准） |
