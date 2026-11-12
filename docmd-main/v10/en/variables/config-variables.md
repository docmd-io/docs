---
title: Config & Custom Variables
description: How to define custom variables in docmd.config.json, load external variable files, and interpolate variables inside configuration strings and documentation content.
---

# Config & Custom Variables

You can define custom variables directly in `docmd.config.json`, load them from external JSON files or JavaScript modules, and use them throughout your documentation.

## Defining Variables in `docmd.config.json`

Add a `variables` block to your `docmd.config.json`:

```json
{
  "title": "Acme Cloud Docs",
  "variables": {
    "companyName": "Acme Technologies",
    "supportEmail": "support@acme.com",
    "cloud": {
      "apiEndpoint": "https://api.acme.cloud/v2",
      "region": "eu-west-1",
      "maxInstances": 50
    }
  }
}
```

### Accessing in Markdown

Nested objects can be accessed using standard dot notation:

````markdown
To contact our operations team, email [\{{ supportEmail }}](mailto:\{{ supportEmail }}).

All requests should be routed to our production endpoint:
```bash
curl -X GET \{{ cloud.apiEndpoint }}/status \
  -H "X-Region: \{{ cloud.region }}"
```
````

During build, this resolves directly to:

```bash
curl -X GET https://api.acme.cloud/v2/status \
  -H "X-Region: eu-west-1"
```

### Accessing Config Variables in Client JavaScript & Playgrounds

All user variables declared in `docmd.config.json` are automatically serialized into the client runtime (`window.__DOCMD_VARIABLES__`), making them queryable in browser scripts, custom tools, and interactive playgrounds via `window.docmd.var.get()`:

```javascript
// Query variables defined in docmd.config.json
const endpoint = window.docmd?.var?.get("cloud.apiEndpoint");
const region = window.docmd?.var?.get("cloud.region");
console.log(`Connecting to ${endpoint} in ${region}`);
```

::: callout tip "1:1 Name Mapping" icon:check-circle
Variable keys match their Markdown names exactly. If you write `{{ cloud.apiEndpoint }}` in Markdown, use `window.docmd.var.get("cloud.apiEndpoint")` in JavaScript. Do not prefix user variables with `docmd.`.
:::

## Using Variables Inside Configuration Fields

docmd executes a unified variable registration pass **before** rendering site layouts, footer elements, and banners.

This means you can reference built-in variables (such as `\{{ docmd.buildYear }}` or `\{{ docmd.version }}`) as well as your own custom variables directly inside configuration fields:

```json
{
  "title": "Acme Docs",
  "variables": {
    "companyName": "Acme Cloud Systems"
  },
  "footer": {
    "copyright": "Copyright © \{{ docmd.buildYear }} \{{ companyName }}. All rights reserved."
  },
  "layout": {
    "banners": {
      "top": {
        "content": "**docmd v\{{ docmd.version }} is live!** — Running \{{ title }} in region \{{ env.DEPLOY_REGION || 'global' }}."
      }
    }
  }
}
```

::: callout tip "The Unified Resolution Cycle" icon:refresh-cw
1. **Registration**: When `docmd build` begins, the `VariableRegistry` registers all built-in variables (`docmd.buildYear`, `docmd.version`, etc.), environment variables, and user-defined `variables` from config.
2. **Config Interpolation**: docmd recursively traverses `docmd.config.json` (such as `footer.copyright`, `layout.banners`, `title`) and substitutes any `{{ variable }}` tokens.
3. **Markdown Rendering**: Markdown processors use the same registered variables to render page content.
4. **Result**: Both your site footer and markdown pages reflect the exact same resolved values with zero manual duplication.
:::

## External Variable Files

For large projects or shared team data, you can point `"variables"` to an external JSON or JavaScript file using the switchable tabs below:

::: tabs
::: tab "External JSON File" icon:file-json
Point `variables` to a JSON file in your project:

```json
{
  "variables": "./data/variables.json"
}
```

Where `./data/variables.json` contains:

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

::: tab "Dynamic JavaScript Module" icon:file-code
Point `variables` to a JavaScript file to compute values dynamically:

```json
{
  "variables": "./data/variables.js"
}
```

Where `./data/variables.js` exports an object or function:

```javascript
module.exports = {
  dynamicTimestamp: new Date().toLocaleDateString('en-GB'),
  sdkVersion: require('./package.json').version,
  activeServices: ['auth', 'billing', 'analytics']
};
```
::: /tab
::: /tabs

::: card "Best Practice: Single Source of Truth" icon:check-circle
Using an external JavaScript module allows you to import version numbers directly from your `package.json` or query internal build artefacts, ensuring documentation never goes out of sync with software releases.
:::