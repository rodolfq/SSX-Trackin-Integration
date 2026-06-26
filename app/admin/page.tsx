import { FileJson, Activity, Database } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Painel Administrativo
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Gerencie os endpoints da documentação, acompanhe os logs de uso do Playground e adicione novas categorias. O sistema está integrado ao Supabase.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors">
          <FileJson className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Gerenciar Endpoints</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Adicione, edite ou remova endpoints e templates. Os dados são salvos localmente e injetados dinamicamente no menu.
          </p>
          <Link href="/admin/endpoints" className="text-primary text-sm font-medium hover:underline inline-flex items-center">
            Ir para Endpoints →
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors">
          <Activity className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Logs de Teste</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Visualize o histórico de requisições feitas através do Playground. Tabela <code className="bg-secondary/50 px-1 rounded text-primary">test_logs</code>.
          </p>
          <button className="text-primary text-sm font-medium hover:underline">
            Ver Logs →
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors">
          <Database className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Importar OpenAPI</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Ferramenta para ingestão automática de arquivos Swagger/OpenAPI.
          </p>
          <button className="text-primary text-sm font-medium hover:underline">
            Acessar Importador →
          </button>
        </div>
      </div>
    </div>
  );
}
