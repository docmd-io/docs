---
title: "Threads-Plugin"
description: "Fügen Sie Inline-Diskussionsthreads zu Ihrer Dokumentation hinzu — direkt in Ihren Markdown-Dateien gespeichert."
---

Das **Threads-Plugin** bringt kollaborative Inline-Kommentare in Ihre Dokumentation. Wählen Sie Text aus, hinterlassen Sie einen Kommentar und starten Sie eine Diskussion. Alle Threads werden direkt in Ihren Markdown-Quelldateien gespeichert. Es ist keine Datenbank erforderlich.

Ursprünglicher Autor: [@svallory](external:https://github.com/svallory)

::: callout info "Alpha-Release"
Dieses Plugin befindet sich in der Alpha-Phase. Die API und das Speicherformat sind stabil. Die UI befindet sich noch in aktiver Entwicklung.
:::

## Konfiguration

Das Threads-Plugin ist ein optionales Plugin. Installieren Sie es über die CLI:

```bash
npx @docmd/core add threads
```

Aktivieren Sie es in Ihrer `docmd.config.json`.

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | Bei `true` bleiben Threads am unteren Seitenrand gruppiert. Bei `false` erscheinen Threads inline neben hervorgehobenem Text. |

### Beispiel

```json "docmd.config.json"
{
  "plugins": {
    "threads": {
      "sidebar": true
    }
  }
}
```

## Funktionsweise

1. **Wählen Sie Text** auf einer beliebigen Dokumentationsseite während `npx @docmd/core dev` aus.
2. Ein **Kommentar-Popover** erscheint. Schreiben Sie Ihren Kommentar und senden Sie ihn ab.
3. Der ausgewählte Text wird mit einer **Thread-Markierung** hervorgehoben.
4. Threads werden als `::: threads`-Blöcke am Ende der Markdown-Datei gespeichert.
5. **Keine Datenbank** ist erforderlich. Ihre Markdown-Dateien bleiben die einzige Quelle der Wahrheit.

## Vorschau

So sehen Threads auf einer Live-Seite aus. Text mit Diskussionen wird <span class="threads-preview-highlight">so hervorgehoben</span>. Thread-Karten erscheinen darunter.

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;2d ago</div>
    <div class="threads-preview-body">This section could use a diagram to explain the architecture. What do you think?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;1d ago</div>
    <div class="threads-preview-body">Good idea - I'll add a Mermaid flowchart. Does <code>sequenceDiagram</code> work here?</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;12h ago</div>
    <div class="threads-preview-body">Perfect. A simple flowchart would be ideal.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

Hier ist eine <span class="threads-preview-highlight-blue">zweite Hervorhebung mit anderer Farbe</span>. Threads durchlaufen automatisch eine Palette von Farben.

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;3d ago</div>
    <div class="threads-preview-body">Should we mention backward compatibility here?</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

Gelöste Threads werden abgedunkelt dargestellt:

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;5d ago&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ Resolved</span></div>
    <div class="threads-preview-body">Fixed the typo in the config example.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ New Comment</div>
  </div>
</div>

Ein schwebender **Diskussions-Button** <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span> erscheint in der unteren rechten Ecke. Er zeigt die Anzahl der offenen Threads an. Klicken Sie darauf, um zum ersten Thread auf der Seite zu springen.

## Speicherformat

Threads werden mit der Container-Syntax von docmd in Ihr Markdown eingebettet:

```markdown
# My Documentation Page

Some content with ==highlighted text=={t-a1b2c3d4} that has a thread.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      This text needs clarification.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Updated it - does this work?

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

Die Syntax `==text=={threadId}` verknüpft hervorgehobenen Text im Dokumentenkörper mit einem bestimmten Thread.

## Funktionen

| Funktion | Beschreibung |
| :--- | :--- |
| **Textauswahl** | Wählen Sie beliebigen Text aus, um einen neuen Thread zu starten. |
| **Antworten** | Verschachtelte Antwortketten innerhalb jedes Threads. |
| **Reaktionen** | Emoji-Reaktionen auf einzelne Kommentare. |
| **Bearbeiten / Löschen** | Ändern oder entfernen Sie Ihre Kommentare. |
| **Lösen** | Markieren Sie Threads als gelöst, mit Autor und Zeitstempel. |
| **Autorenprofile** | Git-basierte Autorenerkennung mit Gravatar-Unterstützung. |
| **Hervorhebungs-Markierungen** | Visuelle Indikatoren, die zeigen, wo Threads verankert sind. |
| **Schwebender Button** | Schnellzugriff-FAB mit Anzahl offener Threads. |
| **Scroll-Erhaltung** | Seite bleibt nach dem Hinzufügen von Kommentaren an Ort und Stelle. |

## Actions-API

Das threads-Plugin stellt die folgenden Actions über das WebSocket-RPC-System bereit. Rufen Sie diese aus Browser-Plugins mit `docmd.call()` auf:

| Action | Beschreibung |
| :--- | :--- |
| `threads:get-threads` | Parst und gibt alle Threads aus einer Datei zurück. |
| `threads:add-thread` | Erstellt einen neuen Thread mit seinem ersten Kommentar. |
| `threads:add-comment` | Fügt einem bestehenden Thread einen Kommentar hinzu. |
| `threads:edit-comment` | Bearbeitet den Text eines bestehenden Kommentars. |
| `threads:delete-comment` | Entfernt einen Kommentar aus einem Thread. |
| `threads:delete-thread` | Entfernt einen gesamten Thread und bereinigt Hervorhebungen. |
| `threads:resolve-thread` | Schaltet den Status gelöst/ungelöst um. |
| `threads:toggle-reaction` | Schaltet eine Emoji-Reaktion auf einem Kommentar um. |
| `threads:get-authors` | Liest die Autorenprofil-Zuordnung. |
| `threads:upsert-author` | Erstellt oder aktualisiert ein Autorenprofil. |

## Autorenprofile

Autoreninformationen werden in `<docsRoot>/.threads/authors.json` gespeichert:

```json ".threads/authors.json"
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

Während der Entwicklung erkennt das Plugin automatisch Ihren Git-Benutzernamen und Ihre E-Mail-Adresse zur Autorenerkennung.

::: callout tip "Versionskontrollen-freundlich"
Da Threads in Ihren Markdown-Dateien gespeichert sind, werden sie automatisch mit Git versionskontrolliert. Überprüfen Sie Kommentare in PRs, verfolgen Sie die Diskussionshistorie und arbeiten Sie über Ihren bestehenden Workflow zusammen.
:::
