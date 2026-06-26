---
title: "使用插件"
description: "安装、配置和管理 docmd 插件 —— 从必需的默认插件到可选的附加组件。"
---

docmd 拥有模块化的插件架构。必需的插件随核心包一起发布，无需安装。可选插件可通过一条 CLI 命令安装。

## 安装插件

使用 docmd CLI 安装和移除插件：

```bash
# 安装插件
npx @docmd/core add <plugin-name>

# 移除插件
npx @docmd/core remove <plugin-name>
```

安装程序会检测您的包管理器（npm、pnpm、yarn 或 bun）。它会将短名称解析为完整包名，并将配置注入到您的 `docmd.config.json` 中。

使用 `--verbose`（或 `-V`）获取完整的安装程序输出：

```bash
npx @docmd/core add <plugin-name> -V
```

## 必需的插件

这些插件与 `@docmd/core` 捆绑。无需安装。在您的 `docmd.config.json` 中启用它们：

```json "docmd.config.json"
  "plugins": {
    "search": {},
    "seo": { "aiBots": false },
    "sitemap": {},
    "analytics": {},
    "llms": {},
    "okf": {},
    "mermaid": {},
    "openapi": {},
    "git": {}
  }
```

::: callout tip "Git 插件"
Git 插件会检测您的项目是否为 Git 仓库。如果不是，它会自动禁用自身。无需为最近更新时间戳进行任何配置。
:::

::: callout info "OKF Bundle（0.8.8 新增）"
`@docmd/plugin-okf` 会生成一个 [Open Knowledge Format][okf-spec] bundle（`site/okf/`）—— 一个类型化清单加上供 AI 智能体直接消费的概念文件。该插件**默认启用**；可通过设置 `"plugins": { "okf": false }` 退出。完整契约请参阅 [OKF Bundle 插件文档](./okf.md)。

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing
:::

## 可选插件

可选插件需要先安装才能启用。

| 插件 | 安装命令 | 说明 |
| :--- | :--- | :--- |
| [PWA](pwa.md) | `npx @docmd/core add pwa` | 带离线缓存的渐进式 Web 应用支持 |
| [Threads](threads.md) | `npx @docmd/core add threads` | 以 Markdown 存储的内联讨论评论 |
| [Math](math.md) | `npx @docmd/core add math` | 原生 KaTeX 和 LaTeX 数学公式渲染 |

## 自动安装

当您将一个官方插件添加到 `docmd.config.json` 但尚未安装时，docmd 会在下次构建时自动下载并安装它。这适用于官方注册表中的所有插件。

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {}
  }
}
```

自动安装程序：

- 仅针对官方 `@docmd/plugin-*` 包。
- 锁定版本以匹配您的 `@docmd/core` 安装。
- 检测并使用您项目的包管理器。
- 在终端中报告进度。

::: callout tip "弹性自动安装(0.8.9 新增)"
自动安装器在最终加载步骤使用动态 `import()`,因此它也能对 `exports`
字段中只声明 `import` 条件的 ESM 包生效。它能安装的*名称*集合仍然
受限于官方插件注册表允许列表 —— 重试路径内部运行了注册表复核作为
纵深防御,即便未来安装器代码被改动,也不会悄悄变成通用的 npm 加载
器。
:::

## 第三方与自定义插件

出于安全考虑，安装程序强制执行官方注册表白名单。第三方插件必须使用您的包管理器原生安装：

```bash
npm install my-custom-plugin
# 或 pnpm add、yarn add、bun add
```

安装后，使用其精确的包名将插件添加到您的 `docmd.config.json`：

```json "docmd.config.json"
{
  "plugins": {
    "my-custom-plugin": {
      "someOption": true
    }
  }
}
```

如果该插件符合 docmd 的要求，它会在构建期间自动激活。否则，引擎会报告错误。

## 插件作用域与 `noStyle` 覆盖

插件会全局注入 CSS 和行为。但是，您可以配置它们以绕过特定页面，或完全禁用在无样式落地页（`noStyle: true`）上的执行。

### 全局配置范围

通过您的 `docmd.config.json` 指示任何插件自动跳过 `noStyle` 页面：

```json "docmd.config.json"
{
  "plugins": {
    "math": {
      "noStyle": false
    }
  }
}
```

### 页面本地作用域（Frontmatter）

您可以通过 markdown frontmatter 为每个文档明确启用或禁用任何插件。

```markdown
---
noStyle: true
plugins:
  math: true
  threads: false
---

# Only Math renders here, Threads are completely blocked
```

## 插件生命周期

插件会钩入构建和开发过程的不同阶段：

| 钩子 | 说明 |
| :--- | :--- |
| `markdownSetup(md, opts)` | 使用自定义规则扩展 Markdown 解析器。 |
| `generateMetaTags(config, page, root)` | 将 `<meta>` 和 `<link>` 标签注入到 `<head>`。 |
| `generateScripts(config, opts)` | 将脚本注入到 `<head>` 或 `</body>`。 |
| `getAssets(opts)` | 定义要注入的外部文件或 CDN 脚本。 |
| `onPostBuild(ctx)` | 在所有 HTML 文件生成完毕后运行逻辑。 |
| `translations(localeId)` | 返回某本地化版本的翻译 UI 字符串。 |
| `actions` | 可通过 WebSocket RPC 调用的服务端处理器。 |
| `events` | 浏览器推送事件的即发即弃处理器。 |

## 插件安全性

插件系统保证构建安全：

- **验证**：无效的插件描述符在加载时即被拒绝。
- **隔离**：每次钩子调用都被包裹在 try/catch 中。损坏的插件不会导致构建崩溃。
- **能力强制**：插件只能注册它们声明过的钩子。

完整 API 参考请参阅 [构建插件](building-plugins.md)。

::: callout tip "可追踪的架构" icon:sparkles
引擎发出的每个 meta 标签和脚本都由显式配置和插件输出生成。不存在隐藏的副作用。
:::