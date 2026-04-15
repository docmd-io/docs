---
title: "docmd : Bespoke No-Style Page Demo"
description: "A functional demonstration of the noStyle architectural feature."
noStyle: true
components:
  meta: true
  favicon: true
  css: true
  theme: true
  scripts: true
  mainScripts: true
copyCode: true
customHead: |
  <style>
    body {
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      background: var(--bg-primary);
      color: var(--text-primary);
    }
    .demo-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 80px 20px;
    }
    .demo-hero {
      text-align: center;
      margin-bottom: 60px;
    }
    .demo-hero h1 {
      font-size: 3.5rem;
      margin-bottom: 20px;
      color: var(--brand-primary, #4a6cf7);
    }
    .demo-hero p {
      font-size: 1.25rem;
      color: var(--text-secondary);
    }
    .demo-card {
      background: var(--bg-secondary, #f8f9fa);
      padding: 40px;
      border-radius: 16px;
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }
    .demo-button {
      display: inline-block;
      padding: 14px 28px;
      background-color: var(--brand-primary, #4a6cf7);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 30px;
      transition: filter 0.2s ease;
    }
    .demo-button:hover {
      filter: brightness(1.1);
    }
  </style>
---

<div class="demo-container">
  <div class="demo-hero">
    <h1>Bespoke Page Architecture</h1>
    <p>Demonstrating the absolute layout control enabled via <code>noStyle: true</code>.</p>
  </div>
  
  <div class="demo-card">
    <h2>Logical Foundation</h2>
    <p>
      This demonstration utilises the <code>noStyle: true</code> frontmatter directive to bypass the global documentation layout (Sidebar, Header, and TOC). This provides a "Zero-Friction" canvas for creating marketing landing pages or custom product dashboards.
    </p>
    
    <h3>Enabled System Components</h3>
    <p>When in No-Style mode, you explicitly opt-in to the documentation engine's core features:</p>
    
    <ul>
      <li><strong>SEO Meta Engine</strong>: Structured tags and social graph data are retained.</li>
      <li><strong>Project Branding</strong>: Global favicon injection remains active.</li>
      <li><strong>Foundational Typography</strong>: The processed <code>docmd-main.css</code> provides base styling.</li>
      <li><strong>Theme Synchronization</strong>: Light/Dark mode state is fully preserved.</li>
      <li><strong>Interactive Capabilities</strong>: The SPA router and component logic remain available.</li>
    </ul>
    
    <h3>Technical Implementation</h3>
    <p>
      The layout for this page is authored using standard HTML wrappers and scoped CSS defined within the <code>customHead</code> frontmatter field. This ensures zero CSS leakage to the rest of the documentation site.
    </p>
    
    <a href="/content/no-style-pages/" class="demo-button">Analyze the Implementation Guide →</a>
  </div>
</div>