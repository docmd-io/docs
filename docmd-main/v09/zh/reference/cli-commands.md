---
title: "CLI 命令"
description: "docmd 命令行参考：所有可用命令与选项。"
---

## 命令一览

| 命令 | 说明 |
|:--------|:------------|
| [`npx @docmd/core init`](#npx-docmdcore-init) | 初始化一个新的文档项目 |
| [`npx @docmd/core dev`](#npx-docmdcore-dev) | 启动带热刷新的开发服务器 |
| [`npx @docmd/core build`](#npx-docmdcore-build) | 生成可用于生产的静态站点 |
| [`npx @docmd/core serve`](#npx-docmdcore-serve) | 一次性构建并在生产环境中运行站点，支持压缩与健康检查探针 |
| [`npx @docmd/core live`](#npx-docmdcore-live) | 启动浏览器版 Live Editor |
| [`npx @docmd/core stop`](#npx-docmdcore-stop) | 停止运行中的 `dev` 与 `serve` 服务器 |
| [`npx @docmd/core deploy`](#npx-docmdcore-deploy) | 生成部署配置 |
| [`npx @docmd/core migrate`](#npx-docmdcore-migrate) | 升级旧版配置或从其他工具迁移 |
| [`npx @docmd/core validate`](#npx-docmdcore-validate) | 校验链接并检查文档文件 |
| [`npx @docmd/core doctor`](#npx-docmdcore-doctor) | 预检：报告缺失的插件、损坏的配置、不匹配的引擎 |
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
- `docs/index.md`：模板首页
- `docmd.config.json`：推荐默认值
- 更新 `package.json`，加入构建脚本

## `npx @docmd/core dev`

启动一个支持即时热刷新的开发服务器。

```bash
npx @docmd/core dev [options]
```

| 选项 | 别名 | 说明 |
|:-------|:------|:------------|
| `--port <number>` | `-p` | 服务器端口（默认：`3000`） |
| `--host <address>` | - | 绑定的网络接口（默认：`127.0.0.1`；`0.0.0.0` 开放局域网所有接口） |
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

## `npx @docmd/core serve`

一次性构建站点并在生产模式下提供服务：固定端口、Gzip 压缩、无文件监听器、无实时热重载以及容器健康检查探针。关于 `serve` 配置块、插件操作以及通过 HTTP 运行 MCP，请参阅[生产服务器](../deployment/docmd-serve)。

```bash
npx @docmd/core serve [options]
```

| 选项 | 别名 | 说明 |
|:-------|:------|:------------|
| `--host <address>` | - | 绑定的网络接口（默认：`serve.host`，`DOCMD_HOST`，然后 `127.0.0.1`；`0.0.0.0` 适用于容器 / 局域网） |
| `--port <number>` | `-p` | 监听端口（默认：`serve.port`，`PORT`，然后 `3000`）。若端口被占用则以退出码 1 退出。 |
| `--config <path>` | `-c` | 配置文件路径 |

::: callout info "容器健康检查探针 (/healthz)" icon:activity
`docmd serve` 自动提供 `GET /healthz` 端点，返回 `{"status":"ok","version":"..."}`，响应码为 200 并附带 `Cache-Control: no-store`。可直接用于 Docker 的 `HEALTHCHECK` 指令、Kubernetes 存活/就绪探针以及云负载均衡器的健康检查。
:::

## `npx @docmd/core live`

启动浏览器版 Live Editor。

```bash
npx @docmd/core live [options]
```

| 选项 | 说明 |
|:-------|:------------|
| `--build-only` | 仅生成编辑器 bundle，不启动服务器 |

## `npx @docmd/core stop`

停止运行中的开发或生产服务器。

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

自动重新映射已废弃的键（例如 `siteTitle` : `title`），并重组配置对象。

## `npx @docmd/core validate`

校验文档文件，并检查内部链接是否失效。

```bash
npx @docmd/core validate [options]
```

| 选项 | 说明 |
|:-------|:------------|
| `--json` | 以机器可读的 JSON 格式输出错误（便于接入 CI 流水线）。 |

扫描每个 Markdown 文件，追踪相对链接与图片引用，并报告失效目标。若存在失效链接，进程会以非零状态退出，因此可以挂到 pre-merge hook 中。

## `npx @docmd/core doctor`

运行环境预检诊断、校验导航路由与静态资源，并检查插件与模板状态。自动发现配置文件，无需强制指定 `--config`。

```bash
npx @docmd/core doctor [选项]
```

| 选项 | 说明 |
|:-------|:------------|
| `--config <路径>` | 指向非默认配置文件的路径。 |
| `--fix` | 通过检测到的包管理器自动安装检查中发现缺失的官方插件或模板。 |
| `--json` | 将完整诊断报告以机器可读的 JSON 格式输出（用于 CI/CD 与自动化运维）。 |

`doctor` 执行无破坏性的诊断审查，不会产生构建副作用：
* **环境运行时审计**：检查 Node.js 版本（要求 v18+，推荐 v20+）、操作系统、系统架构以及当前项目的包管理器（`pnpm`、`npm`、`yarn`、`bun`）。
* **源码与资源完整性**：验证文档源目录存在性，检查配置的 Logo、Favicon 是否真实存在于磁盘上，校验横幅 Banner 图片。
* **导航路由目标校验**：将 `navigation.json` 中声明的所有路由目标与磁盘上的实际 Markdown/MDX 文件逐一对比验证。
* **插件与模板健康度**：识别已安装与缺失的插件和模板，并调用插件自定义诊断钩子（`onDoctorCheck`）。
* **自动化修复**：附带 `--fix` 参数时，自动调用底层包管理器安装缺失的官方依赖，并在全部问题解决后以退出码 0 结束。

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