---
title: "Cloudflare Pages-Bereitstellung"
description: "Stellen Sie statische docmd-Dokumentations-Websites auf dem Cloudflare Pages Edge-Hosting bereit."
---

[Cloudflare Pages](https://pages.cloudflare.com/) hostet statische docmd-Dokumentations-Websites über das globale Edge-Netzwerk von Cloudflare mit integrierter Git-CI/CD-Integration.

## Dashboard-Einrichtungsschritte

1. Navigieren Sie im Cloudflare Dashboard zu **Workers & Pages → Create → Pages**.
2. Verknüpfen Sie Ihr Git-Anbieterkonto und wählen Sie das Ziel-Repository aus.
3. Konfigurieren Sie die Build-Variablen:

| Einstellungs-Parameter | Konfigurationswert |
| :--- | :--- |
| **Framework-Preset** | `None` |
| **Build-Befehl** | `npx @docmd/core build` |
| **Build-Ausgabeverzeichnis** | `site` |

4. Speichern und bereitstellen.

## Konfiguration benutzerdefinierter Domains

Fügen Sie benutzerdefinierte Domains in **Pages → Projekt → Benutzerdefinierte Domains** hinzu. TLS-Zertifikate werden automatisch bereitgestellt.

Setzen Sie die Eigenschaft `url` in `docmd.config.json` so, dass sie mit Ihrer Domain übereinstimmt:

```json "docmd.config.json"
{
  "url": "https://docs.example.com"
}
```

::: callout info "Build-Ausführung in CI/CD" icon:info
Die Ausführung von `npx @docmd/core build` in Cloudflare-Build-Umgebungen ruft `@docmd/core` bei Bedarf ab. Wenn `@docmd/core` in Ihren `devDependencies` der `package.json` aufgeführt ist, verwendet Cloudflare automatisch die installierte Version.
:::