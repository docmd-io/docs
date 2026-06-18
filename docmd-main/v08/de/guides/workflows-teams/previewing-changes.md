---
title: "Änderungen in der Vorschau anzeigen"
description: "Wie Sie lokale und Cloud-basierte Vorschau-Umgebungen einrichten, um sicherzustellen, dass Ihre Dokumentation vor der Veröffentlichung perfekt dargestellt wird."
---

## Problem

Markdown ohne Live-Vorschau zu schreiben führt zu Formatierungsfehlern, defekten Containern und falschen Bildpfaden. Diese werden erst sichtbar, wenn die Inhalte in Produktion sind. Das führt zu einer frustrierenden User Experience und zwingt Maintainer, Hotfixes für Rendering-Probleme zu pushen.

## Warum es wichtig ist

Hochwertige Dokumentation ist essenziell für das Vertrauen von Entwicklern. Eine defekte Warnungs-Box oder nicht gerenderte Syntax wirkt unprofessionell und führt Benutzer in die Irre. Die "echte" Dokumentation vor dem Live-Gang zu sehen ist der beste Weg, Fehler zu erkennen, die Lesbarkeit zu verbessern und eine nahtlose User Experience sicherzustellen.

## Ansatz

Implementieren Sie eine mehrstufige Vorschau-Strategie: Verwenden Sie den [Local-Development](../../getting-started/quick-start.md#local-development)-Server von docmd für sofortiges Feedback beim Schreiben und ephemere Cloud-Umgebungen (wie Vercel oder Cloudflare Pages) für finale Reviews innerhalb Ihrer Pull Requests.

## Implementierung

### 1. Sofortige lokale Vorschauen

Der schnellste Weg, Ihre Änderungen zu sehen, ist das Starten des `npx @docmd/core dev`-Servers. Er verfügt über Hot Module Replacement (HMR). Das aktualisiert Ihren Browser automatisch in dem Moment, in dem Sie eine Markdown-Datei speichern.

```bash
# Lokalen Development-Server starten
npx @docmd/core dev
```

### 2. Cloud-basierte Vorschau-Umgebungen

Für kollaborative Reviews konfigurieren Sie Ihre CI/CD-Plattform so, dass sie für jeden Pull Request eindeutige "Preview-URLs" generiert. Da docmd Standard-Static-Files ausgibt, ist es mit allen großen Hosting-Providern kompatibel.

*   **Build-Befehl**: `npx @docmd/core build`
*   **Ausgabeverzeichnis**: `site`

So können Reviewer genau sehen, wie Änderungen in einer produktionsähnlichen Umgebung aussehen und sich verhalten, bevor sie in den Main-Branch gemergt werden.

### 3. Kollaborative Reviews mit Threads

Kombinieren Sie Ihre Cloud-Vorschauen mit dem [Threads-Plugin](../../plugins/threads.md). Damit können Team-Mitglieder Feedback direkt auf der gerenderten Vorschau-Seite hinterlassen. Es überbrückt die Kluft zwischen dem Markdown-Quelltext und der finalen User Experience.

## Abwägungen

Eine vollständige statische Site für jeden Commit in einem riesigen Repository zu bauen kann zeit- und ressourcenintensiv sein in Bezug auf CI/CD. Um dies zu optimieren, konfigurieren Sie Ihre CI-Pipeline so, dass sie einen Dokumentations-Build nur dann auslöst, wenn Dateien in Ihrem Quellverzeichnis (z. B. `/docs`) verändert wurden.
