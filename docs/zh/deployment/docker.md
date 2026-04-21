---
title: "Docker"
description: "使用 Docker 容器部署 docmd"
---

`docmd` 生成高性能静态网站，非常适合在 Docker 容器中高效运行。

## 自动化部署配置

::: callout warning "版本要求"
`docmd deploy` 命令从 **v0.7.2** 开始引入。请确保在使用此功能前已更新 `@docmd/core`。
:::

使用核心 CLI 可以自动为你的项目生成生产级 `Dockerfile` 和 `.dockerignore`：

```bash
docmd deploy --docker
```

这会在项目根目录生成 `Dockerfile` 和 `.dockerignore`。你也可以配合使用 `--force` 覆盖现有文件，或使用 `--all` 一次性生成 Nginx 和 Caddy 配置。

生成的 Dockerfile 采用了优化的多阶段构建：
1. **层缓存 (Layer Caching)**：优先复制 `package.json` 以缓存依赖安装。
2. **确定性构建**：动态安装你当前正在使用的 `@docmd/core` 引擎的**精确**版本。
3. **极致体积**：使用 Alpine Linux 作为基础镜像，保持最小足迹。
4. **安全加固**：将构建好的静态站点放入加固后的 Nginx 容器中。

::: callout tip "在 Docker 中使用自定义 Nginx"
如果你在生成 Dockerfile 之前已经生成了 `nginx.conf`（通过 `--nginx`），`docmd` 会自动检测到它并配置 Dockerfile 使用你的自定义 Nginx 配置。
:::

## 手动配置

如果你希望手动编写 `Dockerfile`，可以使用以下模板：

```dockerfile
# 第一阶段：构建 (Build Phase)
FROM node:20-alpine AS builder
WORKDIR /app

# 1. 优先复制 manifest 以优化层缓存
COPY package*.json ./
RUN if [ -f package.json ]; then npm install --ignore-scripts; fi

# 2. 复制源码并安装引擎
COPY . .
RUN npm install -g @docmd/core@0.7.2

# 3. 构建站点
RUN docmd build

# 第二阶段：服务 (Serve Phase)
FROM nginx:alpine
# 可选：COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 运行容器

`Dockerfile` 准备就绪后，可以在本地或 VPS 上构建和运行：

```bash
docker build -t docmd-site .
docker run -p 8080:80 docmd-site
```

你的文档将在 `http://localhost:8080` 上线。
