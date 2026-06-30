'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from 'next-themes';

// Fix Leaflet's default icon path issues
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

function MapBounds({ vehicles, selectedVehicle }: { vehicles: Record<string, any[]>; selectedVehicle: string | null }) {
  const map = useMap();

  useEffect(() => {
    let latlngs: [number, number][] = [];

    if (selectedVehicle && vehicles[selectedVehicle]) {
      latlngs = vehicles[selectedVehicle].map((p: any) => [p.Latitude, p.Longitude]);
    } else {
      Object.values(vehicles).forEach((vehiclePositions: any[]) => {
        vehiclePositions.forEach(p => {
          latlngs.push([p.Latitude, p.Longitude]);
        });
      });
    }

    if (latlngs.length > 0) {
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [vehicles, selectedVehicle, map]);

  return null;
}

// A small helper to generate a consistent color based on string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

export default function TrackingMap() {
  const { token } = useAuthStore();
  const { resolvedTheme } = useTheme();
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const [telemetries, setTelemetries] = useState<Record<string, string>>({});

  const fetchPositionsAndTelemetries = async () => {
    if (!token) {
      setError('No authentication token found. Please login first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Telemetries Catalog
      const telemetriesRes = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: '/Tracking/Telemetry/List',
          method: 'POST',
          data: {},
          headers: { 'Authorization': `Bearer ${token}` }
        })
      });
      
      let telemetryDict: Record<string, string> = {};
      if (telemetriesRes.ok) {
        const telemetriesData = await telemetriesRes.json();
        const dataArray = telemetriesData.data || telemetriesData;
        if (Array.isArray(dataArray)) {
          telemetryDict = dataArray.reduce((acc, curr) => {
            acc[curr.IdTelemetry] = curr.Name;
            return acc;
          }, {} as Record<string, string>);
        }
      }
      setTelemetries(telemetryDict);

      // 2. Fetch Position History
      const payload = [
        {
          "PropertyName": "EventDate",
          "Condition": "GreaterThan",
          "Value": new Date().toISOString().split('T')[0] // Today
        }
      ];

      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: '/v3/Tracking/PositionHistory/List',
          method: 'POST',
          data: payload,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      });
      
      const resData = await res.json();
      
      if (resData.status === 204) {
        setPositions([]);
      } else if (resData.status >= 400) {
        throw new Error(resData.data?.Message || 'Failed to fetch positions');
      } else {
        setPositions(resData.data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (token) {
      timeoutId = setTimeout(() => fetchPositionsAndTelemetries(), 0);
    }
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Group positions by vehicle
  const vehicles = positions.reduce((acc, pos) => {
    const code = pos.TrackedUnitIntegrationCode || pos.TrackedUnit || 'Unknown';
    if (!acc[code]) acc[code] = [];
    acc[code].push(pos);
    return acc;
  }, {} as Record<string, any[]>);

  // Sort each vehicle's positions by date
  Object.keys(vehicles).forEach(code => {
    vehicles[code].sort((a: any, b: any) => new Date(a.EventDate).getTime() - new Date(b.EventDate).getTime());
  });

  const [activeTab, setActiveTab] = useState<'map' | 'developer'>('map');

  const getLatestPosition = (vehiclePositions: any[]) => {
    return vehiclePositions[vehiclePositions.length - 1];
  };

  const devGuideCode = `
// 1. Busque o dicionário de Telemetrias
const resTelemetries = await fetch('https://api.systemsat.com.br/v3/Tracking/Telemetry/List', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer SEU_TOKEN' },
  body: JSON.stringify({})
});
const telemetries = await resTelemetries.json();
const telemetryDict = telemetries.reduce((acc, curr) => {
  acc[curr.IdTelemetry] = curr.Name;
  return acc;
}, {});

// 2. Busque o histórico de Posições
const resPositions = await fetch('https://api.systemsat.com.br/v3/Tracking/PositionHistory/List', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer SEU_TOKEN' },
  body: JSON.stringify([
    {
      "PropertyName": "EventDate",
      "Condition": "GreaterThan",
      "Value": "2024-01-01" // ajuste conforme necessário
    }
  ])
});
const positions = await resPositions.json();

// 3. Ao exibir a posição, mapeie os IDs em ListTelemetry para o nome real
const listTelemetry = position.ListTelemetry || {};
Object.entries(listTelemetry).forEach(([key, value]) => {
  const nomeReal = telemetryDict[key] || key;
  console.log(\`\${nomeReal}: \${value}\`);
});
  `.trim();

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="p-4 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Live Tracking Map</h2>
            <p className="text-sm text-muted-foreground">Displaying today&apos;s positions for {Object.keys(vehicles).length} vehicles.</p>
          </div>
          <div className="flex bg-secondary p-1 rounded-md">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${activeTab === 'map' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Map View
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${activeTab === 'developer' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Developer Guide
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button 
            onClick={fetchPositionsAndTelemetries} 
            disabled={loading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
      
      {activeTab === 'map' ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Vehicle List */}
          <div className="w-64 border-r border-border bg-card overflow-y-auto">
            <div className="p-3 border-b border-border">
              <h3 className="font-medium text-sm">Vehicles ({Object.keys(vehicles).length})</h3>
            </div>
            <div className="divide-y divide-border">
              <button 
                onClick={() => setSelectedVehicle(null)}
                className={`w-full text-left p-3 text-sm hover:bg-secondary/50 transition-colors ${selectedVehicle === null ? 'bg-secondary' : ''}`}
              >
                All Vehicles
              </button>
              {Object.keys(vehicles).map(code => {
                const latest = getLatestPosition(vehicles[code]);
                return (
                  <button
                    key={code}
                    onClick={() => setSelectedVehicle(code)}
                    className={`w-full text-left p-3 text-sm hover:bg-secondary/50 transition-colors ${selectedVehicle === code ? 'bg-secondary' : ''}`}
                  >
                    <div className="font-medium truncate">{latest.TrackedUnit || code}</div>
                    <div className="text-xs text-muted-foreground mt-1">{vehicles[code].length} positions</div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Map Area */}
          <div className="flex-1 bg-muted relative z-0">
            <MapContainer 
              center={[-23.5505, -46.6333]} 
              zoom={4} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                key={resolvedTheme} // force re-render when theme changes
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={resolvedTheme === 'light' 
                  ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                  : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                }
              />
              <MapBounds vehicles={vehicles} selectedVehicle={selectedVehicle} />
              
              {/* Draw Polylines and Markers */}
              {Object.keys(vehicles)
                .filter(code => selectedVehicle === null || selectedVehicle === code)
                .map(code => {
                  const vehiclePositions = vehicles[code];
                  const latest = getLatestPosition(vehiclePositions);
                  const latlngs = vehiclePositions.map((p: any) => [p.Latitude, p.Longitude] as [number, number]);
                  
                  const traceColor = selectedVehicle === null ? stringToColor(code) : '#3b82f6';
                  
                  return (
                    <div key={code}>
                      {/* Trace */}
                      {latlngs.length > 1 && (
                        <Polyline 
                          positions={latlngs} 
                          color={traceColor} 
                          weight={selectedVehicle === code ? 4 : 3}
                          opacity={selectedVehicle === code ? 1 : 0.8}
                        />
                      )}
                      
                      {/* Latest Position Marker */}
                      {latest && (
                        <Marker position={[latest.Latitude, latest.Longitude]} icon={icon}>
                          <Popup>
                            <div className="text-sm max-w-[250px]">
                              <strong className="block mb-1">{latest.TrackedUnit || code}</strong>
                              <div className="text-gray-500 mb-2">{new Date(latest.EventDate).toLocaleString()}</div>
                              
                              <div className="max-h-[150px] overflow-y-auto pr-2 divide-y divide-border/50">
                                {Object.entries(latest.ListTelemetry || {}).map(([key, value]) => {
                                  const name = telemetries[key] || key;
                                  return (
                                    <div key={key} className="py-1 flex justify-between gap-2 text-xs">
                                      <span className="text-muted-foreground truncate" title={name}>{name}:</span>
                                      <span className="font-mono">{String(value)}</span>
                                    </div>
                                  );
                                })}
                                {latest.Plate && (
                                  <div className="py-1 flex justify-between gap-2 text-xs">
                                    <span className="text-muted-foreground">Placa:</span>
                                    <span className="font-mono">{latest.Plate}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                    </div>
                  );
              })}
            </MapContainer>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-8 bg-card">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Como implementar o Mapa e o Dicionário de Telemetrias</h3>
              <p className="text-muted-foreground">
                Para exibir corretamente o mapa com as posições e suas respectivas telemetrias (como &quot;Ignição Ligada&quot;, &quot;Velocidade&quot;, etc.), você precisa 
                consultar duas rotas na API da SystemSat: a lista de Telemetrias e a lista de Histórico de Posições.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold border-b border-border pb-2">Passo a Passo</h4>
              
              <div className="grid gap-6">
                <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                    Busque o Dicionário de Telemetrias
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Consulte o endpoint <code className="bg-secondary px-1 py-0.5 rounded text-xs">/v3/Tracking/Telemetry/List</code>. 
                    Ele retorna todas as telemetrias disponíveis e seus respectivos IDs. 
                    Transforme essa lista em um dicionário (chave-valor) para acesso rápido.
                  </p>
                </div>

                <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                    Busque o Histórico de Posições
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Consulte o endpoint <code className="bg-secondary px-1 py-0.5 rounded text-xs">/v3/Tracking/PositionHistory/List</code> 
                    passando os filtros desejados (ex: período). Ele trará as posições, e o atributo <code className="bg-secondary px-1 py-0.5 rounded text-xs">ListTelemetry</code> conterá 
                    apenas os IDs de telemetria e seus valores, sem o nome legível.
                  </p>
                </div>
                
                <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                    Sincronize os dados na Interface
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    Ao renderizar o detalhe de uma posição no mapa, pegue cada ID de <code className="bg-secondary px-1 py-0.5 rounded text-xs">ListTelemetry</code> 
                    e busque o nome correspondente no dicionário construído no Passo 1.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold border-b border-border pb-2">Exemplo em Javascript / Typescript</h4>
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
                <code>{devGuideCode}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
