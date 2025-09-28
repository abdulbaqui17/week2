FROM node:20-alpine
WORKDIR /app
COPY ../../package*.json ./
COPY ../../turbo.json ./
COPY ../../packages ./packages
COPY ../../package.json ./package.json
COPY ./package.json ./apps/workers/package.json
COPY ./tsconfig.json ./apps/workers/tsconfig.json
COPY apps/workers/src ./apps/workers/src
RUN npm ci || npm install
RUN npx turbo run build --filter=@pkg/*
WORKDIR /app/apps/workers
CMD ["npx", "tsx", "src/index.ts"]

