---
title: "Recipe: Optimizing for AI Agents"
description: "Engineer your documentation for maximum ingestibility by LLMs and AI Agents."
---

`docmd` is architected as an "AI-First" documentation engine. By adhering to these structural best practices, you ensure that LLMs (such as ChatGPT, Claude, and GitHub Copilot) can parse your project's logic and architecture with surgical precision.

## 1. Enable the LLM Plugin

The baseline for AI optimization is the native `llms` plugin. It generates structured context files specifically designed for model ingestion.

```javascript
// docmd.config.js
export default {
  plugins: {
    llms: { 
      fullContext: true // Generates the comprehensive llms-full.txt
    }
  }
}
```

## 2. Semantic Heading Integrity

AI models utilize H-tags to build a hierarchical map of internal technical relationships.

*   **Logical Descent**: Never skip heading levels (always go H1 → H2 → H3).
*   **Technical Density**: Use descriptive headings. Instead of "Auth," use "Implementing OAuth2 Password Grants."
*   **The H1 Singular**: Ensure your Markdown frontmatter `title` is descriptive; `docmd` utilizes this as the primary semantic entry point.

## 3. Lexical Code Metadata

Always explicitly specify the language identifier for fenced code blocks. This allows the AI's internal tokenizer to apply the correct grammar rules during context retrieval.

````markdown
```typescript
// Optimized entry point
const docmd = new Engine();
```
````

## 4. Leveraging the Context Pipeline

The `llms-full.txt` file is a high-fidelity, concatenated stream of your entire static site.

*   **Prompt Engineering**: Direct your AI: *"Use the semantic structure in /llms.txt and the comprehensive technical content in /llms-full.txt to analyze this codebase."*
*   **Context Control**: Use `llms: false` in specific page frontmatter to exclude sensitive or internal-only documentation from the public AI context stream.

## 5. High-Fidelity Alt-Text

While vision-capable models (Multimodal LLMs) are advancing, descriptive text remains the most reliable signal for reasoning engines. Comprehensive `alt` text for diagrams and screenshots ensures that the agent understands the visual logic even during text-only processing phases.