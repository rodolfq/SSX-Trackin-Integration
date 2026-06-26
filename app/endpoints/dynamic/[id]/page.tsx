'use client';

import { useEndpointStore } from '@/store/endpointStore';
import { EndpointView } from '@/components/EndpointView';
import { notFound, useParams } from 'next/navigation';

export default function DynamicEndpointPage() {
  const { id } = useParams();
  const { endpoints } = useEndpointStore();
  
  const endpoint = endpoints.find(e => e.id === id);
  
  if (!endpoint) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-muted-foreground">
        <div>
          <h2 className="text-xl font-bold mb-2">Endpoint não encontrado</h2>
          <p>Este endpoint pode ter sido removido ou o URL está incorreto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <EndpointView
        title={`${endpoint.group} - ${endpoint.name}`}
        method={endpoint.method as any}
        path={endpoint.path}
        description={endpoint.description}
        defaultPayload={endpoint.defaultPayload}
        schema={endpoint.schema as any}
        presets={endpoint.presets as any}
      />
    </div>
  );
}
