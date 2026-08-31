# OdoBack

Track your mileage. Maximise your cashback.

OdoBack helps you monitor your odometer readings and calculate your Etiqa cashback tier based on average daily mileage. Submit readings at least 10 days apart and stay within the mileage limits to earn up to 30% cashback.

## Features

- Multiple cars with free-text identifiers
- Odometer submission tracking with date validation
- 10-day minimum submission gap enforcement
- Average daily mileage calculation
- Cashback tier display (30%, 20%, 10%)
- Maximum odometer limits per tier
- Submission history with per-row deletion
- Car name editing
- Local persistence via Drizzle + libSQL (SQLite locally, Turso in production)

## Tech Stack

- **Framework:** Next.js 16+ (App Router, SSR)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Database:** Drizzle ORM + libSQL (Turso)
- **Validation:** Zod
- **Testing:** Vitest (unit), Playwright (e2e)
- **Formatting:** Prettier, Husky, lint-staged, commitlint
- **Package Manager:** pnpm

## Getting Started

```bash
cp .env.example .env
pnpm install
pnpm db:push
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

Uses Turso/libSQL. Local dev defaults to `file:./data/odoback.db`. Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in `.env` for production.

Schema push (no migrations):

```bash
pnpm db:push
pnpm db:studio   # open Drizzle Studio
```

## Testing

```bash
pnpm test        # unit tests
pnpm test:e2e    # e2e tests (builds first)
```

E2E tests use a separate `data/e2e.db` database.

## Cashback Tiers

| Tier | Avg Daily Mileage | Cashback |
| ---- | ----------------- | -------- |
| 1    | 0 – 14 km         | 30%      |
| 2    | 14.01 – 28 km     | 20%      |
| 3    | 28.01 – 42 km     | 10%      |
| —    | > 42 km           | 0%       |

Submissions must be at least 10 days apart. Annual mileage must not exceed 15,000 km.

## Project Structure

```
src/
  app/            # Next.js routes and server actions
  components/     # UI components
  db/             # Drizzle schema and adapter
  hooks/          # Client-side state
  lib/            # Shared utilities (cn)
  repositories/   # Data access layer
  schemas/        # Zod validation
  services/       # Business logic
  utils/          # Helper functions
  __tests__/      # Unit tests
e2e/              # Playwright tests
```

## Disclaimer

Estimates are for tracking purposes only. Etiqa's verification is final.

## License

MIT
