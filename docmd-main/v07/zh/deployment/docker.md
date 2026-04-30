---
title: "Docker"
description: "通过一条命令将 docmd 部署到 Docker 容器中。"
---

`docmd` 生成静态 HTML——非常适合轻量级、可复现的 Docker 容器。

## 生成 Dockerfile

```bash
docmd deploy --docker
```

这会在项目根目录创建针对你配置定制的 `Dockerfile` 和 `.dockerignore`：

- **你的输出目录**用于 `COPY` 路径（不是硬编码的 `site/`）
- **你当前的 `@docmd/core` 版本**固定在安装步骤中，确保可复现构建
- **你的配置文件**在使用非默认名称时会传递给 `docmd build`

### 生成内容

Dockerfile 采用优化的多阶段构建：

1. **阶段 1 — 构建**：通过层缓存安装依赖（先复制 `package.json`），安装固定版本的 `@docmd/core`，执行 `docmd build`。
2. **阶段 2 — 服务**：将构建产物复制到精简的 `nginx:alpine` 容器中。

::: callout tip "Docker 中使用自定义 Nginx"
如果你在生成 Dockerfile 之前先生成了 `nginx.conf`（通过 `docmd deploy --nginx`），它会被自动检测并配置到容器中。
:::

## 构建和运行

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

你的文档现在可以在 `http://localhost:8080` 访问。

### 重新生成

修改了配置？直接重新运行 `docmd deploy --docker`——文件始终根据当前 `docmd.config.js` 重新生成。