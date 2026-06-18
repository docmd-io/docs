---
title: "AI-bereite Dokumentation mit docmd generieren"
description: "Wie Sie den llms.txt-Standard und die eingebauten Tools von docmd nutzen, um AI-Assistenten optimierten Kontext bereitzustellen."
---

## Problem

Entwickler verlassen sich zunehmend auf AI-Coding-Assistenten, um Dokumentation zu lesen und zu interpretieren. Wenn Ihre Dokumentation nur über einen Webbrowser zugänglich ist — überladen mit Navigationselementen, Trackern und komplexem HTML — verbrauchen AI-Agenten übermäßig viele Tokens für irrelevante Daten. Das erschöpft schnell ihre Kontextfenster.

## Warum es wichtig ist

Eine saubere, token-optimierte Textversion Ihrer Dokumentation bereitzustellen ist das moderne Äquivalent zur Bereitstellung einer hochwertigen REST-API. Es stellt sicher, dass AI-Agenten Ihre gesamte Dokumentation schnell ingestieren können. Das führt zu genaueren Code-Vorschlägen und besserem Support.

## Ansatz

Verwenden Sie das eingebaute **LLMs-Plugin** von docmd. Dieses Plugin implementiert nativ den entstehenden `llms.txt`-Standard. Es generiert automatisch token-optimierte Zusammenfassungen und Vollkontext-Dateien während jedes Build-Prozesses.

## Implementierung

Konfigurieren Sie das `llms`-Plugin in Ihrer [Plugin-Konfiguration](../../plugins/llms.md).

### 1. Site-URL konfigurieren

Stellen Sie sicher, dass die Eigenschaft `url` korrekt in Ihrer `docmd.config.json` gesetzt ist. Dadurch kann das Plugin absolute URLs für alle Seiten in der `llms.txt`-Datei generieren.

```json "docmd.config.json"
{
  "title": "Meine Projektdokumentation",
  "url": "https://docs.example.com",
  "plugins": {
    "llms": {}
  }
}
```

### 2. Ausgabedateien

Während des Build-Prozesses generiert docmd zwei Schlüsseldateien im Stammverzeichnis Ihrer Site:

-   **`llms.txt`**: Eine prägnante, strukturierte Markdown-Zusammenfassung aller Ihrer Seiten, einschließlich Titel, Beschreibungen und vollständiger URLs.
-   **`llms-full.txt`**: Eine umfassende Datei mit dem rohen Markdown-Inhalt Ihrer gesamten Site, verkettet mit Standard-Trennern (`---`). Sie stellt die ultimative "Source of Truth" für AI-Modelle dar.

### 3. Ingestion steuern

Sie können einzelne Seiten aus der AI-bereiten Ausgabe ausschließen, indem Sie die Eigenschaft `llms` im [Page-Frontmatter](../../content/frontmatter.md) verwenden.

```yaml
---
title: "Interner Debugging-Leitfaden"
llms: false
---
```

## Abwägungen

Die Generierung von `llms-full.txt` erzeugt eine große einzelne Datei. Für außergewöhnlich große Dokumentations-Sites kann diese Datei mehrere Megabyte überschreiten. Sie ist ideal für moderne LLMs mit großen Kontextfenstern (wie Gemini 1.5 Pro oder Claude 3.5 Sonnet), kann aber für kleinere Modelle zu groß sein. Stellen Sie sicher, dass Sie Ihre [Navigation](../../configuration/navigation.md) logisch organisieren, damit die AI wichtige Abschnitte priorisieren kann.
