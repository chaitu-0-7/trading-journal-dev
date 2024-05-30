# Builder Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]