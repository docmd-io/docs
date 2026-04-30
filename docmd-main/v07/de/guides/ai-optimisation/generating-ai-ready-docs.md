---
title: "Erstellung von KI-bereiter Dokumentation mit docmd"
description: "So nutzen Sie den llms.txt-Standard und die integrierten Tools von docmd, um optimierten Kontext für KI-Assistenten bereitzustellen."
---

## Problem

Entwickler verlassen sich zunehmend auf KI-Coding-Assistenten (wie Cursor, GitHub Copilot und ChatGPT), um Dokumentationen für sie zu lesen und zu interpretieren. Wenn Ihre Dokumentation nur über einen Webbrowser zugänglich ist und mit Navigationselementen, Trackern und komplexem HTML überladen ist, verbrauchen KI-Agenten unnötig viele Token für irrelevante Daten, was ihre Kontextfenster schnell erschöpft.

## Warum es wichtig ist

Die Bereitstellung einer sauberen, Token-optimierten Textversion Ihrer Dokumentation ist das moderne Äquivalent zur Bereitstellung einer hochwertigen REST-API. Sie stellt sicher, dass KI-Agenten Ihren gesamten Dokumentationssatz schnell aufnehmen können, was zu genaueren Code-Vorschlägen und einem besseren Support für Entwickler führt, die Ihr Produkt nutzen.

## Ansatz

Nutzen Sie das integrierte **LLMs-Plugin** von `docmd`. Dieses Plugin implementiert nativ den aufkommenden `llms.txt`-Standard und generiert bei jedem Build-Prozess automatisch Token-optimierte Zusammenfassungen und Vollkontext-Dateien.

## Implementierung

Das `llms`-Plugin ist in `docmd >= 0.7.0` verfügbar und kann in Ihrer [Plugin-Konfiguration](../../plugins/usage) konfiguriert werden.

### 1. Konfiguration der Website-URL

Stellen Sie sicher, dass die Eigenschaft `url` in Ihrer `docmd.config.js` korrekt gesetzt ist. Dies ermöglicht es dem Plugin, absolute URLs für alle Seiten in der Datei `llms.txt` zu generieren.

```javascript
// docmd.config.js
export default {
  title: 'Mein Projekt Docs',
  url: 'https://docs.example.com',
  plugins: ['llms']
};
```

### 2. Ausgabedateien

Während des Build-Prozesses generiert `docmd` zwei wichtige Dateien im Root-Verzeichnis Ihrer Website:

-   **`llms.txt`**: Eine prägnante, strukturierte Markdown-Zusammenfassung aller Ihrer Seiten, einschließlich ihrer Titel, Beschreibungen und vollständigen URLs.
-   **`llms-full.txt`**: Eine umfassende Datei, die den rohen Markdown-Inhalt Ihrer gesamten Website enthält, zusammengeführt durch Standard-Trenner (`---`). Dies bietet die ultimative "Source of Truth" für KI-Modelle.

### 3. Steuerung der Verarbeitung

Sie können bestimmte Seiten von der KI-bereiten Ausgabe ausschließen, indem Sie die Eigenschaft `llms` im [Seiten-Frontmatter](../../content/frontmatter) verwenden.

```yaml
---
title: "Interner Debugging-Leitfaden"
llms: false
---
```

## Abwägungen

Die Generierung von `llms-full.txt` erzeugt eine einzige, sehr große Datei. Bei außergewöhnlich umfangreichen Dokumentations-Websites kann diese Datei mehrere Megabyte groß werden. Während dies ideal für moderne LLMs mit großen Kontextfenstern (wie Gemini 1.5 Pro oder Claude 3.5 Sonnet) ist, kann sie für kleinere Modelle zu groß sein. Stellen Sie sicher, dass Sie Ihre [Navigation](../../configuration/navigation) logisch strukturieren, damit die KI die wichtigsten Abschnitte priorisieren kann.
