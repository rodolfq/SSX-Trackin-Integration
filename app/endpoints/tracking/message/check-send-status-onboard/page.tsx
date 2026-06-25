import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Check Send Status Onboard"
        method="POST"
        path="/Tracking/Message/CheckSendStatusOnboard"
        description="Método utlizado para verificar o status do envio da mensagem."
      />
    </div>
  );
}
