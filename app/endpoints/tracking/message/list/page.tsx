import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Message List"
        method="POST"
        path="/Tracking/Message/List"
        description="Método utlizado para listar as mensagens trocadas entre o Portal, APP Onboard e teclado."
        defaultPayload={[
          {
            "PropertyName": "string",
            "Condition": "string"
          }
        ]}
        schema={{
          name: "QueryCondition[]",
          fields: [
            {
              name: "PropertyName",
              type: "string",
              description: "maxLength: 150\nminLength: 1\nNome da propriedade que se deseja filtrar.",
              required: true
            },
            {
              name: "Condition",
              type: "string",
              description: "Condição utilizada no filtro: Contains, NotContains, StartsWith, EndsWith, Equal, DoesNotEqual, GreaterThan, LessThan, GreaterThanOrEqualTo, LessThanOrEqualTo",
              required: true
            },
            {
              name: "Value",
              type: "object",
              description: "Valor a ser utilizado no filtro.",
              required: true
            }
          ]
        }}
        presets={[
          {
            name: "Default",
            payload: [
              {
                "PropertyName": "string",
                "Condition": "string"
              }
            ]
          }
        ]}
      />
    </div>
  );
}
