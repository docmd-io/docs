---
title: "Vergleich"
description: "Wie docmd im Vergleich zu Docusaurus, VitePress, MkDocs, Starlight und Mintlify abschneidet — echte Zahlen, echte Funktionen."
---

Sie haben sich schon einmal für ein Dokumentationstool entschieden. Sie werden es wieder tun. Hier ist, was wirklich zählt — und wo docmd steht.

## Beginnen Sie in 3 Sekunden zu schreiben, nicht in 30 Minuten

::: tabs
tab: docmd
```bash
npx @docmd/core dev
```
Fertig. Ihre Dokumentation ist live. Keine Konfigurationsdateien, kein Projekt-Scaffolding, kein Abhängigkeits-Labyrinth.

tab: Docusaurus
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
Vier Befehle, ein generiertes Projekt mit ~250MB in `node_modules` und eine `docusaurus.config.js`, die Sie bearbeiten müssen, bevor etwas Nützliches passiert.

tab: VitePress
```bash
npx vitepress init
```
Stellt Ihnen 5 Fragen, generiert eine Konfigurationsdatei, dann führen Sie `vitepress dev` aus. Sauber — erfordert aber immer noch Scaffolding.

tab: MkDocs
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python-Ökosystem. Sie benötigen `pip`, eine virtuelle Umgebung und eine `mkdocs.yml`, bevor die erste Seite gerendert wird.
:::

## Die Payload-Lücke ist real

Ihre Leser sollten keine React-App herunterladen müssen, nur um einen Absatz zu lesen. Hier ist, was der Browser tatsächlich für eine 50-seitige Website empfängt:

| Generator | Gesamte anfängliche Ladezeit | JS-Payload | CSS-Payload |
|:----------|:------------------:|:----------:|:----------:|
| **docmd** | **~18 KB** | ~12 KB | ~6 KB |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "Warum das wichtig ist"
Jede 100 KB JavaScript kosten ~50ms Parse-Zeit auf einem Mittelklasse-Smartphone. Die 12 KB JS von docmd bedeuten, dass Ihre Dokumentation sofort lädt — selbst bei 3G. Docusaurus liefert 16-mal mehr JavaScript für denselben Inhalt.
:::

## Build-Geschwindigkeit

Erstellung derselben 50-seitigen Website auf einem M1 MacBook Air:

| Generator | Kaltstart-Build | Hot-Rebuild (Dev) |
|:----------|:----------:|:-----------------:|
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

docmd-Rebuilds sind so schnell, dass die Seite aktualisiert wird, bevor Sie das Fenster wechseln.

## i18n, das tatsächlich funktioniert

Hier scheitern die meisten Tools. Sie fügen 6 Sprachen hinzu, übersetzen 3 Seiten ins Hindi und plötzlich stoßen Ihre Benutzer auf jeder nicht übersetzten Seite auf 404-Fehler.

| Fähigkeit | docmd | VitePress | Docusaurus | Starlight |
|:-----------|:-----:|:---------:|:----------:|:---------:|
| Seitenweiser Fallback auf Standardsprache | ✅ | ❌ (404) | ❌ (404) | ✅ |
| Lokalisierter „nicht übersetzt"-Hinweis | ✅ | ❌ | ❌ | ✅ |
| Fehlende Locales automatisch deaktivieren | ✅ | ❌ | ❌ | ❌ |
| Sofortige Seitenprüfung (ohne Netzwerk) | ✅ | ❌ | ❌ | ❌ |
| Versionierung + i18n kombiniert | ✅ | ❌ | ❌ | ❌ |
| Zero-Config (ohne benutzerdefiniertes React/Vue) | ✅ | Teilweise | ❌ | ✅ |

::: callout warning "Was in VitePress und Docusaurus passiert"
Wenn ein Leser zu Hindi wechselt und diese Seite nicht übersetzt ist, erhält er einen **404-Fehler**. Der einzige Ausweg sind serverseitige Redirects oder das Schreiben einer benutzerdefinierten React/Vue-Komponente. docmd behandelt dies zur Build-Zeit — nicht verfügbare Locales zeigen ein „N/A"-Badge und nicht übersetzte Seiten fallen stillschweigend mit einem lokalisierten Warnhinweis zurück.
:::

## Vollständige Funktionsmatrix

| Funktion | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
|:--------|:-----:|:----------:|:---------:|:---------------:|:---------:|:--------:|
| **Zero-Config-Start** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Erforderliche Konfiguration** | Keine | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **SPA-Navigation** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Native Versionierung** | ✅ | ✅ | ❌ | Plugin | ❌ | ✅ |
| **Natives i18n** | ✅ | ✅ | Manuell | Plugin | ✅ | ✅ |
| **Eingebaute Suche** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | Cloud |
| **llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Inline-Diskussionen** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA-Unterstützung** | ✅ | Community | ❌ | ❌ | ❌ | ❌ |
| **Selbst gehostet** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Deploy-Config-Generator** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## Konfigurationsaufwand

Erforderliche Konfigurationszeilen für eine Site mit Versionierung, i18n, Suche und Sitemap:

| Generator | Konfigurationszeilen | Erforderliche Dateien |
|:----------|:------------:|:--------------:|
| **docmd** | **~15 Zeilen** | 1 (`docmd.config.js`) |
| MkDocs Material | ~50 Zeilen | 1 + Plugins |
| VitePress | ~80 Zeilen | 1 + Theme-Verzeichnis |
| Docusaurus | ~120 Zeilen | 3+ Konfigurationsdateien |

## Qualitätssicherung

docmd wird mit einer Brute-Test-Suite ausgeliefert, die **25 verschiedene Szenarien** über **85 Zusicherungen** validiert — und dabei jede Funktion isoliert und in Kombination abdeckt. Jedes Release muss alle 85 Zusicherungen und 13 interne Failsafe-Prüfungen bestehen, bevor es veröffentlicht wird.

::: callout tip "Führen Sie die Tests selbst aus"
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

Kein anderer Dokumentationsgenerator in dieser Klasse veröffentlicht eine vergleichbare End-to-End-Feature-Testsuite als Teil seines Quellcodes.