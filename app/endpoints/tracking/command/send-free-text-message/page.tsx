import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Send Free Text Message"
        method="POST"
        path="/Tracking/Command/SendFreeTextMessage"
        description="Método usado para envio de mensagem de texto livre do periférico/teclado Virloc10"
        defaultPayload={{
          "TrackerIdentifier": "string",
          "Text": "string"
        }}
        schema={{
          name: "SendFreeTextMessageParameter",
          fields: [
            {
              name: "TrackerIdentifier",
              type: "string",
              description: "A identificação do rastreador",
              required: true
            },
            {
              name: "Text",
              type: "string",
              description: "O texto a ser enviado",
              required: true
            }
          ]
        }}
        presets={[
          {
            name: "Default",
            payload: {
              "TrackerIdentifier": "string",
              "Text": "string"
            }
          }
        ]}
      />
    </div>
  );
}
