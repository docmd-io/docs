---
title: "Vergleich"
description: "Warum docmd? Erfahren Sie, wie es im Vergleich zu Docusaurus, VitePress, MkDocs und anderen Tools abschneidet."
---

Sie haben sich schon früher für ein Dokumentations-Tool entschieden. Sie werden es wieder tun. Hier ist das, was wirklich zählt — und wo docmd steht.

## Schreiben in 3 Sekunden starten, nicht in 30 Minuten

::: tabs
== tab "docmd"
```bash
npx @docmd/core dev
```
Fertig. Ihre Doku ist live. Keine Konfigurationsdateien, kein Projekt-Scaffolding, kein Abhängigkeits-Labyrinth.

== tab "Docusaurus"
```bash
npx create-docusaurus@latest mein-projekt classic
cd mein-projekt
npm install
npm start
```
Vier Befehle, ein generiertes Projekt mit ~250 MB in `node_modules` und eine `docusaurus.config.js`, die Sie bearbeiten müssen, bevor etwas Nützliches passiert.

== tab "VitePress"
```bash
npx vitepress init
```
Stellt Ihnen 5 Fragen, generiert eine Konfigurationsdatei, dann führen Sie `vitepress dev` aus. Sauber — erfordert aber dennoch Scaffolding.

== tab "MkDocs"
```bash
pip install mkdocs-material
mkdocs new mein-projekt && cd mein-projekt
mkdocs serve
```
Python-Ökosystem. Sie benötigen `pip`, eine virtuelle Umgebung und eine `mkdocs.yml`, bevor die erste Seite gerendert wird.
:::

## Der Payload-Unterschied ist real

Ihre Leser sollten keine React-App herunterladen müssen, nur um einen Absatz zu lesen. Das ist es, was der Browser bei einer Website mit 50 Seiten tatsächlich empfängt:

| Generator | Initialer Download (gesamt) | JS Payload | CSS Payload |
|:----------|:---------------------------:|:----------:|:----------:|
| **docmd** | **~18 KB** | ~12 KB | ~6 KB |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "Warum das wichtig ist"
Alle 100 KB JavaScript kosten auf einem Mittelklasse-Smartphone etwa 50 ms Zeit zum Parsen. Die 12 KB JS von docmd bedeuten, dass Ihre Doku sofort lädt, selbst bei 3G-Verbindungen. Docusaurus liefert 16-mal mehr JavaScript für denselben Inhalt aus.
:::

## Build-Geschwindigkeit

Erstellung derselben Website mit 50 Seiten auf einem M1 MacBook Air:

| Generator | Kaltstart (Build) | Hot Rebuild (Dev) |
|:----------|:-----------------:|:-----------------:|
| **docmd** | **~1,2s** | **~80ms** |
| VitePress | ~2,5s | ~150ms |
| MkDocs Material | ~3,0s | ~500ms |
| Docusaurus | ~15s | ~2s |

docmd-Rebuilds sind so schnell, dass die Seite aktualisiert wird, bevor Sie das Fenster gewechselt haben.

## i18n, das tatsächlich funktioniert

Hier scheitern die meisten Tools. Sie fügen 6 Sprachen hinzu, übersetzen 3 Seiten ins Hindi, und plötzlich stoßen Ihre Benutzer bei jeder nicht übersetzten Seite auf einen 404-Fehler.

| Funktion | docmd | VitePress | Docusaurus | Starlight |
|:-----------|:-----:|:---------:|:----------:|:---------:|
| Fallback pro Seite auf Default-Locale | ✅ | ❌ (404) | ❌ (404) | ✅ |
| Lokalisierte Warnung "nicht übersetzt" | ✅ | ❌ | ❌ | ✅ |
| Automatische Deaktivierung fehlender Sprachen im Switcher | ✅ | ❌ | ❌ | ❌ |
| Sofortige Prüfung der Seitensexistenz (offline) | ✅ | ❌ | ❌ | ❌ |
| Kombination aus Versionierung + i18n | ✅ | ❌ | ❌ | ❌ |
| Zero-Config (kein individuelles React/Vue) | ✅ | Teilweise | ❌ | ✅ |

::: callout warning "Was in VitePress und Docusaurus passiert"
Wenn ein Leser auf Hindi wechselt und diese Seite nicht übersetzt ist, erhält er eine **404-Fehlermeldung**. Die einzige Abhilfe sind serverseitige Weiterleitungen oder das Schreiben einer eigenen React/Vue-Komponente. docmd regelt dies zum Build-Zeitpunkt — nicht verfügbare Locales erhalten ein "N/A"-Badge, und nicht übersetzte Seiten fallen lautlos auf den Standard zurück, begleitet von einem lokalisierten Warnungs-Callout.
:::

## Vollständige Feature-Matrix

| Feature | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
|:--------|:-----:|:----------:|:---------:|:---------------:|:---------:|:--------:|
| **Zero-Config Start** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Konfiguration erforderlich** | Keine | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **SPA-Navigation** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Native Versionierung** | ✅ | ✅ | ❌ | Plugin | ❌ | ✅ |
| **Natives i18n** | ✅ | ✅ | Manuell | Plugin | ✅ | ✅ |
| **Integrierte Suche** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | Cloud |
| **llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Inline-Diskussionen** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA-Unterstützung** | ✅ | Community | ❌ | ❌ | ❌ | ❌ |
| **Self-hosted** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Deployment-Config-Generator** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## Konfigurationsaufwand

Erforderliche Konfigurationszeilen für eine Website mit Versionierung, i18n, Suche und Sitemap:

| Generator | Konfigurationszeilen | Erforderliche Dateien |
|:----------|:--------------------:|:---------------------:|
| **docmd** | **~15 Zeilen** | 1 (`docmd.config.js`) |
| MkDocs Material | ~50 Zeilen | 1 + Plugins |
| VitePress | ~80 Zeilen | 1 + Theme-Ordner |
| Docusaurus | ~120 Zeilen | 3+ Konfig-Dateien |

## Qualitätssicherung

docmd wird mit einer Brute-Test-Suite ausgeliefert, die **25 verschiedene Szenarien** anhand von **85 Assertionen** validiert — wobei jedes Feature isoliert und in Kombination abgedeckt wird. Jedes Release muss alle 85 Assertionen und 13 interne Failsafe-Checks bestehen, bevor es ausgeliefert wird.

::: callout tip "Führen Sie die Tests selbst aus"
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

Kein anderer Dokumentationsgenerator in dieser Klasse veröffentlicht eine vergleichbare End-to-End-Feature-Test-Suite als Teil seines Quellcodes.