import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    id: 1,
    title: 'Habilitação do Produto',
    description: 'Solicite a liberação da API de Integração com o suporte comercial SSX.',
  },
  {
    id: 2,
    title: 'Configuração da Integração',
    description: 'No painel SSX, crie uma nova integração do tipo "Tracking API".',
  },
  {
    id: 3,
    title: 'Geração do HashAuth',
    description: 'Copie o HashAuth gerado na configuração. Ele será usado para a autenticação.',
  },
  {
    id: 4,
    title: 'Login',
    description: 'Faça a requisição POST no endpoint de Login utilizando seu Username, Password e HashAuth.',
  },
  {
    id: 5,
    title: 'Obtenção do Token',
    description: 'Armazene o Token JWT retornado. Ele é válido por 24 horas.',
  },
  {
    id: 6,
    title: 'Primeiro Endpoint',
    description: 'Utilize o token no Header (Authorization: Bearer <token>) para chamar o PositionHistory.',
  },
];

export default function GettingStarted() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Primeiros Passos
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Aprenda como se conectar à API SSX em poucos passos. O fluxo é seguro, baseado em JWT, e exige configurações prévias no painel SSX.
        </p>
      </div>

      <div className="relative border-l border-border ml-3 md:ml-6 space-y-12 pb-12">
        {steps.map((step) => (
          <div key={step.id} className="relative pl-8 md:pl-10">
            <div className="absolute -left-3 md:-left-3.5 top-1 flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
              <span className="text-xs md:text-sm font-bold">{step.id}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
              
              {step.id === 4 && (
                <div className="mt-4 p-4 rounded-md bg-secondary/50 border border-border">
                  <p className="text-sm font-mono text-muted-foreground">
                    POST /Login
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex border-t border-border pt-8">
        <Link
          href="/auth"
          className="group flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
        >
          Ir para Autenticação & Playground
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
