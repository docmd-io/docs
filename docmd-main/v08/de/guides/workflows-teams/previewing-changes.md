---
title: "Änderungen vorschauen"
description: "So richten Sie lokale und cloudbasierte Preview-Umgebungen ein, um sicherzustellen, dass Ihre Dokumentation vor der Veröffentlichung perfekt gerendert wird."
---

## Problem

Das Schreiben von Markdown ohne Live-Vorschau führt häufig zu Formatierungsfehlern, fehlerhaften Containern und falschen Bildpfaden, die erst sichtbar werden, wenn der Inhalt bereits live ist. Dies führt zu einer frustrierenden Erfahrung für Benutzer und zu Mehrarbeit für Maintainer, die ständig Hotfixes für einfache Rendering-Probleme nachschieben müssen.

## Warum es wichtig ist

Eine qualitativ hochwertige Dokumentation ist essenziell für das Vertrauen der Entwickler. Eine fehlerhafte Warnbox oder nicht gerenderte Syntax wirkt unprofessionell und kann Benutzer sogar über die Funktionsweise Ihrer Software irreführen. Die Dokumentation so zu sehen, wie sie später tatsächlich aussieht, ist der effektivste Weg, um Fehler abzufangen, die Lesbarkeit zu verbessern und eine nahtlose User Experience zu gewährleisten.

## Ansatz

Implementieren Sie eine mehrstufige Preview-Strategie: Nutzen Sie den [lokalen Entwicklungsserver](../../getting-started/quick-start#local-development) von `docmd` für sofortiges Feedback während des Schreibens und setzen Sie kurzlebige Cloud-Umgebungen (wie Vercel oder Cloudflare Pages) für finale Reviews innerhalb Ihrer Pull Requests ein.

## Implementierung

### 1. Sofortige lokale Vorschau

Der schnellste Weg, Ihre Änderungen zu sehen, ist der Befehl `docmd dev`. Er bietet Hot Module Replacement (HMR), wodurch Ihr Browser automatisch aktualisiert wird, sobald Sie eine Markdown-Datei speichern.

```bash
# Lokalen Entwicklungsserver starten
npx @docmd/core dev
```

### 2. Cloudbasierte Preview-Umgebungen

Konfigurieren Sie für die gemeinsame Review-Arbeit Ihre CI/CD-Plattform so, dass für jeden Pull Request eindeutige "Preview-URLs" generiert werden. Da `docmd` standardmäßige statische Dateien ausgibt, ist es mit allen gängigen Hosting-Anbietern kompatibel.

*   **Build-Befehl**: `npx @docmd/core build`
*   **Output-Verzeichnis**: `site`

Dies ermöglicht es Reviewern, genau zu sehen, wie die Änderungen in einer produktionsnahen Umgebung aussehen und funktionieren, bevor sie in den Hauptzweig gemergt werden.

### 3. Gemeinsame Reviews mit Threads

Kombinieren Sie Ihre Cloud-Previews mit dem [Threads-Plugin](../../plugins/usage). Dies ermöglicht es Teammitgliedern, Feedback direkt auf der gerenderten Vorschauseite zu hinterlassen, wodurch die Lücke zwischen dem Markdown-Quellcode und der finalen User Experience geschlossen wird.

## Abwägungen

Das Erstellen einer vollständigen statischen Website bei jedem Commit in einem riesigen Repository (Tausende von Seiten) kann zeitaufwendig sein und CI/CD-Ressourcen kosten. Um dies zu optimieren, konfigurieren Sie Ihre CI-Pipeline so, dass ein Dokumentations-Build nur dann ausgelöst wird, wenn Dateien innerhalb Ihres Quellverzeichnisses (z. B. `/docs`) geändert wurden.
