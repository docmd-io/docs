---
title: "Mermaid Diagrams"
description: "Create beautiful diagrams and flowcharts using Mermaid syntax in your docmd documentation."
---

# Mermaid Diagrams

Mermaid is a JavaScript-based diagramming and charting tool that uses Markdown-inspired text definitions to create and modify diagrams dynamically. docmd has built-in support for Mermaid diagrams with automatic light/dark theme switching.

::: callout tip
All Mermaid diagrams automatically adapt to your site's light/dark theme!
:::

## Flowchart

Flowcharts are used to represent workflows or processes. They show the steps as boxes of various kinds, and their order by connecting them with arrows.

**Code:**

````markdown
```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix the issue]
    E --> B
    C --> F[Deploy]
    F --> G[End]
```
````

**Rendered Preview:**

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix the issue]
    E --> B
    C --> F[Deploy]
    F --> G[End]
```

## Sequence Diagram

Sequence diagrams show how processes operate with one another and in what order. They capture the interaction between objects in the context of a collaboration.

**Code:**

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

**Rendered Preview:**

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

**Code:**

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

**Rendered Preview:**

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

**Code:**

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

**Rendered Preview:**

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

**Rendered Preview:**

```mermaid
xychart-beta
    title "Sales Revenue by Quarter"
    x-axis [Q1, Q2, Q3, Q4]
    y-axis "Revenue (in $1000)" 0 --> 100
    bar [50, 60, 70, 85]
    line [45, 55, 75, 80]
```

## Best Practices

When using Mermaid diagrams in your documentation:

1. **Keep it Simple**: Start with simple diagrams and add complexity only when needed
2. **Use Clear Labels**: Make sure all nodes and connections are clearly labeled
3. **Consider Your Audience**: Adjust the level of detail based on who will read the documentation
4. **Test Both Themes**: Always check how your diagrams look in both light and dark modes
5. **Add Context**: Use callouts or text around diagrams to explain what they represent

::: callout info
Visit the [Official Mermaid Documentation](https://mermaid.js.org/) for more types of Mermaid Diagrams and, detailed syntax and options.
:::

