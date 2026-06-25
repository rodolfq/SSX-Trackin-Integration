import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="List Person"
        method="POST"
        path="/Tracking/Person/ListPerson"
        description="Método utlizado para listar as pessoas dos cliente."
      />
    </div>
  );
}
