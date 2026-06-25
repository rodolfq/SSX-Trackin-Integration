import { Search } from 'lucide-react';
import { AppScrollbar } from '@/components/AppScrollbar';

const telemetries = [
  { id: '1', name: 'Ignition', description: 'Status da ignição do veículo (Ligado/Desligado).', example: 'True / False' },
  { id: '2', name: 'Speed', description: 'Velocidade atual do veículo em km/h.', example: '85.5' },
  { id: '3', name: 'Odometer', description: 'Odômetro total ou parcial acumulado.', example: '125000' },
  { id: '4', name: 'BatteryLevel', description: 'Nível de tensão da bateria do rastreador ou veículo.', example: '12.4' },
  { id: '5', name: 'GPS_Fix', description: 'Indica se há posicionamento GPS válido.', example: 'True / False' },
  { id: '6', name: 'Satellites', description: 'Quantidade de satélites visíveis/conectados.', example: '8' },
  { id: '7', name: 'RPM', description: 'Rotações por minuto do motor.', example: '2500' },
  { id: '8', name: 'Temperature', description: 'Temperatura de sensores analógicos conectados.', example: '-18.5' },
  { id: '9', name: 'FuelLevel', description: 'Nível de combustível estimado ou lido pela CAN.', example: '75' },
];

export default function TelemetriesCatalog() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Catálogo de Telemetrias
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore os tipos de sensores e dados telemétricos disponíveis através dos hardwares integrados. Utilize estes IDs e Nomes ao buscar dados no endpoint de Telemetry.
        </p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-card placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          placeholder="Pesquisar por nome ou ID..."
        />
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <AppScrollbar className="w-full">
          <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nome</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Descrição</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Exemplo de Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {telemetries.map((item) => (
              <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-muted-foreground">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary font-medium">{item.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{item.description}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground font-mono bg-secondary/10">{item.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </AppScrollbar>
      </div>
    </div>
  );
}
