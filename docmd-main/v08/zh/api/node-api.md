---
title: "Node.js API"
description: "把 docmd 的构建引擎集成进您的自定义 Node.js 脚本与自动化流水线。"
---

您可以在 Node.js 应用中直接导入并使用 docmd 的构建引擎。这非常适合定制化的 CI/CD 流水线、自动化的文档生成，或为特定环境扩展 docmd。

## 安装

请确保 `@docmd/core` 已经安装在您的项目中：

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

生成浏览器版的 **Live Editor** bundle。

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

若要以编程方式管理 workspace，请使用专门的 workspace 函数。

### `isWorkspace(config)`
当传入的配置对象符合 Workspace schema 时返回 `true`。

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

您可以把 docmd 包进更复杂的文档工作流。

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

## 插件 API (`@docmd/api`)

`@docmd/api` 是插件系统的专属包。它提供 hook 注册、WebSocket RPC 分发、源文件编辑工具，以及**集中的 URL 工具**。

```bash
npm install @docmd/api
```

### URL 工具

插件应使用这些集中工具，而不是各自实现 URL 逻辑。

#### `outputPathToSlug(outputPath)`

将构建引擎的输出路径转换为干净的目录式 slug。

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/index.html');   // → 'guide/'
outputPathToSlug('index.html');         // → '/'
outputPathToSlug('de/v1/api/index.html'); // → 'de/v1/api/'
```

#### `outputPathToPathname(outputPath)`

转换为根相对的 pathname。

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

#### `outputPathToCanonical(outputPath, siteUrl)`

拼接出完整的 canonical URL。

```javascript
import { outputPathToCanonical } from "@docmd/api";

outputPathToCanonical("guide/index.html", "https://docs.example.com");
```

#### `sanitizeUrl(url)`

合并多余斜杠（协议后的双斜杠除外）。

```javascript
import { sanitizeUrl } from "@docmd/api";

sanitizeUrl("https://docs.example.com//guide"); // → "https://docs.example.com/guide"
sanitizeUrl("/foo//bar"); // → "/foo/bar"
```

#### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

拼出带 locale、version 前缀的绝对 URL。

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'de/', 'v1/', 'guide/'); // → '/de/v1/guide/'
```

#### `resolveHref(href)`

把用户手写的 href 规整为干净的 URL。处理 `.md` 剥离、尾部斜杠，以及 `external:` 与 `raw:` 前缀。

```javascript
import { resolveHref } from "@docmd/api";

resolveHref("overview.md"); // → "overview/"
resolveHref("external:https://github.com"); // → "https://github.com"
resolveHref("raw:docs/readme.md"); // → "docs/readme.md"
```

### 预计算好的页面 URL

每个 page 对象都带有预计算的 URL 字段。插件可以直接读取，无需额外计算。

```javascript
export async function onPostBuild({ pages, config }) {
  for (const page of pages) {
    console.log(page.urls.slug);
    console.log(page.urls.canonical);
    console.log(page.urls.pathname);
  }
}
```

| 属性 | 类型 | 说明 |
|:---------|:-----|:------------|
| `slug` | `string` | 干净的目录式 slug（例如 `guide/` 或 `/`） |
| `canonical` | `string` | 完整 canonical URL（仅当设置了 `config.url` 时存在） |
| `pathname` | `string` | 根相对路径（例如 `/guide/`） |

> **注意：** `@docmd/api` 导出的所有内容，也可以从 `@docmd/core` 导入。建议新项目直接从 `@docmd/api` 导入。

### `createActionDispatcher(hooks, options)`

创建一个分派器，把 WebSocket RPC 消息路由到插件的 action / event 处理器。

```javascript
import { createActionDispatcher } from "@docmd/api";

const dispatcher = createActionDispatcher(
  { "actions": myPlugin.actions, "events": myPlugin.events },
  { "projectRoot": "/path/to/project", config, broadcast }
);

const { result, reload } = await dispatcher.handleCall("my-action", payload);
```

### `createSourceTools({ projectRoot })`

生成用于编辑 Markdown 源文件的工具集。

```javascript
import { createSourceTools } from "@docmd/api";

const source = createSourceTools({ "projectRoot": "/path/to/project" });

const block = await source.getBlockAt("docs/page.md", [10, 12]);
await source.wrapText("docs/page.md", [10, 12], "important", 0, "**", "**");
```

### `loadPlugins(config, options)`

加载、校验并注册所有在配置中声明的插件，返回填充好的 hook 注册表。

```javascript
import { loadPlugins, hooks } from "@docmd/api";

const registeredHooks = await loadPlugins(config, {
  "resolvePaths": [__dirname]
});
```

### 引擎加载器 API

可插拔的引擎架构允许通过 `@docmd/api` 直接以编程方式解析并实例化加速层。

#### `loadEngine(engineName)`

解析并初始化所请求的构建引擎后端。当原生二进制不可用时，会优雅回退到高性能的 JavaScript 引擎。

```javascript
import { loadEngine } from "@docmd/api";

const engine = await loadEngine("rust");
const gitLogResult = await engine.runWorkerTask("git:log", { "paths": ["docs/guide.md"] });
```

#### `registerEngine(engineName, engineInstance)`

允许自定义工具或第三方集成方通过编程方式注册自定义的执行引擎。

```javascript
import { registerEngine } from "@docmd/api";

registerEngine("custom", myCustomEngineImpl);
```

### 类型导出

对于 TypeScript 插件作者，以下类型可用：

```typescript
import type {
  PluginModule,
  PluginDescriptor,
  PluginHooks,
  PageContext,
  BeforeBuildContext,
  PostBuildContext,
  Capability,
  ActionContext,
  ActionHandler,
  EventHandler,
  SourceTools,
  BlockInfo,
  TextLocation,
  Engine,
} from '@docmd/api';
```
