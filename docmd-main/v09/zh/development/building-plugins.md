---
title: "构建插件"
description: "通过自定义逻辑、数据注入和交互功能扩展 docmd 的综合指南。"
---

插件是 docmd 的主要扩展机制。它们允许您注入 HTML、修改 Markdown 解析、注入构建时数据，并自动化构建后任务。本指南概述了插件 API。

## 插件描述符

每个插件必须导出一个 `plugin` 描述符，声明其身份和能力。这使引擎能够在加载时验证和隔离边界。

```javascript
  "plugin": {
    "name": "my-analytics",
    "version": "1.0.0",
    "capabilities": ["head", "body", "post-build"],
    "requiresLiveServer": false // 可选，如果插件依赖运行中的实时开发服务器则设为 true
  },

  "generateScripts": (config, opts) => { ... },
  "onPostBuild": async (ctx) => { ... }
```

> **注意：** 描述符是严格必需的。没有描述符的插件将无法加载。

## `docmd` 命名空间（0.8.9 新增）

除了运行时 `plugin` 描述符之外，每个官方插件**必须**在其 `package.json` 中声明一个 `docmd` 命名空间。这个命名空间是注册表生成器 读取的构建时契约，用于构建运行时加载器所使用的单一事实来源。

```json "package.json"
{
  "name": "@docmd/plugin-foo",
  "version": "1.0.0",
  "docmd": {
    "key": "foo",
    "kind": "plugin",
    "displayName": "Foo",
    "tagline": "用一句话说明这个插件的用途",
    "capabilities": ["head", "body", "post-build"],
    "requiresLiveServer": false
  }
}
```

| 字段 | 是否必需 | 说明 |
| :--- | :--- | :--- |
| `key` | 建议 | 面向用户的标识符（`config.plugins.<key>`）。省略时从包名派生。 |
| `kind` | 建议 | 值为 `plugin`、`template` 或 `engine` 之一。省略时从目录布局派生。 |
| `displayName` | 建议 | 人类可读的名称，出现在目录和 `docmd doctor` 输出中。 |
| `tagline` | 建议 | 一行说明；作为 npm description 的回退。 |
| `capabilities` | 对插件和模板必需 | 与 JS 描述符中声明的钩子能力相同。构建时的交叉检查会在两者不一致时发出警告。 |
| `preview` | 可选 | 预览资源路径（仅模板）；在目录中显示。 |
| `requiresLiveServer` | 可选 | 设为 `true` 时，在静态生产构建（`docmd build`）期间会自动省略客户端资源（`getAssets`、`generateScripts`、`generateMetaTags`）。默认为 `false`。 |

### Live 开发服务器依赖 (`requiresLiveServer`)

当开发需要实时 WebSocket 交互或开发服务器本地文件持久化的插件时（例如行内编辑或 `@docmd/plugin-threads` 协作讨论），在插件描述符与 `package.json#docmd` 中声明 `"requiresLiveServer": true`。

在静态生产构建（`docmd build`）期间，docmd 会自动跳过前端脚本与样式的注入，但继续运行 Markdown 解析扩展钩子（`markdownSetup`）。这样既保证最终生产静态站点极度轻量且无缺失后端的控制台报错，又保证 Markdown 容器语法能够正常解析。用户也可以在站点配置中通过 `devOnly: false`（或 `liveOnly: false`）灵活覆盖此行为。

引擎具有相同的 `docmd` 命名空间，但**没有 `capabilities`**：它们 不参与钩子系统，只参与引擎加载器。

构建时交叉检查（同样在 0.8.9 中新增）会发现 JS 描述符与清单之间的 漂移，包括以前不可见的"实现了钩子但未声明能力"的静默丢弃问题。

::: callout warning title:"0.9.0 中将移除打包的注册表"
过去作为官方插件目录的手动维护的 `packages/plugins/installer/registry/plugins.json` 从 0.8.9 起已**弃用**，将在 **0.9.0 中移除**。构建时注册表生成器现在是唯一的真相来源：您的插件只需在 `package.json` 中具有正确的 `docmd` 命名空间，生成器就会在下一次 `pnpm build` `@docmd/api` 时拾取它。现有官方插件无需任何代码更改。
:::

## 核心能力

`capabilities` 数组决定您的插件可以使用哪些钩子。

| 能力 | 允许的钩子 | 阶段 |
| :--- | :--- | :--- |
| `init` | `onConfigResolved` | 初始化 |
| `markdown` | `markdownSetup` | 设置 |
| `head` | `generateMetaTags`, `generateScripts` (head) | 渲染 |
| `body` | `generateScripts` (body) | 渲染 |
| `build` | `onBeforeParse`, `onAfterParse`, `onBeforeBuild`, `onBeforeRender`, `onPageReady` | 构建 |
| `post-build`| `onPostBuild` | 构建后 |
| `dev` | `onDevServerReady` | 开发服务器 |
| `server` | `onServerReady` | 开发服务器与 `docmd serve` |
| `assets` | `getAssets` | 输出 |
| `actions` | `actions` | 交互 |
| `events` | `events` | 交互 |
| `translations`| `translations` | i18n |
| `template` *(0.8.7 新增)* | `templates`, `templateAssets` | 渲染 |

> **注意：** `template` 能力是独占的：如果一个插件声明了它，就不能再声明 `head`、`build`、`post-build` 等。模板仅提供插槽和资源；它们不运行生命周期钩子。如果您需要两者，请发布两个独立的包。

## 插件 API 参考

docmd 插件是一个标准的 JavaScript 对象，实现以下一个或多个钩子。

| 钩子 | 说明 |
| :--- | :--- |
| `markdownSetup(md, opts)` | 扩展 `markdown-it` 实例。同步。 |
| `generateMetaTags(config, page, root)` | 将 `<meta>` 或 `<link>` 标签注入 `<head>`。 |
| `generateScripts(config, opts)` | 返回一个包含 `headScriptsHtml` 和 `bodyScriptsHtml` 的对象。 |
| `getAssets(opts)` | 定义要注入的外部文件或 CDN 脚本。 |
| `onPostBuild(ctx)` | 在所有 HTML 文件生成后运行逻辑。 |
| `translations(localeId)` | 返回给定本地化的翻译字符串对象。 |
| `actions` | 命名的 action 处理器对象，可通过 WebSocket RPC 调用。 |
| `events` | 命名的 event 处理器对象，用于浏览器消息。 |
| `templates[]` *(0.8.7 新增，能力：`template`)* | `TemplateHook` 条目数组：每个 `{ type, templatePath }` 覆盖一个 EJS 插槽。 |
| `templateAssets[]` *(0.8.7 新增，能力：`template`)* | `TemplateAssetHook` 条目数组：每个 `{ type, path, priority?, position? }` 提供模板的 CSS/JS bundle。 |

### 构建模板插件（0.8.7 新增）

模板是具有 `capabilities: ['template']` 的插件。它提供 `templates[]` 数组（插槽覆盖）和 `templateAssets[]` 数组（CSS/JS bundle）。请参阅专门的 [模板指南](../theming/templates.md) 和 [主题 : 模板](../theming/templates.md) 以获取完整的编写步骤、插槽表和解析链。最小的可行模板如下：

```javascript "index.js"
export default {
  plugin: {
    name: 'template-foo',
    version: '1.0.0',
    capabilities: ['template'],
  },
  templates: [
    { type: 'menubar', templatePath: '/abs/path/to/templates/partials/menubar.ejs' },
    { type: 'footer',  templatePath: '/abs/path/to/templates/partials/footer.ejs' },
  ],
  templateAssets: [
    { type: 'css', path: '/abs/path/to/assets/css/foo.css', priority: 10, position: 'head' },
  ],
};
```

## 创建本地插件

创建插件就像定义一个 JavaScript 文件一样简单。例如，`my-plugin.js`：

```javascript "my-plugin.js"
import path from "path";

export default {
  plugin: {
    "name": "my-plugin",
    "version": "1.0.0",
    "capabilities": ["head", "post-build"]
  },

  markdownSetup: (md, options) => {
    // 添加自定义解析规则
  },

  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`Custom Plugin: Verified ${pages.length} pages.`);
  }
};
```

要启用您的插件，请在您的 `docmd.config.json` 中引用其**完整包名**：

```json "docmd.config.json"
  "plugins": {
    "my-awesome-plugin": {}
  }
```

> **注意：** 简写名称（例如 `math`、`search`）保留给官方 `@docmd/plugin-*` 包。第三方插件必须始终使用其完整的 npm 包名。

### 插件解析

docmd 引擎按如下方式解析插件名称：
- **官方简写**（`math`、`search`）扩展为 `@docmd/plugin-<name>`。只有官方包可以存在于 `@docmd` 作用域下。
- **第三方插件**必须使用其完整包名（例如 `my-awesome-plugin`、`@myorg/docmd-extras`）。外部插件没有别名系统。这消除了供应链攻击向量。

### 插件隔离

每次钩子调用都被包裹在 try/catch 块中。损坏的插件不会导致构建崩溃或干扰其他插件。错误会被记录并汇总到摘要中。

### 限制插件作用域（`noStyle`）

插件默认会全局注入其 CSS/JS。开发者可以通过导出 `noStyle` 布尔值来明确阻止其插件在 `noStyle` 页面上渲染：

```javascript
export default {
  noStyle: false,

  generateScripts: () => { ... }
}
```

用户可以通过配置（`plugins: { math: { noStyle: false } }`）或通过 Markdown frontmatter（`plugins: { math: true }`）动态覆盖此设置。

## 生命周期钩子

Docmd 提供深度集成钩子。它们允许插件操作配置、原始源码和页面数据。

| 钩子 | 说明 | 预期返回 |
| :--- | :--- | :--- |
| **`onConfigResolved(config)`** | 在初始化后立即读取或修改活动配置。 | `void` 或 `Promise<void>` |
| **`onDevServerReady(server, wss)`** | 在 `npx @docmd/core dev` 期间暴露原始 Node.js 服务器。 | `void` 或 `Promise<void>` |
| **`onServerReady(handle)`** | 一旦托管操作的服务器准备就绪即被调用，适用于 `dev` 以及 [`serve`](../deployment/docmd-serve#插件操作)。需要 `server` 能力。参见[服务器句柄](#服务器句柄-onserverready)。 | `void` 或 `Promise<void>` |
| **`onBeforeParse(src, frontmatter, filePath?)`** | 在解析之前立即预处理原始 markdown 字符串数据。 | `string` 或 `Promise<string>` |
| **`onAfterParse(html, frontmatter, filePath?)`** | 对表示 markdown 主体生成的 HTML 进行后处理。 | `string` 或 `Promise<string>` |
| **`onBeforeBuild(ctx)`** | 在所有 markdown 解析完成后但在 HTML 生成之前调用。用于繁重的预计算。 | `void` 或 `Promise<void>` |
| **`onBeforeRender(page)`** | 在模板渲染之前调用。对 `frontmatter` 和 `html` 的更改会反映在输出中。 | `void` 或 `Promise<void>` |
| **`onPageReady(page)`** | 在完全组装的页面元数据写入目标文件之前访问。 | `void` 或 `Promise<void>` |

### 引擎加速与后台任务（`runWorkerTask`）

docmd 通过**可插拔引擎架构**执行密集型操作。插件可以通过配置的构建引擎（例如 JavaScript 或原生 Rust 工作进程）轻松卸载自定义繁重 I/O 或 CPU 密集型子例程。

`runWorkerTask` 方法被透明地注入到 `PageContext`、`PostBuildContext` 和 `ActionContext`。

```javascript "my-plugin.js"
{
  "plugin": { "name": "my-plugin", "version": "1.0.0", "capabilities": ["post-build"] },

  "onPostBuild": async (ctx) => {
    // 传递注册的引擎 action 名称或绝对脚本路径
    const result = await ctx.runWorkerTask('/path/to/worker.js', 'parseData', [ctx.outputDir]);
  }
}
```

### 数据获取与索引（`onBeforeBuild`）

`onBeforeBuild` 钩子在 markdown 解析完成之后、HTML 渲染循环开始之前运行。它非常适合用于繁重的数据索引或 API 调用。

它接收 `BeforeBuildContext`，其中包含所有 `pages` 和 `tui` 实例。这允许插件显示隔离的进度条。

```typescript
export async function onBeforeBuild({ pages, tui }) {
  tui.step('Fetching remote plugin data', 'WAIT');

  let processed = 0;
  for (const page of pages) {
    if (page.sourcePath) {
      page.frontmatter.remoteData = await fetchHeavyData(page.sourcePath);
    }
    processed++;
    if (processed % 10 === 0 || processed === pages.length) {
      tui.progress('Fetching remote plugin data', processed, pages.length);
    }
  }

  tui.step('Fetching remote plugin data', 'DONE');
}
```

### `onBeforeRender` 和 PageContext

使用 `onBeforeRender` 注入从源文件派生的构建时数据。

```typescript
interface PageContext {
  sourcePath: string;
  frontmatter: Record<string, any>;
  html: string;
  localeId?: string;
  versionId?: string;
  relativePathToRoot?: string;
  runWorkerTask<T = any>(modulePath: string, functionName: string, args: any[]): Promise<T>;
}
```

```javascript "my-metadata-plugin.js"
export default {
  plugin: {
    name: "my-metadata-plugin",
    version: "1.0.0",
    capabilities: ["build"]
  },

  onBeforeRender: async (page) => {
    const stats = fs.statSync(page.sourcePath);
    page.frontmatter.wordCount = page.html.split(/\s+/).length;
    page.frontmatter.fileSize = stats.size;
  }
}
```

## 深入了解：资源注入

`getAssets()` 钩子允许您的插件安全地捆绑客户端逻辑。

```javascript "index.js"
export default {
  getAssets: (options) => {
    return [
      {
        url: "https://example.com/script.js",
        type: "js",
        location: "head"
      },
      {
        src: path.join(__dirname, "plugin-init.js"),
        dest: "assets/js/plugin-init.js",
        type: "js",
        location: "body"
      }
    ];
  }
}
```

## 翻译插件（i18n）

渲染客户端 UI 的插件应通过 `translations(localeId)` 钩子公开字符串。引擎会自动将这些与核心字符串合并。

标准模式将每种语言的 JSON 文件存储在 `i18n/` 目录中：

```javascript "index.js"
import fs from "fs";
import path from "path";

export default {
  plugin: {
    name: "my-plugin",
    version: "1.0.0",
    capabilities: ["translations", "body"]
  },

  translations: (localeId) => {
    try {
      const p = path.join(__dirname, "i18n", `${localeId}.json`);
      return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch { }

    return {};
  }
}
```

## WebSocket RPC Actions

插件可以注册在服务器上运行的 **action 处理器**和 **event 处理器**：在 `dev` 模式下始终运行，在启用 `serve.actions` 的 [`docmd serve`](../deployment/docmd-serve#插件操作) 下同样可用。它们可通过 `window.docmd` API 从浏览器端调用。

```javascript "index.js"
export default {
  plugin: {
    name: "my-live-plugin",
    version: "1.0.0",
    capabilities: ["actions", "events"]
  },

  actions: {
    "my-plugin:save-note": async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + "\n\n> " + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { "saved": true };
    }
  },

  events: {
    "my-plugin:page-viewed": (data, ctx) => {
      console.log(`Page viewed: ${data.path}`);
    }
  }
};
```

`ctx`（ActionContext）提供：

| 方法 | 说明 |
| :--- | :--- |
| `ctx.readFile(path)` | 读取相对于项目根的文件。 |
| `ctx.writeFile(path, content)` | 写入文件。在 `dev` 下触发重新构建和页面刷新；在 `serve` 下文件被重新构建且客户端接收到 `system:rebuilt` 事件。 |
| `ctx.readFileLines(path)` | 将文件读取为行数组。 |
| `ctx.broadcast(event, data)` | 将事件推送给所有连接的浏览器。 |
| `ctx.runWorkerTask(module, fn, args)` | 将繁重 CPU 任务卸载到 worker 池。 |
| `ctx.source` | 用于块级 markdown 操作的源码编辑工具。 |
| `ctx.projectRoot` | 项目根的绝对路径。 |
| `ctx.config` | 当前 docmd 站点配置。 |
| `ctx.mode` | `'dev'` 或 `'serve'`：当前由哪个命令托管此调用。 |
| `ctx.caller` | 调用方信息：参见[调用方](#调用方-ctxcaller)。 |
| `ctx.requestRebuild(files?)` | 重建指定的源文件（未传参则重建所有文件）。 |

所有文件操作都沙箱化到项目根目录。

::: callout info title:"仅限活动服务器 "
操作仅在有服务器托管时运行：`npx @docmd/core dev`，或启用了 `serve.actions.enabled` 的 `npx @docmd/core serve`。静态 `docmd build` 既不包含 API 客户端，也不包含任何操作处理。
:::

### 调用方 (`ctx.caller`)

每个 action 和 event 处理器都会接收 `ctx.caller`，该对象在每个 WebSocket 连接建立时从其升级请求中生成：

| 字段 | 说明 |
| :--- | :--- |
| `transport` | `'websocket'`，或当宿主直接调用调度程序时为 `'local'`。 |
| `headers` | 请求标头，全部转换为小写。已自动移除 `cookie` 和 `set-cookie`。 |
| `origin` | 服务器接受的 `Origin`；在 `dev` 下可为 `null`，在 `serve` 下永不为 `null`。 |
| `remoteAddress` | 对端网络地址。在反向代理之后为代理地址。 |
| `connectionId` | 不透明 ID，在单次浏览器连接生命周期内保持稳定。 |
| `connectedAt` | 连接接受时间戳（Epoch 毫秒）。 |
| `identity` | 服务器受信任身份标头（`serve.actions.identityHeader`）的值，或 `null`。在 `dev` 下始终为 `null`。 |

```javascript
actions: {
  "my-plugin:save-note": async (payload, ctx) => {
    const author = ctx.caller.identity || (ctx.mode === 'dev' ? 'local' : null);
    if (!author) throw new Error('需登录方可添加注释');
    // ...
  }
}
```

### 服务器句柄 (`onServerReady`)

声明了 `server` 能力的插件可以实现 `onServerReady(handle)`。宿主在接受任何 WebSocket 连接之前会调用它一次：包括 `dev` 模式以及启用了操作的 `serve` 模式。在 `serve` 下，如果此钩子抛出异常，服务器将终止启动。

| 成员 | 说明 |
| :--- | :--- |
| `handle.mode` | `'dev'` 或 `'serve'`。 |
| `handle.projectRoot` | 项目根目录的绝对路径。 |
| `handle.config` | 当前 docmd 站点配置。 |
| `handle.rebuild(files?)` | 重建指定的源文件或整个站点。 |
| `handle.broadcast(event, data)` | 向所有连接的客户端推送事件。 |
| `handle.onShutdown(fn)` | 注册服务器在平滑停机期间等待的回调（停止计时器、持久化数据等）。 |

```javascript
export default {
  plugin: { name: "my-sync", version: "1.0.0", capabilities: ["server"] },

  onServerReady(handle) {
    const timer = setInterval(() => handle.rebuild(), 60_000);
    handle.onShutdown(() => clearInterval(timer));
  }
};
```

## 最佳实践

1.  **声明能力**：始终导出带有声明能力的 `plugin` 描述符。
2.  **使用 `onBeforeRender` 进行数据注入**：如果您的插件计算 frontmatter 字段，请使用 `onBeforeRender`。
3.  **Async/Await**：始终对 `onPostBuild`、`onBeforeRender` 和 action 处理器使用 `async` 函数。
4.  **无状态**：避免在插件对象中维护状态。引擎可能会动态重新初始化插件。
5.  **命名约定**：社区包名称以前缀 `docmd-plugin-` 开头。
6.  **Action 命名空间**：action 名称以您的插件名称为前缀（例如 `my-plugin:save-note`）。
7.  **Action 验证**：在您的 actions 中定义并要求显式的 payload schema。
8.  **日志记录**：在 `onPostBuild` 中使用提供的 `log()` helper 以遵守用户的详细程度设置。

::: callout tip title:"AI 就绪的设计 "
docmd 插件 API 是 **LLM 优化的**。由于钩子使用标准 JavaScript 对象，AI 智能体可以以最少的指令生成无错误的插件。
:::

## ESM exports: `default` 条件

您的 `package.json` **必须**在 `exports["."]` 中同时包含 `import` 条
件和 `"default"` 条件:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "default": "./dist/index.js"
  }
}
```

如果您只声明 `import`,自动安装器的第一次尝试会抛出
`ERR_PACKAGE_PATH_NOT_EXPORTED`,因为 Node 的 CommonJS 解析器找不到
任何匹配条件。重试路径仍会成功(它直接使用动态 `import()`),但构
建每次都会打印一行多余的 "Plugin installed" 提示。

该约定与 `@docmd/plugin-git`、`@docmd/plugin-openapi` 和
`@docmd/plugin-threads` 现有的发布一致。模板
(`@docmd/template-*`) 的要求相同。