import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// NOTE: we deliberately do NOT throw here if DATABASE_URL is missing.
// `pg.Pool` does not open a real connection until a query actually runs,
// so constructing it with an undefined connection string is safe at
// import/build time. Next.js imports this module while collecting page
// data for API routes during `next build`, and throwing here would break
// the production build even though the app never queries the DB at
// build time. Any real connection problem will surface as a normal
// runtime error the first time a query is executed.
export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
