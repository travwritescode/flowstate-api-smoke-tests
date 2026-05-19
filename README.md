# flowstate-api-tests-ts

Black-box HTTP tests for **[flowstate-api](https://github.com/travwritescode/flowstate-api)** — portfolio-focused, TypeScript-only consumer suite.

[![CI](https://github.com/travwritescode/flowstate-api-tests-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/travwritescode/flowstate-api-tests-ts/actions/workflows/ci.yml)

## Stack

| Piece | Role |
|--------|------|
| [Vitest](https://vitest.dev/) | Test runner |
| [Ky](https://github.com/sindresorhus/ky) | HTTP client (built on `fetch`) |
| [Zod](https://zod.dev/) | Runtime validation of JSON responses |
| [openapi-typescript](https://github.com/drwpow/openapi-typescript) | Optional OpenAPI → TS types (`npm run generate:types`) |

**Environment:** Use `API_BASE_URL`, not `BASE_URL`. Vitest/Vite reserve `BASE_URL` for asset paths (it defaults to `"/"`), which breaks URL validation if reused.

## Layout

```text
src/
  env.ts           # Zod-validated API_BASE_URL
  client.ts        # Anonymous / Bearer Ky clients
  schemas/         # Zod models mirroring API JSON
  api/             # Thin route helpers
  cases/           # Vitest specs
  generated/       # Optional output from openapi-typescript (gitignored)
```

## Prerequisites

- Node 20+
- A running flowstate-api (local or remote)

## Local run

1. Clone [flowstate-api](https://github.com/travwritescode/flowstate-api), configure `.env`, run migrations, start Uvicorn (see that repo’s README).
2. In this repo:

   ```bash
   cp .env.example .env   # optional; defaults to http://127.0.0.1:8000
   npm ci
   npm test
   ```

   Override the target:

   ```bash
   API_BASE_URL=http://127.0.0.1:8000 npm test
   ```

## CI (this repo)

GitHub Actions:

1. Checks out **this** repository (tests).
2. Checks out **flowstate-api** into `./flowstate-api` (see `repository:` in [.github/workflows/ci.yml](.github/workflows/ci.yml) — change it if your fork/org differs).
3. Installs Python deps, migrates SQLite, starts `uvicorn` on port 8000, waits for `GET /health`.
4. Runs `npm ci` and `npm test` with `API_BASE_URL=http://127.0.0.1:8000`.

## Optional: generate types from OpenAPI

With the API running:

```bash
export API_BASE_URL=http://127.0.0.1:8000
npm run generate:types
```

Output: `src/generated/openapi.d.ts` (gitignored). Keep **Zod** for runtime `parse` of live responses; generated types mainly help editor autocomplete.

## Optional: Pact

The API README mentions [Pactflow](https://pactflow.io/). A natural next step is adding `@pact-foundation/pact` consumer tests in this repo and publishing to your broker — not wired up here yet.

## License

Use the same license as your monorepo policy, or add a `LICENSE` when you publish.
