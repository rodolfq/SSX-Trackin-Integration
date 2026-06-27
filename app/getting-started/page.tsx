'use client';
import { ArrowRight, CheckCircle2, Copy } from 'lucide-react';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { useFirstStepsStore } from '@/store/firstStepsStore';
import { useState, useEffect } from 'react';

export default function GettingStarted() {
  const { steps } = useFirstStepsStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const markdownComponents = {
    img({ node, className, alt, ...props }: any) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          className="rounded-lg border border-border/50 shadow-sm max-w-full h-auto my-6" 
          alt={alt} 
          {...props} 
        />
      );
    },
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      return !inline && match ? (
        <div className="relative mt-4 mb-6">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/80 rounded-t-lg border border-border border-b-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{match[1]}</span>
            <button onClick={() => copy(codeString)} className="text-muted-foreground hover:text-foreground transition-colors" title="Copy code">
              {copiedCode === codeString ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <pre className="p-4 bg-card rounded-b-lg overflow-x-auto text-[13px] font-mono text-foreground border border-border leading-relaxed m-0">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code className="bg-muted px-1.5 py-0.5 rounded text-primary text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
  };

  if (!isClient) return null;

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Primeiros Passos (Manual de Integração)
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Este guia vai te auxiliar no uso dos métodos presentes no SSX Tracking Integration, voltado para utilização de clientes das centrais. Acompanhe os passos necessários para habilitar o produto, gerar sua chave e realizar as primeiras consultas.
        </p>
      </div>

      <div className="space-y-12">
        {steps.map((step) => (
          <div key={step.id} className="relative pl-8 md:pl-10">
            <div className="absolute -left-3 md:-left-4 top-1 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
              <span className="text-xs md:text-sm font-bold">{step.id}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
              
              {step.contentMarkdown && (
                <div className="mt-4 prose prose-invert prose-primary max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground">
                  <Markdown components={markdownComponents}>
                    {step.contentMarkdown}
                  </Markdown>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex border-t border-border pt-8 pb-12">
        <Link
          href="/auth"
          className="group flex items-center text-primary font-medium hover:text-primary/80 transition-colors bg-primary/10 px-6 py-3 rounded-md"
        >
          Ir para Autenticação & Playground
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
