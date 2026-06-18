---
title: "Docker"
description: "在 Docker 容器中运行 docmd —— 使用官方预构建镜像或从您的项目配置生成自定义 Dockerfile。"
---

docmd 生成静态 HTML，使其非常适合轻量级、可复现的 Docker 容器。根据您的用例有两种不同的方法。

## 官方 Docker 镜像

官方镜像让您无需在本地安装任何东西即可构建和服务您的文档。它支持多种架构（`linux/amd64` 和 `linux/arm64`）。

### 快速开始

```bash
# 拉取最新镜像
docker pull ghcr.io/docmd-io/docmd:0.8.6

# 构建您的文档（挂载本地 docs 并输出到 ./site）
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.8.6 build

# 运行内置的演示站点
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:0.8.6
```

### Docker Compose

使用 Docker Compose 在单个工作流中构建和服务：

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:0.8.6
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
| 基础镜像 | Alpine Linux（极小占用空间） |
| 安全性 | 以非 root 用户身份运行 |
| 健康检查 | 内置容器健康监控 |
| SBOM | 包含软件物料清单（SBOM）签名 |
| 架构 | `linux/amd64`，`linux/arm64` |

## 自定义 Dockerfile（通过 Deployer）

对于生产自托管，使用 [Deployer](./deployer) 根据您的项目配置生成量身定制的 `Dockerfile`：

```bash
npx @docmd/core deploy --docker
```

这会生成一个使用多阶段构建的 `Dockerfile`：
1. **构建阶段** —— 安装您精确固定的 `@docmd/core` 版本并运行构建。
2. **服务阶段** —— 将输出复制到最小的 `nginx:alpine` 镜像中。

同时生成 Docker 和 Nginx 配置以获得完整的自托管设置：

```bash
npx @docmd/core deploy --docker --nginx
```

### 构建和运行

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

您的文档将在 `http://localhost:8080` 上可用。

::: callout tip "重新生成"
更改了配置？重新运行 `npx @docmd/core deploy --docker` 以重新生成。使用 `--force` 覆盖现有文件。
:::
