---
title: "工作区"
description: "通过单个 docmd 实例构建多个独立的文档项目，具有全局配置级联与内置的项目切换器。"
---

工作区让您能够从一个仓库构建和部署多个文档项目。每个项目保留自己的配置。在工作区根目录定义的全局设置会自动级联到每个项目中。

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
├── assets/                   ← 共享资源（所有项目都会继承）
├── main-docs/
│   ├── docmd.config.json     ← 项目配置（覆盖根目录默认）
│   └── docs/                 ← 项目内容
├── sdk-docs/
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← 工作区根配置
└── package.json
```

### 2. 根工作区配置

根 `docmd.config.json` 使用 `workspace` 键。任何顶层键（例如 `theme`、`menubar`、`logo`）都充当每个项目的**全局默认值**。

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
    { "text": "GitHub", "url": "https://github.com/my-org/my-repo", "external": true }
  ]
}
```

#### `workspace` 选项

| 键 | 类型 | 说明 |
| :-- | :--- | :---------- |
| `projects` | `Array` | 项目条目列表。至少一个必须使用 `prefix: "/"`。 |
| `switcher` | `Object` | 控制 [项目切换器](#项目切换器) 的可见性与位置。 |

#### 项目条目字段

| 键 | 类型 | 必需 | 说明 |
| :-- | :--- | :------- | :---------- |
| `prefix` | `String` | ✅ | URL 前缀。根项目使用 `"/"`。 |
| `src` | `String` | ✅ | 目录路径（相对于 CWD），包含项目内容与可选的 `docmd.config.json`。 |
| `title` | `String` | - | 在项目切换器 UI 中显示的名称。 |

### 3. 项目级配置

每个项目目录都可以拥有自己的 `docmd.config.json`。此处定义的设置**覆盖**工作区根的默认设置。

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

如果未找到本地配置文件，引擎会应用零配置自动路由，使用工作区默认值。

### 4. 全局配置级联

在工作区根配置中定义的任何键会自动应用于每个项目。项目配置可以有选择地覆盖这些全局。

| 层级 | 优先级 |
| :---- | :--------- |
| 工作区根配置 | 最低（首先应用为默认） |
| 项目 `docmd.config.json` | 较高（覆盖根默认） |
| 项目 `navigation.json` | 最高（始终优先生效） |

**示例**：在根目录中全局定义一次 `theme` 与 `menubar`。每个项目只需设置 `title`、`src` 以及自己的 `plugins`。

::: callout info "导航优先级" icon:info
项目级 `navigation.json` 文件**始终优先于**工作区根配置中定义的任何 `navigation` 数组。如果两者都不存在，docmd 会回退到自动目录扫描。
:::

## 项目切换器

项目切换器渲染为一个简洁的 UI 组件，用于在工作区项目之间导航。

### 配置

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

| 位置 | 说明 |
| :------- | :---------- |
| `sidebar-top`（默认） | 固定在侧边栏顶部，导航之上。 |
| `sidebar-bottom` | 固定在侧边栏底部。 |
| `options-menu` | 与搜索和主题切换一同集成到页头选项菜单中。 |

仅当定义了两个或更多项目时，切换器才会渲染。

## 资源

### 共享资源
将 Logo、Favicon 与全局 CSS 放在根 `assets/` 目录中。引擎会在 `dev` 与 `build` 期间自动将它们复制到每个项目的输出中。

### 项目专属资源
每个项目可以拥有自己的 `assets/` 目录。当文件名冲突时，项目资源优先于共享资源。

## 构建与开发

### 开发服务器
```bash
npx @docmd/core dev
```
构建所有项目并从单一端口提供服务。文件变更触发**定向的、按项目**的重构建 —— 只有被修改的项目会重新渲染，而不是整个工作区。根配置变更会触发完整的工作区重构建。

### 生产构建
```bash
npx @docmd/core build
```
输出单个静态目录。所有项目合并到它们各自的子路径中。无需反向代理或复杂的 CI 流水线。

## 规则与约束

1. **必须存在根项目**：恰好一个项目必须具有 `prefix: "/"`。
2. **唯一的前缀**：每个项目必须使用唯一的 URL 前缀。
3. **`out` 仅在根中**：只有工作区根配置控制输出目录。子项目配置不得定义 `out`。
4. **无前缀冲突**：如果根项目有一个名为 `sdk/` 的文件夹，且另一个项目使用 `prefix: "/sdk"`，引擎会发出冲突警告。具有前缀的项目始终胜出。

## 从旧配置迁移

0.8.3 之前的 `projects` 数组语法与其他旧版配置键会自动规范化为现代 `workspace` schema，以保持向后兼容。

虽然不严格要求手动更新，但您可以使用 CLI 自动将配置文件升级到现代 schema。

::: callout tip "使用一条命令迁移" icon:lightbulb
运行 `npx @docmd/core migrate --upgrade` 自动将根配置重写为当前 schema。
:::