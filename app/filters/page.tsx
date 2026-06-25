import { Search } from 'lucide-react';
import { AppScrollbar } from '@/components/AppScrollbar';

const filters = [
  { name: 'Equal', description: 'Igualdade estrita. Retorna apenas registros que correspondem exatamente ao valor.', example: 'TrackedUnit = LLU-0000' },
  { name: 'NotEqual', description: 'Diferença. Retorna registros cujo valor não seja o informado.', example: 'Status != Inactive' },
  { name: 'GreaterThan', description: 'Maior que. Geralmente usado para datas e números.', example: 'InitialDate > 2024-01-01' },
  { name: 'GreaterThanOrEqual', description: 'Maior ou igual a.', example: 'Speed >= 80' },
  { name: 'LessThan', description: 'Menor que.', example: 'FinalDate < 2024-01-31' },
  { name: 'LessThanOrEqual', description: 'Menor ou igual a.', example: 'BatteryLevel <= 20' },
  { name: 'Contains', description: 'Contém. Busca parcial de texto.', example: 'DriverName contém "João"' },
  { name: 'StartsWith', description: 'Começa com.', example: 'Plate StartsWith "ABC"' },
  { name: 'EndsWith', description: 'Termina com.', example: 'Plate EndsWith "1234"' },
];

export default function FiltersCatalog() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Catálogo de Filtros
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A API SSX utiliza um padrão comum para filtragem (Condition). Abaixo estão listadas as condições aceitas pela maioria dos endpoints.
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-card placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          placeholder="Pesquisar filtro..."
        />
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <AppScrollbar className="w-full">
          <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Condição</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Descrição</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Exemplo de Uso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {filters.map((filter) => (
              <tr key={filter.name} className="hover:bg-secondary/20">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary font-medium">{filter.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{filter.description}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground font-mono bg-secondary/10">{filter.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </AppScrollbar>
      </div>
    </div>
  );
}
