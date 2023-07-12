FROM nginx:1.15-alpine

COPY apps/wavemail/nginx.conf /etc/nginx/nginx.conf
COPY dist/apps/wavemail /usr/share/nginx/wavemail

CMD nginx -g "daemon off;"
