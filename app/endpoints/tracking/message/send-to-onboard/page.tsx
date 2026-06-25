import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Send To Onboard"
        method="POST"
        path="/Tracking/Message/SendToOnboard"
        description="Método utlizado para enviar mensagens para o SSX Onboard."
      />
    </div>
  );
}
