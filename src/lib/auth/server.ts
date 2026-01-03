import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '~/db';
import * as schema from '~/db/schemas';
import { envConfig } from '~/lib/env';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  secret: envConfig.BETTER_AUTH_SECRET,
  baseURL: envConfig.BETTER_AUTH_URL || envConfig.NEXT_PUBLIC_APP_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(envConfig.GOOGLE_CLIENT_ID && envConfig.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            display: 'popup',
            prompt: 'select_account',
            clientId: envConfig.GOOGLE_CLIENT_ID,
            clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
});
