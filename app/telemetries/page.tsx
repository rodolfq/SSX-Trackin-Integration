'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { AppScrollbar } from '@/components/AppScrollbar';
import { useAuthStore } from '@/store/authStore';

interface Telemetry {
  IdTelemetry: number;
  Name: string;
}

export default function TelemetriesCatalog() {
  const { token } = useAuthStore();
  const [telemetries, setTelemetries] = useState<Telemetry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    async function fetchTelemetries() {
      if (!token) {
        setError('Token de autenticação não encontrado. Faça o login.');
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch('/api/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endpoint: '/Tracking/Telemetry/List',
            method: 'POST',
            data: {},
            headers: { Authorization: `Bearer ${token}` },
          }),
        });

        const result = await res.json();
        
        if (result.status >= 400) {
          throw new Error(result.error || 'Erro ao carregar telemetrias');
        }

        const data = result.data || result;
        if (Array.isArray(data)) {
          setTelemetries(data);
        } else {
          throw new Error('Formato de resposta inválido');
        }
      } catch (err: any) {
        setError(err.message || 'Erro inesperado');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTelemetries();
  }, [token]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredTelemetries = useMemo(() => {
    return telemetries.filter((t) => {
      const q = searchQuery.toLowerCase();
      return (
        t.Name?.toLowerCase().includes(q) ||
        t.IdTelemetry?.toString().includes(q)
      );
    });
  }, [telemetries, searchQuery]);

  const totalPages = Math.ceil(filteredTelemetries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTelemetries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" />
          Catálogo de Telemetrias
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Lista completa de telemetrias disponíveis. Utilize estes IDs e Nomes ao buscar dados no endpoint de Telemetry.
        </p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          placeholder="Pesquisar por nome ou ID..."
        />
      </div>

      {error && (
        <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden bg-card flex flex-col min-h-[500px]">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span>Carregando telemetrias...</span>
            </div>
          </div>
        ) : filteredTelemetries.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8 text-muted-foreground">
            Nenhuma telemetria encontrada.
          </div>
        ) : (
          <>
            <AppScrollbar className="w-full flex-1">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-secondary/50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {currentItems.map((item) => (
                    <tr key={item.IdTelemetry} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-muted-foreground">{item.IdTelemetry}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary font-medium">{item.Name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AppScrollbar>
            
            <div className="bg-secondary/30 px-6 py-3 flex items-center justify-between border-t border-border mt-auto">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-medium text-foreground">{startIndex + 1}</span> a <span className="font-medium text-foreground">{Math.min(startIndex + itemsPerPage, filteredTelemetries.length)}</span> de <span className="font-medium text-foreground">{filteredTelemetries.length}</span> resultados
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium px-2">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
