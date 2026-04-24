---
title: "Breaking Changes & Veraltete Funktionen"
description: "So kommunizieren Sie API-Änderungen und Migrationspfade effektiv durch versionierte Dokumentation und kontextbezogene Callouts."
---

## Problem

Wenn ein Produkt eine neue Hauptversion einführt, werden bestimmte APIs, Funktionen oder Konfigurationen zwangsläufig als veraltet markiert oder entfernt. Benutzer, die die neueste Dokumentation durchsuchen, müssen klar gewarnt werden, wenn sie veraltete Muster verwenden. Gleichzeitig sollte sich die Dokumentation auf die moderne Implementierung konzentrieren, um Verwirrung zu vermeiden.

## Warum es wichtig ist

Das Versäumnis, Breaking Changes explizit hervorzuheben, führt dazu, dass Entwickler Stunden mit dem Debuggen von Code verschwenden, der von der Engine nicht mehr unterstützt wird. Kontextbezogene Warnungen und klare Migrationspfade sind essenziell, um das Vertrauen der Benutzer zu erhalten, Supportanfragen zu reduzieren und einen reibungslosen Übergang zur neuesten Version Ihrer Software zu gewährleisten.

## Ansatz

Kombinieren Sie die [Versioning Engine](../../configuration/versioning) von `docmd` mit [Callout-Containern](../../content/containers/callouts), um eine klare Trennung zwischen Legacy- und modernen Inhalten zu schaffen. Die Strategie besteht darin, die vollständige Legacy-Dokumentation in eine archivierte Version zu verschieben und gleichzeitig "Migrations-Anker" in der aktuellen Version bereitzustellen, die auf die archivierten Inhalte verweisen.

## Implementierung

### 1. Archivierung von Legacy-Inhalten

Verschieben Sie bei der Veröffentlichung einer neuen Hauptversion (z. B. v2.0) Ihre bestehende Dokumentation in ein Archivverzeichnis (z. B. `docs-v1/`). Dies stellt sicher, dass der vollständige Kontext der vorherigen Version für Benutzer erhalten bleibt, die noch nicht migriert sind.

### 2. Kontextbezogene Migrations-Callouts

Verwenden Sie in Ihrer neuesten Dokumentation `warning`- oder `important`-Callouts am Anfang von Seiten, auf denen signifikante Änderungen vorgenommen wurden. Dies bietet Benutzern, die versuchen, Legacy-Muster zu verwenden, einen sofortigen Mehrwert.

```markdown
# Konfigurations-API

::: callout warning "Migration: Breaking Change in v2.0"
Die Eigenschaft `siteTitle` wurde entfernt. Sie wurde durch die globale Eigenschaft `title` ersetzt.

* **Migration von v1.x?** Bitte aktualisieren Sie Ihre `docmd.config.js`.
* **Benötigen Sie v1.x-Docs?** Siehe [Legacy-Konfigurationsanleitung](/v1/configuration/general).
:::
```

### 3. Aufrechterhaltung der AI-Genauigkeit

Durch die strikte Trennung von veralteten Inhalten von der aktiven Version verbessern Sie die Genauigkeit von KI-Tools erheblich. Das [LLMs-Plugin](../../plugins/llms) von `docmd` generiert Kontextdateien basierend auf der aktiven Version. Die Archivierung von Legacy-Inhalten verhindert, dass KI-Modelle "halluzinieren" und Benutzern, die nach modernen Lösungen suchen, veraltete APIs empfehlen.

## Abwägungen

Das aktive Verwalten von Migrations-Callouts bedeutet zusätzlichen Wartungsaufwand. Wenn sie unbefristet stehen bleiben, können Seiten mit alten Warnungen überladen werden. Wir empfehlen eine Richtlinie, Migrations-Callouts zu entfernen, sobald die Legacy-Version ihr Lebensende (EOL) erreicht hat oder nach einem vollständigen Hauptversionszyklus, um die Dokumentation schlank und fokussiert zu halten.
