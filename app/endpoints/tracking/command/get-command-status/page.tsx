import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Get Command Status"
        method="POST"
        path="/Tracking/Command/GetCommandStatus"
        description="Método usado para listar o status do comando enviado."
        defaultPayload={{
          "IdCommand": 0
        }}
        schema={{
          name: "GetCommandStatusParameter",
          fields: [
            {
              name: "IdCommand",
              type: "integer($int32)",
              description: "Identificador único do comando enviado ao rastreador.",
              required: false
            }
          ]
        }}
        presets={[
          {
            name: "Default",
            payload: {
              "IdCommand": 0
            }
          }
        ]}
      />
    </div>
  );
}
