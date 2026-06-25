import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Auto Generate Integration Code"
        method="POST"
        path="/Tracking/Person/AutoGenerateIntegrationCode"
        description="Método utilizado para gerar automaticamente um código de integração"
      />
    </div>
  );
}
