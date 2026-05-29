---
title: "创建插件"
description: "扩展 docmd 的综合指南，涵盖自定义逻辑、数据注入和交互功能。"
---

插件是 `docmd` 的主要扩展机制。它们允许您注入自定义 HTML、修改 Markdown 解析逻辑、在模板渲染前注入构建时数据，以及自动化构建后任务。本指南概述了插件 API 和创建可共享组件的最佳实践。

## 插件描述符

每个插件都应导出一个 `plugin` 描述符，声明其身份和功能。这使引擎能够在加载时验证、隔离和执行能力边界。

```javascript
export default {
  plugin: {
    name: 'my-analytics',
    version: '1.0.0',
    capabilities: ['head', 'body', 'post-build']
  },

  generateScripts: (config, opts) => { ... },
  onPostBuild: async (ctx) => { ... }
};
```

> **注意：** 描述符目前是可选的（软性弃用警告）。从 **0.8.0 开始将成为必需**。

## 核心能力

`capabilities` 数组决定您的插件可以使用哪些钩子。

| 能力 | 允许的钩子 | 阶段 |
| :--- | :--- | :--- |
| `init` | `onConfigResolved` | 初始化 |
| `markdown` | `markdownSetup` | 设置 |
| `head` | `generateMetaTags`, `generateScripts` (head) | 渲染 |
| `body` | `generateScripts` (body) | 渲染 |
| `build` | `onBeforeParse`, `onAfterParse`, `onBeforeRender`, `onPageReady` | 构建 |
| `post-build`| `onPostBuild` | 构建后 |
| `dev` | `onDevServerReady` | 开发服务器 |
| `assets` | `getAssets` | 输出 |
| `actions` | `actions` | 交互 |
| `events` | `events` | 交互 |
| `translations`| `translations` | 国际化 |

没有描述符的旧版插件可以访问所有钩子，因此在过渡期间不会有任何中断。

## 插件 API 参考

`docmd` 插件是一个标准 JavaScript 对象（或导出为默认值的模块），实现以下一个或多个钩子。

| 钩子 | 描述 |
| :--- | :--- |
| `markdownSetup(md, opts)` | 扩展 `markdown-it` 实例。同步。 |
| `generateMetaTags(config, page, root)` | 向 `<head>` 注入 `<meta>` 或 `<link>` 标签。 |
| `generateScripts(config, opts)` | 返回包含 `headScriptsHtml` 和 `bodyScriptsHtml` 的对象。 |
| `getAssets(opts)` | 定义要注入的外部文件或 CDN 脚本。 |
| `onPostBuild(ctx)` | 在生成所有 HTML 文件后运行逻辑。 |
| `translations(localeId)` | 返回给定语言环境的翻译字符串对象。 |
| `actions` | 浏览器通过 WebSocket RPC 调用的命名动作处理程序对象。 |
| `events` | 浏览器发送的即发即忘消息的命名事件处理程序对象。 |

## 创建本地插件

创建插件就像定义一个 JavaScript 文件一样简单。例如，`my-plugin.js`：

```javascript
// my-plugin.js
import path from 'path';

export default {
  plugin: {
    name: 'my-plugin',
    version: '1.0.0',
    capabilities: ['head', 'post-build']
  },

  markdownSetup: (md, options) => {
    // 示例：添加规则或使用 markdown-it 插件
  },

  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`自定义插件：已验证 ${pages.length} 个页面。`);
  }
};
```

在您的 `docmd.config.json` 中通过**完整包名**引用插件：

```json
{
  "plugins": {
    "my-plugin": {}
  }
}
```
  }
});
```

> **注意：** 简写名称（如 `math`、`search`）专门为官方 `@docmd/plugin-*` 包保留。第三方插件必须始终使用其完整 npm 包名。

### 插件隔离

每个钩子调用都被包裹在 try/catch 边界中。损坏的插件无法使构建崩溃或干扰其他插件。错误会被记录并收集到构建结束时的摘要中。

## 生命周期钩子

docmd 提供深度集成钩子，允许插件在整个构建管道中操作配置、原始源和页面数据。

| 钩子 | 描述 | 预期返回值 |
| :--- | :--- | :--- |
| **`onConfigResolved(config)`** | 在初始化后立即读取或修改活动规范化配置。 | `void` 或 `Promise<void>` |
| **`onDevServerReady(server, wss)`** | 在开发模式下公开原始 Node.js `http.Server` 和 `WebSocketServer`。 | `void` 或 `Promise<void>` |
| **`onBeforeParse(src, frontmatter)`** | 在传递给 markdown-it 解析之前预处理原始 markdown 字符串数据。 | `string` 或 `Promise<string>` |
| **`onAfterParse(html, frontmatter)`** | 后处理表示 markdown 正文段的生成 HTML。 | `string` 或 `Promise<string>` |
| **`onBeforeRender(page)`** | 在模板渲染前调用。接收完整的 `PageContext`。对 `frontmatter` 和 `html` 的修改会反映在渲染输出中。 | `void` 或 `Promise<void>` |
| **`onPageReady(page)`** | 在页面写入目标文件之前访问完整组装的页面元数据。 | `void` 或 `Promise<void>` |

### 多线程后台任务 (`runWorkerTask`)

从 0.8.0 开始，docmd 在持久的多线程 `WorkerPool` 中处理 markdown。插件可以将自身繁重的 I/O 或 CPU 密集型任务卸载到这些线程中，而不是阻塞主构建线程。

`runWorkerTask` 方法被注入到 `PageContext`、`PostBuildContext` 和 `ActionContext` 中。

```javascript
export default {
  plugin: { name: "my-plugin", version: "1.0.0", capabilities: ["post-build"] },
  
  onPostBuild: async (ctx) => {
    // 传递 worker 脚本的绝对路径、导出的函数名以及参数数组
    const result = await ctx.runWorkerTask('/absolute/path/to/worker.js', 'parseData', [ctx.outputDir]);
  }
}
```

### `onBeforeRender` 和 `PageContext`

`onBeforeRender` 钩子适用于需要注入源文件派生构建时数据的插件 -  - 读取文件元数据、计算自定义 frontmatter 字段或从外部源加载数据。

```typescript
interface PageContext {
  sourcePath: string;           // .md 源文件的绝对路径。始终设置。
  frontmatter: Record<string, any>; // 可变 - 更改反映在模板输出中
  html: string;                 // 可变 - 渲染的 markdown 正文
  localeId?: string;
  versionId?: string;
  relativePathToRoot?: string;
}
```

```javascript
export default {
  plugin: {
    name: 'my-metadata-plugin',
    version: '1.0.0',
    capabilities: ['build']
  },

  onBeforeRender: async (page) => {
    // sourcePath 始终可用 - 无需猜测或路径构建
    const stats = fs.statSync(page.sourcePath);
    page.frontmatter.wordCount = page.html.split(/\s+/).length;
    page.frontmatter.fileSize = stats.size;
  }
};
```

## 深入了解：资产注入

`getAssets()` 钩子允许您的插件安全地捆绑客户端逻辑。

```javascript
getAssets: (options) => {
  return [
    {
      url: 'https://cdn.example.com/lib.js',
      type: 'js',
      location: 'head'
    },
    {
      src: path.join(__dirname, 'plugin-init.js'),
      dest: 'assets/js/plugin-init.js',
      type: 'js',
      location: 'body'
    }
  ];
}
```

## 翻译插件（国际化）

渲染客户端 UI 的插件应通过 `translations(localeId)` 钩子公开可翻译字符串。

```javascript
export default {
  plugin: {
    name: 'my-plugin',
    version: '1.0.0',
    capabilities: ['translations', 'body']
  },

  translations: (localeId) => {
    try {
      const p = path.join(__dirname, 'i18n', `${localeId}.json`);
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch { }
    try {
      const p = path.join(__dirname, 'i18n', 'en.json');
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch { }
    return {};
  }
}
```

## WebSocket RPC 动作

插件可以注册在开发服务器上运行并可通过 `window.docmd` API 从浏览器调用的**动作处理程序**和**事件处理程序**。

```javascript
export default {
  plugin: {
    name: 'my-live-plugin',
    version: '1.0.0',
    capabilities: ['actions', 'events']
  },

  actions: {
    'my-plugin:save-note': async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + '\n\n> ' + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { saved: true };
    }
  },

  events: {
    'my-plugin:page-viewed': (data, ctx) => {
      console.log(`页面已查看: ${data.path}`);
    }
  }
};
```

`ctx`（ActionContext）对象提供：

| 方法 | 描述 |
| :--- | :--- |
| `ctx.readFile(path)` | 相对于项目根目录读取文件。 |
| `ctx.writeFile(path, content)` | 写入文件（触发重建 + 重载）。 |
| `ctx.readFileLines(path)` | 将文件读取为行数组。 |
| `ctx.broadcast(event, data)` | 向所有连接的浏览器推送事件。 |
| `ctx.source` | 用于块级 markdown 操作的源编辑工具。 |
| `ctx.projectRoot` | 项目根目录的绝对路径。 |
| `ctx.config` | 当前 docmd 站点配置。 |

::: callout info "仅开发模式 🛡️"
WebSocket RPC 系统仅在 `npx @docmd/core dev` 期间活跃。生产构建不包含 API 客户端或任何服务器端动作处理。
:::

## 最佳实践

1.  **声明能力**：始终导出带有声明能力的 `plugin` 描述符。从 `0.8.0` 开始将成为必需。
2.  **使用 `onBeforeRender` 进行数据注入**：如果您的插件读取源文件或计算 frontmatter 字段，请使用 `onBeforeRender` - 而不是 `generateMetaTags`。`sourcePath` 在 `PageContext` 中始终可用。
3.  **异步/等待**：始终对 `onPostBuild`、`onBeforeRender` 和动作处理程序使用 `async` 函数。
4.  **无状态**：避免在插件对象中维护状态，因为 `docmd` 可能在开发重建期间重新初始化插件。
5.  **命名约定**：对于社区插件，以 `docmd-plugin-` 为前缀（如 `docmd-plugin-analytics`）。
6.  **动作命名空间**：以插件名称为前缀（如 `my-plugin:save-note`）以避免冲突。
7.  **动作验证**：始终在动作中定义和要求明确的有效载荷模式。
8.  **日志记录**：在 `onPostBuild` 中使用提供的 `log()` 辅助函数。

::: callout tip "AI 就绪设计 🤖"
`docmd` 插件 API 设计为 **LLM 最优**。由于钩子使用标准 JavaScript 对象和类型，没有隐藏的复杂类层次结构，AI 代理可以以最少的指令为您生成无错误的自定义插件。
:::