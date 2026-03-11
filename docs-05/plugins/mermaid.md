---
title: "Mermaid Diagrams"
description: "Native support for Mermaid.js. Create flowcharts, sequence diagrams, and pie charts directly in your Markdown files."
---

`docmd` includes native, zero-config support for [Mermaid.js](https://mermaid.js.org/). You can create professional diagrams using simple text-based syntax without leaving your Markdown file.

## Why use Mermaid in docmd?

*   **Zero Scripting**: No need to include external scripts. `docmd` detects the usage and injects the rendering engine automatically.
*   **Theme Aware**: Diagrams automatically shift colors between **Light** and **Dark** modes to match your site's theme.
*   **Lazy Loading**: For optimum page speed, diagrams are only initialized once they enter the viewport.

## Examples

### Flowchart

Flowcharts are used to represent workflows or processes. They show the steps as boxes of various kinds, and their order by connecting them with arrows.

````markdown
```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix the issue]
    E --> B
    C --> F[Deploy]
```
````

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix the issue]
    E --> B
    C --> F[Deploy]
```

### Sequence Diagram

Sequence diagrams show how processes operate with one another and in what order. They capture the interaction between objects in the context of a collaboration.

````markdown
```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database
    
    User->>Browser: Enter URL
    Browser->>Server: HTTP Request
    Server->>Database: Query Data
    Database-->>Server: Return Results
    Server-->>Browser: HTTP Response
    Browser-->>User: Display Page
```
````

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database
    
    User->>Browser: Enter URL
    Browser->>Server: HTTP Request
    Server->>Database: Query Data
    Database-->>Server: Return Results
    Server-->>Browser: HTTP Response
    Browser-->>User: Display Page
```

## Pie Chart

Pie charts are circular statistical graphics divided into slices to illustrate numerical proportions.

````markdown
```mermaid
pie title Browser Usage Statistics
    "Chrome" : 64.5
    "Safari" : 18.2
    "Firefox" : 8.5
    "Edge" : 4.8
    "Other" : 4.0
```
````

```mermaid
pie title Browser Usage Statistics
    "Chrome" : 64.5
    "Safari" : 18.2
    "Firefox" : 8.5
    "Edge" : 4.8
    "Other" : 4.0
```

## Git Graph

Git graphs visualize Git branching and merging operations, making it easier to understand version control workflows.

````markdown
```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature
    commit
```
````

```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature
    commit
```

## XY Chart

XY charts display data as a series of points on a coordinate plane, useful for showing correlations and trends.

**Code:**

````markdown
```mermaid
xychart-beta
    title "Sales Revenue by Quarter"
    x-axis [Q1, Q2, Q3, Q4]
    y-axis "Revenue (in $1000)" 0 --> 100
    bar [50, 60, 70, 85]
    line [45, 55, 75, 80]
```
````

```mermaid
xychart-beta
    title "Sales Revenue by Quarter"
    x-axis [Q1, Q2, Q3, Q4]
    y-axis "Revenue (in $1000)" 0 --> 100
    bar [50, 60, 70, 85]
    line [45, 55, 75, 80]
```

::: callout tip
Mermaid diagrams are highly readable by LLMs. When an AI model reads your `llms-full.txt`, it can "see" the logic flow of your diagrams as text, making it much better at explaining complex architectural relationships in your project.
:::