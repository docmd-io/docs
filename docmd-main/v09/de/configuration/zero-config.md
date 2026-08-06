---
title: "Zero-Config-Architektur"
description: "Entdecken Sie docmds Zero-Config-Heuristik-Engine, die Dokumentationsdateien automatisch findet, Pfade routet und Websites ohne Konfiguration strukturiert."
---

`docmd` verfügt über eine intelligente Heuristik-Engine, die entwickelt wurde, um Dokumentationen automatisch zu analysieren, zu entdecken und zu strukturieren. Entwickler können technische Websites kompilieren, bereitstellen und übersetzen, ohne eine einzige Zeile anfänglicher Konfiguration zu schreiben.

## Wie die heuristische Erkennung funktioniert

Wird `docmd` in einem Verzeichnis ohne `docmd.config.json`-Manifest ausgeführt, initialisiert die Engine den **Zero-Config-Modus**. Sie scannt den Workspace nach Dokumentationsinhalten und wendet automatisierte Heuristiken an:

::: steps

1. **Quellverzeichnis-Erkennung**: Scannt Kandidatenverzeichnisse in Prioritätsreihenfolge: `docs/`, `src/docs/`, `documentation/`, `content/` und `.` (Root-Verzeichnis-Fallback).
2. **Versions- & Locale-Extraktion**: Parst automatisch Versionsordner, die `v[0-9]+` entsprechen (z. B. `v1.0`, `v09`), und zweistellige Sprachcodes (z. B. `en`, `de`, `zh`).
3. **Automatisierte Sidebar-Routierung**: Generiert einen sauberen Navigationsbaum durch Analyse von Dateihierarchien und Konvertierung von mit Bindestrich versehenen Dateinamen (`getting-started.md` → `Getting Started`).

:::

Wenn im Ziel-Workspace kein Dokumentationsinhalt gefunden wird, initialisiert `docmd` automatisch ein frisches Starter-Template.

## Zero-Config-Verzeichnis-Konventionen

Um die Effektivität des Zero-Config-Modus zu maximieren, übernehmen Sie diese Verzeichnis-Konventionen:

- **Explizite Benennung**: Verwenden Sie klare Dateinamen mit Bindestrich oder camelCase. Der Autoloader wandelt sie in lesbare Sidebar-Beschriftungen um.
- **Verzeichnisgruppierung**: Gruppieren Sie zusammengehörige Markdown-Dokumente in Unterordnern, um automatisch einklappbare Sidebar-Kategorien aufzubauen.
- **Index-Fallback**: Platzieren Sie eine `index.md` oder `README.md` im Root jedes Inhaltsordners, damit diese als Standard-Startseite dient.
- **Sauberer Ausgabepfad**: Wenn Sie das Root-Verzeichnis `.` als Quellordner nutzen, werden erstellte statische Assets nach `./site/` ausgegeben, was von Versionskontrollen und Compilern automatisch ignoriert wird.

## Integrierte Standard-Verhaltensweisen

Eine `docmd`-Website funktioniert direkt nach der Installation mit vernünftigen Standardeinstellungen. Konfigurieren Sie individuelle Eigenschaften in `docmd.config.json` nur, wenn Sie Standardwerte überschreiben möchten.

::: callout info "Deaktivierung von Standards" icon:sliders
Um ein Standardverhalten zu deaktivieren, setzen Sie seinen Schlüssel auf `false` oder einen leeren Wert. Das Setzen von `pageNavigation: false` entfernt beispielsweise die unteren Navigationslinks für vorherige/nächste Seiten.
:::

### Top-Level-Standards

| Eigenschaft | Standard | Beschreibung |
| :--- | :--- | :--- |
| `pageNavigation` | `true` | Rendert Links zum vorherigen/nächsten Artikel am Ende von Seiten. |
| `copyCode` | `true` | Fügt Schaltflächen zum Kopieren an Codeblöcke an. |
| `autoTitleFromH1` | `true` | Löst fehlende Seitentitel mit der ersten `# H1`-Überschrift der Datei auf. |

### Layout- & UI-Standards

| Eigenschaft | Standard | Beschreibung |
| :--- | :--- | :--- |
| `layout.spa` | `true` | Clientseitiges Single-Page-Application-Routen-Routing. |
| `layout.breadcrumbs` | `true` | Kontextbezogene Breadcrumb-Leiste über den Seiten-Headern. |
| `layout.header.enabled` | `true` | Dauerhaft angezeigte obere Navigations-Headerleiste. |
| `layout.sidebar.collapsible` | `true` | Einklappbare Sidebar-Kategoriegruppen auf Desktop-Ansichten. |
| `layout.sidebar.defaultCollapsed` | `false` | Sidebar-Kategorien starten im ausgeklappten Zustand. |
| `layout.optionsMenu.position` | `"header"` | Platziert Such- und Theme-Bedienelemente im Header. |
| `layout.optionsMenu.components.search` | `true` | Aktiviert den integrierten Volltext-Such-Modal-Auslöser. |
| `layout.optionsMenu.components.themeSwitch` | `true` | Aktiviert den Schalter für den hellen/dunklen Erscheinungsmodus. |
| `layout.optionsMenu.components.sponsor` | `null` | Optionaler Sponsoring-Link-URL. |

### Footer-Standards

| Eigenschaft | Standard | Beschreibung |
| :--- | :--- | :--- |
| `layout.footer.style` | `"minimal"` | Kompakte einzeilige Footer-Leiste. |
| `layout.footer.copyright` | `` `© ${new Date().getFullYear()}` `` | Dynamische Urheberrechtszeile für das aktuelle Jahr. |
| `layout.footer.branding` | `true` | Zeigt den "Built with docmd"-Zuordnungslink an. |

### Theme- & Styling-Standards

| Eigenschaft | Standard | Beschreibung |
| :--- | :--- | :--- |
| `theme.name` | `"default"` | Basistheme (`default`, `sky`, `ruby`, `retro`). Eigene Namen werden automatisch zu [Template-Namen](../theming/templates.md) befördert. |
| `theme.appearance` | `"system"` | Standardfarbmodus nach Systemeinstellungen (`system`, `light`, `dark`). |
| `theme.codeHighlight` | `true` | Syntaxhervorhebung auf Codeblöcken. |

### Erweitertes Opt-in-Funktionsangebot

| Eigenschaft | Standard | Beschreibung |
| :--- | :--- | :--- |
| `cookie` | `null` | Opt-in-Cookie-Einwilligungsdialog. Siehe [Cookie-Zustimmung](./cookie-consent.md). |
| `layout.banner` | `null` | Opt-in-Website-Ankündigungsbanner. Siehe [Site-Banner](./site-banner.md). |
| `theme.template` | `null` | Opt-in-Auswahl eigener Website-Templates. Siehe [Templates](../theming/templates.md). |
