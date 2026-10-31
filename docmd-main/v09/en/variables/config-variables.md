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

```markdown
To contact our operations team, email [{{ supportEmail }}](mailto:{{ supportEmail }}).

All requests should be routed to our production endpoint:
```bash
curl -X GET {{ cloud.apiEndpoint }}/status \
  -H "X-Region: {{ cloud.region }}"
```
```

During build, this outputs:

```bash
curl -X GET https://api.acme.cloud/v2/status \
  -H "X-Region: eu-west-1"
```

## Using Variables Inside Configuration Fields

docmd runs a unified variable registration pass **before** rendering site layouts, footer elements, and banners.

This means you can reference built-in variables (such as `{{ docmd.buildYear }}`) as well as your own custom variables directly inside configuration fields:

```json
{
  "title": "Acme Docs",
  "variables": {
    "companyName": "Acme Cloud Systems"
  },
  "footer": {
    "copyright": "Copyright © {{ docmd.buildYear }} {{ companyName }}. All rights reserved."
  },
  "layout": {
    "banners": {
      "top": {
        "content": "Running {{ title }} v{{ docmd.version }} in region {{ env.DEPLOY_REGION || 'global' }}."
      }
    }
  }
}
```

### How the Resolution Cycle Works

1. **Registration**: When `docmd build` begins, the `VariableRegistry` registers all built-in variables (`docmd.buildYear`, `docmd.version`, etc.), environment variables, and user-defined `variables` from config.
2. **Config Interpolation**: docmd recursively traverses `docmd.config.json` (such as `footer.copyright`, `layout.banners`, `title`) and substitutes any `{{ variable }}` tokens.
3. **Markdown Rendering**: Markdown processors use the same registered variables to render page content.
4. **Result**: Both your site footer and markdown pages reflect the exact same resolved values with zero manual duplication.

## External Variable Files

For large projects or shared team data, you can point `"variables"` to an external JSON or JavaScript file:

### External JSON File

```json
{
  "variables": "./data/variables.json"
}
```

Where `./data/variables.json` contains:

```json
{
  "auth": {
    "oauthUrl": "https://auth.acme.com/oauth2/token"
  }
}
```

### Dynamic JavaScript File

You can also use a JavaScript module to compute variables dynamically (e.g. fetching API schemas or reading external files):

```json
{
  "variables": "./data/variables.js"
}
```

Where `./data/variables.js` exports an object or function:

```javascript
module.exports = {
  dynamicTimestamp: new Date().toLocaleDateString(),
  sdkVersion: require('./package.json').version
};
```