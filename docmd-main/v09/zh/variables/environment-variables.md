---
title: 环境变量参考
description: 如何利用 env.* 和 DOCMD_VAR_* 模式将 CI/CD 及系统环境变量注入 docmd 文档与配置中。
---

# 环境变量参考

docmd 允许您将系统环境变量直接注入到文档与配置中，从而与 GitHub Actions、GitLab CI、Vercel 或 Netlify 等 CI/CD 流水线无缝协作。

## 通过 `env.*` 读取环境变量

构建环境中存在的任意系统环境变量均可通过 `env.` 前缀进行访问：

```markdown
当前部署环境：**{{ env.ENVIRONMENT || 'development' }}**。
构建 ID：`{{ env.GITHUB_RUN_ID || 'local' }}`
分支名：`{{ env.GITHUB_REF_NAME || 'main' }}`
```

### 回退默认值（Fallback）

在本地开发调试时，部分 CI 环境变量可能并不存在。建议始终使用 `||` 指定合理的回退值：

```markdown
连接到测试网关：
`{{ env.STAGING_GATEWAY_URL || "https://sandbox.gateway.io" }}`
```

## 通过 `DOCMD_VAR_*` 零前缀提升

为了避免在正文中反复书写 `env.` 前缀，任何以 `DOCMD_VAR_` 为前缀的环境变量都会被自动提升为顶层变量：

```bash
# 在 CI/CD 脚本或 .env 文件中：
export DOCMD_VAR_API_HOST="https://api.production.internal"
export DOCMD_VAR_RELEASE_CHANNEL="beta"
```

在您的 Markdown 文档中即可直接引用：

```markdown
服务端接口地址：`{{ API_HOST }}`。
当前发布通道：**{{ RELEASE_CHANNEL }}**。
```

这两个变量同时仍支持通过全名（`{{ DOCMD_VAR_API_HOST }}`）进行访问。

## 示例：GitHub Actions 部署工作流

在 `.github/workflows/deploy.yml` 中的配置示例：

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Build Documentation
        run: npx @docmd/core build
        env:
          DOCMD_VAR_DEPLOYED_AT: ${{ steps.date.outputs.date }}
          DOCMD_VAR_PR_NUMBER: ${{ github.event.number }}
          DEPLOY_ENV: production
```
