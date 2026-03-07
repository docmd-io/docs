---
title: "Recipe: Optimizing for AI Agents"
description: "How to structure your docmd site to be perfectly ingestible by LLMs and AI Agents."
---

`docmd` is uniquely positioned as an "AI-Ready" documentation engine. By following these best practices, you ensure that AI models (like ChatGPT, Claude, and GitHub Copilot) can understand and support your project with high accuracy.

## 1. Enable the LLM Plugin
The first step is enabling the native LLM plugin. This generates structured context files that AI agents crave.

```javascript
// docmd.config.js
module.exports = {
  plugins: {
    llms: { 
      fullContext: true // Generates llms-full.txt (highly recommended)
    }
  }
}
```

## 2. Semantic Heading Hierarchy
AI models use headings to build a mental map of your documentation.
*   **Don't skip levels**: Always go H1 → H2 → H3.
*   **Be Descriptive**: Instead of "Setup," use "Installing CLI via NPM."
*   **One H1 Per Page**: Ensure your frontmatter `title` is descriptive, as `docmd` uses it as the primary H1.

## 3. Code Block Metadata
When providing code examples, always specify the language. This helps the LLM parser apply the correct syntax rules during context retrieval.

````markdown
```typescript
// Good: Language is specified
const docmd = new Engine();
```
````

## 4. Using the `llms-full.txt` Pipeline
The `llms-full.txt` file is a concatenated version of your entire documentation. 
*   **Prompting Tip**: Tell your AI: *"Use the structure in /llms.txt and the full content in /llms-full.txt to answer my questions about this project."*
*   **Customization**: Use `llms: false` in frontmatter to exclude private or internal-only pages from this public AI context file.

## 5. Descriptive Image Alt-Text
While AI is getting better at vision, text is still the most reliable way to provide context. descriptive `alt` text in your images ensures that even if the AI doesn't "see" the image, it understands its purpose in the build.
