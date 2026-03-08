# syntax=docker/dockerfile:1

FROM caddy:2-alpine

WORKDIR /srv

# Copy static test-site files (index.html, assets, etc.)
COPY . /srv

EXPOSE 80

# Serve static files on port 80
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":80"]
