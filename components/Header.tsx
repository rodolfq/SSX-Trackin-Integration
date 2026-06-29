'use client';

import { Search } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { token } = useAuthStore();
  
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card shrink-0">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <span className="absolute left-3 top-2.5 text-muted-foreground">
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="text" 
            placeholder="Search endpoints..." 
            className="bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm w-full focus:outline-none focus:border-primary transition-colors text-foreground"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        {token && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Current Token</span>
            <span className="text-xs font-mono text-primary">{token.substring(0, 10)}...{token.substring(token.length - 4)}</span>
          </div>
        )}
        {token && (
          <button
            onClick={() => {
              useAuthStore.getState().logout();
              localStorage.clear();
              window.location.href = '/auth';
            }}
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Sair
          </button>
        )}
        <ThemeToggle />
        <Link 
          href="/auth" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {token ? 'Gerenciar Token' : 'Login'}
        </Link>
      </div>
    </header>
  );
}
