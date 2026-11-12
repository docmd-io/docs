---
title: "lite-matter"
description: "Extrem leichtgewichtiger Frontmatter-Extraktor für Markdown- und Text-Engines."
---

`lite-matter` ist ein ultra-leichtgewichtiger Frontmatter-Extraktor. Er analysiert YAML-Frontmatter-Blöcke aus Markdown-Dokumenten, gibt strukturierte Metadatenobjekte zurück und belässt den Dokumentkörper unverändert.

::: callout tip "Warum lite-matter?" icon:zap
Klassische Frontmatter-Parser bringen oft umfangreiche Legacy-Abhängigkeiten mit. `lite-matter` bietet einen maßgeschneiderten Ersatz für hochperformante statische Website-Generatoren und Build-Tools.
:::

## Installation

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-matter
```
:::
::: tab label:npm
```bash
npm install lite-matter
```
:::
::: tab label:bun
```bash
bun add lite-matter
```
:::
:::

## Verwendung

Extrahieren Sie Frontmatter-Metadaten und den Dokumentinhalt mit der Funktion `matter()`:

```typescript
import { matter } from 'lite-matter';

const markdown = `---
title: "Release v0.10.0"
date: 2026-11-12
tags: ["release", "ankuendigung"]
---

# Veröffentlichungsankündigung

Willkommen zur neuesten Version.
`;

const { data, content } = matter(markdown);

console.log(data.title);   // "Release v0.10.0"
console.log(data.tags);    // ["release", "ankuendigung"]
console.log(content);      // "# Veröffentlichungsankündigung\n\nWillkommen zur neuesten Version.\n"
```

## Funktionen

* **CRLF-Unterstützung**: Verarbeitet Windows- (`\r\n`) und POSIX-Zeilenenden (`\n`) nahtlos.
* **Verschachtelte Strukturen**: Volle Unterstützung für verschachtelte YAML-Objekte, Arrays und mehrzeilige Zeichenfolgen.
* **Sichere Fallbacks**: Gibt bei fehlendem oder fehlerhaftem Frontmatter sauber leere Metadaten zurück, ohne Ausnahmen auszulösen.
* **Inhaltserhaltung**: Der Dokumentinhalt bleibt Byte für Byte exakt erhalten.

## API-Referenz

### `matter(input, options?)`

Parst einen Text und gibt ein Ergebnisobjekt zurück:

```typescript
interface MatterResult<T = Record<string, any>> {
  data: T;
  content: string;
}
```

## Lizenz

[MIT](https://github.com/docmd-io/lite-matter/blob/main/LICENSE) © [docmd.io](https://docmd.io)
