---
title: "Playground-Plugin"
description: "Interaktiver Live-Code-Runner und Komponenten-Playground mit Echtzeit-Konsolenausgabe, Live-HTML-Vorschau-Sandboxen und Zero-Config-Markdown-Containern."
---

Das `@docmd/plugin-playground`-Plugin bringt interaktive, ausführbare Codeblöcke und Live-Komponentenvorschauen direkt auf Ihre `docmd`-Website. Es ermöglicht Dokumentationsautoren, in sich geschlossene JavaScript-Ausführungen, Live-HTML/CSS-Komponenten und aktive Skriptdateien aus ihrem Repository einzubinden – ohne schwergewichtige Abhängigkeiten wie Monaco oder React.

::: callout success "Kern-Plugin im Lieferumfang von @docmd/core" icon:zap
Ab **v0.9.9** wird `@docmd/plugin-playground` standardmäßig mit `@docmd/core` ausgeliefert und ist standardmäßig aktiviert. Dank des bedingten Asset-Ladens von `docmd` laden Seiten ohne Playground-Blöcke **0 KB zusätzliche Assets**.
:::

## Hauptmerkmale

::: cards
::: card title="Zero-Config-Aktivierung" icon:play
Verwenden Sie ` ```js playground ` oder `::: playground`, um sofort eine interaktive Sandbox bereitzustellen.
:::
::: card title="Aktive Skript-Einbindung" icon:file-code
Verlinken Sie Quellskripte direkt über `::: playground src="./counter.js" /:::`, um Dokumentationsbeispiele synchron mit dem Projektcode zu halten.
:::
::: card title="Echtzeit-Konsolenerfassung" icon:terminal
Fängt `console.log()`, `console.info()`, `console.warn()` und `console.error()` in Echtzeit ab und formatiert Rückgabewerte übersichtlich.
:::
::: card title="Live-HTML- & CSS-Sandbox" icon:layout
Rendert interaktive UI-Komponenten in einem isolierten Vorschaufenster mit einfacher Umschaltung zwischen Konsole und Vorschau.
:::
::: card title="docmd-runtime-Integration" icon:braces
Direkter Zugriff auf die `window.docmd`-Laufzeitumgebung und reaktive Variablen über `docmd.var.get()` und `docmd.var.set()`.
:::
::: card title="Live- & Code-Umschalter" icon:columns
Interaktive Reiter in der Symbolleiste erlauben nahtloses Wechseln zwischen Live-Komponentenvorschau und Quellcode (`tabs`).
:::
::: card title="Fehlertoleranz & Warnungen" icon:shield-alert
Fehlende Skripte erzeugen ein unaufdringliches Warnbanner mit Fallback-Code; Laufzeitfehler werden strukturiert in der Konsole gemeldet.
:::
::: card title="Ultra-Leichtgewicht & Schnell" icon:feather
Reines Standard-JavaScript und CSS (< 10 KB Gesamtgröße) mit Tastaturkürzeln (`Cmd+Enter` / `Ctrl+Enter` zum Ausführen, `Tab` für Einrückung).
:::
:::

## Plugin-Konfiguration

Da `@docmd/plugin-playground` ein Kern-Plugin ist, ist keine Konfiguration erforderlich. Globale Standardwerte können in `docmd.config.json` angepasst oder deaktiviert werden:

```json "docmd.config.json"
{
  "plugins": {
    "playground": {
      "enabled": true,
      "theme": "default",
      "defaultLayout": "split"
    }
  }
}
```

### Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktiviert oder deaktiviert das Playground-Rendering global. |
| `theme` | `string` | `"default"` | Farbschema passend zum aktiven `docmd`-Layout (`default`, `dark`, `light`). |
| `defaultLayout` | `string` | `"split"` | Standardanordnung (`split` für nebeneinander oder `stacked` für untereinander). |

::: callout tip "Plugin deaktivieren" icon:slash
Um die clientseitige Codeausführung auf der gesamten Website zu deaktivieren, setzen Sie `"playground": false` unter `"plugins"` in `docmd.config.json`. Alle Playground-Blöcke werden dann als standardmäßige Syntax-Codeblöcke dargestellt.
:::

## Nutzungsoptionen

`docmd` bietet mehrere Möglichkeiten zum Verfassen von Playgrounds:

1. **[Container-Syntax-Anleitung](../content/containers/playground.md)**: Empfohlen für flexible Konfigurationen mit `title`, `icon`, `live`, `tabs`, `readonly` und Skripteinbindung via `src="..."`.
2. **Standard-Code-Fences**: Verwenden Sie ` ```js playground ` oder ` ```html playground ` für schnelle Inline-Beispiele.
3. **Selbstschließende Container**: Nutzen Sie `::: playground src="..." /:::`, um Dateien direkt aus dem Codebase einzubinden.

Vollständige Syntaxreferenzen und Live-Beispiele finden Sie in der **[Playground-Container-Referenz](../content/containers/playground.md)**.