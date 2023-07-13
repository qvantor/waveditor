FROM node:20-alpine
WORKDIR /app
COPY dist/apps/backend .
RUN npm install --omit=dev
RUN npx prisma generate
CMD npx prisma migrate deploy && node ./main.js
