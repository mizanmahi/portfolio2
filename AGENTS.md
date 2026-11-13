<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Monorepo layout

- `apps/frontend` contains the Next.js app. Read its bundled guides at `apps/frontend/node_modules/next/dist/docs/`.
- `apps/backend` contains the Fastify TypeScript API.
- Run workspace commands from this root with pnpm and Turborepo.
- Keep project skills in the root `.agents/skills/` directory and `skills-lock.json` at the root.
- `design.md` and `typography.md` below refer to the repository-root documents.

<!-- for the typography -->
look at the typography.md file for the font, size, and weight rules. This file is a single source of truth for typography on this project. Check it before adding anything new, fonts, sizes, weights, so later sections stay consistent with week 1.

<!-- for the design -->
look at the design.md file for the design decisions, color palette, and tech stack. This file is a single source of truth for design decisions on this project. Check it before adding anything new, colors, spacing, components, so later sections stay consistent with week 1.



## Backend Rules
- The backend project is located in the `apps/backend` directory. It is a Fastify TypeScript API.
- All backend code should be written in TypeScript.
- Do not use type any in the backend code. Use proper types and interfaces instead unless absolutely necessary.
- strictly follow the separation of concerns principle. repository layer, service layer, and controller layer should be clearly defined and separated.
- Use dependency injection for better testability and maintainability.
- Use async/await for asynchronous operations and handle errors properly.
- Prefer readable code over clever code.
- Use early returns where helpful.
- Keep functions small and focused.
- Reuse existing utilities/services/helpers.
- Avoid duplicate logic.
- Comment non-obvious code, but avoid redundant comments.
- Validate inputs.
- Keep response shape consistent.
- Handle errors safely with appropriate HTTP status codes.
- Never expose internal errors, stack traces, or sensitive information to clients.
- Keep controllers thin.
- Use structured logging instead of console.log.
- Add pagination to endpoints that return potentially large datasets.
- Make operations idempotent where appropriate, especially for payment and retryable operations.

## Database Rules

- Avoid unnecessary queries.
- Be careful with destructive operations.
- Think about race conditions.
- Avoid unnecessary database queries and prevent N+1 query problems.
- Use transactions when multiple database operations must succeed or fail together.