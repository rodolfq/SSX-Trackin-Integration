'use client';

import { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useEndpointStore } from '@/store/endpointStore';
import { Key, Copy, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const { token, tokens, setAuth } = useAuthStore();
  const { endpoints } = useEndpointStore();
  const { resolvedTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hashAuth, setHashAuth] = useState('');
  const [hashCode, setHashCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const [manualCategory, setManualCategory] = useState('API Reference');
  const [manualTokenInput, setManualTokenInput] = useState('');
  const [manualSuccessMsg, setManualSuccessMsg] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const importedCategories = useMemo(() => {
    const cats = new Set(endpoints.map(e => e.category));
    cats.delete('API Reference');
    return Array.from(cats);
  }, [endpoints]);

  const handleSaveManualToken = () => {
    if (manualTokenInput.trim()) {
      setAuth(manualTokenInput.trim(), 'Manual Token', Date.now(), manualCategory);
      setManualTokenInput('');
      setManualSuccessMsg(`Token salvo com sucesso para "${manualCategory === 'API Reference' ? 'SSX Tracking (Padrão)' : manualCategory}"!`);
      setTimeout(() => setManualSuccessMsg(''), 4000);
    }
  };

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
        {/* Formulário de Login & Token Manual */}
        <div className="space-y-6">
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
                className="w-full mt-6 bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
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

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold">Ou Insira um Token Manual</h2>
            <p className="text-xs text-muted-foreground">
              Caso você já possua um token JWT válido gerado externamente, insira-o abaixo associando-o ao Espaço de API correto.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Espaço de API de Destino</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between text-xs bg-background border border-border text-foreground px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary font-medium cursor-pointer transition-all hover:bg-secondary/40 active:scale-[0.99]"
                  >
                    <span className="truncate">
                      {manualCategory === 'API Reference' ? 'SSX Tracking (Padrão)' : manualCategory}
                    </span>
                    <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 shrink-0 ml-2", isDropdownOpen && "transform rotate-180")} />
                  </button>

                  {isDropdownOpen && (
                    <>
                      <style>{`
                        @keyframes dropdownFadeIn {
                          from {
                            opacity: 0;
                            transform: translateY(-4px) scale(0.98);
                          }
                          to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                          }
                        }
                        .animate-dropdown {
                          animation: dropdownFadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }
                      `}</style>
                      {/* Backdrop overlay to close when clicking outside */}
                      <div 
                        className="fixed inset-0 z-40 cursor-default" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      
                      <ul className="absolute left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl py-0 z-50 overflow-hidden origin-top animate-dropdown">
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              setManualCategory('API Reference');
                              setIsDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left text-xs px-4 py-2.5 transition-colors cursor-pointer flex items-center justify-between",
                              manualCategory === 'API Reference' 
                                ? "bg-primary/10 text-primary font-semibold" 
                                : "text-foreground hover:bg-secondary/60"
                            )}
                          >
                            <span className="truncate pr-2 font-medium">SSX Tracking (Padrão)</span>
                            {manualCategory === 'API Reference' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            )}
                          </button>
                        </li>
                        {importedCategories.map((cat) => {
                          const isSelected = cat === manualCategory;
                          return (
                            <li key={cat}>
                              <button
                                type="button"
                                onClick={() => {
                                  setManualCategory(cat);
                                  setIsDropdownOpen(false);
                                }}
                                className={cn(
                                  "w-full text-left text-xs px-4 py-2.5 transition-colors cursor-pointer flex items-center justify-between",
                                  isSelected 
                                    ? "bg-primary/10 text-primary font-semibold" 
                                    : "text-foreground hover:bg-secondary/60"
                                )}
                              >
                                <span className="truncate pr-2 font-medium">{cat}</span>
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Token JWT</label>
                <textarea
                  rows={3}
                  value={manualTokenInput}
                  onChange={(e) => setManualTokenInput(e.target.value)}
                  placeholder="Cole seu token completo aqui..."
                  className="w-full text-xs bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                />
              </div>

              {manualSuccessMsg && (
                <div className="p-2 text-xs bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-lg flex items-center gap-1.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{manualSuccessMsg}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleSaveManualToken}
                disabled={!manualTokenInput.trim()}
                className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 text-sm cursor-pointer"
              >
                <Key className="h-4 w-4 text-primary" />
                Salvar Token Manual
              </button>
            </div>
          </div>
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
      
      {/* Active Session Tokens Summary */}
      {Object.keys(tokens || {}).length > 0 && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>Tokens Ativos na Sessão</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(tokens).map(([cat, authObj]) => {
              if (!authObj?.token) return null;
              return (
                <div key={cat} className="bg-background/40 border border-green-500/20 p-4 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">
                      {cat === 'API Reference' ? 'SSX Tracking (Padrão)' : cat}
                    </span>
                    <span className="text-muted-foreground block mt-1">
                      Usuário: {authObj.username || 'Manual'}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 block truncate max-w-xs mt-1">
                      Token: {authObj.token.substring(0, 30)}...
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      useAuthStore.getState().logout(cat);
                    }}
                    className="text-xs font-semibold text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white px-2.5 py-1 rounded-md transition-all cursor-pointer shrink-0 ml-4"
                  >
                    Desconectar
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
