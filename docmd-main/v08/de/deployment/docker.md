---
title: "Docker"
description: "docmd mit einem Docker-Container bereitstellen - mit einem einzigen Befehl."
---

`docmd` generiert statisches HTML - perfekt für leichtgewichtige, reproduzierbare Docker-Container.

## Offizielles Docker-Image

docmd ist als offizielles Docker-Image mit Multi-Architektur-Unterstützung (`linux/amd64` und `linux/arm64`) verfügbar.

### Schnellstart

```bash
# Ziehen Sie das neueste Image
docker pull ghcr.io/docmd-io/docmd:latest

# Erstellen Sie Ihre Dokumentation
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build

# Führen Sie die Demo-Site aus
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:latest
```

### Docker Compose

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

- **Basis**: Alpine Linux (minimale Dateigröße)
- **Sicherheit**: Wird als non-root-Benutzer ausgeführt
- **Health-Checks**: Integrierte Container-Zustandsüberwachung
- **SBOM**: Software-Stückliste (Software Bill of Materials) enthalten
- **Architekturen**: `linux/amd64`, `linux/arm64`

## Benutzerdefiniertes Dockerfile

Für fortgeschrittene Anwendungsfälle oder zum Selbstbauen können Sie ein benutzerdefiniertes `Dockerfile` und eine `.dockerignore`-Datei generieren, die auf Ihre Konfiguration abgestimmt sind:

```bash
docmd deploy --docker
```

So erstellen und führen Sie Ihren benutzerdefinierten Container aus:

```bash
docker build -t mein-doku-projekt .
docker run -p 8080:80 mein-doku-projekt
```

Ihre Dokumentation ist dann unter `http://localhost:8080` erreichbar.