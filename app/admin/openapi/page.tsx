'use client';

import { useState } from 'react';
import { useEndpointStore } from '@/store/endpointStore';
import { parseOpenApiToEndpoints } from '@/lib/openapiParser';
import { ArrowLeft, Upload, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ImportOpenAPI() {
  const { addEndpoint, endpoints, deleteCategory } = useEndpointStore();
  const [jsonInput, setJsonInput] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState<{type: 'idle' | 'success' | 'error', message: string}>({type: 'idle', message: ''});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setJsonInput(ev.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = () => {
    if (!jsonInput.trim()) {
      setStatus({ type: 'error', message: 'Por favor, insira o JSON ou faça o upload de um arquivo.' });
      return;
    }

    try {
      const openApiData = JSON.parse(jsonInput);
      const { endpoints: parsedEndpoints, count, skipped } = parseOpenApiToEndpoints(
        openApiData,
        categoryName,
        endpoints
      );

      parsedEndpoints.forEach(ep => addEndpoint(ep));

      setStatus({
        type: 'success',
        message: `Importação concluída: ${count} endpoints importados com sucesso. (${skipped} ignorados por já existirem)`
      });
      setJsonInput('');
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Erro ao processar o arquivo JSON. Certifique-se de que é um formato válido.'});
    }
  };

  const customCategories = Array.from(new Set(endpoints.map(ep => ep.category)));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="text-primary hover:underline inline-flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para o Painel
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Importar OpenAPI / Swagger</h1>
        <p className="text-muted-foreground">
          Faça upload de um arquivo JSON completo no formato OpenAPI 3.0 ou Swagger 2.0 para adicionar os endpoints automaticamente à documentação.
        </p>
      </div>

      <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome da Categoria no Menu (Opcional)</label>
            <input
              type="text"
              className="w-full p-2.5 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-primary outline-none"
              placeholder="Ex: Minha Nova API (Padrão: Título do arquivo OpenAPI)"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Os endpoints importados serão agrupados sob esta categoria no menu lateral.
            </p>
          </div>

          <div className="h-px bg-border my-2"></div>

          <div>
            <label className="block text-sm font-medium mb-2">Opção 1: Upload de Arquivo (.json)</label>
            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-secondary/20 border-2 border-secondary border-dashed rounded-md appearance-none cursor-pointer hover:border-primary/50 focus:outline-none">
              <span className="flex items-center space-x-2">
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="font-medium text-muted-foreground">Clique para selecionar um arquivo ou arraste aqui</span>
              </span>
              <input type="file" name="file_upload" className="hidden" accept=".json" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px bg-border flex-1"></div>
            <span className="text-muted-foreground text-sm font-medium">OU</span>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Opção 2: Colar JSON diretamente</label>
            <textarea
              className="w-full h-64 p-3 bg-background border border-input rounded-md font-mono text-sm resize-y focus:ring-1 focus:ring-primary outline-none"
              placeholder='{ "openapi": "3.0.0", "info": { ... }, "paths": { ... } }'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
          </div>
        </div>

        {status.type !== 'idle' && (
          <div className={`p-4 rounded-md flex items-start gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'}`}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
            <p className="text-sm">{status.message}</p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleImport}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Processar e Importar
          </button>
        </div>
      </div>

      {customCategories.length > 0 && (
        <div className="mt-8 bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Categorias Importadas</h2>
          <p className="text-muted-foreground text-sm">
            Gerencie as APIs que você importou para o sistema. Excluir uma categoria removerá todos os seus endpoints correspondentes do menu e do Playground.
          </p>

          <div className="divide-y divide-border">
            {customCategories.map(cat => {
              const catEndpoints = endpoints.filter(ep => ep.category === cat);
              return (
                <div key={cat} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{cat}</h3>
                    <p className="text-xs text-muted-foreground">
                      {catEndpoints.length} {catEndpoints.length === 1 ? 'endpoint importado' : 'endpoints importados'}
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm(`Tem certeza de que deseja excluir todos os ${catEndpoints.length} endpoints da categoria "${cat}"?`)) {
                        await deleteCategory(cat);
                      }
                    }}
                    className="text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Excluir
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
