import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Set Association Of Tracked Unit With Rule"
        method="POST"
        path="/Tracking/RuleCompatible/SetAssociationOfTrackedUnitWithRule"
        description="Método utlizado para associar uma regra a uma unidade rastreada."
      />
    </div>
  );
}
