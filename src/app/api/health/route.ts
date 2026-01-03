import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '~/db';

async function checkDatabase() {
  const startTime = performance.now();
  try {
    await db.execute(sql`SELECT 1`);
    const responseTimeMs = Math.round(performance.now() - startTime);

    return {
      status: 'connected' as const,
      responseTimeMs,
    };
  } catch (error) {
    const responseTimeMs = Math.round(performance.now() - startTime);

    return {
      status: 'disconnected' as const,
      responseTimeMs,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function GET() {
  const startTime = performance.now();
  const timestamp = new Date().toISOString();

  const database = await checkDatabase();

  const overallStatus =
    database.status === 'connected' ? ('ok' as const) : ('error' as const);
  const responseTimeMs = Math.round(performance.now() - startTime);

  const response = {
    status: overallStatus,
    database,
    timestamp,
    responseTimeMs,
  };

  return NextResponse.json(response, {
    status: overallStatus === 'ok' ? 200 : 503,
  });
}
