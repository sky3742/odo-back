import { execSync } from "node:child_process";
import { rmSync } from "node:fs";

export default async function globalSetup() {
  rmSync("data/e2e.db", { force: true });
  execSync("pnpm db:push", {
    env: { ...process.env, TURSO_DATABASE_URL: "file:./data/e2e.db" },
    stdio: "inherit",
  });
}
