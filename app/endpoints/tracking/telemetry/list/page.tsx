import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Telemetry List"
        method="POST"
        path="/Tracking/Telemetry/List"
        description="Método utlizado para listar as telemetrias dos rastreadores."
      />
    </div>
  );
}
