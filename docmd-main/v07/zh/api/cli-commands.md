---
title: "CLI 命令"
description: "docmd 的命令行参考 —— 所有可用的命令和选项。"
---

## 命令概览

| 命令 | 描述 |
|:--------|:------------|
| [`docmd init`](#docmd-init) | 初始化一个新的文档项目 |
| [`docmd dev`](#docmd-dev) | 启动带有热重载的开发服务器 |
| [`docmd build`](#docmd-build) | 生成生产环境静态网站 |
| [`docmd live`](#docmd-live) | 启动基于浏览器的实时编辑器 |
| [`docmd stop`](#docmd-stop) | 停止正在运行的开发服务器 |
| [`docmd deploy`](#docmd-deploy) | 生成部署配置（Docker、Nginx、Caddy） |
| [`docmd migrate`](#docmd-migrate) | 将旧版配置升级到 V2 架构 |
| [`docmd add <plugin>`](#docmd-add-plugin) | 安装并配置插件 |
| [`docmd remove <plugin>`](#docmd-remove-plugin) | 移除插件及其配置 |

## 全局选项

| 选项 | 别名 | 描述 |
|:-------|:------|:------------|
| `--config <path>` | `-c` | 配置文件路径（默认：`docmd.config.js`） |
| `--verbose` | `-V` | 显示详细的构建日志 |
| `--version` | `-v` | 输出安装的版本号 |
| `--help` | `-h` | 显示帮助菜单 |
| `--cwd <path>` | — | 覆盖当前工作目录（适用于 monorepos） |

## `docmd init`

在当前目录中初始化一个新的文档项目。

```bash
docmd init
```

创建内容：
- `docs/index.md` —— 示例主页
- `docmd.config.js` —— 推荐的默认配置
- 更新 `package.json` 并添加构建脚本

## `docmd dev`

启动一个带有即时热重载的开发服务器。

```bash
docmd dev [options]
```

| 选项 | 别名 | 描述 |
|:-------|:------|:------------|
| `--port <number>` | `-p` | 服务器端口（默认：`3000`） |
| `--config <path>` | `-c` | 配置文件路径 |

## `docmd build`

在 `site/` 目录中生成生产就绪的静态网站。

```bash
docmd build [options]
```

| 选项 | 别名 | 描述 |
|:-------|:------|:------------|
| `--offline` | — | 将链接重写为 `.html` 以进行 `file://` 浏览 |
| `--config <path>` | `-c` | 配置文件路径 |

## `docmd live`

启动基于浏览器的实时编辑器。

```bash
docmd live [options]
```

| 选项 | 描述 |
|:-------|:------------|
| `--build-only` | 仅生成编辑器捆绑包而不启动服务器 |

## `docmd stop`

停止正在运行的 docmd 开发服务器。

```bash
docmd stop [options]
```

| 选项 | 别名 | 描述 |
|:-------|:------|:------------|
| `--port <number>` | `-p` | 仅停止该端口上的服务器 |
| `--force` | `-f` | 同时强制停止端口 3000、3001、8080、8081 上的服务进程 |

## `docmd deploy`

生成部署配置文件。

```bash
docmd deploy [options]
```

| 选项 | 描述 |
|:-------|:------------|
| `--docker` | 生成 `Dockerfile` |
| `--nginx` | 生成 `nginx.conf` |
| `--caddy` | 生成 `Caddyfile` |
| `--force` | 覆盖现有的部署文件 |

## `docmd migrate`

将旧版 docmd V1 配置升级到 V2 架构。

```bash
docmd migrate
```

自动重新映射已弃用的键（例如，`siteTitle` → `title`）并重构配置对象。

## `docmd add <plugin>`

安装并配置官方或社区插件。

```bash
docmd add <plugin-name>
```

| 示例 | 描述 |
|:--------|:------------|
| `docmd add analytics` | 安装 `@docmd/plugin-analytics` |
| `docmd add search` | 安装 `@docmd/plugin-search` |

CLI 会自动检测你的包管理器（npm、pnpm、yarn 或 bun），并将推荐的默认设置注入到 `docmd.config.js` 中。

## `docmd remove <plugin>`

安全地卸载插件并清理其配置。

```bash
docmd remove <plugin-name>
```

移除：
- npm 软件包
- `docmd.config.js` 中的插件配置

::: callout tip "代理兼容的日志记录 :robot:"
`docmd` 使用结构化的终端日志记录。AI 代理可以精确解析输出，以便进行错误检测和自动化维护。
:::