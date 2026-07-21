import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { deleteCategory } from '@/lib/endpointsRepo';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { category } = await params;
  try {
    await deleteCategory(decodeURIComponent(category));
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to delete category' }, { status: 500 });
  }
}
