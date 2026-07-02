'use client';

import { useState } from 'react';
import { useEndpointStore, EndpointDef } from '@/store/endpointStore';
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

  // Helper to recursively extract schema fields and generate dummy mock payload values from OpenAPI schemas
  const resolveSchema = (schemaObj: any, rootData: any, prefix = ''): { fields: any[], dummyValue: any } => {
    let fields: any[] = [];
    let dummyValue: any = null;

    if (!schemaObj) return { fields, dummyValue };

    let currentSchema = schemaObj;
    if (schemaObj.$ref) {
      const refName = schemaObj.$ref.split('/').pop();
      currentSchema = rootData?.components?.schemas?.[refName] || rootData?.definitions?.[refName] || null;
      if (!currentSchema) return { fields, dummyValue: {} };
    }

    const type = currentSchema.type || 'object';

    if (type === 'array') {
      const itemsSchema = currentSchema.items;
      const { fields: subFields, dummyValue: subDummy } = resolveSchema(itemsSchema, rootData, prefix);
      fields = subFields;
      dummyValue = Array.isArray(subDummy) ? subDummy : [subDummy];
    } else if (type === 'object' || currentSchema.properties) {
      const properties = currentSchema.properties || {};
      const requiredList = currentSchema.required || [];
      const obj: any = {};

      for (const [key, propVal] of Object.entries(properties) as any) {
        const fieldName = prefix ? `${prefix}.${key}` : key;
        
        let propSchema = propVal;
        if (propVal.$ref) {
          const refName = propVal.$ref.split('/').pop();
          propSchema = rootData?.components?.schemas?.[refName] || rootData?.definitions?.[refName] || propVal;
        }

        const propType = propSchema.type || 'string';

        if (propType === 'object' || propSchema.properties) {
          const { fields: subFields, dummyValue: subDummy } = resolveSchema(propSchema, rootData, fieldName);
          fields.push({
            name: fieldName,
            type: 'object',
            description: propVal.description || '',
            required: requiredList.includes(key)
          });
          fields.push(...subFields);
          obj[key] = subDummy;
        } else if (propType === 'array') {
          const itemsSchema = propSchema.items;
          const { fields: subFields, dummyValue: subDummy } = resolveSchema(itemsSchema, rootData, `${fieldName}[]`);
          fields.push({
            name: fieldName,
            type: 'array',
            description: propVal.description || '',
            required: requiredList.includes(key)
          });
          fields.push(...subFields);
          obj[key] = Array.isArray(subDummy) ? subDummy : [subDummy];
        } else {
          fields.push({
            name: fieldName,
            type: propType,
            description: propVal.description || '',
            required: requiredList.includes(key)
          });
          obj[key] = getDummyValue(propType, propVal.format);
        }
      }
      dummyValue = obj;
    } else {
      dummyValue = getDummyValue(type, currentSchema.format);
    }

    return { fields, dummyValue };
  };

  const getDummyValue = (type: string) => {
    if (type === 'number' || type === 'integer' || type === 'number($double)' || type === 'integer($int64)') return 0;
    if (type === 'boolean') return false;
    return '';
  };

  const handleImport = () => {
    if (!jsonInput.trim()) {
      setStatus({ type: 'error', message: 'Por favor, insira o JSON ou faça o upload de um arquivo.' });
      return;
    }

    try {
      const openApiData = JSON.parse(jsonInput);
      if (!openApiData.paths) {
        throw new Error('Arquivo JSON inválido: não contém "paths". O formato deve ser OpenAPI/Swagger válido.');
      }

      const category = categoryName.trim() || openApiData.info?.title || 'API Reference';
      const categorySlug = category
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      let count = 0;
      let skipped = 0;

      for (const [path, methods] of Object.entries(openApiData.paths)) {
        for (const [method, rawDetails] of Object.entries(methods as any)) {
          if (!['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) continue;
          
          const details = rawDetails as any;

          // Convert to our format
          const rawId = path.replace(/^\//, '').toLowerCase().replace(/\//g, '-');
          const id = category === 'API Reference' ? rawId : `${categorySlug}-${rawId}`;
          
          if (category === 'API Reference' && 
              (path === '/Tracking/PositionHistory/List' || 
               path === '/Tracking/PositionHistory/ListSoap' || 
               path === '/v2/Tracking/PositionHistory/List')) {
              continue;
          }

          // Check if it already exists
          if (endpoints.some(e => e.id === id && e.method.toLowerCase() === method.toLowerCase())) {
            skipped++;
            continue; // Skip existing endpoints
          }

          const group = details.tags ? details.tags[0] : 'Geral';
          
          let generatedName = path.split('/').filter(Boolean);
          let version = '';
          if (generatedName[0] && generatedName[0].toLowerCase().startsWith('v') && !isNaN(Number(generatedName[0][1]))) {
              version = generatedName.shift() as string;
          }
          // Ignore the first segment if there are multiple segments, to avoid redundancy with the API name
          if (generatedName.length > 1) {
              generatedName.shift();
          }
          let nameStr = generatedName.join(' ');
          nameStr = nameStr.replace(/([a-z])([A-Z])/g, '$1 $2').trim().replace(/\s+/g, ' ');
          if (version) {
              nameStr += ` (${version})`;
          }
          let name = id.endsWith('v3-tracking-positionhistory-list') ? 'Position History (v3)' : nameStr;
          if (id.endsWith('login')) name = 'Login';
          
          let defaultPayload: any = {};
          let schemaFields: any[] = [];
          let schemaName = 'Payload';
          
          // Check parameters
          if (details.parameters && details.parameters.length > 0) {
            const queryParams = details.parameters.filter((p: any) => p.in === 'query' || p.in === 'path');
            if (queryParams.length > 0) {
              queryParams.forEach((p: any) => {
                schemaFields.push({
                  name: p.name,
                  type: p.schema?.type || 'string',
                  description: p.description || '',
                  required: p.required || false
                });
                defaultPayload[p.name] = getDummyValue(p.schema?.type);
              });
            }
          }

          // Try to extract payload from requestBody
          let reqSchema = details.requestBody?.content?.['application/json']?.schema || 
                          details.requestBody?.content?.['application/json-patch+json']?.schema;
          
          if (!reqSchema && details.parameters) {
             const bodyParam = details.parameters.find((p: any) => p.in === 'body');
             if (bodyParam?.schema) {
               reqSchema = bodyParam.schema;
             }
          }

          if (reqSchema) {
            if (reqSchema.$ref) {
              schemaName = reqSchema.$ref.split('/').pop();
            } else if (reqSchema.type === 'array' && reqSchema.items?.$ref) {
              schemaName = reqSchema.items.$ref.split('/').pop() + "[]";
            }

            const { fields, dummyValue } = resolveSchema(reqSchema, openApiData);
            schemaFields = fields;
            defaultPayload = dummyValue || {};
          }

          let responseSchemaFields: any[] = [];
          let responseSchemaName = 'Response';

          // Try to extract response schema
          const resSchema = details.responses?.['200']?.content?.['application/json']?.schema ||
                            details.responses?.['200']?.content?.['text/json']?.schema;
          if (resSchema) {
            if (resSchema.$ref) {
              responseSchemaName = resSchema.$ref.split('/').pop();
            } else if (resSchema.type === 'array' && resSchema.items?.$ref) {
              responseSchemaName = resSchema.items.$ref.split('/').pop() + "[]";
            }
            const { fields } = resolveSchema(resSchema, openApiData);
            responseSchemaFields = fields;
          } else if (details.responses?.['200']?.schema) {
            // older swagger format
            const { fields } = resolveSchema(details.responses['200'].schema, openApiData);
            responseSchemaFields = fields;
          }

          let presets: any[] = [];
          if (id.endsWith('v3-tracking-positionhistory-list') || id.endsWith('tracking-positionhistory-list')) {
             presets = [
              {
                name: 'Posições de hoje',
                payload: [
                  {
                    "PropertyName": "EventDate",
                    "Condition": "GreaterThan",
                    "Value": new Date().toISOString().split('T')[0]
                  }
                ]
              },
              {
                name: 'Posições do dia atual (String)',
                payload: [
                  {
                    "PropertyName": "EventDate",
                    "Condition": "GreaterThan",
                    "Value": "DIA ATUAL"
                  }
                ]
              },
              {
                name: 'Última posição',
                payload: [
                  {
                    "PropertyName": "IdPosition",
                    "Condition": "GreaterThan",
                    "Value": "1"
                  }
                ]
              },
              {
                name: 'A partir do último IdPosition',
                payload: [
                  {
                    "PropertyName": "IdPosition",
                    "Condition": "GreaterThan",
                    "Value": "LastIdPosition"
                  }
                ]
              }
            ];
            // Force default payload to match preset logic
            defaultPayload = [
              {
                "PropertyName": "TrackedUnitIntegrationCode",
                "Condition": "Equal",
                "Value": "0001"
              }
            ];
          }
          
          if (schemaName === 'QueryCondition[]' || schemaName === 'QueryCondition') {
              if (!defaultPayload || (Array.isArray(defaultPayload) && defaultPayload.length === 0) || Object.keys(defaultPayload).length === 0) {
                  defaultPayload = [
                    {
                      "PropertyName": "NomeDaPropriedade",
                      "Condition": "Equal",
                      "Value": "Valor"
                    }
                  ];
              }
          }

          let desc = details.description || details.summary || '';
          if (desc === name) desc = '';

          const newEp: EndpointDef = {
            id,
            category,
            group,
            name,
            method: method.toUpperCase() as any,
            path,
            description: desc,
            defaultPayload,
            schema: { name: schemaName, fields: schemaFields },
            responseSchema: { name: responseSchemaName, fields: responseSchemaFields },
            presets
          };

          addEndpoint(newEp);
          count++;
        }
      }

      setStatus({ 
        type: 'success', 
        message: `Importação concluída: ${count} endpoints importados com sucesso. (${skipped} ignorados por já existirem)`
      });
      setJsonInput('');
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Erro ao processar o arquivo JSON. Certifique-se de que é um formato válido.'});
    }
  };

  const customCategories = Array.from(new Set(
    endpoints
      .filter(ep => ep.category !== 'API Reference')
      .map(ep => ep.category)
  ));

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
