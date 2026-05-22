---
title: "Task vs. Concept"
description: "How to apply the Diátaxis framework to separate 'How-To' guides from conceptual explanations for a more effective documentation structure."
---

## Problem

A frequent mistake in technical writing is mixing the *Why* something works with the *How* to do it. A tutorial on "Configuring SSO", for example, can become bogged down with pages explaining the SAML protocol's history. This distracts the user from their immediate goal of getting the feature running.

## Why it matters

User intent varies significantly. An engineer fixing a production issue at 2 AM needs specific, actionable steps - not architectural philosophy. Conversely, a technical leader evaluating your platform needs to understand the underlying logic before committing. Separating these concerns ensures both personas find the information they need without unnecessary friction.

## Approach

Adopt the **Diátaxis framework**, which categorises documentation into four quadrants: Tutorials, How-to Guides, Explanation (Concepts), and Technical Reference. For this guide, we focus on the critical separation between **Task-oriented content** (actionable steps) and **Concept-oriented content** (deeper understanding).

## Implementation

### 1. The Task-Oriented Guide (How-To)

Focus entirely on a specific, narrow objective. Strip out lengthy theoretical explanations and focus on the minimum steps required to achieve the goal. Use the [Steps Container](../../content/containers/steps.md) to provide a clear, unambiguous path forward.

*   **Title Example**: "How to Configure Webhooks"
*   **Structure**: 
    *   Prerequisites
    *   Direct, actionable instructions
    *   Verification steps (how to know it worked)

### 2. The Concept-Oriented Guide (Explanation)

Focus on the "Big Picture", including architecture, design philosophy, and the "why" behind specific decisions. Avoid giving direct instructions or commands in these sections.

*   **Title Example**: "Understanding Webhook Delivery Architecture"
*   **Structure**:
    *   High-level architecture diagrams
    *   Retry logic and reliability philosophy
    *   Security considerations

### 3. Effective Cross-Referencing

Instead of merging the two types of content, use docmd's linking tools to provide a bridge for users who need more context or are ready to implement.

*   **In a How-To guide**: "For a deeper explore our retry logic, see [Webhook Architecture](../../guides/performance-delivery/caching-strategies.md)."
*   **In a Conceptual guide**: "Ready to get started? Follow our [Webhook Configuration Guide](../../guides/integrations/alongside-other-tools.md)."

## Trade-offs

Separating tasks and concepts increases the number of pages in your navigation and requires rigorous cross-linking. However, this modular structure significantly improves the long-term maintainability, searchability, and overall professionalism of your documentation suite.