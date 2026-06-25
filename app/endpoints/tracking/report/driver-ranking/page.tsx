import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Driver Ranking"
        method="POST"
        path="/Tracking/Report/DriverRanking"
        description="Método utilizado para gerar o relatório de ranking de motoristas"
      />
    </div>
  );
}
