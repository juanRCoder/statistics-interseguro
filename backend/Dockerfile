# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY packages ./packages
COPY backend/package.json ./backend/package.json
# COPY backend/prisma ./backend/prisma

RUN pnpm install --frozen-lockfile
# RUN pnpm --filter backend exec prisma generate

COPY backend ./backend
RUN pnpm --filter backend build


# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/dist ./backend/dist
# COPY --from=builder /app/backend/prisma ./backend/prisma

EXPOSE 3000

CMD ["node", "backend/dist/index.js"]