# API Dockerfile - Multi-stage build for Bun
#
# Build: docker build -t boilerplate-api .
# Run: docker run -p 3000:3000 --env-file .env boilerplate-api

# Stage 1: Install dependencies
FROM oven/bun:1 AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY packages/dtos/package.json ./packages/dtos/

# Install dependencies
RUN bun install --frozen-lockfile

# Stage 2: Build
FROM oven/bun:1 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN cd apps/api && bunx prisma generate

# Stage 3: Production
FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono
USER hono

# Copy necessary files
COPY --from=builder --chown=hono:nodejs /app/apps/api ./apps/api
COPY --from=builder --chown=hono:nodejs /app/packages ./packages
COPY --from=builder --chown=hono:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=hono:nodejs /app/package.json ./package.json

EXPOSE 3000

CMD ["bun", "run", "apps/api/src/index.ts"]
