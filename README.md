# Boilerplate Hono React

A modern full-stack monorepo boilerplate using Hono for the API and React for the frontend.

## Tech Stack

### Monorepo & Build Tools
- **Bun** - Fast JavaScript runtime and package manager
- **Turborepo** - High-performance build system for monorepos
- **TypeScript** - Type-safe JavaScript

### API (`apps/api`)
- **Hono** - Ultrafast web framework for the edge
- **Prisma** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL** - Relational database (via `pg` driver)
- **Zod** - TypeScript-first schema validation

### Web (`apps/web`)
- **React 19** - UI library
- **TanStack Router** - File-based routing with full type safety
- **TanStack Query** - Powerful data fetching and caching
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Next-generation frontend build tool
- **React Hook Form** - Performant form handling

### Shared Packages
- **@repo/dtos** - Shared Data Transfer Objects and Zod schemas

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) >= 1.3.4
- [Node.js](https://nodejs.org/) >= 18
- [PostgreSQL](https://www.postgresql.org/) database

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables
cp apps/api/.env.example apps/api/.env
# Edit .env with your database credentials
```

### Database Setup

```bash
# Generate Prisma client
cd apps/api
bunx prisma generate

# Run migrations
bunx prisma migrate dev
```

### Development

```bash
# Run all apps in development mode
bun run dev

# Or run individually:
cd apps/api && bun run dev   # API on http://localhost:3000
cd apps/web && bun run dev   # Web on http://localhost:5173
```

### Build

```bash
# Build all apps
bun run build
```

## Project Structure

```
boilerplate-hono-react/
├── apps/
│   ├── api/          # Hono backend API
│   │   ├── src/
│   │   │   ├── modules/      # Feature modules (e.g., comment)
│   │   │   └── index.ts      # API entry point
│   │   └── prisma/           # Database schema and migrations
│   └── web/          # React frontend
│       └── src/
│           ├── routes/       # File-based routes (TanStack Router)
│           └── lib/          # Utilities and API client
├── packages/
│   └── dtos/         # Shared DTOs and Zod schemas
└── package.json      # Root workspace configuration
```

## Roadmap

- [ ] **Testing** - Add a testing framework (Vitest for unit tests, Playwright for E2E)
- [ ] **Authentication** - Integrate [Better Auth](https://better-auth.com/) for secure authentication

## License

MIT
