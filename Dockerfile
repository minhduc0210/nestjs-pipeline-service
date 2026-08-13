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
ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json

EXPOSE 5438

USER node:node

CMD ["node", "dist/main"]

