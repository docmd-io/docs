---
title: "Ausklappbare Abschnitte"
description: "Betten Sie interaktive Umschalter im Akkordeon-Stil für FAQs, vertiefende Inhalte und Spoiler ein."
---

Der `collapsible`-Container erstellt einen interaktiven, umschaltbaren Abschnitt (Akkordeon). Dieses Muster ist ideal für FAQs, detaillierte technische Konfigurationen oder alle sekundären Informationen, die zugänglich sein sollen, ohne den primären Dokumentationsfluss zu überladen.

## Syntax

```markdown
::: collapsible [open] "Titel-Text"
  Der Hauptinhalt wird hier platziert.
:::
```

### Optionen-Referenz
- **`open`**: (Optional) Wenn angegeben, wird der Abschnitt im erweiterten Zustand initialisiert.
- **`"Titel"`**: Der Text, der auf der interaktiven Umschaltleiste gerendert wird. Standardmäßig "Klicken zum Erweitern", wenn weggelassen.
- **`icon:NAME`**: (Optional) Fügt ein [Lucide](external:https://lucide.dev/icons)-Icon vor dem Titeltext hinzu.

## Detaillierte Implementierungsbeispiele

### Standardverwendung (Initialzustand: Geschlossen)
Hauptsächlich für FAQs oder zur Reduzierung der visuellen Dichte technischer Seiten verwendet.

```markdown
::: collapsible "Wie aktualisiere ich docmd?"
  Führen Sie `npm update -g @docmd/core` aus, um die neueste stabile Engine abzurufen.
:::
```
::: collapsible "Wie aktualisiere ich docmd?"
  Führen Sie `npm update -g @docmd/core` aus, um die neueste stabile Engine abzurufen.
:::

### Opt-In-Sichtbarkeit (Initialzustand: Offen)
Ideal für Abschnitte, die standardmäßig sichtbar sein sollten, dem Benutzer aber ermöglichen, sie für eine sauberere Ansicht zu minimieren.

```markdown
::: collapsible open "Umgebungsvoraussetzungen"
  1.  Node.js v18+ (LTS empfohlen)
  2.  PNPM-Paketmanager
:::
```
::: collapsible open "Umgebungsvoraussetzungen"
1.  Node.js v18+ (LTS empfohlen)
2.  PNPM-Paketmanager
:::

### Verschachtelte technische Daten
Collapsibles können komplexe Markdown-Elemente enthalten, einschließlich syntax-hervorgehobener Codeblöcke.

````markdown
::: collapsible "Beispiel-JSON-Antwort analysieren"
  ```json
  {
    "status": "success",
    "data": { "version": "0.6.2" }
  }
  ```
:::
````
::: collapsible "Beispiel-JSON-Antwort analysieren"
```json
{
  "status": "success",
  "data": { "version": "0.6.2" }
}
```
:::

::: callout tip
Obwohl Inhalte innerhalb eines `collapsible` für den menschlichen Benutzer verborgen sein können, bleiben sie für den `docmd`-Suchindex vollständig sichtbar und sind im einheitlichen `llms-full.txt`-Stream enthalten. Dies stellt sicher, dass KI-Agenten umfassende Antworten basierend auf verborgenen technischen Details geben können, während die für Menschen sichtbare Benutzeroberfläche sauber und priorisiert bleibt.
:::