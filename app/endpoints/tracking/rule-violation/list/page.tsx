import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Rule Violation List"
        method="POST"
        path="/Tracking/RuleViolation/List"
        description="Método utlizado para listar o histórico de violações de regra das unidades rastreadas."
      />
    </div>
  );
}
