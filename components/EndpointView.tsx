'use client';

import { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Editor } from '@monaco-editor/react';
import { Play, Loader2, Lock, Unlock, Clock, AlertCircle, Maximize2, Minimize2, Download } from 'lucide-react';
import { AppScrollbar } from '@/components/AppScrollbar';
import { useTheme } from 'next-themes';

export interface EndpointSchemaField {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

export interface EndpointSchema {
  name: string;
  fields: EndpointSchemaField[];
}

interface EndpointParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface EndpointViewProps {
  category?: string;
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters?: EndpointParam[];
  defaultPayload?: any;
  presets?: { name: string; payload: any }[];
  schema?: EndpointSchema;
  responseSchema?: EndpointSchema;
}

export function EndpointView({
  category,
  title,
  method,
  path,
  description,
  parameters = [],
  defaultPayload = {},
  presets = [],
  schema,
  responseSchema
}: EndpointViewProps) {
  const { tokens, token: defaultToken, setAuth } = useAuthStore();
  const apiCategory = category || 'API Reference';
  const token = tokens?.[apiCategory]?.token ?? defaultToken;
  const { resolvedTheme } = useTheme();
  const [payload, setPayload] = useState(JSON.stringify(defaultPayload, null, 2));
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [isOutputExpanded, setIsOutputExpanded] = useState(false);

  const handleExecute = async () => {
    setIsLoading(true);
    setResponse(null);
    setResponseTime(null);
    setStatus(null);

    const startTime = performance.now();

    try {
      let parsedData = undefined;
      if (method !== 'GET' && payload.trim() !== '') {
        try {
          parsedData = JSON.parse(payload);
        } catch (e) {
          setResponse({ error: 'Invalid JSON payload' });
          setIsLoading(false);
          return;
        }
      }

      const res = await fetch('/api/proxy', {
        method: 'POST', // Always POST to proxy
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: path,
          method,
          data: parsedData,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }),
      });

      const result = await res.json();
      const endTime = performance.now();

      setResponseTime(Math.round(endTime - startTime));
      setStatus(result.status);

      const responseData = result.data || result;
      setResponse(responseData);

      // Automatically capture and store token for this API category if executing a Login request
      if (path.toLowerCase().endsWith('/login') && result.status === 200) {
        const accessToken = responseData?.AccessToken || responseData?.token || responseData?.data?.AccessToken || responseData?.data?.token;
        if (accessToken) {
          let reqUsername = '';
          try {
            const parsedPayload = JSON.parse(payload);
            reqUsername = parsedPayload.Username || parsedPayload.username || '';
          } catch (e) {}
          
          setAuth(accessToken, reqUsername, Date.now(), apiCategory);
        }
      }

      // Save highest IdPosition if present in the response
      try {
        let itemsList: any[] | null = null;
        if (Array.isArray(responseData)) {
          itemsList = responseData;
        } else if (responseData && typeof responseData === 'object') {
          if (Array.isArray(responseData.Result)) itemsList = responseData.Result;
          else if (Array.isArray(responseData.Items)) itemsList = responseData.Items;
          else if (Array.isArray(responseData.data)) itemsList = responseData.data;
        }

        if (itemsList && itemsList.length > 0) {
          let maxId = 0;
          itemsList.forEach((item: any) => {
            if (item && item.IdPosition && typeof item.IdPosition === 'number' && item.IdPosition > maxId) {
              maxId = item.IdPosition;
            }
          });
          if (maxId > 0) {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('lastIdPosition', maxId.toString());
            }
          }
        }
      } catch (e) {
        // ignore errors parsing IdPosition
      }

    } catch (err: any) {
      setResponse({ error: err.message });
      setStatus(500);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCodeSnippet = (lang: string) => {
    const fullUrl = `https://integration.systemsatx.com.br${path}`;
    const headers = token ? `\n  "Authorization": "Bearer ${token}",` : '';
    const bodyStr = method !== 'GET' && payload.trim() !== '' ? `\n  "body": JSON.stringify(${payload.replace(/\n/g, '\n  ')})` : '';

    switch (lang) {
      case 'json':
        return `fetch("${fullUrl}", {
  "method": "${method}",
  "headers": {
    "Content-Type": "application/json",${headers}
  },${bodyStr}
})
.then(response => response.json())
.then(console.log)
.catch(console.error);`;
      case 'python':
        return `import requests
import json

url = "${fullUrl}"
headers = {
    "Content-Type": "application/json"${token ? `,\n    "Authorization": "Bearer ${token}"` : ''}
}
${method !== 'GET' && payload.trim() !== '' ? `payload = ${payload}` : 'payload = None'}

response = requests.request("${method}", url, headers=headers, json=payload)
print(response.json())`;
      case 'csharp':
        return `using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.${method === 'GET' ? 'Get' : method === 'POST' ? 'Post' : method === 'PUT' ? 'Put' : 'Delete'}, "${fullUrl}");
${token ? `request.Headers.Add("Authorization", "Bearer ${token}");` : ''}
${method !== 'GET' && payload.trim() !== '' ? `var content = new StringContent(@"${payload}", null, "application/json");\nrequest.Content = content;` : ''}
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());`;
      default:
        return '';
    }
  };

  const [activeTab, setActiveTab] = useState<'json' | 'python' | 'csharp'>('json');
  const [schemaTab, setSchemaTab] = useState<'example' | 'schema'>('schema');
  const [snippetCopied, setSnippetCopied] = useState(false);

  const editorOptions = useMemo(() => ({
    automaticLayout: true,
    readOnly: activeTab !== 'json',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 13,
    fontFamily: 'var(--font-mono)',
    padding: { top: 16, bottom: 16 }
  }), [activeTab]);

  const outputEditorOptions = useMemo(() => ({
    automaticLayout: true,
    readOnly: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 13,
    fontFamily: 'var(--font-mono)',
    padding: { top: 16, bottom: 16 }
  }), []);

  const methodColor = {
    GET: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    POST: 'text-green-400 bg-green-400/10 border-green-400/20',
    PUT: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    DELETE: 'text-red-400 bg-red-400/10 border-red-400/20',
  }[method];

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(generateCodeSnippet(activeTab));
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 2000);
  };

  const handleExportJSON = () => {
    if (!response) return;
    const jsonString = JSON.stringify(response, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const cleanTitle = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/[^a-z0-9]+/g, '-')     // replace non-alphanumeric with hyphen
      .replace(/(^-|-$)/g, '');        // trim hyphens

    link.href = url;
    link.download = `${cleanTitle || 'response'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Documentation Column */}
      <AppScrollbar className="flex-1 p-6 md:p-8 border-r border-border min-w-0">
        <div className="max-w-4xl 2xl:max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2 py-1 text-xs font-bold rounded border ${methodColor}`}>
              {method}
            </span>
            <span className="font-mono text-muted-foreground text-sm">{path}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-4">{title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>

          {schema ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Request Body</h3>

              <div className="flex gap-6 border-b border-border">
                <button
                  onClick={() => setSchemaTab('example')}
                  className={`pb-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${schemaTab === 'example' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  Example Value
                </button>
                <button
                  onClick={() => setSchemaTab('schema')}
                  className={`pb-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${schemaTab === 'schema' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  Schema
                </button>
              </div>

              <div className="bg-card rounded-lg border border-border p-5 text-sm overflow-auto">
                {schemaTab === 'example' ? (
                  <pre className="font-mono text-muted-foreground">{JSON.stringify(defaultPayload, null, 2)}</pre>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground font-semibold font-sans mb-4">
                      {schema.name} <span className="text-muted-foreground font-mono font-normal">{'{'}</span>
                    </div>
                    <div className="pl-4 space-y-4">
                      {schema.fields?.map(field => (
                        <div key={field.name} className="flex flex-col sm:flex-row sm:gap-8 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                          <div className="w-full sm:w-1/3 sm:max-w-[250px] shrink-0 flex items-start gap-1 pt-1">
                            <span className="font-mono text-foreground break-all">{field.name}</span>
                            {field.required && <span className="text-red-500 font-bold">*</span>}
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="font-mono text-blue-400 mb-2 text-[13px]">{field.type}</span>
                            <span className="font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">{field.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-muted-foreground font-mono mt-2">{'}'}</div>
                  </div>
                )}
              </div>
            </div>
          ) : parameters.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Parâmetros do Corpo</h3>
              <div className="border border-border rounded-lg overflow-hidden bg-card">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-muted-foreground border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Nome</th>
                      <th className="px-4 py-3 font-medium">Tipo</th>
                      <th className="px-4 py-3 font-medium">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {parameters.map((param) => (
                      <tr key={param.name} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-3 font-mono text-primary flex items-center gap-2">
                          {param.name}
                          {param.required && <span className="text-[10px] text-destructive border border-destructive/30 px-1.5 py-0.5 rounded-sm uppercase font-sans">Required</span>}
                        </td>
                        <td className="px-4 py-3 font-mono text-muted-foreground italic">{param.type}</td>
                        <td className="px-4 py-3 text-muted-foreground">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {responseSchema && (
            <div className="space-y-4 mt-8">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Response Body</h3>
              <div className="bg-card rounded-lg border border-border p-5 text-sm overflow-auto">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-semibold font-sans mb-4">
                    {responseSchema.name} <span className="text-muted-foreground font-mono font-normal">{'{'}</span>
                  </div>
                  <div className="pl-4 space-y-4">
                    {responseSchema.fields?.map(field => (
                      <div key={field.name} className="flex flex-col sm:flex-row sm:gap-8 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                        <div className="w-full sm:w-1/3 sm:max-w-[250px] shrink-0 flex items-start gap-1 pt-1">
                          <span className="font-mono text-foreground break-all">{field.name}</span>
                          {field.required && <span className="text-red-500 font-bold">*</span>}
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="font-mono text-blue-400 mb-2 text-[13px]">{field.type}</span>
                          <span className="font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">{field.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground font-mono mt-2">{'}'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AppScrollbar>

      {/* Playground Column */}
      <div className="w-full lg:w-[450px] xl:w-[500px] 2xl:w-[600px] shrink-0 lg:shrink-0 flex-1 lg:flex-none min-h-[400px] lg:min-h-0 bg-secondary/20 flex flex-col h-auto lg:h-full border-t lg:border-t-0 border-border">
        {/* Auth Status Banner */}
        {!token ? (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-3 flex items-center gap-3 text-yellow-600 dark:text-yellow-500 text-sm shrink-0">
            <Lock className="h-4 w-4 shrink-0" />
            <span>Autenticação necessária. <a href="/auth" className="underline font-medium hover:text-yellow-400">Gere um token</a> para testar.</span>
          </div>
        ) : null}

        {/* Tabs */}
        <div className="flex border-b border-border px-2 shrink-0">
          {(['json', 'python', 'csharp'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-3 text-xs font-medium capitalize border-b-2 transition-colors ${activeTab === lang ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              {lang === 'json' ? 'JSON' : lang === 'csharp' ? 'C#' : lang}
            </button>
          ))}
        </div>

        {/* Editor Simulator */}
        {!isOutputExpanded && (
          <div className="flex-1 p-6 font-mono text-[13px] leading-relaxed flex flex-col min-h-0">
            <div className="bg-card rounded-lg border border-border h-full flex flex-col overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 border-b border-border bg-secondary/50">
                <span className="text-muted-foreground text-[10px] uppercase tracking-tighter font-sans font-medium">Editor de Payload</span>
                <div className="flex gap-2 items-center">
                  {(presets?.length ?? 0) > 0 && (
                    <select
                      className="text-[10px] font-sans bg-secondary border border-border text-foreground px-2 py-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-primary max-w-[150px] truncate"
                      onChange={(e) => {
                        if (e.target.value) {
                          const selected = presets?.find(p => p.name === e.target.value);
                          if (selected) {
                            let payloadStr = JSON.stringify(selected.payload, null, 2);
                            if (payloadStr.includes('"LastIdPosition"')) {
                              const lastId = typeof window !== 'undefined' ? window.localStorage.getItem('lastIdPosition') : null;
                              if (lastId) {
                                payloadStr = payloadStr.replace(/"LastIdPosition"/g, `"${lastId}"`);
                              }
                            }
                            setPayload(payloadStr);
                          }
                        }
                      }}
                    >
                      <option value="">Carregar Preset...</option>
                      {presets?.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  )}
                  <button
                    onClick={handleCopySnippet}
                    className="text-[10px] font-sans bg-secondary hover:bg-secondary-foreground/10 text-foreground px-2 py-1 rounded transition-colors"
                  >
                    {snippetCopied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <div className="flex-1 relative min-h-0">
                {/* Show Code Snippet or JSON Editor based on tab? The mockup shows payload editor separate from snippets. Let's make the editor fixed for payload and show snippets if tab is changed. */}
                {activeTab === 'json' || activeTab === 'python' || activeTab === 'csharp' ? (
                  <Editor
                    height="100%"
                    language={activeTab === 'json' ? 'json' : activeTab} // JSON editor for payload, others for code
                    theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
                    value={activeTab === 'json' ? payload : generateCodeSnippet(activeTab)}
                    onChange={activeTab === 'json' ? (val) => setPayload(val || '') : undefined}
                    options={editorOptions}
                  />
                ) : null}
              </div>

              {activeTab === 'json' && (
                <div className="p-4 border-t border-border bg-card shrink-0">
                  <button
                    onClick={handleExecute}
                    disabled={isLoading || !token}
                    className="w-full py-2.5 bg-primary text-primary-foreground rounded font-semibold text-sm hover:bg-sky-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                    {isLoading ? 'Executando...' : 'Executar Request'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Output View */}
        <div className={`border-t border-border bg-card flex flex-col shrink-0 ${isOutputExpanded ? 'flex-1 h-full' : 'h-64'}`}>
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-sans font-medium">Response Body</span>
              <button
                onClick={() => setIsOutputExpanded(!isOutputExpanded)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-secondary"
                title={isOutputExpanded ? "Recolher" : "Expandir"}
              >
                {isOutputExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
              </button>
              {response && (
                <button
                  onClick={handleExportJSON}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-secondary"
                  title="Exportar JSON"
                >
                  <Download className="h-3 w-3" />
                </button>
              )}
            </div>
            {status && (
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className={`flex items-center gap-1.5 ${status < 400 ? 'text-green-500' : 'text-red-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${status < 400 ? 'bg-green-500' : 'bg-red-500'}`} />
                  {status} OK
                </span>
                {responseTime && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {responseTime}ms
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 relative min-h-0">
            {response ? (
              <Editor
                height="100%"
                defaultLanguage="json"
                theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
                value={JSON.stringify(response, null, 2)}
                options={outputEditorOptions}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm font-mono flex-col gap-2">
                <AlertCircle className="h-8 w-8 opacity-20" />
                Clique em Executar para testar
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
