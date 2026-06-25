import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Event List"
        method="POST"
        path="/Tracking/Event/List"
        description="Método utlizado para listar os eventos dos rastreadores."
      />
    </div>
  );
}
