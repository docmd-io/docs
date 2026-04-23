---
title: "How to Structure Documentation for LLMs and AI Agents"
description: "A comprehensive guide on structure for llms."
---

## Problem

Human readers rely on visual cues, sidebars, and inferred context to navigate documentation. AI agents and LLMs, however, consume raw text. When documentation lacks semantic structure, AI models struggle to map relationships, leading to poor reasoning and inaccurate coding suggestions.

## Why it matters

If your documentation isn't optimized for LLMs, developers using GitHub Copilot, Cursor, or ChatGPT to build against your system will receive hallucinations. This directly damages the developer experience of your tool, as they will blame your framework for the AI's failure.

## Approach

Transition from "visual formatting" to "semantic structuring." Use Markdown features like headers, code block language tags, and explicit paragraph declarations mathematically. `docmd` natively processes this semantic structure into highly readable `llms-full.txt` streams.

## Implementation

### 1. Semantic Header Hierarchy
Do not skip header levels for visual effect. 
*   `#` is the page title.
*   `##` is a major concept.
*   `###` is a detail of that concept.

*Bad for AI:*
```markdown
# Installation
### Step 1
```

*Good for AI:*
```markdown
# Installation
## Step 1: Environment Setup
```

### 2. Descriptive Alternative Text
If an image provides crucial architectural context, an LLM cannot see it. You must describe the architecture in the alt text or an adjacent paragraph.

```markdown
![System Architecture Diagram: The frontend React app communicates with the Go backend via GraphQL, which queries a PostgreSQL database.](../../assets/favicon.ico)
```

### 3. Explicit Code Block Languages
Always label fenced code blocks. If it's a JSON configuration, mark it `json`. If it's raw text output, mark it `text`. LLMs use this to parse the AST.

```javascript
// docmd.config.js
export default defineConfig({
  plugins: { llms: {} }
});
```

## Trade-offs

Semantic rigor requires authors to be disciplined. You can no longer use a generic quote block `> ` just to indent text, as the AI will interpret it semantically as a blockquote. You must use `docmd` containers like `::: callout` to provide both visual flair and semantic meaning.
