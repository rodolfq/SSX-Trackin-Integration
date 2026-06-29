'use client';

import { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Key, Copy, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';

export default function AuthPage() {
  const { token, setAuth } = useAuthStore();
  const { resolvedTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hashAuth, setHashAuth] = useState('');
  const [hashCode, setHashCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const outputEditorOptions = useMemo(() => ({
    readOnly: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 13,
    fontFamily: 'var(--font-mono)',
    padding: { top: 16, bottom: 16 }
  }), []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    const payload: any = {
      Username: username,
      Password: password,
    };
    if (hashAuth) payload.HashAuth = hashAuth;
    if (hashCode) payload.Hashcentral = hashCode;

    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: '/Login',
          method: 'POST',
          data: payload,
          isFormData: true,
        }),
      });

      const result = await res.json();
      setResponse(result);

      const accessToken = result.data?.AccessToken || result.data?.token;
      if (result.status === 200 && accessToken) {
        setAuth(accessToken, username);
      }
    } catch (err: any) {
      setResponse({ error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToken = () => {
    const token = response?.data?.AccessToken || response?.data?.token;
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activateToken = () => {
    const token = response?.data?.AccessToken || response?.data?.token;
    if (token) {
      setAuth(token, username);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl flex items-center gap-3">
          <Key className="h-8 w-8 text-primary" />
          Autenticação
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Gere seu token JWT fornecendo as credenciais cadastradas na plataforma. O token é válido por 24 horas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Playground de Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Username (Email)</label>
              <input
                type="text"
                required
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                HashAuth <span className="text-xs text-muted-foreground/70">(Opcional)</span>
              </label>
              <input
                type="text"
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={hashAuth}
                onChange={(e) => setHashAuth(e.target.value)}
                placeholder="Código de integração"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Hashcentral <span className="text-xs text-muted-foreground/70">(Opcional se usar email)</span>
              </label>
              <input
                type="text"
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={hashCode}
                onChange={(e) => setHashCode(e.target.value)}
                placeholder="Código da central"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Token...
                </>
              ) : (
                'Gerar Token'
              )}
            </button>
          </form>
        </div>

        {/* Resposta */}
        <div className="bg-secondary/30 border border-border rounded-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <span className="text-sm font-medium">Response</span>
            {(response?.data?.AccessToken || response?.data?.token) && (
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToken}
                  className="text-xs flex items-center gap-1.5 px-2 py-1 bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copiado' : 'Copiar Token'}
                </button>
                <button
                  onClick={activateToken}
                  className="text-xs flex items-center gap-1.5 px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Ativar token gerado
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 p-0 relative min-h-[400px]">
             {response ? (
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
                  value={JSON.stringify(response.data || response, null, 2)}
                  options={outputEditorOptions}
                />
             ) : (
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm font-mono flex-col gap-2">
                 <AlertCircle className="h-8 w-8 opacity-20" />
                 Aguardando requisição...
               </div>
             )}
          </div>
        </div>
      </div>
      
      {token && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="text-green-500 font-medium">Token Ativo na Sessão</h4>
            <p className="text-sm text-green-500/80 mt-1">
              O token foi salvo com sucesso no estado global. Você não precisará autenticar novamente para testar os outros endpoints.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
