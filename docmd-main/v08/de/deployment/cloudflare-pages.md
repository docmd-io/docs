---
title: "Cloudflare Pages"
description: "Stellen Sie Ihre docmd-Dokumentation auf Cloudflare Pages über das globale Edge-Netzwerk bereit. CI/CD-bereit mit automatischen Builds."
---

[Cloudflare Pages](https://pages.cloudflare.com/) hostet Ihre docmd-Website auf dem globalen Edge-Netzwerk von Cloudflare mit Zero-Konfigurations-CI/CD. Verbinden Sie Ihr Repository, und jeder Push löst einen automatischen Build und ein Deployment aus.

## Einrichtung im Dashboard

1.  Gehen Sie zum [Cloudflare Dashboard](https://dash.cloudflare.com/) und navigieren Sie zu **Workers & Pages → Create → Pages**.
2.  Verbinden Sie Ihren Git-Anbieter (GitHub oder GitLab) und wählen Sie Ihr Repository aus.
3.  Konfigurieren Sie die Build-Einstellungen:

    | Einstellung | Wert |
    | :--- | :--- |
    | Framework-Preset | `Keines` (`None`) |
    | Build-Befehl | `npx @docmd/core build` |
    | Ausgabe-Verzeichnis | `site` |

4.  Klicken Sie auf **Save and Deploy**.

Cloudflare Pages erkennt die statische Ausgabe und verteilt sie automatisch über sein Edge-Netzwerk.

## Eigene Domain

Fügen Sie eine benutzerdefinierte Domain unter **Pages → Ihr Projekt → Custom domains** hinzu. Cloudflare stellt automatisch ein SSL-Zertifikat bereit.

Setzen Sie das Feld `url` in der Datei `docmd.config.json` so, dass es Ihrer Domain entspricht. Dies stellt sicher, dass kanonische Tags, Sitemaps und das LLMs-Plugin korrekte absolute URLs generieren.

## CI/CD-Hinweise

Cloudflare Pages führt bei jedem Commit, der auf den verbundenen Branch gepusht wird, einen frischen CI/CD-Build aus. Sie benötigen keinen separaten GitHub Actions-Workflow. Cloudflare verwaltet die Build-Pipeline.

::: callout info "Warum `npx @docmd/core`?"
In CI/CD-Umgebungen, in denen docmd nicht global installiert ist, lädt `npx @docmd/core` das Paket direkt herunter und führt es aus. Wenn Ihr Projekt `@docmd/core` als `devDependency` auflistet, funktioniert die Ausführung von `npx @docmd/core build` nach `npm install` einwandfrei.
:::

## SPA-Routing

docmd generiert jede Seite als eigene `index.html`. Der direkte Zugriff auf URLs funktioniert ohne Rewrite-Regeln. Es ist keine zusätzliche Cloudflare-Konfiguration erforderlich.