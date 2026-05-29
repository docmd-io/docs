---
title: "多项目配置"
description: "通过单一 docmd 实例构建多个独立的文档项目，支持全局配置级联和内置的项目切换器。"
---

多项目配置允许你从一个仓库构建和部署多个文档项目。每个项目保持独立的配置。在工作区根目录定义的全局设置会自动级联到每个项目。

```text
docs.example.com/           → 主文档
docs.example.com/sdk/       → SDK 参考文档
docs.example.com/cli/       → CLI 文档
```

## 设置

### 1. 目录结构

每个项目一个目录。共享资源和全局配置位于仓库根目录。

```text
my-docs/
├── assets/                   ← 共享资源（所有项目继承）
├── main-docs/
│   ├── docmd.config.json     ← 项目配置（覆盖根目录默认值）
│   └── docs/                 ← 项目内容
├── sdk-docs/
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← 工作区根配置
└── package.json
```

### 2. 根工作区配置

根目录的 `docmd.config.json` 使用 `workspace` 键。任何顶层键（例如 `theme`、`menubar`、`logo`）作为每个项目的**全局默认值**。

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

| 键 | 类型 | 说明 |
| :-- | :--- | :---------- |
| `projects` | `Array` | 项目列表。至少一个必须使用 `prefix: "/"`。 |
| `switcher` | `Object` | 控制[项目切换器](#项目切换器)的可见性和位置。 |

#### 项目条目字段

| 键 | 类型 | 必填 | 说明 |
| :-- | :--- | :------- | :---------- |
| `prefix` | `String` | ✅ | URL 前缀。根项目使用 `"/"`。 |
| `src` | `String` | ✅ | 目录路径（相对于 CWD），包含项目内容和可选的 `docmd.config.json`。 |
| `title` | `String` | - | 在项目切换器 UI 中显示的名称。 |

### 3. 项目级配置

每个项目目录可以有自己的 `docmd.config.json`。在这里定义的设置**覆盖**工作区根目录的默认值。

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

### 4. 全局配置级联

在工作区根配置中定义的任何键都会自动应用到每个项目。项目配置可以选择性地覆盖这些全局设置。

| 层级 | 优先级 |
| :---- | :--------- |
| 根工作区配置 | 最低（首先应用作为默认值） |
| 项目 `docmd.config.json` | 较高（覆盖根默认值） |
| 项目 `navigation.json` | 最高（导航始终优先） |

**示例**：在根目录定义一次全局 `theme` 和 `menubar`。每个项目只需设置 `title`、`src` 和自己的 `plugins`。

::: callout info "导航优先级" icon:info
项目级的 `navigation.json` 文件**始终优先于**工作区根配置中定义的任何 `navigation` 数组。如果两者都不存在，docmd 会回退到自动目录扫描。
:::

## 项目切换器

项目切换器呈现一个精简的 UI 组件，用于在工作区项目之间导航。

### 配置

```json
{
  "workspace": {
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  }
}
```

| 位置 | 说明 |
| :------- | :---------- |
| `sidebar-top`（默认） | 固定在侧边栏顶部，导航上方。 |
| `sidebar-bottom` | 固定在侧边栏底部。 |
| `options-menu` | 集成到头部选项菜单中，与搜索和主题切换器并排。 |

仅当定义了两个或更多项目时，切换器才会渲染。

## 资源

### 共享资源
将图标、favicon 和全局 CSS 放在根目录的 `assets/` 中。引擎会在 `dev` 和 `build` 期间自动将这些复制到每个项目的输出中。

### 项目特定资源
每个项目可以有自己的 `assets/` 目录。当文件名冲突时，项目资源优先于共享资源。

## 构建与开发

### 开发服务器
```bash
npx @docmd/core dev
```
构建所有项目并从单个端口提供文件服务。文件更改会触发**有针对性的、按项目的**重新构建——只有修改后的项目会重新渲染，而不是整个工作区。根配置更改会触发完整的工作区重新构建。

### 生产构建
```bash
npx @docmd/core build
```
输出单个静态目录。所有项目合并到各自的子路径中。无需反向代理或复杂的 CI 管道。

## 规则与约束

1. **必须包含根项目**：恰好一个项目必须使用 `prefix: "/"`。
2. **前缀唯一**：每个项目必须使用唯一的 URL 前缀。
3. **仅根目录配置 `out`**：只有根工作区配置控制输出目录。子项目配置不得定义 `out`。
4. **无前缀冲突**：如果根项目有一个名为 `sdk/` 的文件夹，而另一个项目使用 `prefix: "/sdk"`，引擎会发出冲突警告。前缀项目始终获胜。

## 从旧配置迁移

0.8.3 之前的 `projects` 数组语法和其他旧配置键会自动规范化为现代 `workspace` 架构以保持向后兼容性。

虽然手动更新不是严格必需的，但你可以使用 CLI 自动升级配置文件到现代架构。

::: callout tip "一键迁移" icon:lightbulb
运行 `npx @docmd/core migrate --upgrade` 自动将根配置重写为当前架构。
:::