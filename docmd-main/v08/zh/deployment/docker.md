---
title: "Docker"
description: "通过一条命令将 docmd 部署到 Docker 容器中。"
---

docmd 生成静态 HTML。这非常适合轻量级、可复现的 Docker 容器。

## 生成 Dockerfile

```bash
npx @docmd/core deploy --docker
```

这会在项目根目录创建针对你配置定制的 `Dockerfile` 和 `.dockerignore`：

- **你的输出目录**用于 `COPY` 路径（不是硬编码的 `site/`）。
- **你精确的 `@docmd/core` 版本**固定在安装步骤中，以确保可复现构建。
- **你的配置文件**在使用非默认名称时会传递给构建命令。

### 生成内容

Dockerfile 采用优化的多阶段构建：

1. **阶段 1 - 构建**：通过层缓存安装依赖（先复制 `package.json`）。安装固定版本的 `@docmd/core` 并运行构建命令。
2. **阶段 2 - 服务**：将构建产物复制到精简的 `nginx:alpine` 容器中。

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN if [ -f package.json ]; then npm install --ignore-scripts; fi
COPY . .
RUN npm install -g @docmd/core@0.8.2
RUN npx @docmd/core build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

::: callout tip "Docker 中使用自定义 Nginx"
如果你在生成 Dockerfile 之前先生成了 `nginx.conf`（通过 `npx @docmd/core deploy --nginx`），引擎会检测到它并自动在容器内配置。
:::

### `.dockerignore`

`.dockerignore` 与 Dockerfile 一起生成，以保持构建上下文精简：

```text
node_modules
site
dist
.git
.env
*.md
!docs/**/*.md
```