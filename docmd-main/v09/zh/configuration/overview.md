---
title: "常规配置"
description: "精通 docmd.config.json，管理 docmd 中的品牌、站点元数据、路由、布局区域和构建编译器。"
---

`docmd.config.json` 文件作为文档工作区的核心配置清单。它负责管理站点品牌、导航侧边栏、国际化参数以及静态站点编译器选项。

## 配置架构格式

`docmd` 支持 `docmd.config.jsonc` 和 `docmd.config.json`。这两种格式均支持单行（`//`）注释、多行（`/* */`）注释和末尾逗号（trailing commas）：

```jsonc "docmd.config.jsonc"
{
  // 站点品牌与规范地址
  "title": "我的技术文档",
  "url": "https://docs.example.com",

  /* 源码与构建输出目录 */
  "src": "docs",
  "out": "site",
  "base": "/",
}
```

对于需要环境变量或程序化逻辑的动态设置，完全支持 `docmd.config.ts` 和 `docmd.config.js`：

::: tabs
== tab "TypeScript" icon:code-2
```typescript "docmd.config.ts"
import { UserConfig } from '@docmd/api';

const config: UserConfig = {
  title: process.env.DOCS_TITLE || '我的技术文档',
  src: 'docs',
  out: 'site'
};

export default config;
```
== tab "JavaScript" icon:file-code
```javascript "docmd.config.js"
module.exports = {
  title: process.env.DOCS_TITLE || '我的技术文档',
  src: 'docs',
  out: 'site'
};
```
:::

## 核心设置

这些顶层属性配置基础路径和全局编译器选项：

| 属性 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | 在导航标头和浏览器标签页中显示的正式站点标题。 |
| `url` | `String` | `""` | 规范站点 URL。对于搜索引擎优化、sitemap 生成和 OpenGraph 元数据至关重要。 |
| `src` | `String` | `"docs"` | 包含源 Markdown (`.md`) 文件的相对目录。 |
| `out` | `String` | `"site"` | 编译器生成生产静态包的相对路径。 |
| `base` | `String` | `"/"` | 根 URL 路径前缀（例如托管在子文件夹中时为 `/docs/`）。 |
| `tmp` | `String` | `null` | 临时构建缓存目录。默认为隔离的系统临时文件夹。 |
| `engine` | `String` | `"js"` | 处理引擎：`"js"`（默认纯 JavaScript 引擎）或 `"rust"`（通过 `@docmd/engine-rust` 的原生加速器）。 |
| `i18n` | `Object` | `null` | 多语言参数。参阅 [多语言指南](./localisation/translated-content.md)。 |
| `plugins` | `Object` | `{}` | 标准及第三方插件配置映射。参阅 [插件指南](../plugins/usage.md)。 |

::: callout info title:"向后兼容性" icon:history
`docmd` 对早期配置清单保持 100% 向后兼容：
- 传统的根级键（`siteTitle`、`siteUrl`、`srcDir`、`outputDir`）会无缝映射到现代键（`title`、`url`、`src`、`out`）。
- `customJs` 和 `customCss` 会被映射到 `theme.customJs` 与 `theme.customCss`。
- `htmlPolicy` 会映射到 `security.html`。
- 根级别的 `focusMode` 和 `print` 会映射到 `layout.focusMode` 与 `layout.print`。
:::

## 品牌与标识

在 `docmd.config.json` 中配置品牌 Logo、浏览器 Favicon 以及自定义样式表或客户端脚本：

```json "docmd.config.json"
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "公司 Logo",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico",
  "theme": {
    "name": "default",
    "appearance": "system",
    "customCss": [
      "/assets/css/branding.css"
    ],
    "customJs": [
      "/assets/js/feedback.js"
    ]
  }
}
```

## UI 布局与行为

配置标头、侧边栏、搜索位置、主题切换与阅读工具：

```json "docmd.config.json"
{
  "layout": {
    "spa": true,
    "header": {
      "enabled": true
    },
    "sidebar": {
      "collapsible": true,
      "defaultCollapsed": false
    },
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true,
        "themeSwitch": true
      }
    },
    "focusMode": false,
    "print": false,
    "copyCode": true,
    "pageNavigation": true,
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    }
  }
}
```

有关全面的视觉自定义选项，请参阅 [布局与 UI 区域](./layout-ui.md) 指南。

## 内容与安全策略

微调 `docmd` 如何解析 Markdown 以及执行 HTML 安全策略：

```json "docmd.config.json"
{
  "minify": true,
  "autoTitleFromH1": true,
  "markdown": {
    "breaks": true,
    "linkify": true,
    "typographer": true
  },
  "security": {
    "html": "allow"
  }
}
```

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | 压缩编译后的 HTML、CSS 和 JS 资源，以获得最大加载性能。 |
| `autoTitleFromH1` | `Boolean` | `true` | 当省略 frontmatter `title` 时，将文档的第一个 `# H1` 标题用作标题。 |
| `markdown.breaks` | `Boolean` | `true` | 将软换行转换为换行符。如果手动在 80 列处换行，请设置为 `false`。 |
| `markdown.linkify` | `Boolean` | `true` | 自动将 URL 文本和裸域名转换为可点击链接（默认使用 `https://`）。设置为 `false` 禁用自动链接。 |
| `markdown.typographer` | `Boolean` | `true` | 启用语言通用的排版替换（引号、破折号和符号）。设置为 `false` 保持原样。 |
| `security.html` | `String` | `"allow"` | HTML 净化模式：`"allow"`、`"escape"` 或 `"strip"`。参阅 [安全指南](./security.md)。 |
| `layout.copyCode` | `Boolean` | `true` | 在语法高亮的代码块上渲染“复制代码”按钮。 |
| `layout.pageNavigation` | `Boolean` | `true` | 在文章底部渲染“上一页”和“下一页”导航链接。 |
| `layout.focusMode` | `Boolean` | `false` | 启用免打扰专注模式，支持快捷键（`Alt+F`）。 |
| `layout.print` | `Boolean` | `false` | 在文章操作栏和专注工具栏中启用打印按钮。 |

::: callout info "Git 集成替换 editLink" icon:git-branch
独立的 `editLink` 配置已统合到原生 [Git 插件](../plugins/git.md) 中。它会展示编辑链接、提交时间戳和贡献者元数据。
:::
