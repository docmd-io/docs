---
title: "多项目配置"
description: "从单个 docmd 实例构建多个独立文档站点。共享资源、独立版本、统一部署。"
---

从单个仓库构建和部署多个文档项目。每个项目维护独立的配置、版本和导航，同时共享通用的主题和资源管道。

## 概览

多项目模式专为在一个域名下维护多个工具、库或产品的组织设计。无需在反向代理后运行多个 docmd 实例，一条 `docmd build` 命令即可生成统一的 `site/` 目录。

```
docs.example.com/           → 主文档
docs.example.com/sdk/       → SDK 参考
docs.example.com/cli/       → CLI 文档
```

## 配置

### 1. 目录结构

按照每个项目一个目录的方式组织仓库：

```
my-docs/
├── assets/                   ← 共享资源（所有项目）
├── main-docs/
│   ├── docmd.config.js       ← 项目配置
│   └── v01/                  ← 版本化内容
│       └── en/
├── sdk-docs/
│   ├── docmd.config.js       ← 项目配置
│   └── docs/                 ← 非版本化内容
├── docmd.config.js           ← 根多项目配置
└── package.json
```

### 2. 根配置

根 `docmd.config.js` **仅包含** `projects` 数组：

```javascript
module.exports = defineConfig({
  projects: [
    { prefix: '/', src: 'main-docs' },
    { prefix: '/sdk', src: 'sdk-docs' }
  ]
});
```

| 键 | 说明 |
| :-- | :---------- |
| `prefix` | 此项目的 URL 前缀。根项目使用 `'/'`。 |
| `src` | 包含此项目 `docmd.config.js` 和内容的目录。 |

::: callout warning
每个多项目配置**必须**包含一个 `prefix: '/'` 的根项目。
:::

### 3. 项目配置

每个项目目录有自己的 `docmd.config.js`，包含完全独立的配置。**不要**包含 `src` 或 `out` 键 —— 父配置会自动提供这些值。

每个项目可以拥有完全独立的：
- **i18n** — 不同的语言环境、不同的默认语言
- **版本控制** — 不同的版本号和结构
- **插件** — 仅启用每个项目需要的插件
- **导航** — 每个项目的自定义侧边栏

## 资源

### 共享资源

将共享资源（logo、favicon、全局 CSS）放在根 `assets/` 目录中，它们会自动复制到每个项目的输出中。

### 项目专属资源

每个项目可以拥有自己的 `assets/` 目录。当文件名重复时，项目资源优先于共享资源。

```
my-docs/
├── assets/
│   └── images/
│       └── logo.png          ← 所有项目使用
├── sdk-docs/
│   └── assets/
│       └── images/
│           └── logo.png      ← 仅覆盖 SDK 的 logo
```

## 开发

启动多项目开发服务器：

```bash
docmd dev
```

服务器构建所有项目并通过单个端口提供服务：

```
┌─ DEV SERVER
│
│  Local           http://127.0.0.1:3000
│  Network         http://192.168.1.5:3000
│
│  Project         http://127.0.0.1:3000/
│  Project         http://127.0.0.1:3000/sdk
└──────────────────────────────────────────────────────────
```

任何项目中的文件更改都会触发针对性重建和实时刷新。仅重建受影响的项目 —— 其他项目保持不变以实现快速迭代。共享资源的更改会重建所有项目。

## 构建与部署

```bash
docmd build
```

输出为单个静态目录：

```
site/
├── index.html              ← main-docs 根目录
├── sdk/
│   └── index.html          ← sdk-docs 根目录
├── assets/                 ← 合并后的资源
├── 404.html
└── sitemap.xml
```

可直接部署到任何静态托管服务（GitHub Pages、Netlify、Vercel、Cloudflare Pages），无需额外配置。无需 nginx 或代理规则。

## 规则与约束

1. **必须有根项目** —— 一个项目必须使用 `prefix: '/'`
2. **前缀不可重复** —— 每个项目需要唯一的 URL 前缀
3. **子配置无需 `src`/`out`** —— 父配置提供这些值
4. **完全独立** —— 每个项目拥有独立的标题、版本、国际化、插件和导航
5. **根配置精简** —— 根 `docmd.config.js` 中应仅包含 `projects`
