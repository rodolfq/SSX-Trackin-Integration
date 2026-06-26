import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="List Person"
        method="POST"
        path="/Tracking/Person/ListPerson"
        description="Método utlizado para listar as pessoas dos cliente."
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
