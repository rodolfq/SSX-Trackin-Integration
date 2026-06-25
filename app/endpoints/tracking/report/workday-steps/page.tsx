import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Workday Steps"
        method="POST"
        path="/Tracking/Report/WorkdaySteps"
        description="Método utilizado para gerar o relatório Etapas de jornada de trabalho."
      />
    </div>
  );
}
