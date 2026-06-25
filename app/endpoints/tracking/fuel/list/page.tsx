import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Fuel List"
        method="POST"
        path="/Tracking/Fuel/List"
        description="Método utlizado para listar abastecimentos. Utilizado para filtrar o resultado da consulta. Ex.: [{&quot;PropertyName&quot;: &quot;Name&quot;,&quot;Condition&quot;: &quot;Equal&quot;,&quot;Value&quot;: &quot;xyz&quot;}]"
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
