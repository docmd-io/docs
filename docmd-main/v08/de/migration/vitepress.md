---
title: "Migration von VitePress"
description: "Ein umfassender Leitfaden zur Überführung Ihres VitePress-Projekts zu docmd."
---

# Migration von VitePress zu docmd

VitePress ist ein schnelles, Vue-basiertes SSG-Framework. docmd ist ebenso schnell, liefert jedoch keine JavaScript-Framework-Logik an den Client aus. Das eliminiert den Vue-Hydration-Overhead.

## Schritt 1: Migrations-Engine ausführen

Führen Sie den folgenden Befehl im Stammverzeichnis Ihres bestehenden VitePress-Projekts aus:

```bash
npx @docmd/core migrate --vitepress
```

### Was automatisch passiert

1.  **Backup**: Ihr gesamtes Projekt wird sicher in ein neues Verzeichnis `vitepress-backup/` verschoben.
2.  **Content-Migration**: Ihr `docs/`-Ordner wird in das Stammverzeichnis zurückgespielt, damit docmd ihn verwenden kann. Der versteckte Konfigurationsordner `.vitepress` wird vollständig entfernt, um Konflikte zu vermeiden.
3.  **Config-Generierung**: Eine `docmd.config.json` wird generiert, die den `title` Ihrer Site aus `.vitepress/config.js` oder `.ts` extrahiert.

## Schritt 2: Setup testen

Sobald der Befehl abgeschlossen ist, können Sie Ihre Inhalte in docmd in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Sidebar wird leer sein.

## Schritt 3: Manuelle Konfiguration

VitePress konfiguriert die Navigation in seiner Konfigurationsdatei und verwendet Vue-Komponenten innerhalb von Markdown. Sie müssen diese für docmd übersetzen.

### 1. Navigations-Einrichtung

VitePress verwendet ein Array von Objekten in `themeConfig.sidebar`.

**Erforderliche Aktion:** Erstellen Sie eine `navigation.json` in Ihrem `docs/`-Verzeichnis.

**VitePress (`.vitepress/config.js`):**
```javascript
themeConfig: {
  "sidebar": [
    {
      "text": "Leitfaden",
      "items": [
        { "text": "Einführung", "link": "/introduction" },
        { "text": "Erste Schritte", "link": "/getting-started" }
      ]
    }
  ]
}
```

**docmd (`navigation.json`):**
```json "navigation.json"
[
  {
    "title": "Leitfaden",
    "collapsible": true,
    "children": [
      { "title": "Einführung", "path": "/introduction" },
      { "title": "Erste Schritte", "path": "/getting-started" }
    ]
  }
]
```

### 2. Vue-Komponenten ersetzen

VitePress erlaubt Autoren, Vue-Komponenten direkt in Markdown-Dateien einzubetten. Da docmd Vue nicht auf dem Client ausführt, müssen Sie benutzerdefinierte Komponenten entfernen oder durch natives Markdown ersetzen.

**Erforderliche Aktion:** Ersetzen Sie Vue-spezifische UI-Komponenten durch docmd [Container](../content/containers/callouts.md).

#### Beispiel: Admonitions (benutzerdefinierte Container)

VitePress verwendet eine markdown-it-Custom-Block-Syntax, die docmd ähnlich sieht.

**VitePress:**
```markdown
::: info
Dies ist eine Info-Box.
:::
```

**docmd:**
```markdown
::: info
Dies ist eine Info-Box.
:::
```

::: callout success "Keine Änderungen erforderlich"
VitePress-Container-Syntax funktioniert **ohne jede Modifikation**. Die folgenden Aliase werden vollständig unterstützt:
- `:::tip` → rendert als `callout tip`
- `:::warning` → rendert als `callout warning`
- `:::danger` → rendert als `callout danger`
- `:::info` → rendert als `callout info`
- `:::details` → rendert als `collapsible`

Auch die spacing-freie Syntax wird unterstützt. Ihre bestehenden VitePress-Inhalte werden in docmd ohne Änderungen korrekt gerendert.
:::

## Nächste Schritte

- Erkunden Sie docmds [Build & Deploy](../deployment/index.md)-Leitfaden. docmd ist nicht auf Vites Build-Pipeline angewiesen.
- Überprüfen Sie die vollständige Liste der [docmd-Container](../content/containers/index.md) für zusätzliche UI-Komponenten.
