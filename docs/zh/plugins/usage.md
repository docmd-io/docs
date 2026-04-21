---
title: "使用插件"
description: "安装、配置和管理 docmd 插件——从必需的内置插件到可选的扩展插件。"
---

`docmd` 采用模块化插件架构。必需插件随核心包提供，无需安装。可选插件只需一条 CLI 命令即可安装。

## 安装插件

使用 `docmd` CLI 安装和移除插件：

```bash
# 安装插件
docmd add <插件名称>

# 移除插件
docmd remove <插件名称>
```

安装程序会自动检测你的包管理器（npm、pnpm、yarn 或 bun），将短名称解析为完整包名，并将插件配置写入 `docmd.config.js`。

使用 `--verbose` (或 `-V`) 查看完整安装日志：

```bash
docmd add <插件名称> -V
```

## 必需插件

这些插件已随 `@docmd/core` 一起打包——无需安装，在 `docmd.config.js` 中启用即可：

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    search: {},                        // 离线全文搜索
    seo: { aiBots: false },            // Meta 标签、Open Graph、AI 爬虫控制
    sitemap: {},                       // 自动生成 sitemap.xml
    analytics: {},                     // Google Analytics v4
    llms: {},                          // LLM 上下文生成（llms.txt）
    mermaid: {}                        // 原生交互式图表
  }
});
```

## 可选插件

可选插件需要先安装才能启用。

| 插件 | 安装命令 | 说明 |
| :--- | :--- | :--- |
| [PWA](pwa.md) | `docmd add pwa` | 渐进式 Web 应用支持，含离线缓存 |
| [Threads](threads.md) | `docmd add threads` | 存储在 Markdown 中的内联讨论评论 |
| [Math](math.md) | `docmd add math` | 原生 KaTeX 和 LaTeX 数学公式集成 |

## 插件作用域与 `noStyle` 覆盖

默认情况下，插件在所有页面中全局注入 CSS 和行为。但你可以明确配置，让插件跳过特定页面，或完全禁用对无样式落地页（`noStyle: true`）的执行。

### 全局配置范围

通过 `docmd.config.js` 配置，使插件自动跳过 `noStyle` 页面：

```javascript
plugins: {
  math: {
    noStyle: false // math css/js 不再加载到 noStyle 页面
  }
}
```

### 页面本地作用域（Frontmatter）

无论全局配置如何，都可以通过 Markdown frontmatter 在单个页面中精确启用或禁用任意插件：

```markdown
---
noStyle: true
plugins:
  math: true
  threads: false
---

# 仅 Math 在此页面渲染，Threads 被完全屏蔽
```

## 插件生命周期

插件可以挂钩到构建与开发过程的不同阶段：

| 钩子 | 说明 |
| :--- | :--- |
| `markdownSetup(md, opts)` | 使用自定义规则或容器扩展 Markdown 解析器 |
| `generateMetaTags(config, page, root)` | 向 `<head>` 注入 `<meta>` 和 `<link>` 标签 |
| `generateScripts(config, opts)` | 向 `<head>` 或 `</body>` 注入脚本 |
| `getAssets(opts)` | 定义要注入的外部文件或 CDN 脚本 |
| `onPostBuild(ctx)` | 所有 HTML 文件生成完毕后运行逻辑 |
| `translations(localeId)` | 返回指定语言的翻译 UI 字符串 |
| `actions` | 可通过浏览器 WebSocket RPC 调用的服务端处理程序 |
| `events` | 浏览器推送事件的即发即忘处理程序 |

## 插件安全性

插件系统提供内置的安全保障：

- **验证**：插件可声明带有 `name`、`version` 和 `capabilities` 的 `plugin` 描述符。无效描述符在加载时会被拒绝。
- **隔离**：每个钩子调用都包裹在 try/catch 边界中。故障插件不会导致构建崩溃或影响其他插件。
- **功能执行**：声明了功能的插件只能注册其显式声明的钩子。未声明的钩子会被跳过并输出警告。

详见[构建插件](building-plugins.md)获取完整 API 参考。

::: callout tip "AI 透明架构 🤖"
插件架构设计为**确定性**。插件注入的每个元标签和脚本均可追踪，让 AI Agent（和人类开发者）能够完全理解站点行为，无隐藏副作用。
:::