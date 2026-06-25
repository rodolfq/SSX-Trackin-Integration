import { EndpointView } from '@/components/EndpointView';

export default function PositionHistoryPage() {
  return (
    <div className="h-full">
      <EndpointView
        title="Position History (v3)"
        method="POST"
        path="/v3/Tracking/PositionHistory/List"
        description="Método utlizado para listar o histórico de posições dos rastreadores com o adendo das propriedades Plate, ListTrailer, DocumentNumber e DriverIdentification. Pelo menos um filtro deve ser utilizado. Um máximo de 500 resultados são exibidos por vez."
        defaultPayload={[
          {
            "PropertyName": "TrackedUnitIntegrationCode",
            "Condition": "=",
            "Value": "0001"
          }
        ]}
        parameters={[
          {
            name: 'PropertyName',
            type: 'string',
            required: true,
            description: 'Nome da propriedade a ser filtrada (ex: TrackedUnitIntegrationCode, Plate, EventDate)'
          },
          {
            name: 'Condition',
            type: 'string',
            required: true,
            description: 'Condição do filtro (ex: =, >, <, >=, <=, !=)'
          },
          {
            name: 'Value',
            type: 'string | number',
            required: true,
            description: 'Valor para a condição'
          }
        ]}
        presets={[
          {
            name: 'Posições de hoje',
            payload: [
              {
                "PropertyName": "EventDate",
                "Condition": "GreaterThan",
                "Value": new Date().toISOString().split('T')[0]
              }
            ]
          },
          {
            name: 'Posições do dia atual (String)',
            payload: [
              {
                "PropertyName": "EventDate",
                "Condition": "GreaterThan",
                "Value": "DIA ATUAL"
              }
            ]
          },
          {
            name: 'Última posição',
            payload: [
              {
                "PropertyName": "IdPosition",
                "Condition": "GreaterThan",
                "Value": "1"
              }
            ]
          },
          {
            name: 'A partir do último IdPosition',
            payload: [
              {
                "PropertyName": "IdPosition",
                "Condition": "GreaterThan",
                "Value": "LastIdPosition"
              }
            ]
          }
        ]}
      />
    </div>
  );
}
