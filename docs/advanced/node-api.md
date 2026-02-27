---
title: "Programmatic API"
description: "Programmatic API for building docmd sites from your own scripts."
---

# Programmatic API

You can use `docmd` programmatically inside your own Node.js scripts or task runners (Gulp, Grunt, custom CI).

## Installation

```bash
npm install @docmd/core
```

## Usage

```javascript
const { build, buildLive } = require('@docmd/core');

async function generateDocs() {
  try {
    console.log('Starting build...');

    // 1. Build the Static Site
    await build('./docmd.config.js', { 
      isDev: false,      // true = enables hot-reload logic (internal)
      offline: false     // true = optimize links for file:// access
    });

    console.log('Static site generated in ./site');

    // 2. Build the Live Editor (Optional)
    // Generates the browser-based editor bundle in ./dist
    await buildLive({
        serve: false // true = starts local server, false = build only
    });

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

generateDocs();
```