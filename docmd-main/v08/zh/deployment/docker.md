---
title: "Docker"
description: "通过一条命令将 docmd 部署到 Docker 容器中。"
---

docmd 生成静态 HTML。这非常适合轻量级、可复现的 Docker 容器。

## 官方 Docker 镜像

docmd 提供官方 Docker 镜像，支持多架构（`linux/amd64` 和 `linux/arm64`）。

### 快速开始

```bash
# 拉取最新镜像
docker pull ghcr.io/docmd-io/docmd:latest

# 构建文档
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build

# 运行内置演示站点
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:latest
```

### Docker Compose

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

- **基础镜像**: Alpine Linux (极小体积)
- **安全性**: 以非 root 用户运行
- **健康检查**: 内置容器健康状态监控
- **SBOM**: 提供软件物料清单 (Software Bill of Materials) 证明
- **支持架构**: `linux/amd64`, `linux/arm64`

## 自定义 Dockerfile

对于高级使用场景或自定义构建，你可以生成一个符合你配置的自定义 `Dockerfile` 和 `.dockerignore` 文件：

```bash
npx @docmd/core deploy --docker
```

构建并运行你的自定义容器：

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

你的文档将在 `http://localhost:8080` 运行。