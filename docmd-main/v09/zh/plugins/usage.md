---
title: "使用插件"
description: "安装、配置和管理 docmd 插件 —— 从必需的默认插件到可选的附加组件。"
---

`docmd` 拥有模块化的插件架构。核心内置插件直接随引擎主体提供，无需独立安装。可选插件与第三方插件可通过 CLI 或包管理器进行安装。

## 安装插件

使用 `docmd` CLI 管理插件包：

```bash
# 安装官方插件
npx @docmd/core add <plugin-name>

# 移除已安装的插件
npx @docmd/core remove <plugin-name>
```

安装程序会自动检测您当前使用的包管理器（npm、pnpm、yarn 或 bun），将短名称解析为完整的 `@docmd/plugin-*` 包名，并自动更新您的 `docmd.config.json`。

使用 `--verbose`（或 `-V`）可查看完整的安装程序日志：

```bash
npx @docmd/core add <plugin-name> -V
```

## 核心内置插件

这些插件与 `@docmd/core` 捆绑提供，无需任何安装过程。在 `docmd.config.json` 中启用或配置它们：

```json "docmd.config.json"
{
  "plugins": {
    "search": {},
    "ai": {},
    "seo": { "aiBots": false },
    "sitemap": {},
    "analytics": {},
    "llms": {},
    "okf": {},
    "mermaid": {},
    "openapi": {},
    "git": {}
  }
}
```

::: callout tip title:"Git 仓库检测" icon:git-branch
Git 插件会自动检测您的项目根目录是否为有效的 Git 仓库。如果 Git 历史不可用，它会自动禁用页脚时间戳生成。
::: /callout

::: callout info title:"OKF Bundle 支持" icon:info
`@docmd/plugin-okf` 插件生成一个 Open Knowledge Format bundle（`site/okf/`），其中包含面向 AI 智能体的类型化清单和概念文件。该插件默认启用；设置 `"plugins": { "okf": false }` 可选择退出。详情请参阅 [OKF Bundle 插件](okf.md)。
::: /callout

## 可选插件

可选插件需要先显式安装才能激活：

| 插件 | 安装命令 | 用途 |
| :--- | :--- | :--- |
| [PWA 支持](pwa.md) | `npx @docmd/core add pwa` | 渐进式 Web 应用清单与离线 Service Worker 缓存 |
| [Threads 讨论](threads.md) | `npx @docmd/core add threads` | Markdown 原生的内联评论讨论 |
| [Math (KaTeX)](math.md) | `npx @docmd/core add math` | 服务端 LaTeX 与 KaTeX 数学公式渲染 |

## 自动安装机制

如果在 `docmd.config.json` 中声明了官方插件但尚未在 `node_modules` 中安装，`docmd` 会在下次执行构建时自动下载并安装它：

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {}
  }
}
```

自动安装程序：
* 严格限制目标仅为官方 `@docmd/plugin-*` 包。
* 锁定依赖项版本标签以匹配已安装的 `@docmd/core` 版本。
* 自动检测项目包管理器（npm、pnpm、yarn、bun）。
* 在终端界面中直接输出安装进度。

::: callout tip title:"弹性模块解析" icon:shield-check
自动安装程序使用带有回退解析路径的动态 ES 模块导入，能够无缝加载声明了显式 `exports` 映射的 ESM 包。
::: /callout

## 第三方与自定义插件

出于安全考虑，自动化安装程序强制执行官方注册表白名单。请直接使用您的包管理器安装第三方插件：

```bash
npm install my-custom-plugin
# 或 pnpm add / yarn add / bun add
```

使用完整的包标识符将自定义插件添加到 `docmd.config.json` 中：

```json "docmd.config.json"
{
  "plugins": {
    "my-custom-plugin": {
      "someOption": true
    }
  }
}
```

## 页面级与 `noStyle` 插件作用域

插件默认全局注入样式和行为。您可以配置插件在无样式落地页（`noStyle: true`）上跳过，或通过 Frontmatter 按页面进行控制。

### 全局配置作用域

在 `docmd.config.json` 中配置插件跳过 `noStyle` 落地页：

```json "docmd.config.json"
{
  "plugins": {
    "math": {
      "noStyle": false
    }
  }
}
```

### 页面级 Frontmatter 作用域

使用 [页面 Frontmatter](../content/frontmatter.md) 按文档选择性地启用或禁用特定插件：

```yaml
---
noStyle: true
plugins:
  math: true
  threads: false
---
```

## 插件架构生命周期

插件钩入核心构建与开发周期：

| 生命周期钩子 | 技术功能 |
| :--- | :--- |
| `markdownSetup(md, opts)` | 注册自定义 Markdown-it 解析器规则 |
| `generateMetaTags(config, page, root)` | 向 `<head>` 注入 `<meta>` 与 `<link>` 元素 |
| `generateScripts(config, opts)` | 向 `<head>` 或 `</body>` 注入客户端脚本 |
| `getAssets(opts)` | 注册静态资源或外部 CDN 包 |
| `onPostBuild(ctx)` | 在 HTML 输出完成后执行后处理任务 |
| `translations(localeId)` | 注册本地化 UI 字符串映射表 |
| `actions` | 注册用于开发服务器 WebSocket 调用的服务端 RPC 处理器 |
| `events` | 注册客户端事件监听器 |

## 安全保障

* **描述符验证**: 格式错误的插件描述符在启动时即被拒绝。
* **故障隔离**: 每次钩子调用都由 try/catch 包裹；插件错误不会导致文档构建崩溃。
* **能力约束**: 仅授予插件在其清单能力中明确声明的钩子的执行权限。

参阅 [构建插件](../development/building-plugins.md) 获取完整的插件开发指南。