import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '~/lib/env';

const isBuildTime =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.argv.includes('build');

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  if (!isBuildTime) {
    process.exit(-1);
  }
});

export const db = drizzle(pool);
