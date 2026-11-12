---
title: 环境变量参考手册
description: 了解如何在 CI/CD 自动化流水线中使用 env.* 与 DOCMD_VAR_* 向 docmd 文档中注入构建环境变量。
---

# 环境变量参考手册

docmd 支持将系统环境变量直接注入到文档与配置中，非常适合与 GitHub Actions、GitLab CI、Vercel 或 Netlify 等持续集成/持续部署 (CI/CD) 流水线协同工作。

## 通过 `env.*` 读取环境变量

任何在构建过程中由宿主系统导出的环境变量，均可使用 `env.` 前缀进行读取：

```markdown
当前部署环境：**\{{ env.ENVIRONMENT || 'development' }}**。
构建 ID：`\{{ env.GITHUB_RUN_ID || 'local' }}`
分支名称：`\{{ env.GITHUB_REF_NAME || 'main' }}`
```

### 指定默认回退值

本地开发时部分环境变量可能并不存在，建议始终使用 `||` 提供默认值：

```markdown
演练环境接入地址：
`\{{ env.STAGING_GATEWAY_URL || "https://sandbox.gateway.io" }}`
```

## `DOCMD_VAR_*` 自动免前缀提升

为避免在 Markdown 正文中重复书写 `env.` 前缀，所有以 `DOCMD_VAR_` 为前缀的环境变量在构建时均会自动提升为顶级变量：

```bash
# 在 CI/CD 流水线或本地 .env 中导出：
export DOCMD_VAR_API_HOST="https://api.production.internal"
export DOCMD_VAR_RELEASE_CHANNEL="beta"
```

在 Markdown 文档中直接使用：

```markdown
后端 API 地址：`\{{ API_HOST }}`。
当前发布通道：**\{{ RELEASE_CHANNEL }}**。
```

::: callout info "双重访问支持" icon:layers
提升后的变量仍然可以通过全名 `\{{ DOCMD_VAR_API_HOST }}` 进行正常访问。
:::

::: callout warning "安全警示：请勿泄露敏感私钥" icon:shield-alert
严禁通过构建期变量暴露数据库密码或私有密钥！在 `docmd build` 期间解析的所有内容都会被写入公开的 HTML 静态文件中。如需个人专属的访问凭证，请使用客户端动态个性化机制 (`window.docmd.var.set`)。
:::

## CI/CD 自动化流水线集成

遵循以下标准流程，为自动化构建注入动态元数据：

::: steps
::: step "配置流水线环境变量" icon:settings
在 CI 配置文件中导出变量（推荐使用 `DOCMD_VAR_` 前缀）。
:::

::: step "执行文档构建" icon:terminal
运行 `docmd build`。编译器自动检测并解析 `process.env` 中的所有变量。
:::

::: step "发布生成站点" icon:cloud
生成的纯静态 HTML 产物已自动替换好全部变量，可直接部署至任意 CDN。
:::
::: /steps

### 流水线示例

::: tabs
::: tab "GitHub Actions" icon:github
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

      - name: 构建文档
        run: npx @docmd/core build
        env:
          DOCMD_VAR_DEPLOYED_AT: ${{ github.event.head_commit.timestamp }}
          DOCMD_VAR_BUILD_ID: ${{ github.run_id }}
          DOCMD_VAR_COMMIT_SHA: ${{ github.sha }}
          ENVIRONMENT: production
```
::: /tab

::: tab "GitLab CI" icon:gitlab
```yaml
deploy_docs:
  image: node:22
  stage: deploy
  script:
    - npx @docmd/core build
  variables:
    DOCMD_VAR_DEPLOYED_AT: $CI_PIPELINE_CREATED_AT
    DOCMD_VAR_BUILD_ID: $CI_PIPELINE_ID
    ENVIRONMENT: production
  artifacts:
    paths:
      - site/
```
::: /tab
::: /tabs
