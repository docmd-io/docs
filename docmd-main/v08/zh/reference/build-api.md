---
title: "Build API"
description: "程序化的构建 API —— 在 Node.js 中调用 docmd 来构建站点、Live Editor bundle 与 workspace 项目。"
---

您可以直接在 Node.js 应用中导入并使用 docmd 的构建引擎。这非常适合自定义 CI/CD 流水线、自动化的文档生成，以及在 monorepo 中预渲染文档。

## 安装

请确保 `@docmd/core` 已安装到您的项目：

```bash
npm install @docmd/core
```

## 核心函数

### `buildSite(configPath, options)`

最主要的构建函数。它负责加载配置、解析 Markdown，并生成资源。

```javascript
import { buildSite } from "@docmd/core";

async function runBuild() {
  await buildSite("./docmd.config.json", {
    "isDev": false,
    offline: false,
    zeroConfig: false
  });
}
```

### `buildLive(options)`

生成浏览器版 **Live Editor** 的 bundle。

```javascript
import { buildLive } from "@docmd/core";

async function generateEditor() {
  await buildLive({
    "serve": false,
    port: 3000
  });
}
```

## Workspace 管理

如要以编程方式管理 workspace，请使用专门的 workspace 函数。

### `isWorkspace(config)`
当传入的配置对象符合 workspace schema 时返回 `true`。

### `detectWorkspace(configPath)`
检测并加载 workspace 配置文件。返回规范化后的 `WorkspaceRootConfig`，若不存在则返回 `null`。

### `buildWorkspace(config, options)`
构建 workspace 中的所有项目。会处理共享资源与项目专属前缀。

### `devWorkspace(config, options)`
启动 workspace 的 dev 服务器。监听所有项目的变更，并执行定向重建。

```javascript
import { detectWorkspace, buildWorkspace } from "@docmd/core";

async function buildAll() {
  const config = await detectWorkspace("./docmd.config.json");
  if (config) {
    await buildWorkspace(config, { quiet: false });
  }
}
```

## 示例：自定义流水线

将 docmd 包进更复杂的文档工作流：先生成动态内容，再构建，然后把产物搬到最终位置。

```javascript
import { buildSite } from '@docmd/core';
import fs from 'fs-extra';

async function deploy() {
  // 1. 生成动态内容
  await fs.writeFile('./docs/dynamic.md', '# 自动生成的内容');

  // 2. 执行构建
  await buildSite('./docmd.config.json');

  // 3. 移动产物
  await fs.move('./site', './public/docs');
}
```

::: callout tip
这套编程式 API 与 **AI 驱动的文档** 高度契合。Agent 可以在内容更新后触发构建，以校验完整性并自主完成部署。
:::

## 下一步

- [插件](/plugins/usage) —— 扩展 docmd 而无需改动引擎。
- [CLI 命令](/reference/cli-commands) —— 大多数 CI/CD 场景下的推荐路径。
- [Workspaces](/configuration/workspaces) —— 多项目场景下的配置参考。
