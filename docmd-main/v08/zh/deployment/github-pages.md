---
title: "GitHub Pages"
description: "使用生成的 GitHub Actions CI/CD 工作流自动将 docmd 文档部署到 GitHub Pages。"
---

`npx @docmd/core deploy --github-pages` 会在 `.github/workflows/deploy.yml` 生成一个即用型 GitHub Actions CI/CD 工作流文件。将其推送到仓库后，GitHub 会在每次推送到 `main` 时自动构建和部署你的站点。

```bash
npx @docmd/core deploy --github-pages
```

这会创建一个针对你项目个性化的 `.github/workflows/deploy.yml`。无需手动编辑。

## 生成的内容

该工作流：

1. 检出你的仓库。
2. 安装 Node.js 和项目依赖。
3. 安装用于生成文件的确切 `@docmd/core` 版本。
4. 运行 `npx @docmd/core build`。
5. 将输出目录作为 GitHub Pages 工件上传。
6. 部署到 GitHub Pages。

## 启用 GitHub Pages

在推送工作流之前，在仓库中启用 GitHub Pages：

1. 前往 **Settings → Pages**。
2. 将 **Source** 设置为 **GitHub Actions**。

启用后，每次推送到 `main` 都会触发部署。

## 自定义工作流

生成的文件是纯 YAML。可以自由编辑。常见更改包括：

- **分支**：将 `branches: [main]` 更改为你的默认分支名称。
- **Node 版本**：更新 `node-version: "20"` 以匹配你的项目。
- **构建命令**：工作流默认使用 `npx @docmd/core build`。如果使用自定义配置文件，重新运行 `npx @docmd/core deploy --github-pages --config your-config.json` 以重新生成。

## 自定义域名

部署后，你可以在 **Settings → Pages → Custom domain** 中添加自定义域名。在 `docmd.config.json` 中设置 `url` 字段以匹配，然后重新部署，以使站点地图和规范标签保持正确。