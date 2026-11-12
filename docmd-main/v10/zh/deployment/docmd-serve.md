---
title: "生产服务器 (docmd serve)"
description: "以生产服务器模式运行 docmd：一次性构建，在固定端口提供服务，支持可选的插件操作以及基于 HTTP 的 MCP 服务。"
---

`docmd serve` 将您的站点构建一次，并通过 Node.js 进程提供服务。它是 `docmd dev` 在生产环境下的对应物，类似于 Vite 中的 `preview` 或 Next.js 中的 `start`。当您需要将其部署在反向代理之后、容器中，或者静态托管无法满足需求（例如插件需要向站点写入数据）时，请使用此命令。

对于纯静态站点，使用 `docmd build` 并配合任何静态托管服务（NGINX、Caddy、Vercel 等）仍然是最简便的选择。

```bash
npx @docmd/core serve [--host <address>] [--port <number>] [--config <path>]
```

## 与 `dev` 的区别

| | `docmd dev` | `docmd serve` |
| :--- | :--- | :--- |
| 构建行为 | 开发模式构建，每次文件更改时重新生成 | 生产模式构建，仅在服务启动时执行一次 |
| 文件监听与实时热重载 | 支持 | 不支持 |
| 自动打开浏览器 | 是 | 否 |
| 端口冲突处理 | 自动递增尝试下一个可用端口 | 以退出码 1 终止 |
| 默认监听地址 | `127.0.0.1` | `127.0.0.1` |
| 插件操作 (Actions) | 对开发服务器服务的页面默认开启 | 默认关闭，除非配置了 `serve.actions` |
| 健康检查端点 | 无 | `GET /healthz` |

启动时，`serve` 先绑定端口，然后清空输出目录并编译构建到该目录中。在初始构建完成前，所有外部请求均返回 `503 Service Unavailable` 并附带 `Retry-After: 1` 标头。若输出目录包含了项目根目录或源文档目录，服务将拒绝启动（以防意外删除关键文件）。目前暂不支持多工作区（Workspaces）。

服务支持 `SIGTERM` 与 `SIGINT` 平滑停机：进行中的请求最多有 4 秒时间处理完毕，随后进程以状态码 0 退出。`docmd stop` 同样能够停止 `serve` 进程。

## 主机地址与端口

监听地址按以下优先级依次解析（命中即止）：

1. 命令行参数 `--host` 与 `--port`；
2. 环境变量 `DOCMD_HOST` 与 `PORT`；
3. 配置文件中的 `serve.host` 与 `serve.port`；
4. 默认值：`127.0.0.1` 与 `3000`。

若要在局域网接受其他机器连接或在 Docker 容器外提供服务，请绑定到 `0.0.0.0`：

```bash
npx @docmd/core serve --host 0.0.0.0 --port 8080
```

## 配置项

`serve` 配置块完全是可选的。以下为默认配置：

```json "docmd.config.json"
{
  "serve": {
    "host": "127.0.0.1",
    "port": 3000,
    "actions": { "enabled": false, "origins": [], "identityHeader": null },
    "mcp": { "enabled": false, "origins": [] }
  }
}
```

| 配置键 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `host` | `127.0.0.1` | 绑定的网络接口。 |
| `port` | `3000` | 监听端口。 |
| `actions.enabled` | `false` | 在同一端口上通过 WebSocket 接受[插件操作](#插件操作)。仅设为 `true` 时启用。 |
| `actions.origins` | `[]` | 允许打开 Action WebSocket 的完整 Origin 列表（如 `https://docs.example.com`）。启用 actions 时必填。 |
| `actions.identityHeader` | `null` | 认证反向代理注入的身份标头名。未配置时将拒绝所有写操作。 |
| `mcp.enabled` | `false` | 在 `POST /mcp` 端点提供 [HTTP MCP 工具](#http-mcp-服务)。仅设为 `true` 时启用。 |
| `mcp.origins` | `[]` | 允许从浏览器调用 `/mcp` 的完整 Origin 列表。 |

`build` 和 `dev` 命令会忽略 `serve` 配置块。`serve` 启动时会进行严格校验：若 Origin 并非合法的 `http(s)` 完整 Origin（不接受通配符 `*`）、启用 actions 却未指定 origins，或 `identityHeader` 不是有效的标头名称（或设为 `cookie`），服务将打印错误列表并以代码 1 退出。

启动时的横幅会清晰显示当前启用的功能：

```text
Local Access    http://127.0.0.1:3000
Serving from    ./site
Actions         on (origins: https://docs.example.com; writes need x-auth-request-email)
MCP             on at POST /mcp (read-only; no browser origins)
```

## 服务端点 (Endpoints)

| 路径 | 说明 |
| :--- | :--- |
| `GET`/`HEAD /healthz` | 构建完成后返回 `200` 及 `{"status":"ok","version":"<docmd version>"}`；构建完成前返回 `503`。适用于容器健康检查与负载均衡探针。 |
| `POST /mcp` | 基于 HTTP 的 MCP 服务（当 `serve.mcp.enabled` 为 `true` 时）。否则作为普通文档路径处理。 |
| WebSocket 协议升级 | 插件交互操作（当 `serve.actions.enabled` 为 `true` 时）。否则返回 `404`。 |
| 其他所有请求 | 输出目录下编译完成的站点静态文件。 |

## 插件操作 (Actions)

声明了 `requiresLiveServer` 并注册了 `actions` 的插件（例如 [Threads](../plugins/threads)）必须在服务端宿主运行时才能工作。在 `dev` 下默认可用；在 `serve` 生产模式下需手动开启：

```json "docmd.config.json"
{
  "serve": {
    "actions": {
      "enabled": true,
      "origins": ["https://docs.example.com"],
      "identityHeader": "x-auth-request-email"
    }
  }
}
```

启用 actions 后：

* 站点编译时将包含实时服务端插件的客户端资源以及 `docmd-api.js` 通信桥梁（在 HTTPS 下自动使用 `wss://` 连接）。
* WebSocket 连接握手必须携带列在 `origins` 中的 `Origin` 标头。未列入或缺失的请求将收到 `403`。请填写读者访问的公网域名，而非服务器内网地址。
* 数据读取、Worker 任务与重建请求对所有已接受的连接开放。
* 通过 `ctx.writeFile` 和 `ctx.source` 进行的写入必须具备受信任的身份凭据：除非配置了 `identityHeader` **且** WebSocket 握手请求包含了该非空标头，否则写操作将被拒绝。标头值将作为 `ctx.caller.identity` 传给插件。
* 插件操作写入的文件将自动重新构建，并通过 `system:rebuilt` 事件通知所有已连接客户端。`serve` 不会自动强制刷新浏览器页面。

若插件在 `onServerReady` 钩子中抛出异常，`serve` 将以退出码 1 终止并释放端口。

### 反向代理后的身份传递

docmd 本身不包含内置登录系统。`identityHeader` 指定了认证反向代理在转发请求时添加的标头名称，例如 oauth2-proxy 的 `X-Auth-Request-Email` 或 Cloudflare Access 的 `Cf-Access-Authenticated-User-Email`。

::: callout warning "仅信任反向代理受控的标头" icon:shield-alert
docmd 无法自行辨别标头的伪造。只有满足以下条件时标头才可信：

* 反向代理在转发每个请求时统一注入该标头，并主动剥离客户端原本发送的伪造同名标头；
* 外部客户端无法绕过反向代理直接访问 `serve` 监听的端口（请绑定到 `127.0.0.1` 或将其置于私有网络内）。

若不满足上述条件，任何人都可能伪造身份。保持 `identityHeader` 为空即可彻底关闭写操作。
:::

## HTTP MCP 服务

设置 `serve.mcp.enabled: true` 将在 `POST /mcp` 端点开放 [MCP 服务器](../reference/mcp-server) 工具，使得 AI 智能体无需拉取本地代码即可检索与阅读已部署的文档。

```json "docmd.config.json"
{
  "serve": {
    "mcp": { "enabled": true }
  }
}
```

* **纯只读模式**：工具与 `docmd mcp` 保持一致，但通过 HTTP 访问时绝不向磁盘写入任何数据；`get_llms_context` 直接返回已部署站点的 `llms-full.txt` 内容，无需重新构建。
* **与服务器同配置**：工具使用 `serve` 启动时加载的配置（包括 `--config`），`read_doc` 仅能读取源文档目录内的 Markdown，绝不泄露 `exclude` 排除的文件。
* **Origin 防护规则**：带有 `Origin` 标头的请求（所有浏览器发起的 `POST` 均会携带）必须匹配 `mcp.origins`，否则返回 `403`。非浏览器 MCP 客户端发送的不含 `Origin` 的请求将被正常接受。此机制有效防止其他恶意网站通过用户浏览器跨站调用文档工具。
* **无状态传输**：HTTP 上的无状态 MCP：每次 `POST` 对应单个 JSON 响应，支持批量请求，无 Session 状态保持，无流式事件。请求体上限为 1 MiB；非 `POST` 请求返回 `405`。

该端点无内置身份认证。如果您的文档是私有的，请使用反向代理一并保护 `/mcp` 路径。

使用客户端（例如 Claude Code）进行连接：

```bash
claude mcp add --transport http docmd https://docs.example.com/mcp
```

## Docker 部署

官方 [Docker 镜像](./docker) 默认执行 `docmd serve --host 0.0.0.0`，其健康检查探针自动调用 `/healthz`。
