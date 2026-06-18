---
title: "Vergleich"
description: "Wie sich docmd gegen Docusaurus, VitePress, MkDocs, Starlight und Mintlify schlägt — mit echten Zahlen und echten Features."
---

So schlägt sich docmd im Vergleich zu den Alternativen — mit Messwerten aus einer 50-Seiten-Site, die auf derselben Hardware gebaut wurde.

## Schreiben Sie in 3 Sekunden los, nicht in 30 Minuten

::: tabs
== tab "docmd"
```bash
npx @docmd/core dev
```
Fertig. Ihre Docs sind live. Keine Config-Dateien, kein Projekt-Scaffolding, kein Dependency-Dschungel.

== tab "Docusaurus"
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
Vier Befehle, ein generiertes Projekt mit rund 250 MB in `node_modules` und eine Config-Datei, die Sie bearbeiten müssen, bevor irgendetwas Sinnvolles passiert.

== tab "VitePress"
```bash
npx vitepress init
```
Stellt 5 Fragen, generiert eine Config-Datei, dann führen Sie `vitepress dev` aus. Sauber — aber Scaffolding bleibt erforderlich.

== tab "MkDocs"
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python-Ökosystem. Sie brauchen `pip`, eine virtuelle Umgebung und eine `mkdocs.yml`, bevor die erste Seite rendert.
:::

## Der Payload-Unterschied ist real

Ihre Leser sollten keine React-App herunterladen, nur um einen Absatz zu lesen. Das hier erhält der Browser tatsächlich bei einer 50-Seiten-Site:

| Generator | Gesamter initialer Load | JS-Payload | CSS-Payload |
|:----------|:----------------------:|:----------:|:----------:|
| **docmd** | **~18 KB** | ~12 KB | ~6 KB |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "Warum das wichtig ist" icon:lightbulb
Jede 100 KB JavaScript kosten auf einem Mittelklasse-Smartphone ~50 ms Parse-Zeit. docmds 12 KB JS bedeuten, dass Ihre Docs selbst in 3G-Netzen sofort laden. Docusaurus liefert für dieselben Inhalte 16× mehr JavaScript aus.
:::

## Build-Geschwindigkeit

Build der gleichen 50-Seiten-Site auf einem M1 MacBook Air:

| Generator | Cold Build | Hot Rebuild (Dev) |
|:----------|:----------:|:-----------------:|
| **docmd** | **~1,2 s** | **~80 ms** |
| VitePress | ~2,5 s | ~150 ms |
| MkDocs Material | ~3,0 s | ~500 ms |
| Docusaurus | ~15 s | ~2 s |

docmd-Rebuilds sind so schnell, dass die Seite aktualisiert ist, bevor Sie das Fenster wechseln.

## i18n, die mit fehlenden Übersetzungen umgeht

Die meisten Tools brechen zusammen, wenn ein Leser auf eine Sprache wechselt, in der einige Seiten noch nicht übersetzt sind. docmd fällt zur Build-Zeit auf die Standard-Locale zurück.

| Fähigkeit | docmd | VitePress | Docusaurus | Starlight |
|:-----------|:-----:|:---------:|:----------:|:---------:|
| Pro-Seite-Fallback auf Standard-Locale | ✅ | ❌ (404) | ❌ (404) | ✅ |
| Lokalisierter "Nicht übersetzt"-Hinweis | ✅ | ❌ | ❌ | ✅ |
| Fehlende Locales im Switcher automatisch ausblenden | ✅ | ❌ | ❌ | ❌ |
| Sofortige Page-Existence-Prüfung (ohne Netzwerk) | ✅ | ❌ | ❌ | ❌ |
| Versionierung + i18n kombiniert | ✅ | ❌ | ❌ | ❌ |
| Zero-Config (kein eigenes React/Vue) | ✅ | Teilweise | ❌ | ✅ |

::: callout warning "Was in VitePress und Docusaurus passiert" icon:info
Wechselt ein Leser auf Hindi und ist diese Seite nicht übersetzt, erhält er einen **404-Fehler**. Der einzige Workaround sind serverseitige Redirects oder das Schreiben einer benutzerdefinierten React/Vue-Komponente. docmd handhabt dies zur Build-Zeit — nicht verfügbare Locales zeigen ein "N/A"-Badge, und unübersetzte Seiten fallen still mit einem lokalisierten Warn-Callout zurück.
:::

## Workspace

Teams, die mehrere Produkte unter einer Domain pflegen (zum Beispiel eine Kern-Plattform und ein SDK), benötigen oft separate Docs mit unabhängiger Navigation und unabhängigen Release-Zyklen. Die meisten Generatoren erfordern entweder separate Deployments oder eigene Plugin-Verklebung.

| Fähigkeit | docmd | Docusaurus | VitePress | MkDocs | Starlight |
|:-----------|:-----:|:----------:|:---------:|:------:|:---------:|
| Native Workspace-Unterstützung | ✅ | Plugin | ❌ | Plugin | ❌ |
| Eine Config-Zeile pro Projekt | ✅ | ❌ | ❌ | ❌ | ❌ |
| Unabhängige Versionierung pro Projekt | ✅ | ✅ | ❌ | ❌ | ❌ |
| Unabhängige i18n pro Projekt | ✅ | ❌ | ❌ | ❌ | ❌ |
| Geteilte Assets über Projekte hinweg | ✅ | ❌ | ❌ | ❌ | ❌ |
| Ein einziges `site/`-Output (kein Proxy nötig) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Zero-Config-Erkennung | ✅ | ❌ | ❌ | ❌ | ❌ |

::: callout info "Wie docmd das macht" icon:info
```json "docmd.config.json"
{
  "workspace": {
    "projects": [
      { "prefix": "/", "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs", "title": "SDK" }
    ]
  }
}
```
Jeder Projektordner hat seine eigene `docmd.config.json` mit unabhängiger Konfiguration. Ein einziger `npx @docmd/core build` erzeugt ein einziges deploybares Verzeichnis — kein Reverse-Proxy, kein Nginx, keine separaten CI-Pipelines.
:::

Docusaurus erreicht ähnliche Ergebnisse durch Multi-Instance-Plugins, die separate Plugin-Einträge, Sidebar-Dateien und manuelle Routen-Konfiguration pro Instanz erfordern. MkDocs benötigt das Drittanbieter-Plugin `mkdocs-monorepo-plugin`. VitePress, Starlight und Mintlify haben keinerlei native Workspace-Unterstützung.

## Vollständige Feature-Matrix

| Feature | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
|:--------|:-----:|:----------:|:---------:|:---------------:|:---------:|:--------:|
| **Zero-Config-Start** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Config erforderlich** | Keine | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **Workspace** | ✅ | Plugin | ❌ | Plugin | ❌ | ❌ |
| **SPA-Navigation** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Native Versionierung** | ✅ | ✅ | ❌ | Plugin | ❌ | ✅ |
| **Native i18n** | ✅ | ✅ | Manuell | Plugin | ✅ | ✅ |
| **Eingebaute Suche** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | Cloud |
| **llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **MCP-Server** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Agent Skills** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Docker-Image** | ✅ | ❌ | ✅ | ❌ | ❌ | N/A |
| **Inline-Diskussionen** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA-Unterstützung** | ✅ | Community | ❌ | ❌ | ❌ | ❌ |
| **Self-hosted** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Deploy-Config-Generator** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## Config-Overhead

Anzahl der Config-Zeilen für eine Site mit Versionierung, i18n, Suche und Sitemap:

| Generator | Config-Zeilen | Erforderliche Dateien |
|:----------|:-------------:|:---------------------:|
| **docmd** | **~15 Zeilen** | 1 (`docmd.config.json`) |
| MkDocs Material | ~50 Zeilen | 1 + Plugins |
| VitePress | ~80 Zeilen | 1 + Theme-Verzeichnis |
| Docusaurus | ~120 Zeilen | 3+ Config-Dateien |

## Qualitätssicherung

docmd wird mit einer Brute-Test-Suite ausgeliefert, die **25 verschiedene Szenarien** über **85 Assertions** validiert — und jedes Feature sowohl isoliert als auch in Kombination abdeckt. Jedes Release muss alle 85 Assertions und 13 interne Failsafe-Prüfungen bestehen, bevor es ausgeliefert wird.

::: callout tip "Tests selbst ausführen" icon:lightbulb
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

Kein anderer Dokumentations-Generator dieser Klasse veröffentlicht eine vergleichbare End-to-End-Feature-Test-Suite als Teil seiner Quelle.
