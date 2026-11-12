---
title: "Unterstützende Bibliotheken"
description: "Abhängigkeitsfreie, eigenständige Mikro-Bibliotheken von docmd.io für Markdown-Verarbeitung, Templating und Kompilierung."
---

`docmd` basiert auf einem modularen Ökosystem eigenständiger, abhängigkeitsfreier Mikro-Bibliotheken. Jede Bibliothek folgt einer strikten Philosophie: minimale Größe, null externe Abhängigkeiten, vollständige TypeScript-Typen und isomorphe Ausführung in Node.js, Browsern und Edge-Runtimes.

Obwohl diese Pakete die Kern-Engine von `docmd` antreiben, sind sie vollständig unabhängig und können in jedem JavaScript- oder TypeScript-Projekt eingesetzt werden.

::: callout tip "Unabhängiges Open Source" icon:sparkles
Jede unterstützende Bibliothek wird unabhängig auf npm veröffentlicht und in einem eigenen GitHub-Repository unter der Organisation `docmd-io` gepflegt.
:::

## Übersicht der Bibliotheken

::: cards cols:2
::: card title:"lite-matter" icon:file-text href:"/supporting-libraries/lite-matter"
Extrem leichtgewichtiger Frontmatter-Extraktor und YAML-Parser für Markdown- und Text-Engines.
:::
::: card title:"lite-mdx" icon:code href:"/supporting-libraries/lite-mdx"
Abhängigkeitsfreier MDX- und JSX-Compiler mit Komponentenzuordnung, Props und isolierten Ausdrücken.
:::
::: card title:"lite-template" icon:layout href:"/supporting-libraries/lite-template"
Asynchrone Template-Engine im Sub-Millisekundenbereich, kompatibel mit einfacher EJS-Syntax.
:::
::: card title:"lite-hl" icon:highlighter href:"/supporting-libraries/lite-hl"
Heuristischer Code-Tokenizer und Syntax-Highlighter ohne Konfigurationsaufwand.
:::
::: card title:"embed-lite" icon:video href:"/supporting-libraries/embed-lite"
Statischer URL-zu-HTML-Parser für responsive Einbettungen von YouTube, Twitter/X, Spotify und mehr.
:::
:::

## Designprinzipien

Alle unterstützenden Bibliotheken folgen diesen Prinzipien:

* **Null externe Abhängigkeiten**: Reines TypeScript und Standard-Web-APIs ohne tiefe Abhängigkeitsbäume.
* **Isomorphe Ausführung**: Identisches Verhalten in Node.js, modernen Browsern, Cloudflare Workers und Deno.
* **Deterministische Ausgabe**: Schnelle Ausführung mit vorhersehbarem Parsing und strikter Isolation.
* **Typsicherheit**: Saubere und vollständige TypeScript-Definitionen direkt ab Werk.
