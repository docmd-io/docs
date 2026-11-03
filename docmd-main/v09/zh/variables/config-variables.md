---
title: 配置与自定义变量
description: 如何在 docmd.config.json 中定义变量、引入外部变量文件并在配置字符串与 Markdown 文档中进行插值。
---

# 配置与自定义变量

您可以在 `docmd.config.json` 中直接定义自定义变量，也可以引用外部 JSON 文件或 JavaScript 模块，并在全站文档中灵活调用。

## 在 `docmd.config.json` 中定义

在 `docmd.config.json` 中添加 `variables` 配置项：

```json
{
  "title": "Acme 云平台文档",
  "variables": {
    "companyName": "Acme Technologies",
    "supportEmail": "support@acme.com",
    "cloud": {
      "apiEndpoint": "https://api.acme.cloud/v2",
      "region": "cn-north-1",
      "maxInstances": 50
    }
  }
}
```

### 在 Markdown 中使用

嵌套层级可通过标准点符号访问：

````markdown
如需技术支持，请发送邮件至 [\{{ supportEmail }}](mailto:\{{ supportEmail }})。

向生产集群发起请求：
```bash
curl -X GET \{{ cloud.apiEndpoint }}/status \
  -H "X-Region: \{{ cloud.region }}"
```
````

在执行构建后，将直接编译为：

```bash
curl -X GET https://api.acme.cloud/v2/status \
  -H "X-Region: cn-north-1"
```

### 在客户端 JavaScript 与交互式 Playground 中读取配置变量

所有在 `docmd.config.json` 中定义的用户变量均会自动序列化并注入客户端运行时（`window.__DOCMD_VARIABLES__`）。您可以在前端自定义脚本、浏览器扩展以及交互式 Playground 中通过 `window.docmd.var.get()` 实时检索它们：

```javascript
// 读取 docmd.config.json 中定义的用户配置变量
const endpoint = window.docmd?.var?.get("cloud.apiEndpoint");
const region = window.docmd?.var?.get("cloud.region");
console.log(`正在连接位于 ${region} 的 API 端点：${endpoint}`);
```

::: callout tip "1:1 键名完全对称映射" icon:check-circle
客户端变量键名与 Markdown 语法完全一致。如果在 Markdown 中书写 `{{ cloud.apiEndpoint }}`，在 JavaScript 中直接通过 `window.docmd.var.get("cloud.apiEndpoint")` 获取。切勿为用户自定义变量添加 `docmd.` 前缀。
:::

## 在配置项字段中直接使用变量

docmd 在渲染整站母版布局、导航和页脚**之前**，会统一执行变量注册与配置插值阶段。

这意味着您可以在配置文件的任意文本字段中直接引用内置变量（如 `\{{ docmd.buildYear }}`）或自定义变量：

```json
{
  "title": "Acme Docs",
  "variables": {
    "companyName": "Acme Cloud Systems"
  },
  "footer": {
    "copyright": "Copyright © \{{ docmd.buildYear }} \{{ companyName }}。保留所有权利。"
  },
  "layout": {
    "banners": {
      "top": {
        "content": "**docmd v\{{ docmd.version }} 已发布！** — 节点区域：\{{ env.DEPLOY_REGION || 'global' }}。"
      }
    }
  }
}
```

::: callout tip "统一解析执行闭环" icon:refresh-cw
1. **统一注册**：在 `docmd build` 启动时，`VariableRegistry` 会预先收集所有内置变量、系统环境变量以及用户定义的 `variables`。
2. **配置递归插值**：docmd 递归遍历 `docmd.config.json` 并替换所有 `{{ variable }}` 模板。
3. **正文渲染插值**：Markdown 解析器基于相同的变量池统一处理页面正文。
4. **效果**：无论页脚还是正文，所有动态内容保持完全一致，无需任何手动重复。
:::

## 引用外部变量文件

针对大型项目或跨团队维护，可将 `"variables"` 指向外部 JSON 或 JavaScript 脚本：

::: tabs
::: tab "外部 JSON 数据文件" icon:file-json
在配置中指定 JSON 相对路径：

```json
{
  "variables": "./data/variables.json"
}
```

`./data/variables.json` 文件内容示例：

```json
{
  "auth": {
    "oauthUrl": "https://auth.acme.com/oauth2/token",
    "clientId": "acme-portal-production"
  },
  "limits": {
    "rateLimitPerMin": 1200
  }
}
```
::: /tab

::: tab "动态 JavaScript 模块" icon:file-code
指向 JavaScript 脚本以实现动态计算：

```json
{
  "variables": "./data/variables.js"
}
```

`./data/variables.js` 导出对象或函数：

```javascript
module.exports = {
  dynamicTimestamp: new Date().toLocaleDateString('zh-CN'),
  sdkVersion: require('./package.json').version,
  activeServices: ['auth', 'billing', 'analytics']
};
```
::: /tab
::: /tabs

::: card "最佳实践：单一真实事实源" icon:check-circle
通过 JavaScript 模块，可以直接读取 `package.json` 中的当前发布版本，确保开发文档与代码库版本发布严格同步。
:::
