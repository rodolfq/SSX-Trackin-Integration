import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Trailer List"
        method="POST"
        path="/Tracking/Trailer/List"
        description="Método utilizado para listar reboques."
      />
    </div>
  );
}
