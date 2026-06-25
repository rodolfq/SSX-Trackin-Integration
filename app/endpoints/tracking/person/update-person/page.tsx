import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Update Person"
        method="POST"
        path="/Tracking/Person/UpdatePerson"
        description="Método utlizado para atualizar uma pessoa"
      />
    </div>
  );
}
