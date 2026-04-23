---
title: "Creating Task-Oriented vs Concept-Oriented Documentation"
description: "A comprehensive guide on task vs concept."
---

## Problem

A common mistake is mixing *Why* something works with *How* to do it. A tutorial on "Deploying to AWS" becomes bogged down with 5 paragraphs explaining the philosophical history of AWS IAM roles.

## Why it matters

When an engineer is trying to fix a broken pipeline at 2 AM, they do not want to read philosophy. They want the structural CLI commands. If the page mixes the two, both the academic reader and the panicked engineer are frustrated.

## Approach

Physically split docs according to the Diátaxis framework. Separate "How-To Guides" (Task-oriented) from "Explanation" (Concept-oriented).

## Implementation

### 1. The Task-Oriented Guide (How-To)
Focus entirely on the objective. Strip out explanations.

**Title**: "How to Rotate IAM Keys"
- Step 1: Open the CLI.
- Step 2: Run `aws iam create-access-key`.
- Step 3: Store securely.

### 2. The Concept-Oriented Guide (Explanation)
Focus entirely on the architecture. Do not instruct the user to execute commands.

**Title**: "Understanding Identity Management"
- Section 1: The Principle of Least Privilege.
- Section 2: How Keys Interface with Roles.
- Section 3: The Rotation Lifecycle.

### 3. Link Between Them
Instead of mixing them, use docmd's robust linking tools to bridge the gap.

*In the How-To guide:*
> For a deeper understanding of why 90-day rotation is enforced, read [Configuration System](../../configuration/general.md).

## Trade-offs

Splitting tasks and concepts effectively doubles the number of files in your repository. It requires rigorous cross-linking discipline to ensure that a user reading a conceptual theoretical doc can easily find the practical guide to implement the theory.
