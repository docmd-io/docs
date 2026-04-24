---
title: "Versionierungs-Workflows"
description: "So synchronisieren Sie Dokumentations-Releases mit Software-Deployments unter Verwendung der Versionierungs-Engine und der Promotions-Strategien von docmd."
---

## Problem

Die Synchronisierung von Software-Releases mit den entsprechenden Dokumentations-Updates ist eine erhebliche Koordinationsherausforderung. Häufig wird die Dokumentation auf der Live-Site aktualisiert, bevor der neue Code bereitgestellt wurde (was aktuelle Benutzer verwirrt), oder sie wird erst Tage nach dem Release veröffentlicht (was Early Adopters frustriert).

## Warum es wichtig ist

Eine Desynchronisierung zwischen dem Verhalten der Software und ihrer Dokumentation ist eine Hauptursache für Frustration bei Entwicklern. Damit Dokumentation effektiv ist, muss sie strikt der spezifischen Version der Software entsprechen, die der Benutzer gerade verwendet. Die Bereitstellung des korrekten Kontextes für jede Version gewährleistet ein reibungsloses Onboarding- und Troubleshooting-Erlebnis.

## Ansatz

Isolieren Sie die Dokumentation für die aktive Entwicklung mithilfe der [Versionierungs-Engine](../../configuration/versioning) von `docmd`. Dies ermöglicht es Ihrem Team, Inhalte für kommende Funktionen asynchron in einem separaten Verzeichnis (z. B. `docs-next/`) zu entwerfen und sie erst dann in den Status "Stabil" oder "Aktuell" zu befördern, wenn das offizielle Software-Release erfolgt.

## Implementierung

### 1. Verzeichnisstruktur organisieren

Behalten Sie Ihre stabile Dokumentation im primären `docs/`-Ordner bei und erstellen Sie ein dediziertes Verzeichnis für das kommende Release.

```text
projekt-root/
├── docs/       # Aktuell Stabil (v1.x)
├── docs-v2/    # Kommendes Release (v2.0)
└── docmd.config.js
```

### 2. Versionen konfigurieren

Registrieren Sie beide Versionen in Ihrer Konfiguration. Sie können die kommende Version als "Beta" oder "Next" kennzeichnen, um den Benutzern über den Versions-Switcher den Status zu signalisieren.

```javascript
// docmd.config.js
export default {
  versions: {
    current: 'v1.0',
    all: [
      { id: 'v1.0', dir: 'docs', label: 'v1.x (Stabil)' },
      { id: 'v2.0', dir: 'docs-v2', label: 'v2.0 (Beta)' }
    ]
  }
};
```

### 3. Der Promotions-Prozess

Wenn Sie bereit sind, die neue Version offiziell zu veröffentlichen:
1.  **Konfiguration aktualisieren**: Ändern Sie die `current` Versions-ID in `docmd.config.js` auf `v2.0`.
2.  **Labels aktualisieren**: Entfernen Sie den "(Beta)"-Tag vom `label` im `all`-Array.
3.  **Alte Dokumentation archivieren**: Behalten Sie den `v1.0`-Eintrag im `all`-Array bei, damit Benutzer älterer Versionen weiterhin auf die für sie relevante Dokumentation zugreifen können.

## Abwägungen

### Wartungsaufwand
Die Pflege mehrerer Dokumentationsversionen erfordert Disziplin. Wenn ein kritischer Tippfehler oder eine Sicherheitswarnung in der stabilen Version korrigiert wird, stellen Sie sicher, dass dies auch auf das Verzeichnis der kommenden Version angewendet wird, um "Regressionen" in der Klarheit zu vermeiden.

### SEO und Suche
Mehrere Versionen können gelegentlich dazu führen, dass Suchergebnisse auf ältere Dokumentationen verweisen. Verwenden Sie das `seo`-Plugin und korrekte Canonical-Tags, um sicherzustellen, dass die "Aktuelle" Version von Suchmaschinen immer priorisiert wird. Weitere Informationen zum Verwalten von Übergängen finden Sie unter [Umgang mit Breaking Changes](../scaling-architecture/breaking-changes-deprecations).
