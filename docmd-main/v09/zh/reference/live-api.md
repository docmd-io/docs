---
title: "Live Editor"
description: "了解 docmd Live Editor 及其基于浏览器的撰写工作流。"
---

docmd Live Editor 是一个专门用于实时撰写文档的环境。它借助同构核心引擎，无需任何后端构建过程，即可即时为您提供并排的 Markdown 预览。

## 启动编辑器

通过如下命令启动本地 Live Editor：

```bash
npx @docmd/core live
```

编辑器通常可在 `http://localhost:3000` 访问。

## 架构

不同于会在磁盘上重新构建文件的标准 `dev` 服务器，Live Editor 直接在您的浏览器中运行引擎。这带来：

1.  **即时反馈**：边输入边重新渲染内容。
2.  **可移植的 Playground**：编辑器可以被打包进静态站点，从而部署到 GitHub Pages 等平台。
3.  **跨平台一致**：预览使用与生产构建完全一致的渲染逻辑。

## 静态部署

生成一份可分享、独立的编辑器版本：

```bash
npx @docmd/core live --build-only
```

这会生成一个 `dist/` 目录，其中包含编辑器的 HTML 与打包好的同构引擎。