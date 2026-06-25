import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Position History List (v2)"
        method="POST"
        path="/v2/Tracking/PositionHistory/List"
        description="Método utlizado para listar o histórico de posições dos rastreadores com a propriedade ListTrailer"
      />
    </div>
  );
}
