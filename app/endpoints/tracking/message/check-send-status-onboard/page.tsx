import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Check Send Status Onboard"
        method="POST"
        path="/Tracking/Message/CheckSendStatusOnboard"
        description="Método utlizado para verificar o status do envio da mensagem."
        defaultPayload={{
          "IdCommandLog": 0
        }}
        schema={{
          name: "MessageStatusParameter",
          fields: [
            {
              name: "IdCommandLog",
              type: "integer($int32)",
              description: "Identificador único do envio da mensagem.",
              required: true
            }
          ]
        }}
        presets={[
          {
            name: "Default",
            payload: {
              "IdCommandLog": 0
            }
          }
        ]}
      />
    </div>
  );
}
