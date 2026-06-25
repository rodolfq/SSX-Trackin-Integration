import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="List Unit Tracked By Rule"
        method="POST"
        path="/Tracking/RuleList/ListUnitTrackedByRule"
        description="Método utlizado para listar unidades rastreadas associadas a uma regra."
      />
    </div>
  );
}
