---
title: "Cloudflare Pages"
description: "Stellen Sie Ihre docmd-Dokumentation auf Cloudflares globalem Edge-Netzwerk bereit. CI/CD-bereit mit automatischen Builds."
---

[Cloudflare Pages](https://pages.cloudflare.com/) hostet Ihre docmd-Site auf Cloudflares globalem Edge-Netzwerk mit Zero-Config-CI/CD. Verbinden Sie Ihr Repository, und jeder Push löst einen automatischen Build und eine Bereitstellung aus.

## Dashboard-Einrichtung

1.  Gehen Sie zum [Cloudflare-Dashboard](https://dash.cloudflare.com/) und navigieren Sie zu **Workers & Pages → Create → Pages**.
2.  Verbinden Sie Ihren Git-Anbieter (GitHub oder GitLab) und wählen Sie Ihr Repository aus.
3.  Konfigurieren Sie die Build-Einstellungen:

    | Einstellung | Wert |
    |---------|-------|
    | Framework preset | `None` |
    | Build command | `npx @docmd/core build` |
    | Build output directory | `site` |

4.  Klicken Sie auf **Save and Deploy**.

Cloudflare Pages erkennt die statische Ausgabe und verteilt sie automatisch über sein Edge-Netzwerk.

## Benutzerdefinierte Domain

Fügen Sie unter **Pages → your project → Custom domains** eine benutzerdefinierte Domain hinzu. Cloudflare stellt automatisch ein SSL-Zertifikat bereit.

Setzen Sie das `url`-Feld in `docmd.config.json` so, dass es mit Ihrer Domain übereinstimmt. Dies stellt sicher, dass kanonische Tags, Sitemaps und das LLMs-Plugin korrekte absolute URLs generieren.

## CI/CD-Hinweise

Cloudflare Pages führt bei jedem Push auf den verbundenen Branch einen frischen CI/CD-Build aus. Sie benötigen keinen separaten GitHub-Actions-Workflow. Cloudflare verwaltet die Build-Pipeline.

::: callout info "Warum `npx @docmd/core`?"
In CI/CD-Umgebungen, in denen docmd nicht global installiert ist, ruft `npx @docmd/core` das Paket direkt ab und führt es aus. Wenn Ihr Projekt `@docmd/core` als `devDependency` auflistet, funktioniert die Ausführung von `npx @docmd/core build` nach `npm install` einwandfrei.
:::

## SPA-Routing

docmd generiert jede Seite als eigene `index.html`. Direkter URL-Zugriff funktioniert ohne Rewrite-Regeln. Es ist keine zusätzliche Cloudflare-Konfiguration erforderlich.
