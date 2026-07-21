'use client';

import { useState, useEffect } from 'react';
import { useEndpointStore, EndpointDef, EndpointField, EndpointPreset } from '@/store/endpointStore';
import { DEFAULT_API_SPACE } from '@/lib/constants';
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';
import { AppScrollbar } from '@/components/AppScrollbar';

export default function AdminEndpoints() {
  const { endpoints, addEndpoint, updateEndpoint, removeEndpoint } = useEndpointStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EndpointDef>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  
  // To avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsClient(true), []);

  const handleEdit = (ep: EndpointDef) => {
    setEditingId(ep.id);
    setFormData(ep);
  };

  const handleAddNew = () => {
    const newEp: EndpointDef = {
      id: `new-${Date.now()}`,
      category: DEFAULT_API_SPACE,
      group: 'Nova Categoria',
      name: 'Novo Endpoint',
      method: 'POST',
      path: '/api/novo',
      description: '',
      defaultPayload: {},
      schema: { name: 'Schema', fields: [] },
      presets: []
    };
    setEditingId(newEp.id);
    setFormData(newEp);
  };

  const handleSave = () => {
    if (!formData.id || !formData.name || !formData.path) return;
    
    const existing = endpoints.find(e => e.id === formData.id);
    if (existing) {
      updateEndpoint(formData.id, formData as EndpointDef);
    } else {
      addEndpoint(formData as EndpointDef);
    }
    setEditingId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      removeEndpoint(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
    }
  };

  const renderForm = () => (
    <div className="bg-card border border-border p-6 rounded-xl mt-6 space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h2 className="text-xl font-bold">{endpoints.find(e => e.id === editingId) ? 'Editar Endpoint' : 'Novo Endpoint'}</h2>
        <div className="flex gap-2">
          <button onClick={handleCancel} className="p-2 hover:bg-white/5 rounded-md flex items-center gap-2">
            <X className="w-4 h-4" /> Cancelar
          </button>
          <button onClick={handleSave} className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 font-medium">
            <Save className="w-4 h-4" /> Salvar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">ID (Slug URL)*</label>
          <input 
            type="text" 
            className="w-full bg-background border border-input rounded-md px-3 py-2"
            value={formData.id || ''}
            onChange={e => setFormData({...formData, id: e.target.value})}
            placeholder="ex: tracking/minha-rota"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome*</label>
          <input 
            type="text" 
            className="w-full bg-background border border-input rounded-md px-3 py-2"
            value={formData.name || ''}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Categoria</label>
          <input 
            type="text" 
            className="w-full bg-background border border-input rounded-md px-3 py-2"
            value={formData.category || ''}
            onChange={e => setFormData({...formData, category: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Grupo</label>
          <input 
            type="text" 
            className="w-full bg-background border border-input rounded-md px-3 py-2"
            value={formData.group || ''}
            onChange={e => setFormData({...formData, group: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Método HTTP*</label>
          <select 
            className="w-full bg-background border border-input rounded-md px-3 py-2"
            value={formData.method || 'POST'}
            onChange={e => setFormData({...formData, method: e.target.value as any})}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>PATCH</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Caminho (Path)*</label>
          <input 
            type="text" 
            className="w-full bg-background border border-input rounded-md px-3 py-2"
            value={formData.path || ''}
            onChange={e => setFormData({...formData, path: e.target.value})}
            placeholder="/Tracking/Minha/Rota"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Descrição</label>
        <textarea 
          className="w-full bg-background border border-input rounded-md px-3 py-2 h-24"
          value={formData.description || ''}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Default Payload (JSON)</label>
        <textarea 
          className="w-full bg-background border border-input rounded-md px-3 py-2 h-32 font-mono text-sm"
          value={typeof formData.defaultPayload === 'string' ? formData.defaultPayload : JSON.stringify(formData.defaultPayload, null, 2)}
          onChange={e => {
            try {
              setFormData({...formData, defaultPayload: JSON.parse(e.target.value)});
            } catch {
              // Store as string if invalid JSON while typing
              setFormData({...formData, defaultPayload: e.target.value});
            }
          }}
        />
      </div>

      {/* Basic Schema Editor */}
      <div className="space-y-4 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-primary">Campos do Schema</label>
          <button 
            onClick={() => {
              const currentSchema = formData.schema || { name: 'Root', fields: [] };
              setFormData({
                ...formData,
                schema: {
                  ...currentSchema,
                  fields: [...currentSchema.fields, { name: '', type: 'string', description: '', required: false }]
                }
              });
            }}
            className="text-xs bg-secondary px-2 py-1 rounded flex items-center gap-1"
          >
            <Plus className="w-3 h-3"/> Adicionar Campo
          </button>
        </div>
        
        {formData.schema?.fields?.map((field, idx) => (
          <div key={idx} className="flex gap-2 items-start p-3 bg-secondary/20 rounded border border-border/50">
            <div className="grid grid-cols-2 gap-2 flex-1">
              <input 
                placeholder="Nome do campo"
                className="bg-background border border-input rounded px-2 py-1 text-sm font-mono"
                value={field.name}
                onChange={e => {
                  const newFields = [...(formData.schema?.fields || [])];
                  newFields[idx].name = e.target.value;
                  setFormData({...formData, schema: { ...formData.schema!, fields: newFields }});
                }}
              />
              <input 
                placeholder="Tipo (ex: string, boolean)"
                className="bg-background border border-input rounded px-2 py-1 text-sm font-mono text-blue-400"
                value={field.type}
                onChange={e => {
                  const newFields = [...(formData.schema?.fields || [])];
                  newFields[idx].type = e.target.value;
                  setFormData({...formData, schema: { ...formData.schema!, fields: newFields }});
                }}
              />
              <textarea 
                placeholder="Descrição"
                className="bg-background border border-input rounded px-2 py-1 text-sm col-span-2 h-16"
                value={field.description}
                onChange={e => {
                  const newFields = [...(formData.schema?.fields || [])];
                  newFields[idx].description = e.target.value;
                  setFormData({...formData, schema: { ...formData.schema!, fields: newFields }});
                }}
              />
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox"
                  checked={field.required}
                  onChange={e => {
                    const newFields = [...(formData.schema?.fields || [])];
                    newFields[idx].required = e.target.checked;
                    setFormData({...formData, schema: { ...formData.schema!, fields: newFields }});
                  }}
                /> Required
              </label>
            </div>
            <button 
              onClick={() => {
                const newFields = formData.schema!.fields.filter((_, i) => i !== idx);
                setFormData({...formData, schema: { ...formData.schema!, fields: newFields }});
              }}
              className="p-1 hover:bg-red-500/20 text-red-400 rounded"
            >
              <Trash2 className="w-4 h-4"/>
            </button>
          </div>
        ))}
      </div>

      {/* Presets (Templates) Editor */}
      <div className="space-y-4 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-primary">Templates (Presets)</label>
          <button 
            onClick={() => {
              const currentPresets = formData.presets || [];
              setFormData({
                ...formData,
                presets: [...currentPresets, { name: 'Novo Template', payload: {} }]
              });
            }}
            className="text-xs bg-secondary px-2 py-1 rounded flex items-center gap-1"
          >
            <Plus className="w-3 h-3"/> Adicionar Template
          </button>
        </div>
        
        {formData.presets?.map((preset, idx) => (
          <div key={idx} className="flex gap-2 items-start p-3 bg-secondary/20 rounded border border-border/50">
            <div className="flex-1 space-y-2">
              <input 
                placeholder="Nome do Template"
                className="w-full bg-background border border-input rounded px-3 py-2 text-sm font-semibold"
                value={preset.name}
                onChange={e => {
                  const newPresets = [...(formData.presets || [])];
                  newPresets[idx].name = e.target.value;
                  setFormData({...formData, presets: newPresets});
                }}
              />
              <textarea 
                placeholder="Payload (JSON)"
                className="w-full bg-background border border-input rounded px-3 py-2 text-sm font-mono h-24"
                value={typeof preset.payload === 'string' ? preset.payload : JSON.stringify(preset.payload, null, 2)}
                onChange={e => {
                  const newPresets = [...(formData.presets || [])];
                  try {
                    newPresets[idx].payload = JSON.parse(e.target.value);
                  } catch {
                    newPresets[idx].payload = e.target.value;
                  }
                  setFormData({...formData, presets: newPresets});
                }}
              />
            </div>
            <button 
              onClick={() => {
                const newPresets = formData.presets!.filter((_, i) => i !== idx);
                setFormData({...formData, presets: newPresets});
              }}
              className="p-1 hover:bg-red-500/20 text-red-400 rounded mt-1"
            >
              <Trash2 className="w-4 h-4"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const groupedEndpoints = (endpoints || []).reduce((acc, ep) => {
    const groupName = ep.group || 'Sem Grupo';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(ep);
    return acc;
  }, {} as Record<string, EndpointDef[]>);

  if (!isClient) return <div className="p-8">Carregando...</div>;

  return (
    <AppScrollbar className="h-full">
      <div className="p-8 max-w-5xl mx-auto pb-24">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar para Dashboard
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Endpoints</h1>
            <p className="text-muted-foreground mt-1">Gerencie os endpoints dinâmicos da documentação.</p>
          </div>
          {!editingId && (
            <div className="flex gap-2">
              <button
                onClick={handleAddNew}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4" /> Adicionar Endpoint
              </button>
            </div>
          )}
        </div>

        {editingId ? renderForm() : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {(!endpoints || endpoints.length === 0) ? (
              <div className="p-8 text-center text-muted-foreground">
                Nenhum endpoint dinâmico cadastrado.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {Object.entries(groupedEndpoints).map(([group, eps]) => (
                  <div key={group}>
                    <div className="bg-secondary/40 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-y border-border">
                      {group}
                    </div>
                    <div className="divide-y divide-border">
                      {eps.map(ep => (
                        <div key={ep.id} className="p-4 flex items-center justify-between hover:bg-secondary/10 transition-colors">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                ep.method === 'GET' ? 'bg-blue-400/20 text-blue-400' :
                                ep.method === 'POST' ? 'bg-green-400/20 text-green-400' :
                                ep.method === 'PUT' ? 'bg-yellow-400/20 text-yellow-400' :
                                'bg-red-400/20 text-red-400'
                              }`}>
                                {ep.method}
                              </span>
                              <span className="font-semibold">{ep.name}</span>
                            </div>
                            <div className="font-mono text-xs text-muted-foreground">{ep.path}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(ep)} className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            {confirmDeleteId === ep.id ? (
                              <div className="flex items-center gap-1 bg-red-500/10 rounded px-2">
                                <span className="text-xs text-red-500 font-medium">Confirmar?</span>
                                <button onClick={() => handleDelete(ep.id)} className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setConfirmDeleteId(null)} className="p-1 hover:bg-secondary rounded text-muted-foreground transition-colors">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <button onClick={() => handleDelete(ep.id)} className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppScrollbar>
  );
}
