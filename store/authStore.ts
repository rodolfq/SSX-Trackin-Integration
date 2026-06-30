import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  username: string | null;
  createdAt: number | null;
  setAuth: (token: string, username: string, createdAt?: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      createdAt: null,
      setAuth: (token, username, createdAt) => set({ token, username, createdAt: createdAt || Date.now() }),
      logout: () => set({ token: null, username: null, createdAt: null }),
    }),
    {
      name: 'ssx-auth-storage',
    }
  )
);
