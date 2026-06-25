import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="List Person Role"
        method="POST"
        path="/Tracking/Person/ListPersonRole"
        description="Método utlizado para listar os cargos dos funcionários."
      />
    </div>
  );
}
