import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Tracked Unit Usage"
        method="POST"
        path="/Tracking/Report/TrackedUnitUsage"
        description="Método utilizado para gerar o relatório de utilização de unidade rastreada (BDV)"
      />
    </div>
  );
}
