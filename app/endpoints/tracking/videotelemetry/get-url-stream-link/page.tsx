import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Get URL Stream Link"
        method="POST"
        path="/Tracking/Videotelemetry/GetURLStreamLink"
        description="Endpoint for Videotelemetry"
      />
    </div>
  );
}
