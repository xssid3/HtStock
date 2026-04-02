# HTStock Monorepo

## Structure
- `/apps/frontend`: Next.js frontend application.
- `/apps/backend`: NestJS backend application.
- `docker-compose.yml`: Local infrastructure (PostgreSQL, Redis, MinIO).

## How to run locally
1. Start infrastructure: `docker-compose up -d`
2. Start backend: `cd apps/backend && npm run start:dev`
3. Start frontend: `cd apps/frontend && npm run dev`
