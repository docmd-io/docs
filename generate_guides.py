import os
import json

base_dir = '/Users/mac/Workspace/GitHub/docmd-io/docs/docs'

guide_structure = [
  {
    "group": "Scaling & Architecture",
    "dir": "scaling-architecture",
    "navLabel": "Scaling & Architecture",
    "items": [
      { "title": "Scaling Documentation to 1000+ Pages with docmd", "navLabel": "1000+ Pages", "slug": "scaling" },
      { "title": "Designing a Scalable Folder Structure for Large Documentation Projects", "navLabel": "Folder Structure", "slug": "scalable-folder-structure" },
      { "title": "Managing Multi-Version Documentation (v1, v2, Legacy) in docmd", "navLabel": "Multi-Version Docs", "slug": "multi-version-documentation" },
      { "title": "Handling Breaking Changes and Deprecations in Versioned Docs", "navLabel": "Breaking Changes", "slug": "breaking-changes-deprecations" },
      { "title": "Structuring Documentation for Multi-Team Collaboration", "navLabel": "Team Collaboration", "slug": "multi-team-collaboration" },
      { "title": "Organising Large Documentation Repositories Without Losing Navigation Clarity", "navLabel": "Large Repositories", "slug": "organising-large-repositories" }
    ]
  },
  {
    "group": "AI & LLM Optimisation",
    "dir": "ai-optimisation",
    "navLabel": "AI & LLMs",
    "items": [
      { "title": "How to Structure Documentation for LLMs and AI Agents", "navLabel": "Structure for LLMs", "slug": "structure-for-llms" },
      { "title": "Generating AI-Ready Documentation with docmd (llms.txt and Beyond)", "navLabel": "AI-Ready Output", "slug": "generating-ai-ready-docs" },
      { "title": "Writing Documentation That Minimises AI Hallucinations", "navLabel": "Minimise Hallucinations", "slug": "minimising-ai-hallucinations" },
      { "title": "Designing Documentation for Semantic Search and Retrieval Systems", "navLabel": "Semantic Search", "slug": "semantic-search-design" },
      { "title": "Creating Deterministic, Chunkable Documentation for AI Consumption", "navLabel": "Chunkable Content", "slug": "deterministic-chunkable-docs" },
      { "title": "Best Practices for Linking and Context Preservation in AI-Friendly Docs", "navLabel": "Context Preservation", "slug": "context-preservation" }
    ]
  },
  {
    "group": "Search",
    "dir": "search",
    "navLabel": "Search",
    "items": [
      { "title": "Adding Offline Semantic Search to Your Docs with docmd-search", "navLabel": "Offline Semantic Search", "slug": "offline-semantic-search" },
      { "title": "Improving Search Relevance with Structured Markdown", "navLabel": "Relevance & Structure", "slug": "improving-search-relevance" },
      { "title": "Designing Documentation for Fast and Accurate Search Results", "navLabel": "Speed & Accuracy", "slug": "fast-accurate-search" },
      { "title": "Comparing Keyword Search vs Semantic Search in Documentation Systems", "navLabel": "Keyword vs Semantic", "slug": "keyword-vs-semantic" },
      { "title": "Optimising Documentation Content for Local-First Search Engines", "navLabel": "Local-First Opt", "slug": "local-first-search" }
    ]
  },
  {
    "group": "Performance & Delivery",
    "dir": "performance-delivery",
    "navLabel": "Performance",
    "items": [
      { "title": "Optimising Documentation for Sub-100ms Navigation Speeds", "navLabel": "Sub-100ms Navigation", "slug": "sub-100ms-navigation" },
      { "title": "Deploying docmd Documentation on a CDN or Edge Network", "navLabel": "CDN & Edge Deploy", "slug": "deploying-cdn-edge" },
      { "title": "Reducing JavaScript Payload for Faster Documentation Sites", "navLabel": "JS Payload Reduction", "slug": "reducing-javascript-payload" },
      { "title": "Building Lightweight Documentation That Performs on Low-End Devices", "navLabel": "Low-End Devices", "slug": "low-end-devices" },
      { "title": "Caching Strategies for Static Documentation Sites", "navLabel": "Caching Strategies", "slug": "caching-strategies" }
    ]
  },
  {
    "group": "Workflows & Teams",
    "dir": "workflows-teams",
    "navLabel": "Workflows & Teams",
    "items": [
      { "title": "Setting Up a Documentation Workflow for Teams Using docmd", "navLabel": "Workflow Setup", "slug": "setting-up-workflow" },
      { "title": "Using Git-Based Workflows for Documentation Contributions", "navLabel": "Git-Based Flows", "slug": "git-based-workflows" },
      { "title": "Previewing Documentation Changes Before Deployment", "navLabel": "Preview Changes", "slug": "previewing-changes" },
      { "title": "Maintaining Consistency Across Large Documentation Teams", "navLabel": "Consistency at Scale", "slug": "maintaining-consistency" },
      { "title": "Versioning and Release Workflows for Documentation Systems", "navLabel": "Release Workflows", "slug": "versioning-release-workflows" }
    ]
  },
  {
    "group": "Integrations",
    "dir": "integrations",
    "navLabel": "Integrations",
    "items": [
      { "title": "Generating API Documentation from OpenAPI with docmd", "navLabel": "OpenAPI Generation", "slug": "openapi-generation" },
      { "title": "Integrating docmd with GitHub Actions for CI/CD", "navLabel": "GitHub Actions", "slug": "github-actions-cicd" },
      { "title": "Using docmd with Existing Markdown Repositories", "navLabel": "Existing Repos", "slug": "existing-markdown-repos" },
      { "title": "Migrating Documentation from Docusaurus to docmd", "navLabel": "from Docusaurus", "slug": "migrating-docusaurus" },
      { "title": "Migrating Documentation from MkDocs to docmd", "navLabel": "from MkDocs", "slug": "migrating-mkdocs" },
      { "title": "Using docmd Alongside Other Documentation Tools", "navLabel": "Parallel Tools", "slug": "alongside-other-tools" }
    ]
  },
  {
    "group": "Content & UX",
    "dir": "content-ux",
    "navLabel": "Content & UX",
    "items": [
      { "title": "Writing Technical Documentation That Scales with Your Product", "navLabel": "Scalable Content", "slug": "scalable-technical-writing" },
      { "title": "Designing Navigation That Works for Large Documentation Sites", "navLabel": "Large Site Nav", "slug": "navigation-large-sites" },
      { "title": "Improving Readability and Information Hierarchy in Documentation", "navLabel": "Readability & Hierarchy", "slug": "improving-readability" },
      { "title": "Creating Task-Oriented vs Concept-Oriented Documentation", "navLabel": "Task vs Concept", "slug": "task-vs-concept" },
      { "title": "Avoiding Common Documentation Anti-Patterns", "navLabel": "Anti-Patterns", "slug": "avoiding-anti-patterns" }
    ]
  },
  {
    "group": "Customisation",
    "dir": "customisation",
    "navLabel": "Customisation",
    "items": [
      { "title": "Designing Custom Documentation Landing Pages with docmd", "navLabel": "Landing Pages", "slug": "custom-landing-pages" },
      { "title": "Adding Custom Fonts and Branding to Your Documentation", "navLabel": "Fonts & Branding", "slug": "custom-fonts-branding" },
      { "title": "Implementing Custom Favicons and Metadata", "navLabel": "Favicons & Meta", "slug": "custom-favicons-metadata" },
      { "title": "Extending docmd with Custom Plugins", "navLabel": "Custom Plugins", "slug": "extending-custom-plugins" }
    ]
  }
]

def scaffold_files():
    en_guides_dir = os.path.join(base_dir, 'en', 'guides')

    for category in guide_structure:
        dir_path = os.path.join(en_guides_dir, category['dir'])
        os.makedirs(dir_path, exist_ok=True)
        
        for item in category['items']:
            file_path = os.path.join(dir_path, item['slug'] + '.md')
            content = f"""---
title: "{item['title']}"
description: "A comprehensive guide on {item['navLabel'].lower()}."
---

## Problem

Explain the core challenge or friction point that users face when dealing with this topic. What is the fundamental issue?

## Why it matters

Detail the impact of leaving this problem unsolved. How does it affect the team, the project, or the end-user negatively?

## Approach

Discuss the high-level strategy and concepts used to tackle the problem within the context of docmd.

## Implementation

Provide concrete, actionable solutions.

```javascript
// Example implementation snippet
export default defineConfig({{
  // configuration details
}});
```

## Trade-offs

Acknowledge any limitations, costs, or edge cases that come with this approach to ensure users have a balanced perspective.
"""
            with open(file_path, 'w') as f:
                f.write(content)
    print("Created 42 guide files in docs/en/guides/")

def generate_nav_block(lang_label):
    block = {
        "title": lang_label,
        "icon": "book-open",
        "collapsible": True,
        "children": []
    }

    for category in guide_structure:
        target_children = [
            {
                "title": item['navLabel'],
                "path": f"/guides/{category['dir']}/{item['slug']}"
            } for item in category['items']
        ]

        block['children'].append({
            "title": category['navLabel'],
            "collapsible": True,
            "children": target_children
        })

    return block

def process_nav(lang, top_label):
    path = os.path.join(base_dir, lang, 'navigation.json')
    if not os.path.exists(path):
        return
        
    with open(path, 'r') as f:
        nav = json.load(f)
        
    old_names = ["Recipes", "Rezepte", "秘籍", "Guides", "Leitfäden", "指南"]
    idx = -1
    for i, item in enumerate(nav):
        if item.get("title") in old_names:
            idx = i
            break
            
    new_block = generate_nav_block(top_label)

    if idx != -1:
        nav[idx] = new_block
    else:
        nav.append(new_block)

    with open(path, 'w') as f:
        json.dump(nav, f, indent=2, ensure_ascii=False)
    print(f"Updated navigation for {lang}")

    import shutil
    old_recipes_dir = os.path.join(base_dir, lang, 'recipes')
    if os.path.exists(old_recipes_dir):
        shutil.rmtree(old_recipes_dir)
        print(f"Deleted recipes directory for {lang}")

def run():
    scaffold_files()
    process_nav('en', 'Guides')
    process_nav('de', 'Leitfäden')
    process_nav('zh', '指南')

if __name__ == "__main__":
    run()

