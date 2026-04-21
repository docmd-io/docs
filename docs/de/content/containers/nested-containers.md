---
title: "Verschachtelte Container"
description: "Nutzen Sie den rekursiven Parser von docmd, um Karten, Tabs und Callouts in hochwertige Seitenlayouts zu kombinieren."
---

Eine der leistungsfähigsten technischen Fähigkeiten von `docmd` ist seine **rekursive Parsing-Engine**. Sie können Komponenten unendlich ineinander verschachteln, um komplexe, interaktive Dokumentationsblöcke zu erzeugen, die andernfalls tiefgreifende HTML-Kenntnisse oder benutzerdefinierte Vorlagen erfordern würden.

## Die architektonische Regel

Obwohl die Verschachtelung mathematisch gesehen unendlich ist, sollten Sie sich immer an die **Regel für selbstschließende Komponenten** halten:

::: callout warning "Selbstschließende Buttons"
Da die `::: button`-Komponente selbstschließend ist (einzeilig), fügen Sie niemals eine abschließende `:::`-Zeile dahinter ein. Dies würde versehentlich den **übergeordneten Container** schließen, in dem sich der Button befindet, was zu einem fehlerhaften Layout führt.
:::

## Beispiele für technische Komposition

### 1. Interaktiver Ressourcenblock
Kombinieren Sie eine **Karte (Card)** für den strukturellen Rahmen, **Tabs** für umgebungsspezifische Anweisungen und **Callouts** zur Hervorhebung kritischer Informationen.

````markdown
::: card "Monorepo Schnellstart"
Wählen Sie Ihren bevorzugten Initialisierungspfad:

   ::: tabs
   == tab "Automatisiert"
      ```bash
      pnpm onboard
      ```
      ::: callout success
      Dieses Skript übernimmt alle Paketinstallationen und Build-Aufgaben automatisch.
      :::

   == tab "Manuell"
      Holen und verknüpfen Sie die Core-Engine manuell.
      ::: button "Zum Entwickler-Leitfaden" /advanced/developer-guide
   :::
:::
````

### 2. Multi-Plattform-Tutorials
Das Verschachteln von **Tabs** innerhalb von **Schritten (Steps)** ist ein professionelles Muster, um plattformspezifische Anweisungen innerhalb einer Standard-Tutorial-Sequenz bereitzustellen.

```markdown
::: steps

1. **Umgebung einrichten**
   Konfigurieren Sie Ihr lokales Betriebssystem.

   ::: tabs
   == tab "macOS"
      Stellen Sie sicher, dass Homebrew installiert und aktuell ist.
   == tab "Linux"
      Überprüfen Sie das Vorhandensein von `curl` und `bash`.
   :::

2. **Kern-Verifizierung**
   Führen Sie den Versionscheck aus, um die Konnektivität zu bestätigen.

:::
```

::: steps

1.  **Umgebung einrichten**
    Konfigurieren Sie Ihr lokales Betriebssystem.

    ::: tabs
    == tab "macOS"
    Stellen Sie sicher, dass Homebrew installiert und aktuell ist.
    == tab "Linux"
    Überprüfen Sie das Vorhandensein von `curl` und `bash`.
    :::

2.  **Kern-Verifizierung**
    Führen Sie den Versionscheck aus, um die Konnektivität zu bestätigen.

:::

## Design-Einschränkungen

Um sowohl die Performance als auch die mobile Responsivität zu wahren, beachten Sie die folgenden Einschränkungen:

*   **Rekursive Tabs**: Das Verschachteln von Tabs innerhalb anderer Tabs wird technisch unterstützt, ist jedoch ausdrücklich nicht empfohlen. Es erzeugt Navigations-"Schleifen", die auf kleineren Viewports optisch verwirrend sind.
*   **Sequenzieller Konflikt**: Wenn Sie nummerierte Schritte innerhalb eines Tabs benötigen, verwenden Sie eine standardmäßige geordnete Liste (`1. Schritt-Inhalt`) anstelle des `::: steps`-Containers, um Layout-Konflikte zu vermeiden.
*   **Lesbarkeit**: Obwohl `docmd` keine Einrückung für verschachtelte Blöcke zwingend vorschreibt, verbessert eine Einrückung von 2 oder 4 Leerzeichen die menschliche Lesbarkeit des Markdown-Quellcodes erheblich.

::: callout tip "Wissenssegmentierung für KI"
Verschachtelungen bieten klare **semantische Grenzen**. Wenn ein KI-Agent den `llms-full.txt`-Stream analysiert, teilt ein in eine `card` eingebetteter `callout` dem Modell explizit mit, dass der Tipp auf das spezifische Thema dieser Karte bezogen ist. Dies verhindert Kontext-Leaks und verbessert die technische Genauigkeit in generierten Antworten.
:::