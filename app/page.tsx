import Link from 'next/link';
import { ArrowRight, Key, MapPin, Database, Activity } from 'lucide-react';

const features = [
  {
    name: 'Autenticação JWT',
    description: 'Entenda como gerar e gerenciar tokens de acesso para a API.',
    href: '/auth',
    icon: Key,
  },
  {
    name: 'Rastreamento',
    description: 'Acesse posições em tempo real e histórico de rastreamento.',
    href: '/endpoints/tracking/position-history',
    icon: MapPin,
  },
  {
    name: 'Cadastros',
    description: 'Gerencie pessoas, veículos, motoristas e muito mais.',
    href: '/endpoints/entities/person',
    icon: Database,
  },
  {
    name: 'Telemetria & Eventos',
    description: 'Consulte eventos gerados, alertas e dados de telemetria bruta.',
    href: '/endpoints/events',
    icon: Activity,
  },
];

export default function Home() {
  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col gap-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          SSX Tracking Integration
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Integre rastreamento, telemetria, eventos e cadastros da plataforma SSX em seu sistema com facilidade.
          Uma API moderna e preparada para escala.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            href="/getting-started"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Começar Agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/endpoints/tracking/position-history"
            className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-secondary hover:text-foreground text-muted-foreground"
          >
            Documentação
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-secondary hover:text-foreground text-muted-foreground"
          >
            Testar API
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-8">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                <Link href={feature.href} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {feature.name}
                </Link>
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
