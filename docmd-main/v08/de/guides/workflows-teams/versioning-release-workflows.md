---
title: "Versionierungs-Workflows"
description: "Wie Sie Dokumentations-Releases mit Software-Deployments synchronisieren, indem Sie die Versionierungs-Engine von docmd und Promotion-Strategien nutzen."
---

## Problem

Software-Releases mit den entsprechenden Dokumentations-Updates zu synchronisieren ist eine Koordinationsherausforderung. Häufig werden Dokumentations-Updates auf der Live-Site veröffentlicht, bevor neuer Code deployt wird (was aktuelle Benutzer verwirrt), oder sie verzögern sich um mehrere Tage (was Early Adopters frustriert).

## Warum es wichtig ist

Desynchronisation zwischen Software-Verhalten und ihrer Dokumentation verursacht Reibung bei Entwicklern. Damit Dokumentation effektiv ist, muss sie strikt auf die Software-Version abgebildet sein, die der Benutzer verwendet. Korrekten Kontext für jede Version bereitzustellen, gewährleistet reibungsloses Onboarding und Troubleshooting.

## Ansatz

Isolieren Sie Dokumentation für die aktive Entwicklung mithilfe der [Versionierungs-Engine](../../configuration/versioning.md) von docmd. Das erlaubt Ihrem Team, Inhalte für kommende Features asynchron in einem separaten Verzeichnis (z. B. `docs-next/`) zu entwerfen. Befördern Sie sie erst dann in den "Stable"-Status, wenn das offizielle Software-Release erfolgt.

## Implementierung

### 1. Verzeichnisse strukturieren

Pflegen Sie Ihre stabile Dokumentation im primären `docs/`-Ordner. Erstellen Sie ein dediziertes Verzeichnis für das kommende Release.

```text
project-root/
├── docs/       # Aktuelle Stable (v1.x)
├── docs-v2/    # Kommendes Release (v2.0)
└── docmd.config.json
```

### 2. Versionen konfigurieren

Registrieren Sie beide Versionen in Ihrer Konfiguration. Beschriften Sie die kommende Version als "Beta" oder "Next", um Benutzern ihren Status über den Versions-Switcher zu signalisieren.

```json
  "versions": {
    "current": "v1.0",
    "all": [
      { "id": "v1.0", "dir": "docs", "label": "v1.x (Stable)" },
      { "id": "v2.0", "dir": "docs-v2", "label": "v2.0 (Beta)" }
    ]
  }
```

### 3. Der Promotions-Prozess

Wenn Sie bereit sind, die neue Version offiziell zu releasen:
1.  **Config aktualisieren**: Ändern Sie die ID der `current`-Version in `docmd.config.json` auf `v2.0`.
2.  **Labels aktualisieren**: Entfernen Sie das Tag "(Beta)" aus dem `label` im `all`-Array.
3.  **Alte Docs archivieren**: Behalten Sie den Eintrag `v1.0` im `all`-Array, damit Benutzer älterer Versionen weiterhin auf die zugehörige Dokumentation zugreifen können.

## Abwägungen

### Wartungs-Overhead
Die Pflege mehrerer Dokumentations-Versionen erfordert Disziplin. Wenn ein kritischer Tippfehler oder eine Sicherheitswarnung in der stabilen Version behoben wird, stellen Sie sicher, dass diese auch im Verzeichnis der kommenden Version angewendet wird, um Regressionen zu vermeiden.

### SEO und Suche
Mehrere Versionen können gelegentlich dazu führen, dass Suchergebnisse auf ältere Dokumentation verweisen. Verwenden Sie das `seo`-Plugin und korrekte kanonische Tags, um sicherzustellen, dass die "Current"-Version von Suchmaschinen stets priorisiert wird. Weitere Details finden Sie unter [Umgang mit Breaking Changes](../scaling-architecture/breaking-changes-deprecations.md).
