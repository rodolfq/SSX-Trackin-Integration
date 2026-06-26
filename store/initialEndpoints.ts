export const initialEndpoints = [
{
  id: "tracking/actuator/list",
  category: "API Reference",
  group: "Actuator",
  name: "Actuator List",
  method: "POST",
  path: "/Tracking/Actuator/List",
  description: "Método utlizado para listar os atuadores dos rastreadores.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/command/get-command-status",
  category: "API Reference",
  group: "Command",
  name: "Get Command Status",
  method: "POST",
  path: "/Tracking/Command/GetCommandStatus",
  description: "Método usado para listar o status do comando enviado.",
  defaultPayload: {
          "IdCommand": 0
        },
  schema: {
          name: "GetCommandStatusParameter",
          fields: [
            {
              name: "IdCommand",
              type: "integer($int32)",
              description: "Identificador único do comando enviado ao rastreador.",
              required: false
            }
          ]
        },
  presets: [
          {
            name: "Default",
            payload: {
              "IdCommand": 0
            }
          }
        ]
},
{
  id: "tracking/command/send-free-text-message",
  category: "API Reference",
  group: "Command",
  name: "Send Free Text Message",
  method: "POST",
  path: "/Tracking/Command/SendFreeTextMessage",
  description: "Método usado para envio de mensagem de texto livre do periférico/teclado Virloc10",
  defaultPayload: {
          "TrackerIdentifier": "string",
          "Text": "string"
        },
  schema: {
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
        },
  presets: [
          {
            name: "Default",
            payload: {
              "TrackerIdentifier": "string",
              "Text": "string"
            }
          }
        ]
},
{
  id: "tracking/event/list",
  category: "API Reference",
  group: "Event",
  name: "Event List",
  method: "POST",
  path: "/Tracking/Event/List",
  description: "Método utlizado para listar os eventos dos rastreadores.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/fuel/insert",
  category: "API Reference",
  group: "Fuel",
  name: "Fuel Insert",
  method: "POST",
  path: "/Tracking/Fuel/Insert",
  description: "Método utlizado para inserir um abastecimento.",
  defaultPayload: {
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
        },
  schema: {
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
        },
  presets: [
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
        ]
},
{
  id: "tracking/fuel/insert-list",
  category: "API Reference",
  group: "Fuel",
  name: "Fuel Insert List",
  method: "POST",
  path: "/Tracking/Fuel/InsertList",
  description: "Método utlizado para inserir vários abastecimentos.",
  defaultPayload: [
          {
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
            "FuelDate": "2026-06-25T17:27:40.603Z",
            "TankComplete": true
          }
        ],
  schema: {
          name: "FuelInsertParameter[]",
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
        },
  presets: [
          {
            name: "Default",
            payload: [
              {
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
                "FuelDate": "2026-06-25T17:27:40.603Z",
                "TankComplete": true
              }
            ]
          }
        ]
},
{
  id: "tracking/fuel/list",
  category: "API Reference",
  group: "Fuel",
  name: "Fuel List",
  method: "POST",
  path: "/Tracking/Fuel/List",
  description: "Método utlizado para listar abastecimentos. Utilizado para filtrar o resultado da consulta. Ex.: [{&quot;PropertyName&quot;: &quot;Name&quot;,&quot;Condition&quot;: &quot;Equal&quot;,&quot;Value&quot;: &quot;xyz&quot;}]",
  defaultPayload: [
          {
            "PropertyName": "string",
            "Condition": "string"
          }
        ],
  schema: {
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
        },
  presets: [
          {
            name: "Default",
            payload: [
              {
                "PropertyName": "string",
                "Condition": "string"
              }
            ]
          }
        ]
},
{
  id: "tracking/message/check-send-status-onboard",
  category: "API Reference",
  group: "Message",
  name: "Check Send Status Onboard",
  method: "POST",
  path: "/Tracking/Message/CheckSendStatusOnboard",
  description: "Método utlizado para verificar o status do envio da mensagem.",
  defaultPayload: {
          "IdCommandLog": 0
        },
  schema: {
          name: "MessageStatusParameter",
          fields: [
            {
              name: "IdCommandLog",
              type: "integer($int32)",
              description: "Identificador único do envio da mensagem.",
              required: true
            }
          ]
        },
  presets: [
          {
            name: "Default",
            payload: {
              "IdCommandLog": 0
            }
          }
        ]
},
{
  id: "tracking/message/list",
  category: "API Reference",
  group: "Message",
  name: "Message List",
  method: "POST",
  path: "/Tracking/Message/List",
  description: "Método utlizado para listar as mensagens trocadas entre o Portal, APP Onboard e teclado.",
  defaultPayload: [
          {
            "PropertyName": "string",
            "Condition": "string"
          }
        ],
  schema: {
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
        },
  presets: [
          {
            name: "Default",
            payload: [
              {
                "PropertyName": "string",
                "Condition": "string"
              }
            ]
          }
        ]
},
{
  id: "tracking/message/send-to-onboard",
  category: "API Reference",
  group: "Message",
  name: "Send To Onboard",
  method: "POST",
  path: "/Tracking/Message/SendToOnboard",
  description: "Método utlizado para enviar mensagens para o SSX Onboard.",
  defaultPayload: {
          "MessageType": "string",
          "MessageCode": "string",
          "APPIntegrationCode": "string",
          "SenderPersonIntegrationCode": "string",
          "SenderVehicleIntegrationCode": "string",
          "Text": "string",
          "TTS": true,
          "VisibleChat": true,
          "Alert": true
        },
  schema: {
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
        },
  presets: [
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
        ]
},
{
  id: "tracking/person/auto-generate-integration-code",
  category: "API Reference",
  group: "Person",
  name: "Auto Generate Integration Code",
  method: "POST",
  path: "/Tracking/Person/AutoGenerateIntegrationCode",
  description: "Método utilizado para gerar automaticamente um código de integração",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/person/insert-person",
  category: "API Reference",
  group: "Person",
  name: "Insert Person",
  method: "POST",
  path: "/Tracking/Person/InsertPerson",
  description: "Método utilizado para inserir uma pessoa.",
  defaultPayload: {
          "PersonIntegrationCode": "string",
          "OrganizationUnitIntegrationCode": "string",
          "Name": "string",
          "Email": "user@example.com",
          "CountryCode": "string",
          "AreaCode": "string",
          "CellPhoneNumber": "string",
          "PhoneNumber": "string",
          "IDCard": "string",
          "CPF": "string",
          "DateOfBirth": "2026-06-26",
          "Gender": "string",
          "IdentifierType": 0,
          "AccessCodeType": 0,
          "AccessCode": "string",
          "TimeZone": 0,
          "DaylightSaving": false,
          "Language": 0,
          "Country": 0,
          "PersonRoleIntegrationCode": "string",
          "WorkScheduleIntegrationCode": "string",
          "ConsolidationType": 0,
          "Registration": "string",
          "LicenseDriver": "string",
          "ExpirationDateLicenseDriver": "2026-06-26",
          "EmissionDateLicenseDriver": "2026-06-26",
          "FirstDateLicenseDriver": "2026-06-26",
          "LicenseRegistrationType": 0,
          "UserProfileTemplateIntegrationCode": "string",
          "Login": "string",
          "Password": "string"
        },
  schema: {
          name: "PersonInsertParameter_Tracking",
          fields: [
            { name: "PersonIntegrationCode", type: "string", description: "maxLength: 40\nminLength: 1\nnullable: true\nCódigo de integração da pessoa para ser utilizado pelas integrações do Cliente final.", required: false },
            { name: "OrganizationUnitIntegrationCode", type: "string", description: "maxLength: 40\nminLength: 0\nnullable: true\nCódigo de integração da Unidade Organizacional da pessoa.", required: false },
            { name: "Name", type: "string", description: "maxLength: 100\nminLength: 1\nNome da pessoa.", required: true },
            { name: "Email", type: "string($email)", description: "maxLength: 150\nminLength: 0\nnullable: true\nE-mail da pessoa. É obrigatório informar pelo menos 1: Email e/ou CellPhoneNumber).", required: false },
            { name: "CountryCode", type: "string", description: "maxLength: 3\nminLength: 0\npattern: ^[0-9]*$\nnullable: true\nNúmero do DDI do contato da pessoa", required: false },
            { name: "AreaCode", type: "string", description: "maxLength: 3\nminLength: 0\npattern: ^[0-9]*$\nnullable: true\nNúmero do DDD do contato da pessoa", required: false },
            { name: "CellPhoneNumber", type: "string", description: "maxLength: 9\nminLength: 0\npattern: ^[0-9]*$\nnullable: true\nNúmero do celular de contato da pessoa. É obrigatório informar pelo menos 1: CellPhoneNumber e/ou Email).", required: false },
            { name: "PhoneNumber", type: "string($tel)", description: "maxLength: 10\nminLength: 0\npattern: ^[0-9]*$\nnullable: true\nNúmero do telefone de contato da pessoa", required: false },
            { name: "IDCard", type: "string", description: "maxLength: 15\nminLength: 0\npattern: ^[0-9]*$\nnullable: true\nNúmero da carteira de identidade", required: false },
            { name: "CPF", type: "string", description: "maxLength: 11\nminLength: 0\npattern: ^[0-9]*$\nnullable: true\nNúmero do CPF.", required: false },
            { name: "DateOfBirth", type: "string($date)", description: "nullable: true\nData de nascimento da pessoa", required: false },
            { name: "Gender", type: "string", description: "maxLength: 1\nminLength: 0\npattern: ^m?$|^M?$|^f?$|^F?$\nnullable: true\nGênero da pessoa M: Masculino | F: Feminino", required: false },
            { name: "IdentifierType", type: "integer($int32)", description: "maximum: 2\nminimum: 1\nnullable: true\nTipo do Identificador 1 - RFID ou 2 - IButton", required: false },
            { name: "AccessCodeType", type: "integer($int32)", description: "maximum: 2\nminimum: 1\nnullable: true\nTipo do Código de Acesso 1 - Decimal ou 2 - Hexadecimal", required: false },
            { name: "AccessCode", type: "string", description: "maxLength: 16\nminLength: 0\nnullable: true\nNúmero do Código de Acesso da pessoa", required: false },
            { name: "TimeZone", type: "integer($int32)", description: "maximum: 32\nminimum: 1\nnullable: true\nFuso horário do usuário. Brasil(-3) = 31; Brasil(-4) = 28; Caso seja necessário outros códigos solicite a lista ao suporte.", required: false },
            { name: "DaylightSaving", type: "boolean", description: "default: false\nnullable: true\nInforma se o usuário participa do horário de verão.", required: false },
            { name: "Language", type: "integer($int32)", description: "maximum: 3\nminimum: 1\nnullable: true\nIdentificador único do idioma a ser apresentado no sistema. Atualmente disponíveis: 1 - português, 3 - espanhol", required: false },
            { name: "Country", type: "integer($int32)", description: "maximum: 255\nminimum: 1\nnullable: true\nCódigo do país do usuário. Brasil = 29. Caso sejam necessários outros paises solicite a lista ao CRC ou suporte.", required: false },
            { name: "PersonRoleIntegrationCode", type: "string", description: "maxLength: 40\nminLength: 0\nnullable: true\nCódigo de integração do Cargo da pessoa.", required: false },
            { name: "WorkScheduleIntegrationCode", type: "string", description: "maxLength: 40\nminLength: 0\nnullable: true\nCódigo de integração da Escala de Trabalho", required: false },
            { name: "ConsolidationType", type: "integer($int32)", description: "maximum: 2\nminimum: 1\nnullable: true\nTipo de consolidação da jornada", required: false },
            { name: "Registration", type: "string", description: "maxLength: 15\nminLength: 0\nnullable: true\nNúmero da matrícula da pessoa.", required: false },
            { name: "LicenseDriver", type: "string", description: "maxLength: 15\nminLength: 0\nnullable: true\nNúmero da carteira de habilitação.", required: false },
            { name: "ExpirationDateLicenseDriver", type: "string($date)", description: "nullable: true\nData de vencimento da carteira de habilitação.", required: false },
            { name: "EmissionDateLicenseDriver", type: "string($date)", description: "nullable: true\nData de emissão da carteira de habilitação.", required: false },
            { name: "FirstDateLicenseDriver", type: "string($date)", description: "nullable: true\nData da primeira carteira de habilitação.", required: false },
            { name: "LicenseRegistrationType", type: "integer($int32)", description: "maximum: 11\nminimum: 1\nnullable: true\nCategoria da habilitação (CNH) da pessoa", required: false },
            { name: "UserProfileTemplateIntegrationCode", type: "string", description: "maxLength: 40\nminLength: 0\nnullable: true\nTemplate de perfil de acesso. Este template funciona como um modelo para a criação de perfis de acesso e contém todas as funções permitidas ao usuário. O template de perfil de acesso deve ser criado no SSX e o seu código utilizado pelo sistema integrado. Caso não seja informado, a pessoa será inserida mas não será criado um usuário para o mesmo.", required: false },
            { name: "Login", type: "string", description: "maxLength: 150\nminLength: 0\nnullable: true\nLogin do usuário no sistema. *Campo torna-se obrigatório quando a propriedade UserProfileTemplateIntegrationCode é informada", required: false },
            { name: "Password", type: "string($password)", description: "maxLength: 20\nminLength: 0\nnullable: true\nSenha do usuário. *Campo torna-se obrigatório quando a propriedade UserProfileTemplateIntegrationCode é informada", required: false }
          ]
        },
  presets: [
          {
            name: "Default",
            payload: {
              "PersonIntegrationCode": "string",
              "OrganizationUnitIntegrationCode": "string",
              "Name": "string",
              "Email": "user@example.com",
              "CountryCode": "string",
              "AreaCode": "string",
              "CellPhoneNumber": "string",
              "PhoneNumber": "string",
              "IDCard": "string",
              "CPF": "string",
              "DateOfBirth": "2026-06-26",
              "Gender": "string",
              "IdentifierType": 0,
              "AccessCodeType": 0,
              "AccessCode": "string",
              "TimeZone": 0,
              "DaylightSaving": false,
              "Language": 0,
              "Country": 0,
              "PersonRoleIntegrationCode": "string",
              "WorkScheduleIntegrationCode": "string",
              "ConsolidationType": 0,
              "Registration": "string",
              "LicenseDriver": "string",
              "ExpirationDateLicenseDriver": "2026-06-26",
              "EmissionDateLicenseDriver": "2026-06-26",
              "FirstDateLicenseDriver": "2026-06-26",
              "LicenseRegistrationType": 0,
              "UserProfileTemplateIntegrationCode": "string",
              "Login": "string",
              "Password": "string"
            }
          }
        ]
},
{
  id: "tracking/person/list-person",
  category: "API Reference",
  group: "Person",
  name: "List Person",
  method: "POST",
  path: "/Tracking/Person/ListPerson",
  description: "Método utlizado para listar as pessoas dos cliente.",
  defaultPayload: [
          {
            "PropertyName": "string",
            "Condition": "string"
          }
        ],
  schema: {
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
        },
  presets: [
          {
            name: "Default",
            payload: [
              {
                "PropertyName": "string",
                "Condition": "string"
              }
            ]
          }
        ]
},
{
  id: "tracking/person/list-person-role",
  category: "API Reference",
  group: "Person",
  name: "List Person Role",
  method: "POST",
  path: "/Tracking/Person/ListPersonRole",
  description: "Método utlizado para listar os cargos dos funcionários.",
  defaultPayload: {},
  schema: {
          name: "PersonRoleResult[]",
          fields: [
            {
              name: "PersonRoleIntegrationCode",
              type: "string",
              description: "nullable: true\nCódigo de integração do cargo do colaborador",
              required: false
            },
            {
              name: "Name",
              type: "string",
              description: "nullable: true\nNome do cargo do colaborador",
              required: false
            },
            {
              name: "Functions",
              type: "string",
              description: "nullable: true\nFuncões atribuidas ao cargo do colaborador",
              required: false
            }
          ]
        },
  presets: []
},
{
  id: "tracking/person/update-person",
  category: "API Reference",
  group: "Person",
  name: "Update Person",
  method: "POST",
  path: "/Tracking/Person/UpdatePerson",
  description: "Método utlizado para atualizar uma pessoa",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/position-history/list",
  category: "API Reference",
  group: "PositionHistory",
  name: "Position History List",
  method: "POST",
  path: "/Tracking/PositionHistory/List",
  description: "Método utlizado para listar o histórico de posições dos rastreadores.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/position-history/list-soap",
  category: "API Reference",
  group: "PositionHistory",
  name: "Position History List Soap",
  method: "POST",
  path: "/Tracking/PositionHistory/ListSoap",
  description: "Método utlizado para listar o histórico de posições dos rastreadores.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/position-history",
  category: "API Reference",
  group: "PositionHistory",
  name: "Position History (v3)",
  method: "POST",
  path: "/v3/Tracking/PositionHistory/List",
  description: "Método utlizado para listar o histórico de posições dos rastreadores com o adendo das propriedades Plate (placa do veículo), ListTrailer que irá trazer todos os engates/reboques/implementos agrícolas e etc. que estiverem associados a posição, DocumentNumber que trará o CPF do motorista e DriverIdentification com a identificação do motorista através do RFID ou IButton. Pelo menos um filtro deve ser utilizado. Um máximo de 500 resultados são exibidos por vez. Exemplo de filtro: [{\"PropertyName\": \"TrackedUnitIntegrationCode\",\"Condition\": \"=\",\"Value\": \"0001\"}]",
  defaultPayload: [
    {
      "PropertyName": "TrackedUnitIntegrationCode",
      "Condition": "Equal",
      "Value": "0001"
    }
  ],
  schema: {
    name: "QueryCondition",
    fields: [
      { name: "PropertyName", type: "string", description: "Nome da propriedade que se deseja filtrar (maxLength: 150, minLength: 1)", required: true },
      { name: "Condition", type: "string", description: "Condição utilizada no filtro: Contains, NotContains, StartsWith, EndsWith, Equal, DoesNotEqual, GreaterThan, LessThan, GreaterThanOrEqualTo, LessThanOrEqualTo", required: true },
      { name: "Value", type: "any", description: "Valor a ser utilizado no filtro.", required: true }
    ]
  },
  presets: [
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
        ]
},
{
  id: "tracking/position-history/v2-list",
  category: "API Reference",
  group: "PositionHistory",
  name: "Position History List (v2)",
  method: "POST",
  path: "/v2/Tracking/PositionHistory/List",
  description: "Método utlizado para listar o histórico de posições dos rastreadores com a propriedade ListTrailer",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/actuators-activation",
  category: "API Reference",
  group: "Report",
  name: "Actuators Activation",
  method: "POST",
  path: "/Tracking/Report/ActuatorsActivation",
  description: "Método utilizado para gerar o relatório de ativação de sensores (entradas)",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/area-passage",
  category: "API Reference",
  group: "Report",
  name: "Area Passage",
  method: "POST",
  path: "/Tracking/Report/AreaPassage",
  description: "Método utilizado para gerar o relatório de passagem por área",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/daily-consolidated-workday",
  category: "API Reference",
  group: "Report",
  name: "Daily Consolidated Workday",
  method: "POST",
  path: "/Tracking/Report/DailyConsolidatedWorkday",
  description: "Método utilizado para gerar o relatório Jornada de Trabalho consolidado diário.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/driver-ranking",
  category: "API Reference",
  group: "Report",
  name: "Driver Ranking",
  method: "POST",
  path: "/Tracking/Report/DriverRanking",
  description: "Método utilizado para gerar o relatório de ranking de motoristas",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/maintenance-list",
  category: "API Reference",
  group: "Report",
  name: "Maintenance List",
  method: "POST",
  path: "/Tracking/Report/Maintenance/List",
  description: "Método utilizado para gerar o relatório de manutenção.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/sensors-activation",
  category: "API Reference",
  group: "Report",
  name: "Sensors Activation",
  method: "POST",
  path: "/Tracking/Report/SensorsActivation",
  description: "Método utilizado para gerar o relatório de ativação de atuadores (saídas)",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/tracked-unit-usage",
  category: "API Reference",
  group: "Report",
  name: "Tracked Unit Usage",
  method: "POST",
  path: "/Tracking/Report/TrackedUnitUsage",
  description: "Método utilizado para gerar o relatório de utilização de unidade rastreada (BDV)",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/tracked-unit-usage-consolidated",
  category: "API Reference",
  group: "Report",
  name: "Tracked Unit Usage Consolidated",
  method: "POST",
  path: "/Tracking/Report/TrackedUnitUsageConsolidated",
  description: "Método utilizado para gerar o relatório de utilização de unidade rastreada consolidado",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/report/workday-steps",
  category: "API Reference",
  group: "Report",
  name: "Workday Steps",
  method: "POST",
  path: "/Tracking/Report/WorkdaySteps",
  description: "Método utilizado para gerar o relatório Etapas de jornada de trabalho.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/rule-compatible/list",
  category: "API Reference",
  group: "RuleCompatible",
  name: "Rule Compatible List",
  method: "POST",
  path: "/Tracking/RuleCompatible/List",
  description: "Método utlizado para listar as regras compátíveis com rastreador/unidades rastreadas.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/rule-compatible/set-association",
  category: "API Reference",
  group: "RuleCompatible",
  name: "Set Association Of Tracked Unit With Rule",
  method: "POST",
  path: "/Tracking/RuleCompatible/SetAssociationOfTrackedUnitWithRule",
  description: "Método utlizado para associar uma regra a uma unidade rastreada.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/rule-list/list-rule-of-logged-user",
  category: "API Reference",
  group: "RuleList",
  name: "List Rule Of Logged User",
  method: "POST",
  path: "/Tracking/RuleList/ListRuleOfLoggedUser",
  description: "Método utlizado para listar as regras do usuário logado.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/rule-list/list-rules-by-unit-tracked",
  category: "API Reference",
  group: "RuleList",
  name: "List Rules By Unit Tracked",
  method: "POST",
  path: "/Tracking/RuleList/ListRulesByUnitTracked",
  description: "Método utlizado para listar regras associadas a uma unidade rastreada.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/rule-list/list-unit-tracked-by-rule",
  category: "API Reference",
  group: "RuleList",
  name: "List Unit Tracked By Rule",
  method: "POST",
  path: "/Tracking/RuleList/ListUnitTrackedByRule",
  description: "Método utlizado para listar unidades rastreadas associadas a uma regra.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/rule-violation/list",
  category: "API Reference",
  group: "RuleViolation",
  name: "Rule Violation List",
  method: "POST",
  path: "/Tracking/RuleViolation/List",
  description: "Método utlizado para listar o histórico de violações de regra das unidades rastreadas.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/rule-violation/v2-list",
  category: "API Reference",
  group: "RuleViolation",
  name: "Rule Violation List (v2)",
  method: "POST",
  path: "/Tracking/RuleViolation/v2/List",
  description: "Método utlizado para listar o histórico de violações de regra das unidades rastreadas.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/sensor/list",
  category: "API Reference",
  group: "Sensor",
  name: "Sensor List",
  method: "POST",
  path: "/Tracking/Sensor/List",
  description: "Método utlizado para listar os sensores dos rastreadores.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/telemetry/list",
  category: "API Reference",
  group: "Telemetry",
  name: "Telemetry List",
  method: "POST",
  path: "/Tracking/Telemetry/List",
  description: "Método utlizado para listar as telemetrias dos rastreadores.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/trailer/list",
  category: "API Reference",
  group: "Trailer",
  name: "Trailer List",
  method: "POST",
  path: "/Tracking/Trailer/List",
  description: "Método utilizado para listar reboques.",
  defaultPayload: {},
  schema: {},
  presets: []
},
{
  id: "tracking/videotelemetry/get-url-stream-link",
  category: "API Reference",
  group: "Videotelemetry",
  name: "Get URL Stream Link",
  method: "POST",
  path: "/Tracking/Videotelemetry/GetURLStreamLink",
  description: "Endpoint for Videotelemetry",
  defaultPayload: {},
  schema: {},
  presets: []
}
];
