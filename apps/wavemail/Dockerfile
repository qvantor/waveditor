FROM caddy:2-alpine

COPY apps/wavemail/Caddyfile ./
COPY dist/apps/wavemail ./dist

EXPOSE 8080

ENTRYPOINT ["caddy", "run"]
