---
title: "资源管理"
description: "docmd 在构建过程中如何处理 CSS、JavaScript 和图片资源。"
---

`docmd` 采用"镜像与映射"的方式来处理资源。这确保了您的本地开发路径与生产构建保持一致。

## 目录结构

默认情况下，`docmd` 会在项目根目录查找 `assets/` 文件夹。

```bash
my-docs/
  ├── assets/          # 源资源
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # 内容
  ├── docmd.config.json
  └── site/            # 构建输出（自动镜像）
```

## 自动复制

当您运行 `npx @docmd/core build` 或 `npx @docmd/core dev` 时：
1.  **镜像逻辑**：您的 `assets/` 文件夹的全部内容会递归地复制到 `site/assets/`。
2.  **稳定性**：我们使用强化的复制引擎，并具备自动重试机制，以防止在 macOS 和现代 SSD 上出现"File Busy"或"ENOENT"错误。
3.  **引用**：您应该始终使用**根相对路径**从 Markdown 或配置中引用资源：
    ```markdown
    ![Logo](/assets/images/logo.png)
    ```

## 自定义 CSS 与 JS 集成

要将您的资源链接到每个页面，请将它们添加到主题配置中：

```json "docmd.config.json"
{
  "theme": {
    "customCss": ["/assets/css/branding.css"],
    "customJs": ["/assets/js/analytics.js"]
  }
}
```

::: callout info "AI 识别策略 :robot:"
*   **按类型组织**：将 `/css`、`/js` 和 `/images` 分开。这有助于 AI 智能体在您要求它们"编辑页头颜色"时即时定位相关的样式或脚本。
*   **使用描述性文件名**：将图片命名为 `authentication-flow-diagram.png` 比 `img_01.png` 为 `llms.txt` 爬虫提供更多上下文。
:::

## 网站根目录静态资源（`public/`）

对于必须直接位于网站根目录下而不是 `/assets/` 中的静态文件（例如 `robots.txt`、`CNAME`、`funding.json`、网站图标或域名级校验文件），`docmd` 内置了一流的 **Public Root Assets** 处理机制。

### 零配置自动检测

只需在项目根目录（或 `docs/` 内容目录）下创建一个 `public/` 文件夹：

```bash
my-docs/
  ├── public/                  # 网站根目录静态资源（零配置）
  │   ├── CNAME                # -> https://example.com/CNAME
  │   ├── robots.txt           # -> https://example.com/robots.txt
  │   ├── funding.json         # -> https://example.com/funding.json
  │   ├── .well-known/
  │   │   └── funding.json     # -> https://example.com/.well-known/funding.json
  │   └── work/
  │       └── fund.json        # -> https://example.com/work/fund.json
  ├── assets/                  # 网页通用资源（镜像至 /assets/）
  ├── docs/                    # Markdown 文档
  ├── docmd.config.json
  └── site/                    # 编译构建输出
```

`public/` 目录中的所有文件和嵌套子目录结构都会原样复制到构建输出根目录（`site/`），保持完整的层级关系。

### 自定义配置（`static`）

您可以在 `docmd.config.json` 中使用 `static` 属性自定义要保留在根目录的文件或文件夹：

```json "docmd.config.json"
{
  "static": ["work", "funding.json", "CNAME"]
}
```

* **保留目录层级**：指定文件夹（如 `"work"`）会在 `site/work/...` 下完整保留（例如 `work/fund.json` 生成为 `https://example.com/work/fund.json`）。
* **单选或多选**：支持配置单个字符串或由多个目录/文件路径组成的数组。
* **容错构建**：若配置的路径在磁盘上不存在，`docmd` 会在构建日志中输出友好的警告提示（`[static] Configured path "..." does not exist, skipping.`），并继续正常完成构建，绝不会导致构建崩溃。
* **彻底禁用**：若不需要复制根目录静态资源，可设置 `"static": false`。

### 开发服务器实时更新

在使用 `docmd dev` 进行本地开发时，开发服务器会自动监听 `public/` 及所有配置的静态目录。新增、修改或删除文件都会立即触发重新构建并自动刷新浏览器。