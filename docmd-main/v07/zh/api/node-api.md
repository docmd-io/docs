---
title: "Node.js API"
description: "将 docmd 的构建引擎集成到你的自定义 Node.js 脚本和自动化流水线中。"
---

对于高级工作流，你可以直接在自己的 Node.js 应用程序中导入并使用 `docmd` 构建引擎。这对于自定义 CI/CD 流水线、自动化文档生成或为特定环境扩展 `docmd` 非常理想。

## 安装

确保你的项目中安装了 `@docmd/core`：

```bash
npm install @docmd/core
```

## 核心函数

### `buildSite(configPath, options)`

主要的构建函数。它处理配置加载、Markdown 解析和资源生成。

```javascript
import { buildSite } from '@docmd/core';

async function runBuild() {
  await buildSite('./docmd.config.js', {
    isDev: false,      // 设置为 true 以启用监视模式逻辑
    offline: false,    // 设置为 true 以优化 file:// 访问
    zeroConfig: false  // 设置为 true 以跳过配置文件检测
  });
}
```

### `buildLive(options)`

生成基于浏览器的 **实时编辑器 (Live Editor)** 捆绑包。

```javascript
import { buildLive } from '@docmd/core';

async function generateEditor() {
  await buildLive({
    serve: false, // true 启动本地服务器；false 生成静态文件
    port: 3000    // 如果 serve 为 true，则指定自定义端口
  });
}
```

## 示例：自定义流水线

你可以封装 `docmd` 来创建复杂的文档工作流。

```javascript
import { buildSite } from '@docmd/core';
import fs from 'fs-extra';

async function deploy() {
  // 1. 生成动态内容
  await fs.writeFile('./docs/dynamic.md', '# Generated Content');

  // 2. 执行 docmd 构建
  await buildSite('./docmd.config.js');

  // 3. 移动输出结果
  await fs.move('./site', './public/docs');
}
```

::: callout tip
编程式 API 与 **AI 驱动的文档** 高度兼容。代理可以在内容更新后触发构建以验证完整性，并自主管理部署。
:::

## 插件 API (`@docmd/api`)

`@docmd/api` 软件包是插件系统的专属家园。它提供钩子注册、WebSocket RPC 调度、源码编辑工具以及 **集中式 URL 实用程序**。

```bash
npm install @docmd/api
```

### URL 实用程序

插件应使用这些集中式实用程序，而不是编写自己的 URL 逻辑。

#### `outputPathToSlug(outputPath)`

将构建引擎输出路径转换为干净的目录样式 slug。

```javascript
import { outputPathToSlug } from '@docmd/api';

outputPathToSlug('guide/index.html');   // → 'guide/'
outputPathToSlug('index.html');         // → '/'
outputPathToSlug('de/v1/api/index.html'); // → 'de/v1/api/'
```

#### `outputPathToPathname(outputPath)`

转换为根相对路径名。

```javascript
import { outputPathToPathname } from '@docmd/api';

outputPathToPathname('guide/index.html'); // → '/guide/'
outputPathToPathname('index.html');       // → '/'
```

#### `outputPathToCanonical(outputPath, siteUrl)`

构建完整的规范 URL。

```javascript
import { outputPathToCanonical } from '@docmd/api';

outputPathToCanonical('guide/index.html', 'https://example.com');
// → 'https://example.com/guide/'
```

#### `sanitizeUrl(url)`

折叠双斜杠（协议之后的除外）。

```javascript
import { sanitizeUrl } from '@docmd/api';

sanitizeUrl('https://example.com//path/'); // → 'https://example.com/path/'
sanitizeUrl('/foo//bar/');                  // → '/foo/bar/'
```

#### `buildAbsoluteUrl(base, localePrefix, versionPrefix, pagePath)`

构建带有语言环境和版本前缀的绝对 URL。

```javascript
import { buildAbsoluteUrl } from '@docmd/api';

buildAbsoluteUrl('/', 'de/', 'v1/', 'guide/');
// → '/de/v1/guide/'
```

#### `resolveHref(href)`

将用户编写的 href 规范化为干净的 URL。处理 `.md` 剥离、尾随斜杠、`external:` 和 `raw:` 前缀。

```javascript
import { resolveHref } from '@docmd/api';

resolveHref('overview.md');
// → { href: 'overview/', isExternal: false, isRaw: false }

resolveHref('external:https://github.com/docmd-io/docmd');
// → { href: 'https://github.com/docmd-io/docmd', isExternal: true, isRaw: false }

resolveHref('raw:docs/readme.md');
// → { href: 'docs/readme.md', isExternal: false, isRaw: true }
```

### 预计算的页面 URL

每个页面对象都包含预计算的 URL 数据。插件可以直接读取这些数据 —— 无需计算。

```javascript
export async function onPostBuild({ pages, config }) {
  for (const page of pages) {
    console.log(page.urls.slug);      // "guide/"
    console.log(page.urls.canonical); // "https://example.com/guide/"
    console.log(page.urls.pathname);  // "/guide/"
  }
}
```

| 属性 | 类型 | 描述 |
|:---------|:-----|:------------|
| `slug` | `string` | 干净的目录样式 slug (例如, `guide/` 或 `/`) |
| `canonical` | `string` | 完整规范 URL (仅当设置了 `config.url` 时) |
| `pathname` | `string` | 根相对路径 (例如, `/guide/`) |

> **向后兼容性：** `@docmd/api` 中的所有导出也从 `@docmd/core` 中重新导出，因此现有代码可以继续运行而无需更改。建议新项目直接从 `@docmd/api` 导入。

### `createActionDispatcher(hooks, options)`

创建一个调度程序，将 WebSocket RPC 消息路由到插件动作/事件处理程序。

```javascript
import { createActionDispatcher } from '@docmd/api';

const dispatcher = createActionDispatcher(
  { actions: myPlugin.actions, events: myPlugin.events },
  { projectRoot: '/path/to/project', config, broadcast }
);

const { result, reload } = await dispatcher.handleCall('my-action', payload);
```

### `createSourceTools({ projectRoot })`

创建用于操作 markdown 文件的源编辑实用程序。

```javascript
import { createSourceTools } from '@docmd/api';

const source = createSourceTools({ projectRoot: '/path/to/project' });

// 获取特定行范围的块信息
const block = await source.getBlockAt('docs/page.md', [10, 12]);

// 使用语法标记包装文本
await source.wrapText('docs/page.md', [10, 12], 'important', 0, '**', '**');
```

### `loadPlugins(config, options)`

加载、验证并注册配置中声明的所有插件。返回填充好的钩子注册表。

```javascript
import { loadPlugins, hooks } from '@docmd/api';

const registeredHooks = await loadPlugins(config, {
  resolvePaths: [__dirname]  // 帮助解析 pnpm 工作区中的插件
});
```

### 类型导出

对于 TypeScript 插件作者，可以使用以下类型：

```typescript
import type {
  PluginModule,       // 完整插件合约接口
  PluginDescriptor,   // 插件元数据 (名称, 版本, 能力)
  PluginHooks,        // 钩子注册表的形状
  Capability,         // 钩子类别声明 (init, body, actions, 等)
  ActionContext,      // 传递给动作/事件处理程序的上下文
  ActionHandler,      // 动作处理程序的签名
  EventHandler,       // 事件处理程序的签名
  SourceTools,        // 源码编辑工具接口
  BlockInfo,          // getBlockAt 返回的块信息
  TextLocation,       // findText 返回的文本位置
} from '@docmd/api';
```