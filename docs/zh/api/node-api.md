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

## 插件 API 导出

`@docmd/core` 还导出了用于构建带有服务器端动作处理的高级插件的工具函数。

### `createActionDispatcher(hooks, options)`

创建一个调度器，将 WebSocket RPC 消息路由到插件的动作/事件处理程序。

```javascript
import { createActionDispatcher } from '@docmd/core';

const dispatcher = createActionDispatcher(
  { actions: myPlugin.actions, events: myPlugin.events },
  { projectRoot: '/path/to/project', config, broadcast }
);

const { result, reload } = await dispatcher.handleCall('my-action', payload);
```

### `createSourceTools({ projectRoot })`

创建用于 Markdown 文件操作的源码编辑工具。

```javascript
import { createSourceTools } from '@docmd/core';

const source = createSourceTools({ projectRoot: '/path/to/project' });
```
