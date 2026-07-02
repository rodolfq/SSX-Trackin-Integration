import { NextRequest, NextResponse } from 'next/server';
import credentials from '@/lib/admin-credentials.json';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === credentials.username && password === credentials.password) {
      return NextResponse.json({ success: true, token: 'mock-admin-token-xyz' });
    }

    return NextResponse.json({ success: false, error: 'Usuário ou senha inválidos' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Erro ao processar autenticação' }, { status: 500 });
  }
}
