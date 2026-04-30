---
title: "使用自定义插件扩展 docmd"
description: "如何使用 docmd 的生命周期钩子构建自定义功能并扩展文档引擎。"
---

## 问题

有时您有一些非常具体的需求，内置功能或现有插件无法满足。例如，您可能需要在构建过程中从内部 API 获取数据，或者对生成的 HTML 进行超出简单 CSS 范畴的复杂转换。

## 为什么重要

可扩展性是静态工具与专业文档框架的区别所在。如果没有一种清晰的方式来注入自定义逻辑，团队往往不得不维护脆弱的 shell 脚本或后处理封装程序，这使得构建过程难以管理和调试。

## 方法

`docmd` 具有强大的基于钩子的 [Plugin API](../../plugins/api)。您可以编写简单的 Node.js 模块，在文档生命周期的各个阶段（从初始配置到最终 HTML 生成）进行拦截，从而允许您任意修改内容和行为。

## 实施

### 1. 创建本地插件

插件是一个标准的 JavaScript 模块，它导出一个描述符和若干生命周期钩子。

```javascript
// plugins/version-injector.js
export default {
  // 插件元数据
  plugin: {
    name: 'version-injector',
    version: '1.0.0',
    capabilities: ['build'] // 使用 'build' 钩子所必需的
  },

  // 在钩子之间共享的状态
  latestVersion: '0.0.0',

  // 在配置解析完成后运行
  async onConfigResolved(config) {
    // 从内部 API 获取数据
    const response = await fetch('https://api.internal.com/version');
    this.latestVersion = await response.text();
    console.log(`[插件] 已获取版本：${this.latestVersion}`);
  },

  // 在 Markdown 解析后拦截 HTML
  async onAfterParse(html, frontmatter) {
    if (!html) return html;
    // 将占位符替换为动态数据
    return html.replace(/\{\{VERSION\}\}/g, this.latestVersion);
  }
};
```

### 2. 注册插件

您可以通过将本地插件导入到 `docmd.config.js` 中来注册它。

```javascript
// docmd.config.js
import VersionInjector from './plugins/version-injector.js';

export default {
  title: '我的项目文档',
  plugins: {
    // 通过提供导入的模块进行注册
    'version-injector': VersionInjector
  }
};
```

## 权衡

自定义插件在构建时的 Node.js 环境中运行。虽然功能强大，但如果不进行优化，可能会影响构建性能。像 `onAfterParse` 或 `onPageReady` 这样的钩子逻辑会为网站中的 *每一页* 运行。请确保您的转换是高效的（例如使用优化的正则表达式），以保持快速的构建速度。
