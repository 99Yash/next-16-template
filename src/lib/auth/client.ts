import { nextCookies } from 'better-auth/next-js';
import { createAuthClient } from 'better-auth/react';
import { env } from '~/lib/env';

export const authClient = createAuthClient({
  baseURL:
    typeof window !== 'undefined'
      ? window.location.origin
      : env.NEXT_PUBLIC_APP_URL,
  plugins: [nextCookies()],
});
