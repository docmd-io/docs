---
title: "Vergleich"
description: "Ein faktischer Vergleich zwischen docmd und anderen Dokumentationsgeneratoren — echte Zahlen, echte Funktionen."
---

`docmd` besetzt die Nische zwischen einfachen Markdown-Parsern und schwerfälligen Framework-Anwendungen. Es bietet die Geschwindigkeit und SEO einer statischen Website mit dem interaktiven Gefühl einer modernen SPA — bei einem Bruchteil der Datenmenge.

## Feature-Matrix

| Feature | docmd | Docusaurus | MkDocs Material | VitePress | Mintlify |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sprache** | Node.js | React | Python | Vue | SaaS |
| **Konfiguration nötig** | **Nein** | `docusaurus.config.js` | `mkdocs.yml` | `config.mts` | `mint.json` |
| **Initialer Payload** | **~18kb** | ~250kb | ~40kb | ~50kb | ~120kb |
| **Navigation** | **SPA-Router** | React SPA | Full reloads | Vue SPA | Hosted SPA |
| **Versionierung** | **Nativ** | Nativ (komplex) | mike-Plugin | Manuell | Nativ |
| **i18n** | **Nativ** | Nativ (komplex) | Plugin-basiert | Manuell | Nativ |
| **Suche** | **Integriert** | Algolia (Cloud) | Integriert | MiniSearch | Cloud |
| **PWA** | **Optionales Plugin** | Community-Plugin | Keine | Keine | Hosted |
| **llms.txt** | **Integriert** | Manuell | Keine | Keine | Proprietär |
| **Diskussionen** | **Threads-Plugin** | Keine | Keine | Keine | Keine |
| **Self-hosted** | **Ja** | Ja | Ja | Ja | Nein |
| **Zero-Config Start** | **`docmd dev`** | Nein | Nein | Nein | Nein |

## Die Zahlen

### Build-Payload
Eine Dokumentationsseite mit 50 Seiten und Standardkonfiguration:

| Generator | Initialer Seitenaufruf | JS-Payload | CSS-Payload |
| :--- | :--- | :--- | :--- |
| **docmd** | **~18kb** gesamt | ~12kb | ~6kb |
| VitePress | ~50kb gesamt | ~35kb | ~15kb |
| MkDocs Material | ~40kb gesamt | ~25kb | ~15kb |
| Docusaurus | ~250kb gesamt | ~200kb | ~50kb |

### Build-Geschwindigkeit
Bauen derselben 50-seitigen Website auf einem M1 MacBook Air:

| Generator | Cold Build | Hot Rebuild (dev) |
| :--- | :--- | :--- |
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |