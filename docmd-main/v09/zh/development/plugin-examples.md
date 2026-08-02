---
title: "通过自定义插件扩展 docmd"
description: "如何借助 docmd 的生命周期钩子 (lifecycle hooks)，构建自定义功能并扩展文档引擎。"
---

## 问题

有时您有一些内置特性覆盖不到的具体需求。例如，可能需要在构建过程中从内部 API 拉取数据，或对生成的 HTML 执行复杂转换。

## 为什么重要

可扩展性是静态工具与专业级文档框架的分水岭。若没有注入自定义逻辑的清晰方式，团队就只能维护脆弱的 shell 脚本或后处理包装器，让构建过程既难管理又难调试。

## 方法

docmd 提供了一套可靠、基于钩子的 [插件 API](../../plugins/building-plugins.md)。您只需编写简单的 Node.js 模块，就能在文档生命周期的不同阶段介入，在从初始配置到最终 HTML 生成的任意环节，自由修改内容与行为。

## 实现

### 1. 创建一个本地插件

插件就是标准的 JavaScript 模块，导出一个描述符和一组生命周期钩子。

```javascript "plugins/version-injector.js"

let latestVersion = "0.0.0";

export default {
  // 插件描述符
  plugin: {
    "name": "version-injector",
    "version": "1.0.0",
    "capabilities": ["init", "build"]
  },

  // 生命周期钩子
  async onConfigResolved(config) {
    // 在初始化阶段一次性拉取外部数据
    const response = await fetch("https://api.example.com/version");
    latestVersion = await response.text();
    console.log(`[Plugin] 已拉取版本：${latestVersion}`);
  },

  // 在写入前修改 HTML
  async onBeforeRender(page) {
    if (!page.html) return;

    page.html = page.html.replace(/\{\{VERSION\}\}/g, latestVersion);
    page.frontmatter.computedVersion = latestVersion;
  }
};
```

### 2. 注册插件

将本地插件 import 到您的 `docmd.config.js`（或 `docmd.config.ts`）中进行注册。JSON 配置文件无法使用 import —— 若要注册插件，请使用 `.js` 或 `.ts` 格式。

```javascript "plugins/version-injector.js"
import VersionInjector from "./plugins/version-injector.js";

export default {
  "title": "我的项目文档",
  "plugins": {
    // 注入本地插件对象
    "version-injector": VersionInjector
  }
};
```

## 取舍

自定义插件运行在构建时的 Node.js 环境中。它能力强大，但若不加优化，可能影响构建性能。`onAfterParse` 或 `onPageReady` 等钩子中的逻辑会对站点中**每个**页面执行。请确保您的转换是高效的（例如使用经过优化的正则），以保持构建速度。