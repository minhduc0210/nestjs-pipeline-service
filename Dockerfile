# ==========================================
# Stage 1: Base configuration (shared by build + runtime)
# ==========================================
FROM node:24.19.0-alpine AS base

WORKDIR /app

# ==========================================
# Stage 2: Build & Dependency Isolation
# ==========================================
FROM base AS builder
# Install pnpm for building
RUN npm i -g pnpm@10.20.0

# Copy package files first to leverage Docker caching layers
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (needed for NestJS/TS compilation)
RUN pnpm i --ignore-scripts --frozen-lockfile

# Copy source code and build the application
COPY . .
RUN pnpm run build

# Sanity check on build output
RUN test -f dist/main.js

# Prune node_modules down to only production-required dependencies
RUN pnpm prune --prod --ignore-scripts

# ==========================================
# Stage 3: Final Production Runner
# ==========================================
FROM base AS runner 
LABEL maintainer="haquocminhduc@gmail.com"
LABEL version="1.0.0"
LABEL description="NestJS Pipeline Service Production Image"
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health/live || exit 1

USER node:node

CMD ["node", "dist/main"]

