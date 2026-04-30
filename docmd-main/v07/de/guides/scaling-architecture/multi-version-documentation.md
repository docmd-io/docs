---
title: "Verwalten von mehrversionigen Dokumentationen"
description: "So pflegen Sie mehrere Versionen Ihrer Dokumentation (v1, v2, Legacy) mit einem einheitlichen Switcher und Pfaderhaltung."
---

## Problem

Softwareprodukte entwickeln sich weiter, aber Unternehmenskunden bleiben oft bei älteren LTS-Versionen (Long Term Support). Wenn die Dokumentation für v1 bei der Veröffentlichung von v2 eingestellt wird, lässt man diese Benutzer im Stich. Gleichzeitig führt das Pflegen komplett separater Websites für jede Version zu einer fragmentierten User Experience und einer Schwächung der SEO.

## Warum es wichtig ist

Ohne eine nahtlose Möglichkeit zum Wechseln zwischen Versionen wenden Entwickler fälschlicherweise Anweisungen aus der neuesten Dokumentation auf Legacy-Umgebungen an, was zu Fehlern und erhöhtem Supportaufwand führt. Ein einheitliches Versionierungssystem stellt sicher, dass Benutzer immer wissen, in welchem Kontext sie sich befinden, und einfach zwischen den Versionen derselben Seite springen können.

## Ansatz

`docmd` verfügt über eine native [Versioning Engine](../../configuration/versioning), die Versionen als erstklassige Bestandteile behandelt. Sie isoliert Builds in Verzeichnisse mit Versionspräfix, bietet einen "Sticky Switching"-Mechanismus, der den aktuellen Seitenpfad beibehält, und beschränkt Suchergebnisse korrekt auf den aktiven Versionskontext.

## Implementierung

### 1. Quellverzeichnisse organisieren

Bewahren Sie Ihre aktuellste Dokumentation in einem Standardverzeichnis (z. B. `docs/`) auf und platzieren Sie Legacy-Versionen in Geschwisterverzeichnissen (z. B. `docs-v1/`).

```text
mein-projekt/
├── docs/             # v2.x (Aktuell)
├── docs-v1/          # v1.x (Legacy LTS)
└── docmd.config.js
```

### 2. Versions-Map konfigurieren

Definieren Sie Ihre Versionsstruktur in der `docmd.config.js`. Die `current`-Version wird unter der Root-URL bereitgestellt, während andere unter `/{id}/` erreichbar sind.

```javascript
// docmd.config.js
export default {
  versions: {
    current: 'v2',           // Erreichbar unter /
    position: 'sidebar-top', // Position des Switchers
    all: [
      { id: 'v2', dir: 'docs',    label: 'v2.x (Aktuell)' },
      { id: 'v1', dir: 'docs-v1', label: 'v1.x (LTS)' }
    ]
  }
};
```

### 3. Navigation pro Version

Wenn sich die Navigationsstruktur zwischen den Versionen unterscheidet, können Sie eine `navigation.json`-Datei in das Quellverzeichnis der jeweiligen Version legen. `docmd` erkennt diese automatisch und verwendet sie für diese spezifische Version.

```json
// docs-v1/navigation.json
[
  { "title": "Legacy Setup", "path": "/legacy-setup" },
  { "title": "Migration zu v2", "path": "/migration" }
]
```

### 4. Pfaderhaltung (Sticky Switching)

`docmd` versucht automatisch, den aktuellen Pfad des Benutzers beizubehalten, wenn dieser die Version wechselt. Wenn sich ein Benutzer auf der `v2`-Seite unter `/api/auth` befindet und zu `v1` wechselt, versucht die Engine, ihn zu `/v1/api/auth` zu leiten. Wenn die Seite in der Zielversion nicht existiert, erfolgt ein Fallback auf die Startseite dieser Version.

## Abwägungen

Das Speichern mehrerer Versionen in einem einzigen Repository erhöht die Größe des Repositorys im Laufe der Zeit. Bei sehr großen Dokumentationsmengen sollten Sie in Erwägung ziehen, Legacy-Verzeichnisse während des Build-Prozesses dynamisch über CI/CD einzubinden, anstatt sie fest in den Haupt-Branch einzuchecken.
