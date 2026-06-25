import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Tracked Unit Usage Consolidated"
        method="POST"
        path="/Tracking/Report/TrackedUnitUsageConsolidated"
        description="Método utilizado para gerar o relatório de utilização de unidade rastreada consolidado"
      />
    </div>
  );
}
