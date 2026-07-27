import { NextResponse } from 'next/server';

// This forces Next.js to evaluate this route at build time and cache it forever for this specific deployment.
// When a new deployment happens, this file is rebuilt and gets a new timestamp.
export const dynamic = 'force-static';

const BUILD_ID = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || Date.now().toString();

export async function GET() {
  return NextResponse.json({ version: BUILD_ID });
}
