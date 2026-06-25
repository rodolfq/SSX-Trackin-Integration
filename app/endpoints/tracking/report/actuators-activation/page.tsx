import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Actuators Activation"
        method="POST"
        path="/Tracking/Report/ActuatorsActivation"
        description="Método utilizado para gerar o relatório de ativação de sensores (entradas)"
      />
    </div>
  );
}
