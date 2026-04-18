---
title: "Node.js API"
description: "将 docmd 构建引擎集成到自定义 Node.js 脚本和自动化流水线中。"
---

对于高级工作流，你可以直接在自己的 Node.js 应用中导入并使用 `docmd` 构建引擎。非常适合自定义 CI/CD 流水线、自动化文档生成，或针对特殊环境扩展 `docmd`。

## 安装

确保项目中已安装 `@docmd/core`：

```bash
npm install @docmd/core
```

## 核心函数

### `buildSite(configPath, options)`

主要构建函数，处理配置加载、Markdown 解析和资源生成。

```javascript
import { buildSite } from '@docmd/core';

async function runBuild() {
  await buildSite('./docmd.config.js', {
    isDev: false,      // 设为 true 启用监听模式逻辑
    offline: false,    // 设为 true 针对 file:// 访问优化
    zeroConfig: false  // 设为 true 绕过配置文件检测
  });
}
```

### `buildLive(options)`

生成基于浏览器的**实时编辑器**包。

```javascript
import { buildLive } from '@docmd/core';

async function generateEditor() {
  await buildLive({
    serve: false, // true 启动本地服务器；false 生成静态文件
    port: 3000    // serve 为 true 时使用的自定义端口
  });
}
```

## 示例：自定义流水线

你可以封装 `docmd` 创建复杂的文档工作流。

```javascript
import { buildSite } from '@docmd/core';
import fs from 'fs-extra';

async function deploy() {
  // 1. 生成动态内容
  await fs.writeFile('./docs/dynamic.md', '# 生成的内容');

  // 2. 执行 docmd 构建
  await buildSite('./docmd.config.js');

  // 3. 移动输出
  await fs.move('./site', './public/docs');
}
```

::: callout tip
编程式 API 与 **AI 驱动的文档**高度兼容。Agent 可在内容更新后触发构建，以验证完整性并自主管理部署。
:::

## 插件 API（`@docmd/api`）

`@docmd/api` 包是插件系统的专用包，提供钩子注册、WebSocket RPC 调度和源码编辑工具。

```bash
npm install @docmd/api
```

> **向后兼容：** `@docmd/api` 的所有导出都从 `@docmd/core` 重新导出，因此现有代码无需修改即可继续使用。新项目建议直接从 `@docmd/api` 导入。

### `createActionDispatcher(hooks, options)`

创建一个调度器，将 WebSocket RPC 消息路由到插件的动作/事件处理程序。

```javascript
import { createActionDispatcher } from '@docmd/api';

const dispatcher = createActionDispatcher(
  { actions: myPlugin.actions, events: myPlugin.events },
  { projectRoot: '/path/to/project', config, broadcast }
);

const { result, reload } = await dispatcher.handleCall('my-action', payload);
```

### `createSourceTools({ projectRoot })`

创建用于 Markdown 文件操作的源码编辑工具。

```javascript
import { createSourceTools } from '@docmd/api';

const source = createSourceTools({ projectRoot: '/path/to/project' });

// 获取指定行范围的块信息
const block = await source.getBlockAt('docs/page.md', [10, 12]);

// 用语法标记包裹文本
await source.wrapText('docs/page.md', [10, 12], 'important', 0, '**', '**');
```

### `loadPlugins(config, options)`

加载、验证并注册配置中声明的所有插件。返回填充后的钩子注册表。

```javascript
import { loadPlugins, hooks } from '@docmd/api';

const registeredHooks = await loadPlugins(config, {
  resolvePaths: [__dirname]  // 在 pnpm 工作区中帮助解析插件
});
```

### 类型导出

TypeScript 插件作者可使用以下类型：

```typescript
import type {
  PluginModule,       // 完整插件合约接口
  PluginDescriptor,   // 插件元数据（名称、版本、功能声明）
  PluginHooks,        // 钩子注册表的形状
  Capability,         // 钩子类别声明 (init, body, actions 等)
  ActionContext,      // 传递给动作/事件处理程序的上下文
  ActionHandler,      // 动作处理程序签名
  EventHandler,       // 事件处理程序签名
  SourceTools,        // 源码编辑工具接口
  BlockInfo,          // getBlockAt 返回的块信息
  TextLocation,       // findText 返回的文本位置
} from '@docmd/api';
```
