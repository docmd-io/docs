---
title: "Von MkDocs migrieren"
description: "Ein umfassender Leitfaden zum Umzug Ihrer Dokumentation von MkDocs in das Zero-Config, High-Performance JavaScript-Ökosystem von docmd."
---

## Problem

Viele technische Teams nutzen seit Jahren MkDocs (und das beliebte MkDocs Material Theme). Die Verwaltung von Python-Umgebungen, `pip`-Abhängigkeiten und komplexen `mkdocs.yml`-Konfigurationen kann jedoch für Organisationen frustrierend sein, die ansonsten auf Node.js und das NPM-Ökosystem standardisiert haben. Auch die Build-Zeiten für große MkDocs-Seiten können in CI/CD-Pipelines zum Flaschenhals werden.

## Warum es wichtig ist

Die Konsolidierung Ihrer Dokumentations-Toolchain in das JavaScript-Ökosystem – in dem Ihre Frontend- und Full-Stack-Entwickler bereits arbeiten – erhöht die internen Beitragsraten und vereinfacht Ihre Infrastruktur. `docmd` bietet eine Zero-Config, High-Performance-Alternative zu Python-basierten Tools und bietet eine modernere Developer Experience sowie schnellere Deployment-Zyklen.

## Ansatz

`docmd` greift viele der gleichen benutzerzentrierten Paradigmen wie MkDocs Material auf, wie z. B. native Versionierung, Sofort-Suche und reichhaltige UI-Container. Der Migrationsprozess umfasst primär das Übertragen Ihrer `mkdocs.yml`-Logik in eine `docmd.config.js`-Datei und das Aktualisieren Ihrer Admonition-Syntax auf das Container-System von `docmd`.

## Implementierung

### 1. Konfigurations-Mapping

Übertragen Sie Ihre YAML-basierte Konfiguration in die [globale Konfiguration](../../configuration/general) von `docmd`.

**Vorher (mkdocs.yml):**
```yaml
site_name: Meine Docs
theme:
  name: material
  palette:
    scheme: slate
```

**Nachher (docmd.config.js):**
```javascript
export default {
  title: 'Meine Docs',
  theme: {
    appearance: 'dark' // docmd unterstützt nativ hell/dunkel/system
  }
};
```

### 2. Admonition-Substitution

MkDocs verwendet die Syntax `!!!` oder `???` für Admonitions. `docmd` nutzt eine einheitliche `::: callout` [Container](../../content/containers/callouts)-Syntax. Sie können ein globales Suchen-und-Ersetzen oder Regex verwenden, um Ihre Dateien zu konvertieren:

*   **MkDocs**: `!!! info "Titel"`
*   **docmd**: `::: callout info "Titel"`

### 3. Integrierte Versionierung

Ersetzen Sie das komplexe `mike`-Plugin und seine Multi-Branch-Deployment-Strategie durch die native [Versionierungs-Engine](../../configuration/versioning) von `docmd`. `docmd` verarbeitet mehrere Dokumentationsversionen in einem einzigen Build-Durchlauf, ohne dass externe Python-Utilities erforderlich sind.

```javascript
versions: {
  current: 'v2',
  all: [
    { id: 'v2', dir: 'docs', label: 'v2.x (Aktuell)' },
    { id: 'v1', dir: 'docs-v1', label: 'v1.x (Legacy)' }
  ]
}
```

## Abwägungen

Das MkDocs Material-Ökosystem verfügt über eine riesige Auswahl an Python-basierten Plugins. Während das [Plugin-System](../../customisation/extending-custom-plugins) von `docmd` schnell wächst und modernes JavaScript nutzt, gibt es für einige sehr spezielle MkDocs-Plugins möglicherweise noch keine direkte Entsprechung. Der signifikante Gewinn an Build-Geschwindigkeit, die vereinfachte Umgebungsverwaltung und die überlegene Client-seitige Performance machen den Wechsel für moderne Engineering-Teams jedoch oft sehr lohnenswert.
