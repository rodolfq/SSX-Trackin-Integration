import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialEndpoints } from './initialEndpoints';

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
  presets?: EndpointPreset[];
}

interface EndpointStore {
  endpoints: EndpointDef[];
  addEndpoint: (endpoint: EndpointDef) => void;
  updateEndpoint: (id: string, endpoint: Partial<EndpointDef>) => void;
  removeEndpoint: (id: string) => void;
  setEndpoints: (endpoints: EndpointDef[]) => void;
  resetEndpoints: () => void;
}

// Using imported initialEndpoints
export const useEndpointStore = create<EndpointStore>()(
  persist(
    (set) => ({
      endpoints: initialEndpoints as EndpointDef[],
      addEndpoint: (endpoint) =>
        set((state) => ({ endpoints: [...state.endpoints, endpoint] })),
      updateEndpoint: (id, updated) =>
        set((state) => ({
          endpoints: state.endpoints.map((ep) =>
            ep.id === id ? { ...ep, ...updated } : ep
          ),
        })),
      removeEndpoint: (id) =>
        set((state) => ({
          endpoints: state.endpoints.filter((ep) => ep.id !== id),
        })),
      setEndpoints: (endpoints) => set({ endpoints }),
      resetEndpoints: () => set({ endpoints: initialEndpoints as EndpointDef[] }),
    }),
    {
      name: 'ssx-endpoints-storage',
    }
  )
);
