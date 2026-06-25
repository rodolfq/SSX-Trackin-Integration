import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Message List"
        method="POST"
        path="/Tracking/Message/List"
        description="Método utlizado para listar as mensagens trocadas entre o Portal, APP Onboard e teclado."
      />
    </div>
  );
}
