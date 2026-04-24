---
title: "快速开始"
description: "从空文件夹到运行中的文档网站，不到一分钟。"
---

在任意包含 Markdown 文件的文件夹中运行 docmd，无需配置文件，无需安装框架，即刻启动。

## 启动开发服务器

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```

== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

访问 `http://localhost:3000`，文档网站即刻上线。

## 自动完成的事项

docmd 会自动扫描项目并完成以下配置：

1. **目录检测** — 自动寻找 `docs/`、`src/docs/`、`documentation/` 或任意 `.md` 文件
2. **导航生成** — 根据文件夹结构自动构建侧边栏导航
3. **元数据提取** — 从 `package.json` 读取网站标题（如有）
4. **主题激活** — 应用默认主题，支持跟随系统自动切换明暗模式
5. **搜索索引** — 启用内置全文搜索

无需 `docmd.config.js`。如后续需要版本管理、插件或自定义导航，再添加配置文件即可。

## 构建生产版本

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```

== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

生成的静态网站输出至 `./site/`，可部署到任意静态托管服务。
