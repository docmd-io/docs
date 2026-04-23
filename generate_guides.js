const fs = require('fs');
const path = require('path');

const baseDir = '/Users/mac/Workspace/GitHub/docmd-io/docs/docs';

// The categories and guides
const guideStructure = [
  {
    group: "Scaling & Architecture",
    dir: "scaling-architecture",
    navLabel: "Scaling & Architecture",
    items: [
      { title: "Scaling Documentation to 1000+ Pages with docmd", navLabel: "1000+ Pages", slug: "scaling" },
      { title: "Designing a Scalable Folder Structure for Large Documentation Projects", navLabel: "Folder Structure", slug: "scalable-folder-structure" },
      { title: "Managing Multi-Version Documentation (v1, v2, Legacy) in docmd", navLabel: "Multi-Version Docs", slug: "multi-version-documentation" },
      { title: "Handling Breaking Changes and Deprecations in Versioned Docs", navLabel: "Breaking Changes", slug: "breaking-changes-deprecations" },
      { title: "Structuring Documentation for Multi-Team Collaboration", navLabel: "Team Collaboration", slug: "multi-team-collaboration" },
      { title: "Organising Large Documentation Repositories Without Losing Navigation Clarity", navLabel: "Large Repositories", slug: "organising-large-repositories" }
    ]
  },
  {
    group: "AI & LLM Optimisation",
    dir: "ai-optimisation",
    navLabel: "AI & LLMs",
    items: [
      { title: "How to Structure Documentation for LLMs and AI Agents", navLabel: "Structure for LLMs", slug: "structure-for-llms" },
      { title: "Generating AI-Ready Documentation with docmd (llms.txt and Beyond)", navLabel: "AI-Ready Output", slug: "generating-ai-ready-docs" },
      { title: "Writing Documentation That Minimises AI Hallucinations", navLabel: "Minimise Hallucinations", slug: "minimising-ai-hallucinations" },
      { title: "Designing Documentation for Semantic Search and Retrieval Systems", navLabel: "Semantic Search", slug: "semantic-search-design" },
      { title: "Creating Deterministic, Chunkable Documentation for AI Consumption", navLabel: "Chunkable Content", slug: "deterministic-chunkable-docs" },
      { title: "Best Practices for Linking and Context Preservation in AI-Friendly Docs", navLabel: "Context Preservation", slug: "context-preservation" }
    ]
  },
  {
    group: "Search",
    dir: "search",
    navLabel: "Search",
    items: [
      { title: "Adding Offline Semantic Search to Your Docs with docmd-search", navLabel: "Offline Semantic Search", slug: "offline-semantic-search" },
      { title: "Improving Search Relevance with Structured Markdown", navLabel: "Relevance & Structure", slug: "improving-search-relevance" },
      { title: "Designing Documentation for Fast and Accurate Search Results", navLabel: "Speed & Accuracy", slug: "fast-accurate-search" },
      { title: "Comparing Keyword Search vs Semantic Search in Documentation Systems", navLabel: "Keyword vs Semantic", slug: "keyword-vs-semantic" },
      { title: "Optimising Documentation Content for Local-First Search Engines", navLabel: "Local-First Opt", slug: "local-first-search" }
    ]
  },
  {
    group: "Performance & Delivery",
    dir: "performance-delivery",
    navLabel: "Performance",
    items: [
      { title: "Optimising Documentation for Sub-100ms Navigation Speeds", navLabel: "Sub-100ms Navigation", slug: "sub-100ms-navigation" },
      { title: "Deploying docmd Documentation on a CDN or Edge Network", navLabel: "CDN & Edge Deploy", slug: "deploying-cdn-edge" },
      { title: "Reducing JavaScript Payload for Faster Documentation Sites", navLabel: "JS Payload Reduction", slug: "reducing-javascript-payload" },
      { title: "Building Lightweight Documentation That Performs on Low-End Devices", navLabel: "Low-End Devices", slug: "low-end-devices" },
      { title: "Caching Strategies for Static Documentation Sites", navLabel: "Caching Strategies", slug: "caching-strategies" }
    ]
  },
  {
    group: "Workflows & Teams",
    dir: "workflows-teams",
    navLabel: "Workflows & Teams",
    items: [
      { title: "Setting Up a Documentation Workflow for Teams Using docmd", navLabel: "Workflow Setup", slug: "setting-up-workflow" },
      { title: "Using Git-Based Workflows for Documentation Contributions", navLabel: "Git-Based Flows", slug: "git-based-workflows" },
      { title: "Previewing Documentation Changes Before Deployment", navLabel: "Preview Changes", slug: "previewing-changes" },
      { title: "Maintaining Consistency Across Large Documentation Teams", navLabel: "Consistency at Scale", slug: "maintaining-consistency" },
      { title: "Versioning and Release Workflows for Documentation Systems", navLabel: "Release Workflows", slug: "versioning-release-workflows" }
    ]
  },
  {
    group: "Integrations",
    dir: "integrations",
    navLabel: "Integrations",
    items: [
      { title: "Generating API Documentation from OpenAPI with docmd", navLabel: "OpenAPI Generation", slug: "openapi-generation" },
      { title: "Integrating docmd with GitHub Actions for CI/CD", navLabel: "GitHub Actions", slug: "github-actions-cicd" },
      { title: "Using docmd with Existing Markdown Repositories", navLabel: "Existing Repos", slug: "existing-markdown-repos" },
      { title: "Migrating Documentation from Docusaurus to docmd", navLabel: "from Docusaurus", slug: "migrating-docusaurus" },
      { title: "Migrating Documentation from MkDocs to docmd", navLabel: "from MkDocs", slug: "migrating-mkdocs" },
      { title: "Using docmd Alongside Other Documentation Tools", navLabel: "Parallel Tools", slug: "alongside-other-tools" }
    ]
  },
  {
    group: "Content & UX",
    dir: "content-ux",
    navLabel: "Content & UX",
    items: [
      { title: "Writing Technical Documentation That Scales with Your Product", navLabel: "Scalable Content", slug: "scalable-technical-writing" },
      { title: "Designing Navigation That Works for Large Documentation Sites", navLabel: "Large Site Nav", slug: "navigation-large-sites" },
      { title: "Improving Readability and Information Hierarchy in Documentation", navLabel: "Readability & Hierarchy", slug: "improving-readability" },
      { title: "Creating Task-Oriented vs Concept-Oriented Documentation", navLabel: "Task vs Concept", slug: "task-vs-concept" },
      { title: "Avoiding Common Documentation Anti-Patterns", navLabel: "Anti-Patterns", slug: "avoiding-anti-patterns" }
    ]
  },
  {
    group: "Customisation",
    dir: "customisation",
    navLabel: "Customisation",
    items: [
      { title: "Designing Custom Documentation Landing Pages with docmd", navLabel: "Landing Pages", slug: "custom-landing-pages" },
      { title: "Adding Custom Fonts and Branding to Your Documentation", navLabel: "Fonts & Branding", slug: "custom-fonts-branding" },
      { title: "Implementing Custom Favicons and Metadata", navLabel: "Favicons & Meta", slug: "custom-favicons-metadata" },
      { title: "Extending docmd with Custom Plugins", navLabel: "Custom Plugins", slug: "extending-custom-plugins" }
    ]
  }
];

// Helper to write files
function scaffoldFiles() {
  const enGuidesDir = path.join(baseDir, 'en', 'guides');

  for (const category of guideStructure) {
    const dirPath = path.join(enGuidesDir, category.dir);
    fs.mkdirSync(dirPath, { recursive: true });
    
    for (const item of category.items) {
      const filePath = path.join(dirPath, item.slug + '.md');
      
      const content = `---
title: "${item.title}"
description: "A comprehensive guide on ${item.navLabel.toLowerCase()}."
---

## Problem

Explain the core challenge or friction point that users face when dealing with this topic. What is the fundamental issue?

## Why it matters

Detail the impact of leaving this problem unsolved. How does it affect the team, the project, or the end-user negatively?

## Approach

Discuss the high-level strategy and concepts used to tackle the problem within the context of docmd.

## Implementation

Provide concrete, actionable solutions.

\`\`\`javascript
// Example implementation snippet
export default defineConfig({
  // configuration details
});
\`\`\`

## Trade-offs

Acknowledge any limitations, costs, or edge cases that come with this approach to ensure users have a balanced perspective.
`;
      fs.writeFileSync(filePath, content);
    }
  }
  console.log("Created 42 guide files in docs/en/guides/");
}

// Generate the new nav block
function generateNavBlock(langLabel) {
  const block = {
    title: langLabel,
    icon: "book-open",
    collapsible: true,
    children: []
  };

  for (const category of guideStructure) {
    const targetChildren = category.items.map(item => ({
      title: item.navLabel,
      path: `/guides/${category.dir}/${item.slug}`
    }));

    block.children.push({
      title: category.navLabel,
      collapsible: true,
      children: targetChildren
    });
  }

  return block;
}

// Process a language's navigation.json
function processNav(lang, titleReplaces, topLabel) {
  const _path = path.join(baseDir, lang, 'navigation.json');
  if (!fs.existsSync(_path)) return;
  
  let nav = JSON.parse(fs.readFileSync(_path, 'utf8'));
  
  // Find the old recipes block
  const oldNames = ["Recipes", "Rezepte", "秘籍", "Guides", "Leitfäden", "指南"];
  const idx = nav.findIndex(n => oldNames.includes(n.title));
  
  const newBlock = generateNavBlock(topLabel);

  if (idx !== -1) {
    nav[idx] = newBlock; 
  } else {
    nav.push(newBlock);
  }

  fs.writeFileSync(_path, JSON.stringify(nav, null, 2));
  console.log(`Updated navigation for ${lang}`);
  
  // Delete the old recipes folder for this lang if it exists
  const oldRecipesDir = path.join(baseDir, lang, 'recipes');
  if (fs.existsSync(oldRecipesDir)) {
    fs.rmSync(oldRecipesDir, { recursive: true, force: true });
    console.log(`Deleted recipes directory for ${lang}`);
  }
}

function run() {
  scaffoldFiles();

  processNav('en', 'Recipes', 'Guides');
  processNav('de', 'Rezepte', 'Leitfäden');
  processNav('zh', '秘籍', '指南');
}

run();

