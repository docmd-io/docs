---
title: "选择部署方式"
description: "docmd GitHub App、GitHub Action、起始模板与部署器包的实用对比指南——含决策矩阵与真实使用场景。"
---

# 选择部署方式

docmd 提供四种方式将您的文档上线。它们的输出完全相同——一个静态站点，部署至 GitHub Pages 或您选择的托管服务——但在控制程度和起点上有所不同。

## 快速决策矩阵

| | [GitHub App](../../integrations/github-app.md) | [起始模板](../../integrations/starter-template.md) | [GitHub Action](../../integrations/github-action.md) | [部署器包](../../deployment/deployer-package.md) |
|---|---|---|---|---|
| **起点** | 现有仓库 | 新仓库 | 任意 | 任意 |
| **配置工作量** | 一键 | 两步 | 编写 YAML | 运行命令 |
| **工作流文件** | 自动生成 | 已包含 | 自行编写 | 自动生成 |
| **可定制性** | 生成后编辑 | 从一开始 | 完全自定义 | 完全自定义 |
| **托管目标** | GitHub Pages | GitHub Pages | GitHub Pages | 任意服务商 |
| **Monorepo 支持** | ✓ 自动检测 | — | 手动 `--cwd` | ✓ |
| **非 GitHub 托管** | ✗ | ✗ | 可适配 | ✓ Docker、Nginx、Vercel、Netlify… |

## 场景指南

### "我想在两分钟内上线，零配置"

使用 **[GitHub App](../../integrations/github-app.md)**。安装后选择仓库即可。它会检测您的配置、生成工作流、启用 GitHub Pages 并完成部署——无需修改任何文件。

::: button "安装 GitHub App" external:https://github.com/apps/docmd/installations/new icon:github color:#2ea44f

---

### "我正在创建一个全新的文档站点"

使用 **[起始模板](../../integrations/starter-template.md)**。在 GitHub 上点击"使用此模板"，更新 `docmd.config.json` 中的标题和 URL，一次性启用 GitHub Pages，然后推送即可。

::: button "使用起始模板" external:https://github.com/docmd-io/docmd-template/generate icon:github

---

### "我有现有的 CI/CD 流水线，想将文档加入其中"

使用 **[GitHub Action](../../integrations/github-action.md)**。将 `docmd-io/deploy@v1` 加入您现有的工作流，它可与其他步骤无缝组合——运行测试、构建应用、再构建文档，全在一个 Job 中完成。

---

### "我要部署到 Vercel、Netlify、Docker 或自有服务器"

使用 **[部署器包](../../deployment/deployer-package.md)**。运行 `npx @docmd/core deploy --vercel`（或 `--netlify`、`--docker`、`--nginx`），自动生成针对您的 `docmd.config.json` 定制的服务商专属配置文件。

---

### "我在 Monorepo 中，文档位于子目录"

**GitHub App** 和**部署器包**均可自动处理。App 会在整个仓库树中检测配置，并自动注入正确的 `--cwd` 标志。

如果您偏好使用 GitHub Action，请手动传入 `--cwd`：

```yaml
- run: npx @docmd/core build --cwd packages/docs
```

---

### "我想在每个 Pull Request 上预览文档"

结合使用 **GitHub Action** 与 PR 预览服务（例如 Cloudflare Pages 预览部署或自托管预览环境）。详见[预览更改](../workflows-teams/previewing-changes.md)完整指南。

---

## 各方式如何配合使用

这些方式并不互斥，常见的演进路径如下：

```
从 GitHub App 开始（最快上线）
  ↓
随需求增长，自定义生成的工作流文件
  ↓
添加部署器包，生成 Nginx/Docker 配置用于自托管
  ↓
将 Action 集成到更广泛的 CI/CD 流水线中
```

## 延伸阅读

- [GitHub Action 参考](../../integrations/github-action.md)
- [GitHub App 参考](../../integrations/github-app.md)
- [起始模板参考](../../integrations/starter-template.md)
- [部署器包参考](../../deployment/deployer-package.md)
- [GitHub Actions CI/CD 指南](./github-actions-cicd.md)
- [预览更改](../workflows-teams/previewing-changes.md)
