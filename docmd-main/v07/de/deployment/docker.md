---
title: "Docker"
description: "docmd mit einem Docker-Container bereitstellen — mit einem einzigen Befehl."
---

`docmd` generiert statisches HTML — perfekt für leichtgewichtige, reproduzierbare Docker-Container.

## Dockerfile generieren

```bash
docmd deploy --docker
```

Dies erstellt ein `Dockerfile` und `.dockerignore` in Ihrem Projektstammverzeichnis, zugeschnitten auf Ihre Konfiguration:

- **Ihr Ausgabeverzeichnis** wird im `COPY`-Pfad verwendet (nicht hartcodiert `site/`)
- **Ihre exakte `@docmd/core`-Version** wird im Installationsschritt für reproduzierbare Builds fixiert
- **Ihre Konfigurationsdatei** wird an `docmd build` übergeben, wenn Sie einen nicht-standardmäßigen Namen verwenden

### Was generiert wird

Das Dockerfile verwendet einen optimierten Multi-Stage-Build:

1. **Stage 1 — Build**: Installiert Abhängigkeiten mit Layer-Caching (`package.json` wird zuerst kopiert), installiert die fixierte `@docmd/core`-Version und führt `docmd build` aus.
2. **Stage 2 — Serve**: Kopiert die gebaute Ausgabe in einen minimalen `nginx:alpine`-Container.

::: callout tip "Benutzerdefiniertes Nginx mit Docker"
Wenn Sie eine `nginx.conf` (via `docmd deploy --nginx`) vor dem Dockerfile generieren, wird sie automatisch erkannt und im Container konfiguriert.
:::

## Bauen und Ausführen

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Ihre Dokumentation ist jetzt unter `http://localhost:8080` erreichbar.

### Neu generieren

Konfiguration geändert? Führen Sie einfach `docmd deploy --docker` erneut aus — die Dateien werden immer neu generiert, um Ihre aktuelle `docmd.config.js` widerzuspiegeln.