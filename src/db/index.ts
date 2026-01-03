import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { envConfig } from '~/lib/env';

const pool = new Pool({
  connectionString: envConfig.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const db = drizzle(pool);
