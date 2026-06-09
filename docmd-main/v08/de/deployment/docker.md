---
title: "Docker"
description: "Führen Sie docmd in einem Docker-Container aus — verwenden Sie das offizielle vorgefertigte Image oder generieren Sie ein benutzerdefiniertes Dockerfile aus Ihrer Projektkonfiguration."
---

docmd generiert statisches HTML, was es ideal für leichtgewichtige, reproduzierbare Docker-Container macht. Es gibt zwei verschiedene Ansätze, abhängig von Ihrem Anwendungsfall.

## Offizielles Docker-Image

Das offizielle Image ermöglicht es Ihnen, Ihre Dokumentation zu erstellen und bereitzustellen, ohne lokal etwas zu installieren. Es unterstützt mehrere Architekturen (`linux/amd64` und `linux/arm64`).

### Schnellstart

```bash
# Ziehen Sie das neueste Image
docker pull ghcr.io/docmd-io/docmd:latest

# Erstellen Sie Ihre Dokumentation (mountet lokale Docs und gibt in ./site aus)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build

# Führen Sie die integrierte Demo-Site aus
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:latest
```

### Docker Compose

Verwenden Sie Docker Compose, um Build und Serving in einem Workflow zu kombinieren:

```yaml
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:latest
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
| Basis | Alpine Linux (minimale Dateigröße) |
| Sicherheit | Wird als non-root-Benutzer ausgeführt |
| Health-Checks | Integrierte Container-Zustandsüberwachung |
| SBOM | Software-Stückliste enthalten |
| Architekturen | `linux/amd64`, `linux/arm64` |

## Benutzerdefiniertes Dockerfile (über Deployer)

Für produktives Self-Hosting generieren Sie ein `Dockerfile`, das auf Ihre Projektkonfiguration zugeschnitten ist, mit dem [Deployer](./deployer):

```bash
npx @docmd/core deploy --docker
```

Dies generiert ein `Dockerfile` mit einem Multi-Stage-Build:
1. **Build-Stage** — installiert Ihre exakt gepinnte `@docmd/core`-Version und führt den Build aus.
2. **Serve-Stage** — kopiert die Ausgabe in ein minimales `nginx:alpine`-Image.

Generieren Sie Docker- und Nginx-Konfigurationen gemeinsam für ein vollständiges Self-Hosting-Setup:

```bash
npx @docmd/core deploy --docker --nginx
```

### Erstellen und Ausführen

```bash
docker build -t meine-docs .
docker run -p 8080:80 meine-docs
```

Ihre Dokumentation ist dann unter `http://localhost:8080` erreichbar.

::: callout tip "Neu generieren"
Konfiguration geändert? Führen Sie `npx @docmd/core deploy --docker` erneut aus. Verwenden Sie `--force`, um vorhandene Dateien zu überschreiben.
:::