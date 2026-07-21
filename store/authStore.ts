import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_API_SPACE } from '@/lib/constants';

interface AuthState {
  token: string | null;
  username: string | null;
  createdAt: number | null;
  tokens: Record<string, { token: string | null; username: string | null; createdAt: number | null }>;
  setAuth: (token: string, username: string, createdAt?: number, category?: string) => void;
  logout: (category?: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      createdAt: null,
      tokens: {},
      setAuth: (token, username, createdAt, category = DEFAULT_API_SPACE) => set((state) => ({
        token: category === DEFAULT_API_SPACE ? token : state.token,
        username: category === DEFAULT_API_SPACE ? username : state.username,
        createdAt: category === DEFAULT_API_SPACE ? (createdAt || Date.now()) : state.createdAt,
        tokens: {
          ...state.tokens,
          [category]: { token, username, createdAt: createdAt || Date.now() }
        }
      })),
      logout: (category = DEFAULT_API_SPACE) => set((state) => {
        const nextTokens = { ...state.tokens };
        delete nextTokens[category];
        return {
          token: category === DEFAULT_API_SPACE ? null : state.token,
          username: category === DEFAULT_API_SPACE ? null : state.username,
          createdAt: category === DEFAULT_API_SPACE ? null : state.createdAt,
          tokens: nextTokens
        };
      }),
    }),
    {
      name: 'ssx-auth-storage-v2',
    }
  )
);
