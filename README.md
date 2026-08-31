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
- Local SQLite persistence via Drizzle

## Tech Stack

- **Framework:** Next.js 16+ (App Router, SSR)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Database:** Drizzle ORM + SQLite
- **Validation:** Zod
- **Testing:** Vitest (unit), Playwright (e2e)
- **Package Manager:** pnpm

## Getting Started

```bash
pnpm install
pnpm db:push
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

Schema push (no migrations):

```bash
pnpm db:push
```

The SQLite database is stored at `data/odoback.db`.

## Testing

```bash
pnpm test        # unit tests
pnpm test:e2e    # e2e tests (builds first)
```

E2E tests use a separate `data/e2e.db` database.

## Cashback Tiers

| Tier | Avg Daily Mileage | Cashback |
|------|-------------------|----------|
| 1 | 0 – 14 km | 30% |
| 2 | 14.01 – 28 km | 20% |
| 3 | 28.01 – 42 km | 10% |
| — | > 42 km | 0% |

Submissions must be at least 10 days apart. Annual mileage must not exceed 15,000 km.

## Project Structure

```
src/
  app/            # Next.js routes and server actions
  components/     # UI components
  db/             # Drizzle schema and adapter
  hooks/          # Client-side state
  repositories/   # Data access layer
  schemas/        # Zod validation
  services/       # Business logic
  __tests__/      # Unit tests
e2e/              # Playwright tests
```

## Disclaimer

Estimates are for tracking purposes only. Etiqa's verification is final.

## License

MIT
