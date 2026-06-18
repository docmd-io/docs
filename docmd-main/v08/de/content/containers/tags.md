---
title: "Tags"
description: "Verwenden Sie den Tag-Container, um Versionen, Status zu kennzeichnen oder kurze Textausschnitte inline hervorzuheben."
---

Der `tag`-Container ist eine selbstschließende Komponente, die kleine, pillenförmige Badges inline einfügt. Tags behalten überall ihre kompakten Proportionen — sie übernehmen keine Überschriftengrößen oder umgebenden Textstile.

## Syntax-Referenz

```markdown
::: tag "Label text" [property:value...]
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Label** | `"String"` | Der Text, der im pillenförmigen Badge angezeigt wird. |
| **Farbe** | `color:VALUE` | Wendet eine Hintergrundfarbe an (unterstützt CSS-Namen oder Hex-Codes). Berechnet automatisch eine kontrastreiche Textfarbe. |
| **Symbol** | `icon:NAME` | Fügt ein [Lucide](external:https://lucide.dev/icons)-Symbol im Badge hinzu. |
| **Link** | `link:URL` | Macht den Tag zu einem klickbaren Hyperlink. Externe URLs öffnen in einem neuen Tab. |

## Beispiele

### Versions-Badge

Verwenden Sie einen farbigen Tag inline, um zu kennzeichnen, wann ein Feature eingeführt wurde.

```markdown
This feature was added in ::: tag "v0.8.2" color:blue and works perfectly.
```

This feature was added in ::: tag "v0.8.2" color:blue and works perfectly.

### Status-Labels

Verwenden Sie Tags für Statusindikatoren über eine Seite hinweg. Farben sind vollständig anpassbar.

```markdown
::: tag "Deprecated" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stable" color:#22c55e
::: tag "Verified" icon:check-circle color:#10b981
```

::: tag "Deprecated" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stable" color:#22c55e
::: tag "Verified" icon:check-circle color:#10b981

### Verlinkter Tag

Fügen Sie `link:` hinzu, damit ein Tag als Hyperlink fungiert — nützlich für Querverweise auf Release Notes oder externe Ressourcen.

```markdown
Check out the latest ::: tag "Release Notes" icon:external-link link:../../release-notes/0-8-2.md
```

Check out the latest ::: tag "Release Notes" icon:external-link link:../../release-notes/0-8-2.md