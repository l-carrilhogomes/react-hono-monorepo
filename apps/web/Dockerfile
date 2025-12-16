# Web Dockerfile - Multi-stage build
#
# Build: docker build -t boilerplate-web .
# Run: docker run -p 80:80 boilerplate-web

# Stage 1: Install dependencies
FROM oven/bun:1 AS deps
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY packages/dtos/package.json ./packages/dtos/

RUN bun install --frozen-lockfile

# Stage 2: Build
FROM oven/bun:1 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Build the frontend
RUN cd apps/web && bun run build

# Stage 3: Production - Nginx
FROM nginx:alpine AS runner

# Copy custom nginx config
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
