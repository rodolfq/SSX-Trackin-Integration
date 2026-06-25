import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Fuel Insert"
        method="POST"
        path="/Tracking/Fuel/Insert"
        description="Método utlizado para inserir um abastecimento."
        defaultPayload={{
          "FuellingIntegrationCode": "string",
          "FuelTypeCode": 0,
          "VehicleIntegrationCode": "string",
          "DriverIntegrationCode": "string",
          "FuelStationIntegrationCode": "string",
          "Odometer": 0,
          "Hourmeter": 0,
          "FuelAmountLiters": 0,
          "LiterPrice": 0,
          "TotalPayment": 0,
          "FuelDate": "2026-06-25T17:27:05.561Z",
          "TankComplete": true
        }}
        schema={{
          name: "FuelInsertParameter",
          fields: [
            {
              name: "FuellingIntegrationCode",
              type: "string",
              description: "maxLength: 40\nminLength: 1\nCódigo único que identifica o abastecimento.",
              required: true
            },
            {
              name: "FuelTypeCode",
              type: "integer($int32)",
              description: "Código único que identifica o tipo de combustível: 1=Gasolina; 2=Álcool; 3=Diesel; 4=Gás natural; 5=Diesel S10; 6=ARLA32; 7=Diesel S10 Aditivado; 8=Diesel S10 Especial; 9=Diesel S500 Comum.",
              required: true
            },
            {
              name: "VehicleIntegrationCode",
              type: "string",
              description: "maxLength: 40\nminLength: 1\nCódigo único que identifica o veículo abastecido.",
              required: true
            },
            {
              name: "DriverIntegrationCode",
              type: "string",
              description: "maxLength: 40\nminLength: 1\nnullable: true\nCódigo único que identifica o motorista ou responsável pelo abastecimento.",
              required: false
            },
            {
              name: "FuelStationIntegrationCode",
              type: "string",
              description: "maxLength: 40\nminLength: 1\nnullable: true\nCódigo único que identifica o posto de abastecimento.",
              required: false
            },
            {
              name: "Odometer",
              type: "number($double)",
              description: "nullable: true\nOdômetro do veículo no momento do abastecimento;",
              required: false
            },
            {
              name: "Hourmeter",
              type: "number($double)",
              description: "nullable: true\nHorímetro do veículo no momento do abastecimento;",
              required: false
            },
            {
              name: "FuelAmountLiters",
              type: "number($double)",
              description: "Quantidade de litros abastecidos;",
              required: true
            },
            {
              name: "LiterPrice",
              type: "number($double)",
              description: "nullable: true\nValor pago pelo litro do combustível;",
              required: false
            },
            {
              name: "TotalPayment",
              type: "number($double)",
              description: "nullable: true\nValor total pago pelo abastecimento;",
              required: false
            },
            {
              name: "FuelDate",
              type: "string($date-time)",
              description: "Data do abastecimento;",
              required: true
            },
            {
              name: "TankComplete",
              type: "boolean",
              description: "nullable: true\nO tanque de combustível do veículo foi completo no abastecimento;",
              required: false
            }
          ]
        }}
        presets={[
          {
            name: "Default",
            payload: {
              "FuellingIntegrationCode": "string",
              "FuelTypeCode": 0,
              "VehicleIntegrationCode": "string",
              "DriverIntegrationCode": "string",
              "FuelStationIntegrationCode": "string",
              "Odometer": 0,
              "Hourmeter": 0,
              "FuelAmountLiters": 0,
              "LiterPrice": 0,
              "TotalPayment": 0,
              "FuelDate": "2026-06-25T17:27:05.561Z",
              "TankComplete": true
            }
          }
        ]}
      />
    </div>
  );
}
