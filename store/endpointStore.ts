import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialEndpoints } from './initialEndpoints';
import { supabase } from '@/lib/supabaseClient';

export interface EndpointField {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface EndpointSchema {
  name: string;
  fields: EndpointField[];
}

export interface EndpointPreset {
  name: string;
  payload: any;
}

export interface EndpointDef {
  id: string; // unique slug like 'tracking/message/list'
  category: string; // e.g. 'Tracking'
  group: string; // e.g. 'Message'
  name: string; // e.g. 'List'
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string; // e.g. '/Tracking/Message/List'
  description: string;
  defaultPayload: any;
  schema?: EndpointSchema;
  responseSchema?: EndpointSchema;
  presets?: EndpointPreset[];
}

interface EndpointStore {
  endpoints: EndpointDef[];
  addEndpoint: (endpoint: EndpointDef) => Promise<void>;
  updateEndpoint: (id: string, endpoint: Partial<EndpointDef>) => void;
  removeEndpoint: (id: string) => Promise<void>;
  setEndpoints: (endpoints: EndpointDef[]) => void;
  deleteCategory: (category: string) => Promise<void>;
  resetEndpoints: () => void;
  syncInitialEndpoints: () => void;
  fetchSupabaseEndpoints: () => Promise<void>;
}

export const useEndpointStore = create<EndpointStore>()(
  persist(
    (set, get) => ({
      endpoints: initialEndpoints as EndpointDef[],
      addEndpoint: async (endpoint) => {
        set((state) => ({ endpoints: [...state.endpoints, endpoint] }));
        try {
          await supabase
            .from('endpoints')
            .upsert({
              id: endpoint.id,
              title: `${endpoint.group} - ${endpoint.name}`,
              method: endpoint.method,
              path: endpoint.path,
              description: endpoint.description,
              category: endpoint.category,
              group_name: endpoint.group,
              name: endpoint.name,
              default_payload: endpoint.defaultPayload,
              schema_fields: endpoint.schema,
              response_schema_fields: endpoint.responseSchema,
              presets: endpoint.presets || []
            });
        } catch (e) {
          console.error('Failed to save endpoint to Supabase:', e);
        }
      },
      updateEndpoint: (id, updated) =>
        set((state) => ({
          endpoints: state.endpoints.map((ep) =>
            ep.id === id ? { ...ep, ...updated } : ep
          ),
        })),
      removeEndpoint: async (id) => {
        set((state) => ({
          endpoints: state.endpoints.filter((ep) => ep.id !== id),
        }));
        try {
          await supabase
            .from('endpoints')
            .delete()
            .eq('id', id);
        } catch (e) {
          console.error('Failed to delete endpoint from Supabase:', e);
        }
      },
      setEndpoints: (endpoints) => set({ endpoints }),
      deleteCategory: async (category) => {
        set((state) => ({
          endpoints: state.endpoints.filter((ep) => ep.category !== category),
        }));
        try {
          await supabase
            .from('endpoints')
            .delete()
            .eq('category', category);
        } catch (e) {
          console.error('Failed to delete category from Supabase:', e);
        }
      },
      resetEndpoints: () => set({ endpoints: initialEndpoints as EndpointDef[] }),
      syncInitialEndpoints: () => set((state) => {
        const initialMap = new Map((initialEndpoints as EndpointDef[]).map(ep => [ep.id, ep]));
        
        // Only keep custom endpoints (not in API Reference) or ones that still exist in initialEndpoints
        const filteredStateEndpoints = state.endpoints.filter(ep => 
          ep.category !== 'API Reference' || initialMap.has(ep.id)
        );

        const updatedEndpoints = filteredStateEndpoints.map(ep => {
          if (initialMap.has(ep.id)) {
            const initial = initialMap.get(ep.id)!;
            return {
              ...ep,
              schema: initial.schema,
              responseSchema: initial.responseSchema,
              defaultPayload: initial.defaultPayload,
              description: initial.description,
              name: initial.name,
              method: initial.method,
              path: initial.path
            };
          }
          return ep;
        });

        const existingIds = new Set(filteredStateEndpoints.map(ep => ep.id));
        const missing = (initialEndpoints as EndpointDef[]).filter(ep => !existingIds.has(ep.id));
        
        return { endpoints: [...updatedEndpoints, ...missing] };
      }),
      fetchSupabaseEndpoints: async () => {
        try {
          const { data, error } = await supabase
            .from('endpoints')
            .select('*');
          
          if (error) throw error;
          
          if (data) {
            const dbEndpoints: EndpointDef[] = data.map((row: any) => ({
              id: row.id,
              category: row.category,
              group: row.group_name,
              name: row.name,
              method: row.method,
              path: row.path,
              description: row.description || '',
              defaultPayload: row.default_payload || {},
              schema: row.schema_fields || { name: 'Payload', fields: [] },
              responseSchema: row.response_schema_fields || { name: 'Response', fields: [] },
              presets: row.presets || []
            }));

            set((state) => {
              const dbIds = new Set(dbEndpoints.map(e => e.id));
              
              // Keep initial endpoints and any custom ones from DB, or state-only custom ones not in DB
              const otherCustom = state.endpoints.filter(ep => 
                ep.category !== 'API Reference' && !dbIds.has(ep.id)
              );

              return {
                endpoints: [...(initialEndpoints as EndpointDef[]), ...dbEndpoints, ...otherCustom]
              };
            });
          }
        } catch (e) {
          console.error('Failed to fetch endpoints from Supabase:', e);
        }
      }
    }),
    {
      name: 'ssx-endpoints-storage-v2',
      onRehydrateStorage: () => (state) => {
        if (state) {
          setTimeout(async () => {
            state.syncInitialEndpoints();
            await state.fetchSupabaseEndpoints();
          }, 0);
        }
      }
    }
  )
);
