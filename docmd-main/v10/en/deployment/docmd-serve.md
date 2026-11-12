---
title: "Production Server (docmd serve)"
description: "Run docmd as a production server: build once, serve on a fixed port, with opt-in plugin actions and MCP over HTTP."
---

`docmd serve` builds your site once and serves it from a Node.js process. It is the production counterpart of `docmd dev`, like `preview` in Vite or `start` in Next.js. Use it behind a reverse proxy, in a container, or anywhere a static host is not enough, for example when a plugin needs to write to the site.

For a purely static site, `docmd build` and any static host (NGINX, Caddy, Vercel, ...) remain the simplest option.

```bash
npx @docmd/core serve [--host <address>] [--port <number>] [--config <path>]
```

## How it differs from `dev`

| | `docmd dev` | `docmd serve` |
| :--- | :--- | :--- |
| Build | Development build, rebuilt on every change | Production build, once at startup |
| File watcher, live reload | Yes | No |
| Opens a browser | Yes | No |
| Port in use | Moves to the next port | Exits with code 1 |
| Default bind address | `127.0.0.1` | `127.0.0.1` |
| Plugin actions | On, for pages served by the dev server | Off unless `serve.actions` enables them |
| Health endpoint | No | `GET /healthz` |

On startup `serve` binds the port first, then clears the output directory and builds into it. Until that build finishes every request gets `503 Service Unavailable` with `Retry-After: 1`. It refuses to start if the output directory contains the project root or the source directory, because it would have to delete them. Workspaces are not supported yet.

`SIGTERM` and `SIGINT` shut it down gracefully: open requests get up to 4 seconds to finish, then the process exits with code 0. `docmd stop` stops `serve` processes too.

## Host and port

The address is resolved in this order, first match wins:

1. `--host` and `--port` on the command line;
2. the `DOCMD_HOST` and `PORT` environment variables;
3. `serve.host` and `serve.port` in your config;
4. the defaults, `127.0.0.1` and `3000`.

To accept connections from other machines or from outside a container, bind `0.0.0.0`:

```bash
npx @docmd/core serve --host 0.0.0.0 --port 8080
```

## Configuration

All of `serve` is optional. These are the defaults:

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

| Key | Default | Description |
| :--- | :--- | :--- |
| `host` | `127.0.0.1` | Interface to bind. |
| `port` | `3000` | Port to listen on. |
| `actions.enabled` | `false` | Accept [plugin actions](#plugin-actions) over WebSocket on the same port. Only the value `true` turns them on. |
| `actions.origins` | `[]` | Full origins allowed to open the action socket, e.g. `https://docs.example.com`. Required when actions are on. |
| `actions.identityHeader` | `null` | Request header set by your authenticating reverse proxy. Without it, every write from an action is refused. |
| `mcp.enabled` | `false` | Serve the [MCP tools over HTTP](#mcp-over-http) at `POST /mcp`. Only the value `true` turns it on. |
| `mcp.origins` | `[]` | Full origins allowed to call `/mcp` from a browser. |

`build` and `dev` ignore the `serve` block. `serve` checks it at startup and exits with code 1, listing every problem, when an origin is not a full `http(s)` origin (`*` is not accepted), when actions are on without origins, or when `identityHeader` is not a valid header name (or is `cookie`).

The startup banner shows what is on:

```text
Local Access    http://127.0.0.1:3000
Serving from    ./site
Actions         on (origins: https://docs.example.com; writes need x-auth-request-email)
MCP             on at POST /mcp (read-only; no browser origins)
```

## Endpoints

| Path | Description |
| :--- | :--- |
| `GET`/`HEAD /healthz` | `200` with `{"status":"ok","version":"<docmd version>"}` once the site is built; `503` before. Use it for container and load-balancer health checks. |
| `POST /mcp` | MCP over HTTP, when `serve.mcp.enabled` is `true`. Otherwise `/mcp` is an ordinary path of your site. |
| WebSocket upgrade | Plugin actions, when `serve.actions.enabled` is `true`. Otherwise `404`. |
| Everything else | Your built site, from the output directory. |

## Plugin actions

Plugins that declare `requiresLiveServer` and register `actions` (for example [Threads](../plugins/threads)) only work while a server hosts them. Under `dev` that is always the case. Under `serve` you turn it on:

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

With actions on:

* The site is built with the client assets of live-server plugins and the `docmd-api.js` bridge, which connects back over `wss://` when the page is served over HTTPS.
* A WebSocket upgrade must carry an `Origin` listed in `origins`. Any other origin, or none, gets `403`. List the public origin your readers use, not the internal address of the server.
* Reads, worker tasks and rebuild requests are open to every accepted connection.
* Writes through `ctx.writeFile` and `ctx.source` need a trusted identity: they are refused unless `identityHeader` is set **and** the WebSocket upgrade request carried that header with a non-empty value. The value reaches the plugin as `ctx.caller.identity`.
* Files written by an action are rebuilt and announced to every client with a `system:rebuilt` event. `serve` never reloads the page for you.

If a plugin fails in its `onServerReady` hook, `serve` exits with code 1 and listens on nothing.

### Identity behind a reverse proxy

docmd has no login of its own. `identityHeader` names a header that an authenticating reverse proxy adds to each request, such as `X-Auth-Request-Email` from oauth2-proxy or `Cf-Access-Authenticated-User-Email` from Cloudflare Access.

::: callout warning "Only trust a header your proxy controls" icon:shield-alert
docmd cannot tell who set the header. It is only trustworthy when:

* the proxy sets it on every request it forwards, and removes any copy the client sent;
* clients cannot reach the `serve` port without going through the proxy (bind `127.0.0.1`, or keep the port on a private network).

If either is not true, anyone can write as anyone. Leave `identityHeader` unset and writes stay refused.
:::

## MCP over HTTP

`serve.mcp.enabled: true` exposes the [MCP server](../reference/mcp-server) tools at `POST /mcp`, so AI agents can search and read the deployed docs without a local checkout.

```json "docmd.config.json"
{
  "serve": {
    "mcp": { "enabled": true }
  }
}
```

* **Read-only.** The tools are the same as `docmd mcp`, but nothing over HTTP writes to disk: `get_llms_context` returns the `llms-full.txt` of the site being served instead of rebuilding it.
* **Same config as the server.** The tools read the file `serve` was started with (`--config` included), and `read_doc` only returns Markdown inside its source directory, never pages matched by `exclude`.
* **Origin rule.** A request that carries an `Origin` header, which every browser sends on a `POST`, must match `mcp.origins`, or it gets `403`. A request without `Origin`, from an MCP client that is not a browser, is accepted. This stops other websites (and DNS-rebinding attacks) from calling the tools through a reader's browser.
* **Transport.** Stateless MCP over HTTP: one JSON response per `POST`, batches allowed, no sessions and no event stream. Bodies are limited to 1 MiB; methods other than `POST` get `405`.

The endpoint has no authentication of its own. If your docs are private, protect `/mcp` with the same reverse proxy as the rest of the site.

Connecting a client, for example Claude Code:

```bash
claude mcp add --transport http docmd https://docs.example.com/mcp
```

## Docker

The official [Docker image](./docker) runs `docmd serve --host 0.0.0.0` by default, and its health check calls `/healthz`.
