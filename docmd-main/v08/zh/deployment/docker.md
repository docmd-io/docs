---
title: "Docker"
description: "在 Docker 容器中运行 docmd——使用官方预构建镜像或从项目配置生成自定义 Dockerfile。"
---

docmd 生成静态 HTML，非常适合轻量级、可复现的 Docker 容器。根据您的使用场景，有两种不同的方法。

## 官方 Docker 镜像

官方镜像让您无需在本地安装任何东西即可构建和服务文档。它支持多架构（`linux/amd64` 和 `linux/arm64`）。

### 快速开始

```bash
# 拉取最新镜像
docker pull ghcr.io/docmd-io/docmd:latest

# 构建文档（挂载本地 docs 并输出到 ./site）
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build

# 运行内置演示站点
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:latest
```

### Docker Compose

使用 Docker Compose 在单个工作流中构建和服务：

```yaml
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:latest
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
| 基础镜像 | Alpine Linux（极小体积） |
| 安全性 | 以非 root 用户运行 |
| 健康检查 | 内置容器健康状态监控 |
| SBOM | 提供软件物料清单证明 |
| 支持架构 | `linux/amd64`, `linux/arm64` |

## 自定义 Dockerfile（通过 Deployer）

对于生产自托管，使用 [Deployer](./deployer) 生成针对您项目配置定制的 `Dockerfile`：

```bash
npx @docmd/core deploy --docker
```

这会生成使用多阶段构建的 `Dockerfile`：
1. **构建阶段** — 安装您精确固定的 `@docmd/core` 版本并运行构建。
2. **服务阶段** — 将输出复制到最小的 `nginx:alpine` 镜像中。

一起生成 Docker 和 Nginx 配置以实现完整的自托管设置：

```bash
npx @docmd/core deploy --docker --nginx
```

### 构建和运行

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

您的文档将在 `http://localhost:8080` 运行。

::: callout tip "重新生成"
配置更改了？重新运行 `npx @docmd/core deploy --docker`。使用 `--force` 覆盖现有文件。
:::