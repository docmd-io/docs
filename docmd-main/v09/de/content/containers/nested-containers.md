---
title: "Verschachtelte Container"
description: "Kombinieren Sie Karten, Tabs, Callouts und Schritte rekursiv zu hochwertigen Seitenlayouts in docmd."
---

`docmd` verwendet einen rekursiven Container-Parser mit Tiefenverfolgung. Sie können Komponenten ineinander verschachteln, um komplexe, interaktive UI-Strukturen rein in Markdown ohne benutzerdefiniertes HTML aufzubauen.

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::

::: callout warning "Syntax für selbstschließende Schaltflächen" icon:alert-triangle
Die `::: button`-Komponente ist selbstschließend (einzeilig). Fügen Sie niemals ein abschließendes `:::` unmittelbar nach einer Schaltfläche ein — andernfalls wird der **übergeordnete Container** beendet, was zu fehlerhaften Seitenlayouts führt.
:::

## Kompositionsbeispiele

### Interaktiver Ressourcenblock

Kombinieren Sie eine **Karte (Card)** für den strukturellen Rahmen, **Tabs** für umgebungsspezifische Befehle und einen **Callout** für Warnmeldungen:

````markdown
::: card title:"Monorepo Quickstart"
Wählen Sie Ihren bevorzugten Initialisierungspfad:

   ::: tabs
   == tab "Automatisiert"
      ```bash
      pnpm onboard
      ```
      ::: callout success
      Dieses Skript verarbeitet Paketinstallation und Workspace-Verknüpfung automatisch.
      ::: /callout

   == tab "Manuell"
      Holen und verknüpfen Sie die Core-Engine-Pakete manuell.
      ::: button title:"Zum Entwickler-Leitfaden" url:"./#developer-guide"
   ::: /tabs
::: /card
````

### Plattformspezifische Tutorial-Schritte

Das Verschachteln von **Tabs** innerhalb von **Schritten (Steps)** ist ein Standardmuster für die Bereitstellung OS-spezifischer Befehle innerhalb einer sequenziellen Anleitung:

```markdown
::: steps

1.  **Umgebung einrichten**
    Konfigurieren Sie Ihr lokales Betriebssystem.

    ::: tabs
    == tab "macOS"
    Stellen Sie sicher, dass Homebrew installiert und aktuell ist.
    == tab "Linux"
    Überprüfen Sie das Vorhandensein von `curl` und `bash`.
    ::: /tabs

2.  **Kern-Verifizierung**
    Führen Sie den Versionscheck aus, um die Konnektivität zu bestätigen.

::: /steps
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

## Designregeln & Einschränkungen

| Regel | Technischer Hinweis |
| :--- | :--- |
| **Rekursive Tabs** | Das Verschachteln von Tabs in anderen Tabs wird nicht empfohlen, da es eine komplexe UX auf mobilen Viewports erzeugt. |
| **Sequenzielle Konflikte** | Wenn Sie nummerierte Schritte in einem Tab benötigen, verwenden Sie eine standardmäßige geordnete Liste anstelle von `::: steps`. |
| **Quellcode-Einrückung** | Einrückung ist optional, aber eine Einrückung von 2 oder 4 Leerzeichen verbessert die Lesbarkeit von Markdown. |

::: callout tip "Wissenssegmentierung für KI" icon:sparkles
Container-Verschachtelung bietet klare **semantische Grenzen**. Ein in eine `card` verschachtelter `callout` ordnet diesen Tipp im `llms.txt`-Stream explizit dem Thema der Karte zu und verhindert so Kontextverlust über unbezogene Abschnitte hinweg.
:::