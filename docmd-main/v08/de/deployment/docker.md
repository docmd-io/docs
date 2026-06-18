---
title: "Docker"
description: "Führen Sie docmd in einem Docker-Container aus — verwenden Sie das offizielle vorgefertigte Image oder generieren Sie eine benutzerdefinierte Dockerfile aus Ihrer Projektkonfiguration."
---

docmd erzeugt statisches HTML und ist damit ideal für leichtgewichtige, reproduzierbare Docker-Container. Je nach Anwendungsfall gibt es zwei verschiedene Ansätze.

## Offizielles Docker-Image

Das offizielle Image ermöglicht es Ihnen, Ihre Dokumentation zu bauen und auszuliefern, ohne etwas lokal zu installieren. Es unterstützt mehrere Architekturen (`linux/amd64` und `linux/arm64`).

### Schnellstart

```bash
# Neuestes Image ziehen
docker pull ghcr.io/docmd-io/docmd:0.8.6

# Dokumentation bauen (lokales docs einbinden und nach ./site ausgeben)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.8.6 build

# Eingebaute Demo-Site ausführen
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:0.8.6
```

### Docker Compose

Verwenden Sie Docker Compose, um Build und Serving in einem Workflow zu kombinieren:

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:0.8.6
    command: build
    volumes:
      - ./docs:/docs
      - ./site:/site
      - ./docmd.config.json:/docmd.config.json:ro

  serve:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
    depends_on:
      - docs
```

### Image-Details

| Eigenschaft | Wert |
|:--|:--|
| Basis | Alpine Linux (minimaler Platzbedarf) |
| Sicherheit | Läuft als Non-Root-Benutzer |
| Health Checks | Eingebautes Container-Health-Monitoring |
| SBOM | Software Bill of Materials-Attestierung enthalten |
| Architekturen | `linux/amd64`, `linux/arm64` |

## Benutzerdefinierte Dockerfile (über Deployer)

Für das Self-Hosting in der Produktion generieren Sie mit dem [Deployer](./deployer) eine auf Ihre Projektkonfiguration zugeschnittene `Dockerfile`:

```bash
npx @docmd/core deploy --docker
```

Dies generiert eine `Dockerfile` mit einem Multi-Stage-Build:
1. **Build-Stage** — installiert Ihre exakte gepinnte `@docmd/core`-Version und führt den Build aus.
2. **Serve-Stage** — kopiert die Ausgabe in ein minimales `nginx:alpine`-Image.

Generieren Sie Docker- und Nginx-Konfigurationen zusammen für ein komplettes Self-Hosting-Setup:

```bash
npx @docmd/core deploy --docker --nginx
```

### Bauen und Ausführen

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Ihre Dokumentation wird unter `http://localhost:8080` live sein.

::: callout tip "Neu generieren"
Konfiguration geändert? Führen Sie `npx @docmd/core deploy --docker` erneut aus, um neu zu generieren. Verwenden Sie `--force`, um vorhandene Dateien zu überschreiben.
:::
