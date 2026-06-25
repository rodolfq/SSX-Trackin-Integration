import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Position History List"
        method="POST"
        path="/Tracking/PositionHistory/List"
        description="Método utlizado para listar o histórico de posições dos rastreadores."
      />
    </div>
  );
}
