import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Daily Consolidated Workday"
        method="POST"
        path="/Tracking/Report/DailyConsolidatedWorkday"
        description="Método utilizado para gerar o relatório Jornada de Trabalho consolidado diário."
      />
    </div>
  );
}
