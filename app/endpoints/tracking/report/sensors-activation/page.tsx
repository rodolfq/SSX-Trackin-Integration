import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Sensors Activation"
        method="POST"
        path="/Tracking/Report/SensorsActivation"
        description="Método utilizado para gerar o relatório de ativação de atuadores (saídas)"
      />
    </div>
  );
}
