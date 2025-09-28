FROM node:20-alpine AS base
WORKDIR /app
COPY ../../package*.json ./
COPY ../../tsconfig.json ./
COPY ../../turbo.json ./
COPY ../../packages ./packages
RUN npx prisma generate --schema packages/db/prisma/schema.prisma
COPY apps/apis/package.json ./apps/apis/package.json
COPY apps/apis/tsconfig.json ./apps/apis/tsconfig.json
COPY apps/apis/src ./apps/apis/src
RUN npm install
RUN npx tsc -b packages/validators
RUN npm run build --workspace apis || true

EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy --schema packages/db/prisma/schema.prisma && cd apps/apis && npm run dev"]

