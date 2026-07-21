import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface ResponseDef {
  code: string;
  description: string;
  schema?: EndpointSchema;
  example?: any;
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
  responses?: ResponseDef[];
  presets?: EndpointPreset[];
  sortOrder?: number;
}

interface EndpointStore {
  endpoints: EndpointDef[];
  addEndpoint: (endpoint: EndpointDef) => Promise<void>;
  updateEndpoint: (id: string, endpoint: Partial<EndpointDef>) => void;
  removeEndpoint: (id: string) => Promise<void>;
  setEndpoints: (endpoints: EndpointDef[]) => void;
  deleteCategory: (category: string) => Promise<void>;
  fetchEndpoints: () => Promise<void>;
}

export const useEndpointStore = create<EndpointStore>()(
  persist(
    (set, get) => ({
      endpoints: [],
      addEndpoint: async (endpoint) => {
        set((state) => ({ endpoints: [...state.endpoints, endpoint] }));
        try {
          const res = await fetch('/api/endpoints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(endpoint),
          });
          if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || res.statusText);
        } catch (e) {
          console.error('Failed to save endpoint:', e);
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
          const res = await fetch(`/api/endpoints/${encodeURIComponent(id)}`, { method: 'DELETE' });
          if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || res.statusText);
        } catch (e) {
          console.error('Failed to delete endpoint:', e);
        }
      },
      setEndpoints: (endpoints) => set({ endpoints }),
      deleteCategory: async (category) => {
        set((state) => ({
          endpoints: state.endpoints.filter((ep) => ep.category !== category),
        }));
        try {
          const res = await fetch(`/api/endpoints/category/${encodeURIComponent(category)}`, { method: 'DELETE' });
          if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || res.statusText);
        } catch (e) {
          console.error('Failed to delete category:', e);
        }
      },
      fetchEndpoints: async () => {
        try {
          const res = await fetch('/api/endpoints');
          if (!res.ok) throw new Error(res.statusText);
          const { endpoints: dbEndpoints } = await res.json() as { endpoints: EndpointDef[] };

          set((state) => {
            const dbIds = new Set(dbEndpoints.map(e => e.id));
            // Keep any locally-added endpoints that haven't round-tripped through the DB yet
            const notYetSynced = state.endpoints.filter(ep => !dbIds.has(ep.id));

            return {
              endpoints: [...dbEndpoints, ...notYetSynced]
            };
          });
        } catch (e) {
          console.error('Failed to fetch endpoints from database:', e);
        }
      }
    }),
    {
      name: 'ssx-endpoints-storage-v3',
      onRehydrateStorage: () => (state) => {
        if (state) {
          setTimeout(async () => {
            await state.fetchEndpoints();
          }, 0);
        }
      }
    }
  )
);
