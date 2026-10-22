# Portfolio monorepo

A pnpm workspace managed by Turborepo, with a Next.js frontend and a Fastify TypeScript backend.

## Requirements

- Node.js 20.19 or newer (Node.js 24 LTS recommended)
- pnpm 12.14.0, as pinned in the root `package.json`
- Turborepo 2.11.10 (installed as a workspace development dependency)

Install pnpm with its lifecycle scripts enabled so its native launcher is available to Turbo. The workspace uses pnpm 12's `allowBuilds` settings and exact-version release-age exceptions for the pinned Turbo release and two existing lockfile entries; other dependency versions retain pnpm's default age check.

## Structure

```text
apps/
  frontend/           # Next.js app, components, and public assets
  backend/
    src/
      app.ts          # Fastify factory, also used by request tests
      config.ts       # Environment configuration and validation
      server.ts       # HTTP listener and graceful shutdown
      routes/         # Fastify route plugins
    test/             # Node.js tests using Fastify inject
.agents/skills/       # Shared skills stay at the repository root
skills-lock.json
design.md
typography.md
pnpm-workspace.yaml
turbo.json
```

## Development

Run from the repository root:

```bash
pnpm install
pnpm dev
```

- Frontend: <http://localhost:3000>
- Backend health check: <http://localhost:3001/health> returns `{"status":"ok"}`

Both apps watch for changes. To run just one:

```bash
pnpm dev:frontend
pnpm dev:backend
```

Edit the portfolio page at `apps/frontend/app/page.tsx`. Frontend aliases such as `@/components` resolve inside `apps/frontend`. Run shadcn commands from that directory so they use its `components.json`.

## Backend configuration

The backend starts with local development defaults. To customize them, copy the example and edit it:

```bash
cp apps/backend/.env.example apps/backend/.env
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | Listener address; use `0.0.0.0` in a container |
| `PORT` | `3001` | Backend HTTP port |
| `LOG_LEVEL` | `info` | Fastify's structured JSON log level |
| `CORS_ORIGIN` | `http://localhost:3000` | Comma-separated allowed frontend origins |

The backend's dev and start commands load `apps/backend/.env` when present; exported environment variables take precedence. Turbo passes these runtime variables through. Prefer the app-specific env file when running both apps, since exporting `PORT` for `pnpm dev` would give both servers the same port.

Frontend environment files belong in `apps/frontend` and follow Next.js conventions. The frontend currently has no API dependency. When adding browser API calls, configure their backend URL for each environment and update `CORS_ORIGIN` to the deployed frontend origin.

Add backend routes as Fastify plugins under `apps/backend/src/routes` and register them in `src/app.ts`. Keep listener and process lifecycle code in `src/server.ts` so tests can use `app.inject()` without binding a port.

## Checks and production

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

Turbo runs checks and builds across the workspaces and caches their results. `pnpm test` runs the backend suite; the frontend has no test suite yet. Frontend type checking generates Next.js route types before running TypeScript.

Build before running `pnpm start`. It starts both production servers using the frontend's `.next` output and the backend's compiled `dist/server.js`. For one app, use `pnpm --filter @portfolio/frontend start` or `pnpm --filter @portfolio/backend start` after building it.

For a frontend deployment on Vercel, set the project root directory to `apps/frontend` and enable access to files outside that directory so the root workspace and lockfile are available. Deploy the backend as a Node.js service with `pnpm --filter @portfolio/backend build` and `pnpm --filter @portfolio/backend start`.

Keep design and typography changes aligned with the root `design.md` and `typography.md`. Agent instructions, skills, and their lockfile remain at the root for both apps.
