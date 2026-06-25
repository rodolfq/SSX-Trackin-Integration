import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="List Rules By Unit Tracked"
        method="POST"
        path="/Tracking/RuleList/ListRulesByUnitTracked"
        description="Método utlizado para listar regras associadas a uma unidade rastreada."
      />
    </div>
  );
}
