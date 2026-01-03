import { defineConfig } from 'drizzle-kit';
import { envConfig } from './src/lib/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: envConfig.DATABASE_URL,
  },
});
