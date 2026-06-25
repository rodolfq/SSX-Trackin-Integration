import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Insert Person"
        method="POST"
        path="/Tracking/Person/InsertPerson"
        description="Método utilizado para inserir uma pessoa."
      />
    </div>
  );
}
