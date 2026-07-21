import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { listEndpoints, upsertEndpoint } from '@/lib/endpointsRepo';

export async function GET() {
  try {
    const endpoints = await listEndpoints();
    return NextResponse.json({ endpoints });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to list endpoints' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const endpoint = await req.json();
    if (!endpoint?.id || !endpoint?.category || !endpoint?.name || !endpoint?.path) {
      return NextResponse.json({ error: 'Invalid endpoint payload' }, { status: 400 });
    }
    await upsertEndpoint(endpoint);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to save endpoint' }, { status: 500 });
  }
}
