---
title: "Node API 参考"
description: "面向插件作者的低层级 Node API —— URL 工具、Action 分发器、源文件工具、引擎加载器与 TypeScript 类型。"
---

::: callout info
**面向插件作者。** 如果您只是想*从 Node 脚本中*调用 docmd，请参阅 [Build API](/reference/build-api)。本页介绍的是 `@docmd/api` 为编写插件所提供的更深层工具。
:::

`@docmd/api` 是插件系统的专属包。它提供 hook 注册、WebSocket RPC 分发、源文件编辑工具，以及集中的 URL 工具。

```bash
npm install @docmd/api
```

::: callout tip
**注意：** `@docmd/api` 导出的所有内容，也可以从 `@docmd/core` 导入。建议新项目直接从 `@docmd/api` 导入。
:::

## URL 工具

插件应使用这些集中工具，而不是各自实现 URL 逻辑。

### `outputPathToSlug(outputPath)`

将构建引擎的输出路径转换为干净的目录式 slug。

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/index.html');   // → 'guide/'
outputPathToSlug('index.html');         // → '/'
outputPathToSlug('de/v1/api/index.html'); // → 'de/v1/api/'
```

### `outputPathToPathname(outputPath)`

转换为根相对的 pathname。

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

### `outputPathToCanonical(outputPath, siteUrl)`

拼接出完整的 canonical URL。

```javascript
import { outputPathToCanonical } from "@docmd/api";

outputPathToCanonical("guide/index.html", "https://docs.example.com");
```

### `sanitizeUrl(url)`

合并多余斜杠（协议后的双斜杠除外）。

```javascript
import { sanitizeUrl } from "@docmd/api";

sanitizeUrl("https://docs.example.com//guide"); // → "https://docs.example.com/guide"
sanitizeUrl("/foo//bar"); // → "/foo/bar"
```

### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

拼出带 locale、version 前缀的绝对 URL。

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'de/', 'v1/', 'guide/'); // → '/de/v1/guide/'
```

### `resolveHref(href)`

把用户手写的 href 规整为干净的 URL。处理 `.md` 剥离、尾部斜杠，以及 `external:` 与 `raw:` 前缀。

```javascript
import { resolveHref } from "@docmd/api";

resolveHref("overview.md"); // → "overview/"
resolveHref("external:https://github.com"); // → "https://github.com"
resolveHref("raw:docs/readme.md"); // → "docs/readme.md"
```

## 预计算好的页面 URL

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

## Action 与 Event 分发

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

## 引擎加载器 API

可插拔的引擎架构允许通过 `@docmd/api` 直接以编程方式解析并实例化加速层。

### `loadEngine(engineName)`

解析并初始化所请求的构建引擎后端。当原生二进制不可用时，会优雅回退到高性能的 JavaScript 引擎。

```javascript
import { loadEngine } from "@docmd/api";

const engine = await loadEngine("rust");
const gitLogResult = await engine.runWorkerTask("git:log", { "paths": ["docs/guide.md"] });
```

### `registerEngine(engineName, engineInstance)`

允许自定义工具或第三方集成方通过编程方式注册自定义的执行引擎。

```javascript
import { registerEngine } from "@docmd/api";

registerEngine("custom", myCustomEngineImpl);
```

## 类型导出

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

## 下一步

- [开发插件](/development/building-plugins) —— 起点。
- [插件示例](/development/plugin-examples) —— 查看完整的插件演练。
- [引擎与架构](/development/engines/overview) —— Rust 引擎、N-API 与引擎加载器内部。