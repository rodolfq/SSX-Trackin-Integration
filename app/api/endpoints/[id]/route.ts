import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { deleteEndpoint } from '@/lib/endpointsRepo';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    await deleteEndpoint(decodeURIComponent(id));
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to delete endpoint' }, { status: 500 });
  }
}
