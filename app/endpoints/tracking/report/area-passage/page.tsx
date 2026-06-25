import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Area Passage"
        method="POST"
        path="/Tracking/Report/AreaPassage"
        description="Método utilizado para gerar o relatório de passagem por área"
      />
    </div>
  );
}
