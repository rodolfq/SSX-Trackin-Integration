import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Actuator List"
        method="POST"
        path="/Tracking/Actuator/List"
        description="Método utlizado para listar os atuadores dos rastreadores."
      />
    </div>
  );
}
