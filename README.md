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
- **Better Auth** - Authentication library with Prisma adapter
- **Zod** - TypeScript-first schema validation

### Web (`apps/web`)

- **React 19** - UI library
- **TanStack Router** - File-based routing with full type safety
- **TanStack Query** - Powerful data fetching and caching
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Next-generation frontend build tool
- **React Hook Form** - Performant form handling
- **Better Auth** - Authentication client with React hooks

### Shared Packages

- **@repo/dtos** - Shared Data Transfer Objects and Zod schemas

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.3.4
- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/) (optional, for local PostgreSQL)

### Database with Docker

The project includes a `compose.yaml` file to easily spin up a local PostgreSQL database using Docker:

```bash
# Start PostgreSQL container
docker compose up -d

# Verify the container is running
docker compose ps

# Stop the container
docker compose down

# Stop and remove data (reset database)
docker compose down -v
```

**Default configuration:**
| Variable | Value |
|----------|-------|
| Host | `localhost` |
| Port | `5432` |
| User | `postgres` |
| Password | `password` |
| Database | `boilerplate_db` |

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables
cp apps/api/.env.example apps/api/.env
# Edit .env with your database credentials and generate a secret
```

### Database Setup

```bash
# Generate Prisma client
cd apps/api
bunx prisma generate

# Push schema to database
bunx prisma db push
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

## Testing

The boilerplate includes a complete testing setup with unit tests and E2E tests.

### API Tests (Vitest)

```bash
# Run API unit tests
cd apps/api
bun run test

# Run tests in watch mode
bun run test --watch
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
cd apps/web
bun run test:e2e

# Run tests with UI
bunx playwright test --ui

# Show last test report
bunx playwright show-report
```

### Run All Tests

```bash
# From root directory
bun run test
```

## Authentication

This boilerplate includes a complete authentication system powered by [Better Auth](https://better-auth.com/).

### Features

- Email/password sign up and sign in
- Session management with secure cookies
- Protected routes (frontend and API)
- Type-safe authentication across the stack

### API Endpoints

| Endpoint                     | Method | Description                 |
| ---------------------------- | ------ | --------------------------- |
| `/api/v1/auth/sign-up/email` | POST   | Register new user           |
| `/api/v1/auth/sign-in/email` | POST   | Sign in with email/password |
| `/api/v1/auth/sign-out`      | POST   | Sign out                    |
| `/api/v1/auth/session`       | GET    | Get current session         |
| `/health`                    | GET    | Health check endpoint       |

### Frontend Routes

| Route        | Description                         |
| ------------ | ----------------------------------- |
| `/login`     | Login page                          |
| `/register`  | Registration page                   |
| `/dashboard` | Protected dashboard (requires auth) |

### Protecting Routes

Use the `ProtectedRoute` component to protect any page:

```tsx
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content requires authentication</div>
    </ProtectedRoute>
  );
}
```

### Using Session Data

```tsx
import { authClient } from "../lib/auth-client";

function MyComponent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Welcome, {session.user.name}!</div>;
}
```

## Project Structure

```
boilerplate-hono-react/
├── apps/
│   ├── api/          # Hono backend API
│   │   ├── src/
│   │   │   ├── lib/          # Auth config, Prisma client
│   │   │   ├── modules/      # Feature modules (auth, comment)
│   │   │   └── index.ts      # API entry point
│   │   └── prisma/           # Database schema
│   └── web/          # React frontend
│       └── src/
│           ├── components/   # UI and auth components
│           ├── routes/       # File-based routes (TanStack Router)
│           └── lib/          # Auth client, API client
├── packages/
│   ├── config/       # Shared ESLint and TypeScript configs
│   └── dtos/         # Shared DTOs and Zod schemas
├── vitest.config.ts  # Root test configuration
└── package.json      # Root workspace configuration
```

## Roadmap

- [x] **Testing** - Vitest for unit tests, Playwright for E2E tests
- [x] **Authentication** - Better Auth integration
- [x] **API Versioning** - Routes prefixed with `/api/v1/`
- [x] **Docker** - Production Dockerfiles for API and web
- [x] **Dev Tools** - Husky + lint-staged for pre-commit hooks
- [x] **E2E Testing** - Playwright configured with full test suite

## License

MIT
