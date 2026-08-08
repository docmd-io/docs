---
title: "Vergleich"
description: "Wie sich docmd gegen Docusaurus, VitePress, MkDocs, Starlight und Mintlify schlägt — echte Zahlen, echte Features."
---

So schlägt sich `docmd` im Vergleich zu den Alternativen — gemessen an einer 50-Seiten-Dokumentationsseite auf identischer Hardware.

## In 3 Sekunden schreiben statt in 30 Minuten

::: tabs
== tab "docmd" icon:rocket
```bash
npx @docmd/core dev
```
Fertig. Ihre Dokumentation ist live. Keine Konfigurationsdateien, kein Projekt-Scaffolding, kein Dependency-Dschungel.

== tab "Docusaurus" icon:box
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
Vier Befehle, ein generiertes Projekt mit rund 250 MB in `node_modules` und eine Konfigurationsdatei, die bearbeitet werden muss, bevor irgendetwas Sinnvolles rendert.

== tab "VitePress" icon:zap
```bash
npx vitepress init
```
Stellt 5 interaktive Fragen, generiert Konfigurationsdateien und führt dann `vitepress dev` aus. Sauber, erfordert aber dennoch Projekt-Scaffolding.

== tab "MkDocs" icon:terminal
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python-Ökosystem-Abhängigkeit. Erfordert `pip`, eine virtuelle Umgebung und eine `mkdocs.yml`, bevor die erste Seite rendert.
:::

## Der Payload-Unterschied ist real

Leser sollten kein mehere Megabyte großes JavaScript-Framework-Bundle herunterladen müssen, um technischen Text zu lesen. Hier ist der tatsächliche Browser-Netzwerk-Payload bei einer 50-Seiten-Seite:

| Generator | Gesamter initialer Load | JS-Payload | CSS-Payload |
| :--- | :---: | :---: | :---: |
| **docmd** | **~18 KB** | **~12 KB** | **~6 KB** |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "Warum die Payload-Größe wichtig ist" icon:lightbulb
Jede 100 KB JavaScript kosten ~50ms Parse- und Ausführungszeit auf einem Mittelklasse-Mobilprozessor. `docmd`s 12 KB JavaScript-Fußabdruck sorgt für sofortiges Seitenrendering selbst auf eingeschränkten Mobilverbindungen. Docusaurus überträgt 16× mehr JavaScript für identische Inhalte.
:::

## Build-Performance

Cold-Build- und Hot-Rebuild-Benchmarks für eine 50-Seiten-Seite auf einem M1 MacBook Air:

| Generator | Cold Build | Hot Rebuild (Dev) |
| :--- | :---: | :---: |
| **docmd** | **~1,2s** | **~80ms** |
| VitePress | ~2,5s | ~150ms |
| MkDocs Material | ~3,0s | ~500ms |
| Docusaurus | ~15s | ~2s |

`docmd`-Rebuilds erfolgen sofort und aktualisieren den Browser, bevor der Fensterfokus wechselt.

## i18n, die fehlende Übersetzungen elegant handhabt

Die meisten Dokumentationsgeneratoren schlagen fehl, wenn ein Benutzer zu einer Sprache wechselt, in der bestimmte Seiten keine Übersetzung haben. `docmd` löst Fallbacks auf die Standard-Locale automatisch zur Build-Zeit auf.

| Funktion | docmd | VitePress | Docusaurus | Starlight |
| :--- | :---: | :---: | :---: | :---: |
| Pro-Seite-Fallback auf Standard-Locale | ✅ | ❌ (404) | ❌ (404) | ✅ |
| Lokalisierter "Nicht übersetzt"-Hinweis | ✅ | ❌ | ❌ | ✅ |
| Fehlende Locales im Umschalter automatisch ausblenden | ✅ | ❌ | ❌ | ❌ |
| Sofortige Page-Existence-Prüfung (ohne Netzwerk) | ✅ | ❌ | ❌ | ❌ |
| Versionierung + i18n kombiniert | ✅ | ❌ | ❌ | ❌ |
| Zero-Config (kein benutzerdefiniertes React/Vue) | ✅ | Teilweise | ❌ | ✅ |

::: callout warning "404-Fehler in VitePress und Docusaurus" icon:info
Wechselt ein Leser zu einer Locale, in der eine bestimmte Seite nicht übersetzt wurde, lösen VitePress und Docusaurus einen **404-Fehler** aus. Dies zu verhindern erfordert benutzerdefinierte Server-Redirects oder eigene Framework-Komponenten. `docmd` handhabt fehlende Übersetzungen zur Build-Zeit — unübersetzte Seiten fallen nahtlos mit einem lokalisierten Benachrichtigungs-Callout zurück.
:::

## Multi-Projekt-Workspace-Unterstützung

Teams, die mehrere Produkte unter einer einzigen Domain verwalten (wie eine Plattform-Core, SDKs und CLI-Tools), benötigen eine unabhängige Navigation, unterschiedliche Konfigurationen und separate Release-Zyklen.

| Funktion | docmd | Docusaurus | VitePress | MkDocs | Starlight |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Native Workspace-Unterstützung | ✅ | Plugin | ❌ | Plugin | ❌ |
| Einzelne Config-Zeile pro Projekt | ✅ | ❌ | ❌ | ❌ | ❌ |
| Unabhängige Versionierung pro Projekt | ✅ | ✅ | ❌ | ❌ | ❌ |
| Unabhängige i18n pro Projekt | ✅ | ❌ | ❌ | ❌ | ❌ |
| Geteilte Assets über Projekte hinweg | ✅ | ❌ | ❌ | ❌ | ❌ |
| Einzelne `site/`-Ausgabe (kein Proxy nötig) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Zero-Config-Erkennung | ✅ | ❌ | ❌ | ❌ | ❌ |

::: callout info "Native Workspace-Konfiguration" icon:info
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
Jeder Projektordner im Workspace behält seine eigene `docmd.config.json` für Overrides auf Projektebene. Die Ausführung von `npx @docmd/core build` kompiliert ein einheitliches, konsolidiertes Distributionsverzeichnis ohne Reverse-Proxies oder mehrstufige CI-Pipelines.
:::

Docusaurus erfordert komplexe Multi-Instanz-Plugin-Setups mit duplizierten Konfigurationsdateien. MkDocs ist vom `mkdocs-monorepo-plugin` abhängig. VitePress, Starlight und Mintlify bieten keine native Workspace-Unterstützung.

## Nativer KI-Assistent & BYOK-Architektur

Im Gegensatz zu älteren Dokumentationswerkzeugen, die auf teure proprietäre SaaS-Erweiterungen oder Cloud-Widgets von Drittanbietern angewiesen sind, enthält `docmd` einen nativen, RAG-gestützten KI-Assistenten (`@docmd/plugin-ai`) direkt in der Open-Source-Engine.

| KI- & Wissensfunktionen | docmd | Docusaurus | VitePress | MkDocs Material | Mintlify |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Interaktives KI-Widget** | ✅ (Eingebaut) | ❌ (Drittanbieter) | ❌ (Drittanbieter) | ❌ | ✅ (Cloud) |
| **BYOK (Bring Your Own Key)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Lokale Modell-Unterstützung (Ollama)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Zero-Config Cloud Relay** | ✅ | ❌ | ❌ | ❌ | ✅ (Nur SaaS) |
| **Domain-Origin-Sicherheitsprüfung** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Open Knowledge Format (OKF)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Nativer MCP-Server (`docmd mcp`)** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **Kontextdateien (`llms.txt`)** | ✅ | ❌ | ❌ | ❌ | ✅ |

::: callout tip "Warum BYOK für Dokumentationsteams wichtig ist" icon:shield
Cloud-Dokumentations-SaaS-Anbieter binden Teams an Gebühren pro Anfrage und proprietäre KI-Modelle. `docmd` bietet Teams vollständige Freiheit mit **BYOK (Bring Your Own Key)**: Verbinden Sie OpenAI, Anthropic, Gemini, DeepSeek, Groq oder lokal gehostete Ollama-Modelle bei voller Kontrolle über API-Budgets und Datenschutz.
:::

## Umfassende Feature-Matrix

| Feature | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Zero-Config-Start** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Config erforderlich** | Keine | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **Workspace-Monorepos** | ✅ | Plugin | ❌ | Plugin | ❌ | ❌ |
| **SPA-Navigation** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Native Versionierung** | ✅ | ✅ | ❌ | Plugin | ❌ | ✅ |
| **Native i18n** | ✅ | ✅ | Manuell | Plugin | ✅ | ✅ |
| **Eingebaute Suche** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | Cloud |
| **Interaktiver KI-Assistent** | ✅ (BYOK) | ❌ | ❌ | ❌ | ❌ | ✅ (Cloud) |
| **BYOK (Bring Your Own Key)** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **llms.txt-Unterstützung** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **OKF-Pakete (Wissen)** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Nativer MCP-Server** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Agent Skills** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Docker-Image** | ✅ | ❌ | ✅ | ❌ | ❌ | N/A |
| **Inline-Diskussionen** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA-Unterstützung** | ✅ | Community | ❌ | ❌ | ❌ | ❌ |
| **Self-hosted** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Deploy-Config-Generator** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## Konfigurations-Overhead

Anzahl der Konfigurationszeilen für eine Seite mit Versionierung, i18n, Suche und Sitemap-Generierung:

| Generator | Config-Zeilen | Erforderliche Dateien |
| :--- | :---: | :---: |
| **docmd** | **~15 Zeilen** | 1 (`docmd.config.json`) |
| MkDocs Material | ~50 Zeilen | 1 + Plugins |
| VitePress | ~80 Zeilen | 1 + Theme-Verzeichnis |
| Docusaurus | ~120 Zeilen | 3+ Config-Dateien |

## Automatische Qualitätssicherung

`docmd` wird mit einer umfassenden Integrationstest-Suite ausgeliefert, die **25 verschiedene Szenarien** über **85 Assertions** validiert — und jedes Kernfeature sowie Plugin isoliert und in Kombination abdeckt. Jedes Release muss alle 85 Assertions und 13 interne Failsafe-Prüfungen vor der Veröffentlichung bestehen.

::: callout tip "Test-Suite lokal ausführen" icon:lightbulb
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::
