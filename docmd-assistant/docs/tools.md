---
title: Tool Execution System
description: Registering and executing custom tools with docmd-assistant.
---

`docmd-assistant` features a client-side and server-side tool execution system. Tools allow the AI Assistant to query external databases, perform full-text searches, navigate documentation pages, or execute custom logic in your application.

## Defining a Custom Tool

A tool definition requires a `name`, `description`, structured `parameters` schema, and an `execute` (or `handler`) function:

```typescript
import { AssistantTool } from 'docmd-assistant';

const weatherTool: AssistantTool = {
  name: 'get_weather_forecast',
  description: 'Retrieve current weather forecast for a specified city.',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'Name of the city' },
      unit: { type: 'string', enum: ['celsius', 'fahrenheit'], description: 'Temperature unit' }
    },
    required: ['city']
  },
  execute: async ({ city, unit = 'celsius' }) => {
    // Custom API call or logic
    return { city, temperature: 22, unit, condition: 'Sunny' };
  }
};
```

## Registering Tools

Register tools during initialisation or dynamically via `registerTool()`:

```typescript
// During initialisation
const assistant = new DocmdAssistantEngine({
  tools: [weatherTool]
});

// Dynamically at runtime
assistant.registerTool({
  name: 'open_modal',
  description: 'Open a user interface modal dialog',
  parameters: {
    type: 'object',
    properties: {
      modalId: { type: 'string' }
    },
    required: ['modalId']
  },
  execute: async ({ modalId }) => {
    document.getElementById(modalId)?.classList.add('visible');
    return { success: true };
  }
});
```

## Standard Documentation Tools

`docmd-assistant` exports built-in helpers for common documentation interactions:

```typescript
import { createStandardTools } from 'docmd-assistant';

const standardTools = createStandardTools(async (query) => {
  // Custom search index callback
  return [
    { title: 'Routing Setup', path: '/docs/routing', snippet: 'Configure routes...' }
  ];
});

for (const tool of standardTools) {
  assistant.registerTool(tool);
}
```

Standard tools include:
- `search_documentation`: Performs search queries across document indices or DOM section headers.
- `navigate_to_page`: Navigates user browser to specific URLs or anchor hashes (`#section`).
- `copy_code_snippet`: Copies code snippets directly to system clipboard.