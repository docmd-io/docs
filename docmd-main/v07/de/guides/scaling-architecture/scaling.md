---
title: "Skalierung auf 1000+ Seiten"
description: "So bewahren Sie mit docmd auch in riesigen Dokumentationsprojekten eine hohe Performance und Benutzerfreundlichkeit."
---

## Problem

Mit zunehmender Reife eines Softwareprodukts wächst natürlich auch dessen Dokumentation. Wenn ein Projekt auf Hunderte oder Tausende von Markdown-Dateien anwächst, leiden viele Dokumentationsgeneratoren unter trägen Build-Zeiten, langsamen Hot-Reloads des Dev-Servers und Navigationsstrukturen, die sowohl Maintainer als auch Benutzer überfordern.

## Warum es wichtig ist

Wenn die Generierung der Dokumentation Minuten statt Sekunden dauert, werden Autoren davon abgehalten, kleine Korrekturen vorzunehmen, was zu veralteten und ungenauen Inhalten führt. Für Benutzer macht ein riesiges, unorganisiertes Sidebar-Menü das Finden von Informationen frustrierend, was zu mehr Support-Anfragen und einer schlechten Developer Experience führt.

## Ansatz

`docmd` ist auf Geschwindigkeit und Skalierbarkeit ausgelegt. Durch die Verwendung einer Hochleistungs-Parsing-Engine und einer granularen, dateibasierten Build-Strategie kann es Tausende von Seiten in Sekunden verarbeiten. Die optimierte SPA-Auslieferung (Single Page Application) stellt sicher, dass die Navigation durch eine große Website für den Endbenutzer verzögerungsfrei bleibt.

## Implementierung

### 1. Granulare Projektstruktur

Vermeiden Sie es, alle Dateien in einem einzigen flachen Verzeichnis abzulegen. Verwenden Sie eine tief verschachtelte Ordnerstruktur, die die Architektur Ihres Produkts widerspiegelt. Dies macht das Projekt wartungsfreundlicher und ermöglicht es `docmd`, Änderungen während der Entwicklung effizient zu verfolgen.

### 2. Optimierte Suchindexierung

Für große Websites ist das [Search-Plugin](../../plugins/search) unerlässlich. `docmd` generiert einen hochkomprimierten Suchindex, der bei Bedarf geladen wird. Dies stellt sicher, dass selbst bei Tausenden von Seiten das erste Laden der Seite schnell bleibt, während gleichzeitig eine Volltextsuche über die gesamte Website ermöglicht wird.

### 3. Versionierung und Archivierung

Nutzen Sie die [Versioning Engine](../../configuration/versioning), um Legacy-Inhalte von der aktiven Dokumentation zu trennen. Durch die Isolierung älterer Versionen in eigene Build-Kontexte reduzieren Sie die Anzahl der Seiten, die bei täglichen Updates neu verarbeitet werden müssen, was die Entwicklungsgeschwindigkeit erheblich verbessert.

```javascript
// docmd.config.js
export default {
  versions: {
    current: 'v3',
    all: [
      { id: 'v3', dir: 'docs/current', label: 'v3.x (Aktuell)' },
      { id: 'v2', dir: 'docs/v2',      label: 'v2.x (Legacy)' }
    ]
  }
};
```

### 4. Komponentenbasierte Navigation

Unterteilen Sie Ihre Navigation mithilfe von `navigation.json`-Dateien in logische Segmente. Dies ermöglicht es Ihnen, separate Sidebar-Hierarchien für verschiedene Abschnitte Ihrer Website zu definieren und so zu verhindern, dass die Hauptnavigation unübersichtlich wird.

## Abwägungen

Eine große Website verbraucht während des Build-Prozesses naturgemäß mehr Speicherplatz und RAM. Um auch bei extremen Skalierungen (10.000+ Seiten) Build-Zeiten im Sub-Sekunden-Bereich beizubehalten, sollten Sie eine leistungsstarke CI/CD-Umgebung mit SSD-Speicher und ausreichend RAM in Betracht ziehen, um die parallele Verarbeitung der Dateien zu bewältigen.
