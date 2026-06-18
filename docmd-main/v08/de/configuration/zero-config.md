---
title: "Zero-Config"
description: "Verstehen Sie die Heuristik-Engine von docmd, die Ihre Site ohne Konfigurationsdateien automatisch strukturiert."
---

`docmd` verfügt über eine intelligente Heuristik-Engine, die Ihre Dokumentation automatisch parst und strukturiert. Sie können mit dem Erstellen, Bereitstellen und Übersetzen Ihrer Dokumentation beginnen, ohne eine einzige Zeile Konfiguration zu schreiben.

## Funktionsweise

Wird `docmd` ohne `docmd.config.json`-Datei ausgeführt, wechselt die Engine automatisch in den **Zero-Config-Modus**. Sie durchsucht das Workspace-Verzeichnis nach Inhalten und wendet die folgenden Heuristiken an:

### 1. Quellverzeichniserkennung

Die Engine sucht in dieser Reihenfolge nach Dokumentationsdateien in den folgenden Kandidatenverzeichnissen:
1.  `docs/`
2.  `src/docs/`
3.  `documentation/`
4.  `content/`
5.  `.` (Root-Verzeichnis-Fallback)

Wird eines der Kandidatenverzeichnisse gefunden und enthält es Markdown-Dateien, wird es als Quelle gewählt. Wird kein Verzeichnis gefunden, der Projektstamm enthält jedoch Markdown-Dateien, wird der Root verwendet (automatisch ausgeschlossen werden `node_modules`, `.git` sowie Ausgabeordner wie `site/`, `dist/` und `out/`).

Wird überhaupt kein Dokumentationsinhalt gefunden, initialisiert `docmd` automatisch eine neue Starter-Struktur.

### 2. Heuristiken für Versionen und Sprachen

Die Ordnerstruktur wird gescannt, um Versions- und Lokalisierungsmetadaten dynamisch zu extrahieren:
-   **Versionen**: Unterverzeichnisse, die `v[0-9]+` entsprechen (z. B. `v1.0`, `v08`), werden als Dokumentationsversionen geparst.
-   **Sprachen**: Unterverzeichnisse mit zweistelligen Sprachcodes (z. B. `en`, `de`, `zh`) werden als lokalisierte Varianten behandelt.
-   **Strukturextraktion**: Die höchste Version wird als aktuelle Veröffentlichung festgelegt, und die zuerst gefundene Sprache (mit Priorität auf `en`) wird als Standardsprache gesetzt.

### 3. Automatisches Navigations-Routing

Existieren keine Root-Versionen oder Sprachen, baut die Engine die Navigationsstruktur dynamisch aus der Dateistruktur auf:
- Unterverzeichnisse werden auf Navigationsgruppen abgebildet.
- Titel werden dynamisch aus den Datei-Basenamen erzeugt. Z. B. wird `getting-started.md` zu `Getting Started` formatiert.
- Indexdateien (`index.md`, `README.md`) werden als Landingpage des aktuellen Verzeichnisses geroutet.

## Zero-Config-Best Practices

Um das Beste aus dem Zero-Config-Modus herauszuholen, befolgen Sie diese Struktur-Empfehlungen:

-   **Explizite Dateibenennung**: Verwenden Sie klare, mit Bindestrichen versehene oder camelCase-Dateinamen. Der Autoloader konvertiert sie in lesbare Titel.
-   **Ordnerbasierte Sektionen**: Platzieren Sie zusammengehörige Dokumente in Unterordnern, um sie in der Sidebar automatisch zu gruppieren.
-   **Index-Fallback**: Legen Sie immer eine `index.md` oder `README.md` im Stamm Ihres Quellverzeichnisses ab, die als Landingpage dient.
-   **Sauberer Ausgabepfad**: Falls Sie den Root-Ordner `.` als Quelle verwenden, belassen Sie Ihre Build-Artefakte im Standard-Ordner `site/`, der automatisch ignoriert wird.

## Eingebaute Standardwerte (neu in 0.8.7)

Eine `docmd.config.json` (oder gar keine Konfiguration) liefert eine sofort nutzbare Site. Die folgenden Schlüssel werden mit sinnvollen Standards ausgeliefert, sodass Sie sie nur setzen müssen, wenn Sie einen anderen Wert wünschen.

::: callout info "So deaktivieren Sie einen Standard"
Setzen Sie den Schlüssel auf `false` (oder einen passenden leeren Wert), um einen Standard zu deaktivieren. Beispielsweise entfernt `pageNavigation: false` die Vor/Zurück-Links; `theme.appearance: "dark"` überschreibt den Farbmodus.
:::

### QoL-Standards auf oberster Ebene

| Schlüssel | Standard | Hinweise |
|---|---|---|
| `pageNavigation` | `true` | Vor/Zurück-Links am Ende jedes Artikels |
| `copyCode` | `true` | Code-Kopierschaltflächen auf `<pre>`-Blöcken |
| `autoTitleFromH1` | `true` | Erste `# H1` als Seitentitel verwenden, wenn das Frontmatter fehlt |

### Layout- und Sidebar-Standards

| Schlüssel | Standard | Hinweise |
|---|---|---|
| `layout.spa` | `true` | SPA-Navigation zwischen Seiten |
| `layout.breadcrumbs` | `true` | Brotkrumen-Zeile über dem Seiten-Header |
| `layout.header.enabled` | `true` | oberer Seiten-Header |
| `layout.sidebar.collapsible` | `true` | Sidebar kann auf Desktop zugeklappt werden |
| `layout.sidebar.defaultCollapsed` | `false` | Sidebar startet aufgeklappt |
| `layout.optionsMenu.position` | `"header"` | Optionsmenü (Suche / Theme-Switch / Sponsor) im Header |
| `layout.optionsMenu.components.search` | `true` | Suchauslöser im Menü |
| `layout.optionsMenu.components.themeSwitch` | `true` | Hell/Dunkel-Umschalter im Menü |
| `layout.optionsMenu.components.sponsor` | `null` | Opt-in — auf eine URL setzen, um zu aktivieren |

### Footer-Standards

| Schlüssel | Standard | Hinweise |
|---|---|---|
| `layout.footer.style` | `"minimal"` | einzeilige Footer-Leiste |
| `layout.footer.copyright` | `` `© ${new Date().getFullYear()}` `` | automatisch generiertes Copyright mit aktuellem Jahr |
| `layout.footer.branding` | `true` | "Built with docmd" standardmäßig anzeigen |

### Theme-Standards

| Schlüssel | Standard | Hinweise |
|---|---|---|
| `theme.name` | `"default"` | Basis-CSS-Theme; reservierte Werte: `default`, `sky`, `ruby`, `retro`. Jeder andere Wert wird automatisch zu einem [Template-Namen](../theming/templates.md) hochgestuft. |
| `theme.appearance` | `"system"` | Standard-Farbmodus (folgt `prefers-color-scheme`). Auf `"light"` oder `"dark"` setzen, um zu erzwingen. |
| `theme.codeHighlight` | `true` | Syntax-Highlighting auf `<pre>`-Blöcken |

### Neue Opt-in-Funktionen (standardmäßig aus)

| Schlüssel | Standard | Hinweise |
|---|---|---|
| `cookie` | `null` | Optionaler Cookie-Zustimmungsdialog — siehe [Cookie-Zustimmung](cookie-consent.md) |
| `layout.banner` | `null` | Optionale seitenweite Ankündigungsleiste — siehe [Site-Banner](site-banner.md) |
| `theme.template` | `null` | Optionale Template-Auswahl — siehe [Templates](../theming/templates.md) |

Die Standards wurden so gewählt, dass brandneue Sites ohne Konfiguration ein nutzbares Erscheinungsbild erhalten. Ältere Konfigurationen behalten ihre expliziten Werte — nur `undefined`-Schlüssel werden aufgefüllt.
