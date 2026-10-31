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

::: callout tip "Plugin deaktivieren" icon:slash
Um die clientseitige Codeausführung auf der gesamten Website zu deaktivieren, setzen Sie `"playground": false` unter `"plugins"` in `docmd.config.json`.
:::
