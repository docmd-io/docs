---
title: "Programmatic API"
description: "Use docmd inside your own Node.js scripts."
---

# Programmatic API

`docmd` exports its core build engine, allowing you to trigger builds from your own scripts or task runners.

## Usage

```javascript
const { build, buildLive } = require('@docmd/core');

async function main() {
  // 1. Build the Static Site
  await build('./docmd.config.js', { 
    isDev: false, 
    preserve: true 
  });

  // 2. Build the Live Editor Bundle
  await buildLive();
}

main();
```