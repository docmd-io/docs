---
title: "Docker"
description: "在 Docker 容器中运行 docmd, 使用官方预构建镜像，或从您的项目配置生成自定义 Dockerfile。"
---

docmd 会生成静态 HTML，因此非常适合轻量、可复现的 Docker 容器。根据您的使用场景，有两种不同的方式。

## 官方 Docker 镜像

借助官方预构建镜像，您无需在本地安装 Node.js 即可构建并提供文档服务。其默认启动命令为 [`docmd serve --host 0.0.0.0`](./docmd-serve)：生产模式构建、在 3000 端口提供服务，并在 `/healthz` 提供健康检查。镜像已面向 `linux/amd64` 和 `linux/arm64` 架构发布。

### 快速开始

```bash
# 拉取指定版本（推荐做法，替换为所需的版本号）
docker pull ghcr.io/docmd-io/docmd:0.9.0

# 构建文档（挂载本地 docs 并将产物输出到 ./site）
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.9.0 build

# 以生产模式托管文档（默认命令）
docker run -v $(pwd):/docs -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0

# 编写时的热重载开发服务器
docker run -v $(pwd):/docs -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0 dev --host 0.0.0.0
```

::: callout info "默认启动命令" icon:info
在引入 `docmd serve` 之前，镜像默认执行 `dev --host 0.0.0.0`。如果您此前依赖不带参数的默认热重载，请显式传入 `dev --host 0.0.0.0`。
:::

::: callout tip "锁定版本"
建议在生产构建中始终锁定具体版本（例如 `0.9.0`）以获得可复现的构建结果。`:latest` 标签从 0.9.0 起会自动发布，但在生产流水线中仍应固定到具体的发行版本。
:::

### 健康检查与端口配置

镜像的 `HEALTHCHECK` 会在 `${PORT:-3000}` 上请求 `GET /healthz`。`docmd serve` 在站点构建完成后返回 `200`，并在初次构建过程中返回 `503`。通过设置 `PORT` 环境变量可同时更改服务器端口与健康检查端口：

```bash
docker run -e PORT=8080 -p 8080:8080 ghcr.io/docmd-io/docmd:0.9.0
```

在 Kubernetes 中，可将存活探针（Liveness）与就绪探针（Readiness）直接指向 `/healthz`。`serve` 会在 `/docs` 下写入编译产物，因此请挂载可读写卷，而非直接挂载只读 ConfigMap。

### Docker Compose

使用 Docker Compose 在同一个工作流中完成构建与服务：

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:0.9.0
    command: build
    volumes:
      - ./docs:/docs
      - ./site:/site
      - ./docmd.config.json:/docmd.config.json:ro

  serve:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
    depends_on:
      - docs
```

### 镜像详情

| 属性 | 值 |
|:--|:--|
| 基础镜像 | Alpine Linux（占用极小） |
| 用户 | 以 root 启动，通过 `su-exec` 自动映射到宿主机 uid |
| 工作目录 | `/docs`（可挂载到任意路径，使用 `-w` 覆盖） |
| 健康检查 | 内置容器健康监测 |
| SBOM | 附带软件物料清单 (Software Bill of Materials) 证明 |
| 架构 | `linux/amd64`、`linux/arm64` |

### 自定义工作目录与文件归属

镜像默认 `WORKDIR /docs`，但您可以将项目挂载到容器内的任意路径并从那里运行。通过 `-w` 覆盖工作目录，使其与项目布局一致：

```bash
# 在容器内的自定义工作目录中运行
docker run -v $(pwd):/workspace -w /workspace ghcr.io/docmd-io/docmd:0.9.0 init
```

入口脚本会自动检测挂载目录的 uid:gid，并在执行任何命令前通过 `su-exec` 切换到该身份。`docmd init`、`docmd build` 或 `docmd dev` 写入的文件始终归属正确的宿主机用户，无需传递 `-u` 参数。

::: callout warning title:"只读挂载"
当以 `:ro` 只读挂载配置文件时，请确保工作目录与其他挂载点仍可写，否则 `docmd` 会因权限错误而失败。
:::

## 自定义 Dockerfile（通过 Deployer）

对于生产环境的自托管场景，可使用 [Deployer](./deployer) 生成一份与您项目配置匹配的 `Dockerfile`：

```bash
npx @docmd/core deploy --docker
```

它会生成一个采用多阶段构建的 `Dockerfile`：
1. **构建阶段 (Build stage)**: 安装您精确锁定的 `@docmd/core` 版本并执行构建。
2. **服务阶段 (Serve stage)**: 将产物复制到一个精简的 `nginx:alpine` 镜像中。

同时生成 Docker 与 Nginx 配置，以获得完整的自托管方案：

```bash
npx @docmd/core deploy --docker --nginx
```

### 构建与运行

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

您的文档将在 `http://127.0.0.1:8080` 上线。

::: callout tip "重新生成"
修改了配置？重新运行 `npx @docmd/core deploy --docker` 以重新生成。配合 `--force` 可覆盖已有文件。
:::