import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Maintenance List"
        method="POST"
        path="/Tracking/Report/Maintenance/List"
        description="Método utilizado para gerar o relatório de manutenção."
      />
    </div>
  );
}
