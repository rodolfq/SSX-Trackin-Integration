import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Send To Onboard"
        method="POST"
        path="/Tracking/Message/SendToOnboard"
        description="Método utlizado para enviar mensagens para o SSX Onboard."
        defaultPayload={{
          "MessageType": "string",
          "MessageCode": "string",
          "APPIntegrationCode": "string",
          "SenderPersonIntegrationCode": "string",
          "SenderVehicleIntegrationCode": "string",
          "Text": "string",
          "TTS": true,
          "VisibleChat": true,
          "Alert": true
        }}
        schema={{
          name: "OnboardMessageSendParameter",
          fields: [
            {
              name: "MessageType",
              type: "string",
              description: "nullable: true\nTipo de mensagem: 1= Mensagem predefinida; 2= Mensagem de texto livre;",
              required: false
            },
            {
              name: "MessageCode",
              type: "string",
              description: "nullable: true\nCódigo da mensagem predifinida a ser enviada.",
              required: false
            },
            {
              name: "APPIntegrationCode",
              type: "string",
              description: "nullable: true\nCódigo de integração do APP Onboard.",
              required: false
            },
            {
              name: "SenderPersonIntegrationCode",
              type: "string",
              description: "nullable: true\nCódigo de integração da pessoa para quem a mensagem será enviada.",
              required: false
            },
            {
              name: "SenderVehicleIntegrationCode",
              type: "string",
              description: "nullable: true\nCódigo de integração do veiculo para o qual a mensagem será enviada.",
              required: false
            },
            {
              name: "Text",
              type: "string",
              description: "nullable: true\nTexto da mensagem.",
              required: false
            },
            {
              name: "TTS",
              type: "boolean",
              description: "Se a mensagem deve ser falada para o usuário.",
              required: true
            },
            {
              name: "VisibleChat",
              type: "boolean",
              description: "Se a mensagem deve aparecer no chat para o usuário da web.",
              required: true
            },
            {
              name: "Alert",
              type: "boolean",
              description: "Se a mensagem deve aparecer como um alerta.",
              required: true
            }
          ]
        }}
        presets={[
          {
            name: "Default",
            payload: {
              "MessageType": "string",
              "MessageCode": "string",
              "APPIntegrationCode": "string",
              "SenderPersonIntegrationCode": "string",
              "SenderVehicleIntegrationCode": "string",
              "Text": "string",
              "TTS": true,
              "VisibleChat": true,
              "Alert": true
            }
          }
        ]}
      />
    </div>
  );
}
