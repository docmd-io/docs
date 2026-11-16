---
title: "Iconify 图标插件"
description: "按需矢量图标集成，支持来自 100+ 开源图标集的 200,000+ 开源图标，零客户端运行时开销。"
---

`@docmd/plugin-iconify` 插件将 `docmd` 的图标系统扩展到内置的 Lucide 图标之外，使您能够按需访问来自 100+ 流行开源图标集（包括 Material Design Icons、IBM Carbon、Tabler、FontAwesome、Solar 和 Simple Icons 等）的 200,000+ 矢量图标。

所有图标在构建时直接作为干净的 SVG 获取并内联到 HTML 中，缓存在本地磁盘，无需任何客户端 JavaScript 运行时开销。

::: callout success title:"零客户端开销" icon:zap
由于 SVG 是在静态构建阶段解析并内联的，无论您引用了多少个不同的图标集，您的网站都不会增加任何客户端 Bundle 体积或产生网络字体加载延迟。
:::

## 安装与设置

通过 CLI 安装插件：

```bash
npx @docmd/core add iconify
```

在 `docmd.config.json` 中启用该插件：

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

::: callout tip title:"自动安装" icon:sparkles
如果在本地安装之前已在 `docmd.config.json` 中声明了 `@docmd/plugin-iconify`，`docmd` 会在下次执行构建时自动下载并安装它。
:::

## 插件配置

在 `docmd.config.json` 中配置插件选项：

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 全局启用或禁用 Iconify 图标的按需解析。 |

## 核心特性

* **200,000+ 图标**：无需单独安装字体库或样式表，即可访问几乎所有开源图标集。
* **构建时内联**：在编译期间直接将 SVG 嵌入到生成的 HTML 中，确保极速的首屏加载。
* **本地磁盘缓存**：下载的图标缓存在 `.docmd/cache/icons/` 下，大幅提升后续构建速度并支持离线开发。
* **离线降级方案**：若因网络原因无法获取图标，将内联轻量占位符 SVG 以保持布局稳定，避免破坏排版。
* **容器无缝集成**：全面支持 `docmd` 容器语法，包括 callout、button、card、tab 和 tag。
* **Doctor 诊断支持**：支持 `docmd doctor` 健康检查，自动审计缓存状态与解析器完整性。

## 使用与图标语法

在任何容器组件中使用 `icon:` 属性。解析器同时支持冒号和连字符格式：

| 语法格式 | 示例 | 描述 |
| :--- | :--- | :--- |
| `iconify:<集合>:<图标>` | `icon:iconify:mdi:home` | 标准冒号分隔格式 |
| `iconify:<集合>-<图标>` | `icon:iconify:carbon-logo-github` | 冒号前缀加连字符名称 |
| `iconify-<集合>:<图标>` | `icon:iconify-solar:shield-check-bold` | 连字符前缀加冒号分隔 |
| `iconify-<集合>-<图标>` | `icon:iconify-tabler-brand-docker` | 全连字符缩写格式 |

::: callout info title:"Lucide 回退" icon:info
不带 `iconify:` 或 `iconify-` 前缀的标准图标名称（例如 `icon:rocket` 或 `icon:shield-check`）将继续通过 `docmd` 核心渲染为内置的 Lucide 图标。
:::

### 容器使用示例

#### 提示框 (Callouts)

```markdown
::: callout icon:iconify:mdi:home title:"欢迎"
欢迎访问我们的文档门户。
:::

::: callout success title:"安全已验证" icon:iconify-solar:shield-check-bold
端到端加密与安全审计已生效。
:::
```

::: callout icon:iconify:mdi:home title:"欢迎"
欢迎访问我们的文档门户。
:::

::: callout success title:"安全已验证" icon:iconify-solar:shield-check-bold
端到端加密与安全审计已生效。
:::

#### 按钮 (Buttons)

```markdown
::: button "GitHub 仓库" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: button "加入 Discord 社区" external:https://discord.gg/docmd icon:iconify:simple-icons:discord
```

::: button "GitHub 仓库" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: button "加入 Discord 社区" external:https://discord.gg/docmd icon:iconify:simple-icons:discord

#### 卡片 (Cards)

```markdown
::: card title:"Docker 部署" icon:iconify:tabler:brand-docker
使用轻量级 Alpine Linux 镜像部署容器化文档站点。
:::

::: card title:"Google Cloud Platform" icon:iconify:simple-icons:googlecloud
在 Cloud Storage 和 Cloud Run 上托管静态资源与无服务器运行时。
:::
```

::: card title:"Docker 部署" icon:iconify:tabler:brand-docker
使用轻量级 Alpine Linux 镜像部署容器化文档站点。
:::

::: card title:"Google Cloud Platform" icon:iconify:simple-icons:googlecloud
在 Cloud Storage 和 Cloud Run 上托管静态资源与无服务器运行时。
:::

#### 标签页 (Tabs)

````markdown
::: tabs
== tab "Docker Compose" icon:iconify:tabler:brand-docker
```yaml
services:
  docs:
    image: ghcr.io/docmd-io/docmd:latest
    ports:
      - "3000:3000"
```

== tab "Kubernetes" icon:iconify:simple-icons:kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docmd-site
```
:::
````

::: tabs
== tab "Docker Compose" icon:iconify:tabler:brand-docker
```yaml
services:
  docs:
    image: ghcr.io/docmd-io/docmd:latest
    ports:
      - "3000:3000"
```

== tab "Kubernetes" icon:iconify:simple-icons:kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docmd-site
```
:::

#### 标签 (Tags)

```markdown
::: tag "生产就绪" icon:iconify:solar:verified-check-bold color:green
::: tag "npm 包" icon:iconify:simple-icons:npm color:red
```

::: tag "生产就绪" icon:iconify:solar:verified-check-bold color:green
::: tag "npm 包" icon:iconify:simple-icons:npm color:red

## 常用图标集合参考

以下是通过 Iconify 支持的部分常用图标集合：

| 集合 ID | 集合名称 | 示例语法 | 推荐场景 |
| :--- | :--- | :--- | :--- |
| `mdi` | Material Design Icons | `icon:iconify:mdi:home` | 通用用户界面、实用工具与 Material 风格 |
| `carbon` | IBM Carbon Design | `icon:iconify:carbon:logo-github` | 开发者工具、云架构与系统监控 |
| `tabler` | Tabler Icons | `icon:iconify:tabler:brand-docker` | 现代简洁的线性图标 |
| `solar` | Solar Icons | `icon:iconify-solar:shield-check-bold` | 现代粗线条与双色调图标 |
| `simple-icons` | Simple Icons | `icon:iconify:simple-icons:googlecloud` | 品牌、编程语言、数据库与云平台标志 |
| `fa6-solid` | FontAwesome 6 Solid | `icon:iconify:fa6-solid:server` | 经典实体图标与基础设施符号 |
| `fa6-brands` | FontAwesome 6 Brands | `icon:iconify:fa6-brands:aws` | 常用商业品牌与供应商 Logo |
| `ph` | Phosphor Icons | `icon:iconify:ph:lightning-bold` | 灵活优雅的几何图标库 |

::: button "浏览 200,000+ Iconify 图标库" external:https://icon-sets.iconify.design/ icon:external-link

## 自定义 CSS 样式

通过 `@docmd/plugin-iconify` 渲染的图标包含 `.iconify-icon` CSS 类和基于集合命名的 `.icon-<集合>-<名称>` 类。

您可以在 `customCss` 中自定义图标样式：

```css
/* 自定义所有 Iconify 图标 */
.iconify-icon {
  vertical-align: middle;
  transition: transform 0.15s ease;
}

/* 针对特定集合设置 */
.iconify-icon[class*="icon-mdi-"] {
  fill: currentColor;
}

/* 针对特定图标设置颜色 */
.icon-simple-icons-googlecloud {
  color: #4285f4;
}

.icon-carbon-logo-github {
  color: var(--text-color, #24292f);
}
```

## 构建前诊断

使用 `docmd doctor` 验证 `@docmd/plugin-iconify` 的运行状态与本地图标缓存数量：

```bash
npx @docmd/core doctor
```

```text
  Plugins
  ────────────────────────────────────────────────────────────
  ✓ Iconify Integration: Active with support for 200,000+ open-source icons (cached: 14)
```
