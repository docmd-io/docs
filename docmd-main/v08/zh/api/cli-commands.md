---
title: "CLI 命令"
description: "docmd 命令行参考 —— 所有可用命令与选项。"
---

## 命令一览

| 命令 | 说明 |
|:--------|:------------|
| [`npx @docmd/core init`](#npx-docmdcore-init) | 初始化一个新的文档项目 |
| [`npx @docmd/core dev`](#npx-docmdcore-dev) | 启动带热刷新的开发服务器 |
| [`npx @docmd/core build`](#npx-docmdcore-build) | 生成可用于生产的静态站点 |
| [`npx @docmd/core live`](#npx-docmdcore-live) | 启动浏览器版 Live Editor |
| [`npx @docmd/core stop`](#npx-docmdcore-stop) | 停止运行中的 dev 服务器 |
| [`npx @docmd/core deploy`](#npx-docmdcore-deploy) | 生成部署配置 |
| [`npx @docmd/core migrate`](#npx-docmdcore-migrate) | 升级旧版配置或从其他工具迁移 |
| [`npx @docmd/core validate`](#npx-docmdcore-validate) | 校验链接并检查文档文件 |
| [`npx @docmd/core mcp`](#npx-docmdcore-mcp) | 以 MCP（Model Context Protocol）服务器形式，通过 stdio 启动 |
| [`npx @docmd/core add <plugin>`](#npx-docmdcore-add-plugin) | 安装并配置插件 |
| [`npx @docmd/core remove <plugin>`](#npx-docmdcore-remove-plugin) | 移除插件及其配置 |

## 全局选项

| 选项 | 别名 | 说明 |
|:-------|:------|:------------|
| `--config <path>` | `-c` | 配置文件路径（默认：`docmd.config.json`） |
| `--verbose` | `-V` | 显示详细的构建日志 |
| `--version` | `-v` | 输出已安装的版本 |
| `--help` | `-h` | 显示帮助菜单 |
| `--cwd <path>` | - | 覆盖工作目录（用于 monorepo） |

## `npx @docmd/core init`

在当前目录下初始化一个新的文档项目。

```bash
npx @docmd/core init
```

将创建：
- `docs/index.md` —— 模板首页
- `docmd.config.json` —— 推荐默认值
- 更新 `package.json`，加入构建脚本

## `npx @docmd/core dev`

启动一个支持即时热刷新的开发服务器。

```bash
npx @docmd/core dev [options]
```

| 选项 | 别名 | 说明 |
|:-------|:------|:------------|
| `--port <number>` | `-p` | 服务器端口（默认：`3000`） |
| `--config <path>` | `-c` | 配置文件路径 |

## `npx @docmd/core build`

在 `site/` 目录下生成可用于生产的静态站点。

```bash
npx @docmd/core build [options]
```

| 选项 | 别名 | 说明 |
|:-------|:------|:------------|
| `--offline` | - | 将链接改写为 `.html`，便于 `file://` 浏览 |
| `--config <path>` | `-c` | 配置文件路径 |

## `npx @docmd/core live`

启动浏览器版 Live Editor。

```bash
npx @docmd/core live [options]
```

| 选项 | 说明 |
|:-------|:------------|
| `--build-only` | 仅生成编辑器 bundle，不启动服务器 |

## `npx @docmd/core stop`

停止运行中的 dev 服务器。

```bash
npx @docmd/core stop [options]
```

| 选项 | 别名 | 说明 |
|:-------|:------|:------------|
| `--port <number>` | `-p` | 仅停止该端口上的服务器 |
| `--force` | `-f` | 同时停止 3000、3001、8080、8081 上的 `serve` 进程 |

## `npx @docmd/core deploy`

生成部署配置文件。

```bash
npx @docmd/core deploy [options]
```

| 选项 | 说明 |
|:-------|:------------|
| `--docker` | 生成 `Dockerfile` + `.dockerignore` |
| `--nginx` | 生成 `nginx.conf` |
| `--caddy` | 生成 `Caddyfile` |
| `--github-pages` | 生成 `.github/workflows/deploy.yml` |
| `--vercel` | 生成 `vercel.json` |
| `--netlify` | 生成 `netlify.toml` |
| `--force` | 覆盖已有部署文件 |

## `npx @docmd/core migrate`

从其他工具迁移，或升级配置。

```bash
npx @docmd/core migrate
```

自动重新映射已废弃的键（例如 `siteTitle` → `title`），并重组配置对象。

## `npx @docmd/core validate`

校验文档文件，并检查内部链接是否失效。

```bash
npx @docmd/core validate [options]
```

| 选项 | 说明 |
|:-------|:------------|
| `--json` | 以机器可读的 JSON 格式输出错误（便于接入 CI 流水线）。 |

扫描每个 Markdown 文件，追踪相对链接与图片引用，并报告失效目标。若存在失效链接，进程会以非零状态退出，因此可以挂到 pre-merge hook 中。

## `npx @docmd/core mcp`

将 docmd 作为 Model Context Protocol（MCP）服务器通过 stdio 运行。使用它，可以让 AI Agent（Claude Desktop、Cursor 等）直接读取并校验您的文档。

```bash
npx @docmd/core mcp
```

服务器通过 JSON-RPC 在标准输入/输出上通信。请按如下方式配置 MCP 客户端：

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["-y", "@docmd/core", "mcp"]
    }
  }
}
```

## `npx @docmd/core add <plugin>`

安装并配置官方或社区插件。

```bash
npx @docmd/core add <plugin-name>
```

| 示例 | 说明 |
|:--------|:------------|
| `npx @docmd/core add analytics` | 安装 `@docmd/plugin-analytics` |
| `npx @docmd/core add search` | 安装 `@docmd/plugin-search` |

CLI 会自动识别您的包管理器（npm、pnpm、yarn 或 bun），并将推荐默认值注入 `docmd.config.json`。

## `npx @docmd/core remove <plugin>`

安全地卸载一个插件并清理其配置。

```bash
npx @docmd/core remove <plugin-name>
```

将移除：
- 对应的 npm 包
- `docmd.config.json` 中的插件配置

::: callout tip "对 Agent 友好的日志" icon:sparkles
docmd 使用结构化的终端日志，AI Agent 能够精准解析其输出，从而实现错误检测与自动化维护。
:::