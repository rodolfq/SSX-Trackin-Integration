import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Sensor List"
        method="POST"
        path="/Tracking/Sensor/List"
        description="Método utlizado para listar os sensores dos rastreadores."
      />
    </div>
  );
}
