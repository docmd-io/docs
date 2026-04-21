---
title: "Ausklappbare Abschnitte (Collapsible)"
description: "Betten Sie interaktive Umschalter im Akkordeon-Stil für FAQs, vertiefende Inhalte und Spoiler ein."
---

Der `collapsible`-Container erstellt einen interaktiven, umschaltbaren Abschnitt (Akkordeon). Dieses Muster ist ideal für FAQs, detaillierte technische Konfigurationen oder alle sekundären Informationen, die zugänglich sein sollten, ohne den primären Dokumentationsfluss zu überladen.

## Syntax

```markdown
::: collapsible [open] "Titel-Text"
Der Hauptinhalt wird hier platziert.
:::
```

### Referenz der Optionen
- **`open`**: (Optional) Wenn angegeben, wird der Abschnitt im ausgeklappten Zustand initialisiert.
- **`"Titel"`**: Der Text, der auf dem interaktiven Umschaltbalken angezeigt wird. Standardmäßig "Zum Ausklappen klicken", falls weggelassen.
- **`icon:NAME`**: (Optional) Fügt ein [Lucide](https://lucide.dev/icons) Icon vor dem Titel-Text hinzu.

## Detaillierte Implementierungsbeispiele

### Standardnutzung (Initialzustand: Geschlossen)
Wird primär für FAQs verwendet oder um die visuelle Dichte technischer Seiten zu reduzieren.

```markdown
::: collapsible "Wie aktualisiere ich docmd?"
Führen Sie `npm update -g @docmd/core` aus, um die neueste stabile Engine zu erhalten.
:::
```
::: collapsible "Wie aktualisiere ich docmd?"
Führen Sie `npm update -g @docmd/core` aus, um die neueste stabile Engine zu erhalten.
:::

### Opt-In-Sichtbarkeit (Initialzustand: Offen)
Ideal für Abschnitte, die standardmäßig sichtbar sein sollen, dem Benutzer aber ermöglichen, sie für eine sauberere Ansicht zu minimieren.

```markdown
::: collapsible open "Umgebungsvoraussetzungen"
1.  Node.js v18+ (LTS empfohlen)
2.  PNPM Paketmanager
:::
```
::: collapsible open "Umgebungsvoraussetzungen"
1.  Node.js v18+ (LTS empfohlen)
2.  PNPM Paketmanager
:::

### Verschachtelte technische Daten
Ausklappbare Abschnitte können komplexe Markdown-Elemente enthalten, einschließlich Code-Blöcken mit Syntax-Highlighting.

````markdown
::: collapsible "Beispielhafte JSON-Antwort analysieren"
```json
{
  "status": "success",
  "data": { "version": "0.6.2" }
}
```
:::
````
::: collapsible "Beispielhafte JSON-Antwort analysieren"
```json
{
  "status": "success",
  "data": { "version": "0.6.2" }
}
```
:::

::: callout tip
Obwohl der Inhalt innerhalb eines `collapsible`-Elements für den menschlichen Benutzer verborgen sein mag, bleibt er für den `docmd`-Suchindex vollständig sichtbar und ist im vereinheitlichten `llms-full.txt`-Stream enthalten. Dies stellt sicher, dass KI-Agenten umfassende Antworten basierend auf verborgenen technischen Details liefern können, während die Benutzeroberfläche für Menschen sauber und priorisiert bleibt.
:::