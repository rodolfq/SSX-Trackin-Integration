import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/session';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function AdminLoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/admin');
  }

  return <LoginForm />;
}
