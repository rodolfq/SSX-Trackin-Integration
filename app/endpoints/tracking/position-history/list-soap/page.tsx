import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Position History List Soap"
        method="POST"
        path="/Tracking/PositionHistory/ListSoap"
        description="Método utlizado para listar o histórico de posições dos rastreadores."
      />
    </div>
  );
}
