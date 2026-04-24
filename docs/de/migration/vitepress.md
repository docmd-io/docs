---
title: "Von VitePress migrieren"
description: "Ein umfassender Leitfaden zur Migration Ihres VitePress-Projekts zu docmd."
---

# Von VitePress migrieren

VitePress ist ein schnelles, Vue-basiertes SSG-Framework. Genau wie VitePress ist `docmd` außergewöhnlich schnell, erreicht dies jedoch, indem absolut keine JavaScript-Framework-Logik an den Client ausgeliefert wird (kein Overhead durch Vue-Hydration).

## Schritt 1: Führen Sie die Migrations-Engine aus

Führen Sie den folgenden Befehl im Hauptverzeichnis Ihres bestehenden VitePress-Projekts aus:

```bash
npx @docmd/core migrate --vitepress
```

### Was passiert automatisch

1.  **Backup**: Ihr gesamtes Projekt wird sicher in ein neues `vitepress-backup/`-Verzeichnis verschoben.
2.  **Inhaltsmigration**: Ihr `docs/`-Ordner wird im Stammverzeichnis wiederhergestellt, damit `docmd` ihn verwenden kann. Der versteckte `.vitepress`-Konfigurationsordner wird vollständig aus dem neuen `docs/`-Verzeichnis entfernt, um Konflikte zu vermeiden.
3.  **Konfigurationsgenerierung**: Eine `docmd.config.js` wird generiert, die Ihren Website-`title` aus Ihrer `.vitepress/config.js` oder `.ts` extrahiert.

## Schritt 2: Testen Sie das Setup

Sobald der Befehl abgeschlossen ist, können Sie Ihre Inhalte in `docmd` in der Vorschau anzeigen:

```bash
npx @docmd/core dev
```

Ihre Markdown-Dateien werden kompiliert, aber Ihre Navigations-Sidebar bleibt zunächst leer.

## Schritt 3: Manuelle Konfiguration

VitePress konfiguriert die Navigation in seiner Konfigurationsdatei und verwendet Vue-Komponenten innerhalb von Markdown. Sie müssen diese auf `docmd` umstellen.

### 1. Navigations-Setup

VitePress verwendet ein Array von Objekten unter `themeConfig.sidebar`.

**Aktion erforderlich:** Erstellen Sie eine `navigation.json` in Ihrem `docs/`-Verzeichnis.

**VitePress (`.vitepress/config.js`):**
```js
themeConfig: {
  sidebar: [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/introduction' },
        { text: 'Getting Started', link: '/getting-started' }
      ]
    }
  ]
}
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guide",
    "collapsible": true,
    "children": [
      { "title": "Introduction", "path": "/introduction" },
      { "title": "Getting Started", "path": "/getting-started" }
    ]
  }
]
```

### 2. Vue-Komponenten ersetzen

VitePress erlaubt es Autoren, Vue-Komponenten (z. B. `<MyComponent />`) direkt in Markdown-Dateien einzubetten. Da `docmd` Vue nicht auf dem Client ausführt, müssen Sie diese benutzerdefinierten Komponenten entfernen oder durch natives Markdown ersetzen.

**Aktion erforderlich:** Ersetzen Sie Vue-spezifische UI-Komponenten durch `docmd` [Container](/content/containers/callouts).

#### Beispiel: Admonitions (Benutzerdefinierte Container)

VitePress verwendet eine benutzerdefinierte Block-Syntax für markdown-it, die der von `docmd` sehr ähnlich sieht.

**VitePress:**
```markdown
::: info
This is an info box.
:::
```

**docmd:**
```markdown
::: info
This is an info box.
:::
```
*Hinweis: VitePress verwendet `info`, `tip`, `warning`, `danger`, `details`. `docmd` unterstützt diese direkt, aber Sie möchten sich möglicherweise die vollständige Liste der [docmd Callouts](/content/containers/callouts) ansehen.*

## Nächste Schritte

- Entdecken Sie den `docmd`-Leitfaden [Bauen & Bereitstellen](/deployment), da `docmd` nicht auf die Build-Pipeline von Vite angewiesen ist.
