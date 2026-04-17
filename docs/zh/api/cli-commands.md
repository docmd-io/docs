---
title: "CLI 命令"
description: "docmd 命令行界面完整参考。"
---

`docmd` CLI 提供了一套高性能命令，用于管理文档的完整生命周期——从初始脚手架到生产部署。

## `docmd init`

在当前目录中生成一个新的文档项目脚手架。

```bash
docmd init
```

### 操作内容
- 创建包含 `index.md` 模板的 `docs/` 目录。
- 生成包含推荐默认值的 `docmd.config.js` 文件。
- 在 `package.json` 中写入推荐的构建脚本。

## `docmd dev`

启动高速开发服务器，支持**即时热重载**。

```bash
docmd dev [选项]
```

### 选项
- `-p, --port <端口号>`：指定自定义端口（默认：`3000`）。
- `-c, --config <路径>`：使用非标准配置文件路径。

## `docmd build`

在 `site/` 文件夹中生成生产就绪的静态网站。

```bash
docmd build [选项]
```

### 选项
- `--offline`：**文件协议友好模式**。将链接重写为以 `.html` 结尾，支持直接从本地文件系统浏览（如 `file://`）。
- `-c, --config <路径>`：配置文件路径（默认：`docmd.config.js`）。

## `docmd live`

启动基于浏览器的**实时编辑器**环境。

```bash
docmd live [选项]
```

### 选项
- `--build-only`：在 `dist/` 中生成静态编辑器包，不启动服务器。

## `docmd stop`

优雅地终止所有后台文档服务器。

```bash
docmd stop [选项]
```

### 选项
- `-p, --port <端口号>`：终止在指定端口上运行的特定实例。

## `docmd add <插件>`

安装官方或社区插件，并自动配置你的项目。

```bash
docmd add analytics
```

### 操作内容
- 使用你的首选包管理器（`npm`、`pnpm`、`yarn` 或 `bun`）。
- 将插件及其推荐默认配置写入 `docmd.config.js`。

## `docmd remove <插件>`

安全卸载插件并清理配置。

```bash
docmd remove analytics
```

## `docmd migrate`

将旧版 `docmd` 配置升级到现代 V2 架构。

```bash
docmd migrate
```

自动重映射已弃用的键（如 `siteTitle` → `title`），并重构配置对象以支持新的布局和导航框架。

::: callout tip "Agent 兼容日志"
`docmd` 实现了结构化终端日志。如果你使用 AI Agent 进行开发，这有助于精准检测错误并实现自动化项目维护。
:::