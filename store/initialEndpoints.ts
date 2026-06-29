export const initialEndpoints = [
  {
    "id": "login",
    "category": "API Reference",
    "group": "_Login",
    "name": "Login",
    "method": "POST",
    "path": "/Login",
    "description": "Método utilizado para geração do token.",
    "defaultPayload": {
      "Username": "",
      "Password": "",
      "Hashcentral": "",
      "HashAuth": "",
      "ClientIntegrationCodeBus": ""
    },
    "schema": {
      "name": "Payload",
      "fields": [
        {
          "name": "Username",
          "type": "string",
          "description": "Login do usuário. O usuário deve ser criado no portal Tracking com suas devidas permissões associadas.",
          "required": true
        },
        {
          "name": "Password",
          "type": "string",
          "description": "Login do usuário. O usuário deve ser criado no portal Tracking com suas devidas permissões associadas.",
          "required": true
        },
        {
          "name": "Hashcentral",
          "type": "string",
          "description": "Código único de identificação da Central. Esse campo deve ser preenchido caso o login não seja um email.",
          "required": false
        },
        {
          "name": "HashAuth",
          "type": "string",
          "description": "Código único de identificação da integração. Esse campo deverá ser preenchido nos casos abaixo: \r\n\r\n1) Utilização dos métodos: \r\n- /Tracking/PositionHistory/List\r\n- /v2/Tracking/PositionHistory/List\r\n- /Tracking/RuleViolation/List. \r\n\r\nPara estes métodos o cliente deverá ter o Produto WebService liberado, bem como a integração configurada com o Integrador \"SSX WebService\" e tipo \"SSX Tracking Integration\" criada no SSX.\r\n\r\n2) Utilização dos métodos da API \"SSX Tracking Integration App\". Para a requisição dos métodos pertencentes a esta API, o cliente deverá ter a integração configurada com o Integrador \"SSX WebService\" e tipo \"SSX Tracking Integration\" no SSX. (*)Essa Integração possui uma cobrança adicional.\r\n\r\nPara estes casos, o parâmetro será obrigatório para identificação das unidades rastreadas que farão parte da integração.",
          "required": false
        },
        {
          "name": "ClientIntegrationCodeBus",
          "type": "string",
          "description": "Código único de identificação do cliente do Global Bus no SSX",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "ResultToken",
      "fields": [
        {
          "name": "AccessToken",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "ExpiresIn",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-actuator-list",
    "category": "API Reference",
    "group": "Actuator",
    "name": "Actuator List",
    "method": "POST",
    "path": "/Tracking/Actuator/List",
    "description": "Método utlizado para listar os atuadores dos rastreadores.",
    "defaultPayload": {},
    "schema": {
      "name": "Payload",
      "fields": []
    },
    "responseSchema": {
      "name": "ActuatorResult[]",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-command-getcommandstatus",
    "category": "API Reference",
    "group": "Command",
    "name": "Command Get Command Status",
    "method": "POST",
    "path": "/Tracking/Command/GetCommandStatus",
    "description": "Método usado para listar o status do comando enviado.",
    "defaultPayload": {},
    "schema": {
      "name": "GetCommandStatusParameter",
      "fields": []
    },
    "responseSchema": {
      "name": "CommandStatusResult",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-command-sendfreetextmessage",
    "category": "API Reference",
    "group": "Command",
    "name": "Command Send Free Text Message",
    "method": "POST",
    "path": "/Tracking/Command/SendFreeTextMessage",
    "description": "Método usado para envio de mensagem de texto livre do periférico/teclado Virloc10",
    "defaultPayload": {},
    "schema": {
      "name": "SendFreeTextMessageParameter",
      "fields": []
    },
    "responseSchema": {
      "name": "Response",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-event-list",
    "category": "API Reference",
    "group": "Event",
    "name": "Event List",
    "method": "POST",
    "path": "/Tracking/Event/List",
    "description": "Método utlizado para listar os eventos dos rastreadores.",
    "defaultPayload": {},
    "schema": {
      "name": "Payload",
      "fields": []
    },
    "responseSchema": {
      "name": "EventResult[]",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-fuel-insert",
    "category": "API Reference",
    "group": "Fuel",
    "name": "Fuel Insert",
    "method": "POST",
    "path": "/Tracking/Fuel/Insert",
    "description": "Método utlizado para inserir um abastecimento.",
    "defaultPayload": {},
    "schema": {
      "name": "FuelInsertParameter",
      "fields": []
    },
    "responseSchema": {
      "name": "FuelInsertResult",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-fuel-insertlist",
    "category": "API Reference",
    "group": "Fuel",
    "name": "Fuel Insert List",
    "method": "POST",
    "path": "/Tracking/Fuel/InsertList",
    "description": "Método utlizado para inserir vários abastecimentos.",
    "defaultPayload": [
      {}
    ],
    "schema": {
      "name": "FuelInsertParameter[]",
      "fields": []
    },
    "responseSchema": {
      "name": "FuelListInsertResult",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-fuel-list",
    "category": "API Reference",
    "group": "Fuel",
    "name": "Fuel List",
    "method": "POST",
    "path": "/Tracking/Fuel/List",
    "description": "Método utlizado para listar abastecimentos.",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "FuelListResult[]",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-message-checksendstatusonboard",
    "category": "API Reference",
    "group": "Message",
    "name": "Message Check Send Status Onboard",
    "method": "POST",
    "path": "/Tracking/Message/CheckSendStatusOnboard",
    "description": "Método utlizado para verificar o status do envio da mensagem.",
    "defaultPayload": {},
    "schema": {
      "name": "MessageStatusParameter",
      "fields": []
    },
    "responseSchema": {
      "name": "MessageStatusResult",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-message-list",
    "category": "API Reference",
    "group": "Message",
    "name": "Message List",
    "method": "POST",
    "path": "/Tracking/Message/List",
    "description": "Método utlizado para listar as mensagens trocadas entre o Portal, APP Onboard e teclado.",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "MessageResult[]",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-message-sendtoonboard",
    "category": "API Reference",
    "group": "Message",
    "name": "Message Send To Onboard",
    "method": "POST",
    "path": "/Tracking/Message/SendToOnboard",
    "description": "Método utlizado para enviar mensagens para o SSX Onboard.",
    "defaultPayload": {},
    "schema": {
      "name": "OnboardMessageSendParameter",
      "fields": []
    },
    "responseSchema": {
      "name": "OnboardMessageSendResult",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-person-autogenerateintegrationcode",
    "category": "API Reference",
    "group": "Person",
    "name": "Person Auto Generate Integration Code",
    "method": "POST",
    "path": "/Tracking/Person/AutoGenerateIntegrationCode",
    "description": "Método utilizado para gerar automaticamente um código de integração (Do cliente final) para as pessoas que ainda estão com essa propriedade nula no banco de dados do SSX. Atualiza somente as pessoas que sejam do mesmo cliente do usuário logado",
    "defaultPayload": {},
    "schema": {
      "name": "Payload",
      "fields": []
    },
    "responseSchema": {
      "name": "Response",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-person-insertperson",
    "category": "API Reference",
    "group": "Person",
    "name": "Person Insert Person",
    "method": "POST",
    "path": "/Tracking/Person/InsertPerson",
    "description": "Método utilizado para inserir uma pessoa.",
    "defaultPayload": {},
    "schema": {
      "name": "PersonInsertParameter_Tracking",
      "fields": []
    },
    "responseSchema": {
      "name": "PersonResult",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-person-listperson",
    "category": "API Reference",
    "group": "Person",
    "name": "Person List Person",
    "method": "POST",
    "path": "/Tracking/Person/ListPerson",
    "description": "Método utlizado para listar as pessoas dos cliente.",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "ResultListPerson[]",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-person-listpersonrole",
    "category": "API Reference",
    "group": "Person",
    "name": "Person List Person Role",
    "method": "POST",
    "path": "/Tracking/Person/ListPersonRole",
    "description": "Método utlizado para listar os cargos dos funcionários.",
    "defaultPayload": {},
    "schema": {
      "name": "Payload",
      "fields": []
    },
    "responseSchema": {
      "name": "PersonRoleResult[]",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-person-updateperson",
    "category": "API Reference",
    "group": "Person",
    "name": "Person Update Person",
    "method": "POST",
    "path": "/Tracking/Person/UpdatePerson",
    "description": "Método utlizado para atualizar uma pessoa\r\nSe você passar a proprieade InsertIfNotExists = true, o sistema irá cadastrar a pessoa automaticamente caso não seja encontrado no banco de dados.",
    "defaultPayload": {},
    "schema": {
      "name": "PersonUpdateParameter_Tracking",
      "fields": []
    },
    "responseSchema": {
      "name": "PersonResult",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "v3-tracking-positionhistory-list",
    "category": "API Reference",
    "group": "PositionHistory",
    "name": "Position History (v3)",
    "method": "POST",
    "path": "/v3/Tracking/PositionHistory/List",
    "description": "Método utlizado para listar o histórico de posições dos rastreadores com o adendo das propriedades Plate (placa do  veículo), ListTrailer que irá trazer todos os engates/reboques/implementos agrícolas e etc. que estiverem associados a posição, DocumentNumber que trará o CPF do motorista e DriverIdentification com a identificação do motorista através do RFID ou IButton.\r\nPelo menos um filtro deve ser utilizado. Um máximo de 500 resultados são exibidos por vez.\r\nExemplo de filtro: [{\"PropertyName\": \"TrackedUnitIntegrationCode\",\"Condition\": \"=\",\"Value\": \"0001\"}]",
    "defaultPayload": [
      {
        "PropertyName": "TrackedUnitIntegrationCode",
        "Condition": "Equal",
        "Value": "0001"
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "PositionWithTrailerAndPlateResult[]",
      "fields": []
    },
    "presets": [
      {
        "name": "Posições de hoje",
        "payload": [
          {
            "PropertyName": "EventDate",
            "Condition": "GreaterThan",
            "Value": "2026-06-29"
          }
        ]
      },
      {
        "name": "Posições do dia atual (String)",
        "payload": [
          {
            "PropertyName": "EventDate",
            "Condition": "GreaterThan",
            "Value": "DIA ATUAL"
          }
        ]
      },
      {
        "name": "Última posição",
        "payload": [
          {
            "PropertyName": "IdPosition",
            "Condition": "GreaterThan",
            "Value": "1"
          }
        ]
      },
      {
        "name": "A partir do último IdPosition",
        "payload": [
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
    "id": "tracking-report-actuatorsactivation",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Actuators Activation",
    "method": "POST",
    "path": "/Tracking/Report/ActuatorsActivation",
    "description": "Método utilizado para gerar o relatório de ativação de sensores (entradas)",
    "defaultPayload": {
      "StartDate": "",
      "EndDate": ""
    },
    "schema": {
      "name": "InputOutputActivationFilterParameter",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "InputOutputActivationResult[]",
      "fields": [
        {
          "name": "TrackerOrder",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-report-areapassage",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Area Passage",
    "method": "POST",
    "path": "/Tracking/Report/AreaPassage",
    "description": "Método utilizado para gerar o relatório de passagem por área",
    "defaultPayload": {
      "StartDate": "",
      "EndDate": "",
      "OrganizationalUnitList": "",
      "TrackedUnitList": ""
    },
    "schema": {
      "name": "AreaPassageFilterParameter",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "OrganizationalUnitList",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "TrackedUnitList",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "AreaPassageResult[]",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "Duration",
          "type": "number",
          "description": "",
          "required": false
        },
        {
          "name": "Driver",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-report-dailyconsolidatedworkday",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Daily Consolidated Workday",
    "method": "POST",
    "path": "/Tracking/Report/DailyConsolidatedWorkday",
    "description": "Método utilizado para gerar o relatório Jornada de Trabalho consolidado diário.",
    "defaultPayload": {
      "StartDate": "",
      "EndDate": ""
    },
    "schema": {
      "name": "DailyConsolidatedWorkdayFilterParameter",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "DailyConsolidatedWorkdayResult[]",
      "fields": [
        {
          "name": "Employee",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-report-driverranking",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Driver Ranking",
    "method": "POST",
    "path": "/Tracking/Report/DriverRanking",
    "description": "Método utilizado para gerar o relatório de ranking de motoristas",
    "defaultPayload": {
      "StartDate": "",
      "EndDate": "",
      "OrganizationalUnitList": "",
      "DriverList": "",
      "EmployeeTypeIntegrationCode": ""
    },
    "schema": {
      "name": "DriverRankingFilterParameter",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "OrganizationalUnitList",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "DriverList",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EmployeeTypeIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "DriverRankingResult[]",
      "fields": [
        {
          "name": "OrganizationalUnit",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "Driver",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EmployeePosition",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "MaximumSpeed",
          "type": "number",
          "description": "",
          "required": false
        },
        {
          "name": "AverageCruiserSpeed",
          "type": "number",
          "description": "",
          "required": false
        },
        {
          "name": "AverageSpeed",
          "type": "number",
          "description": "",
          "required": false
        },
        {
          "name": "MaximumRPM",
          "type": "number",
          "description": "",
          "required": false
        },
        {
          "name": "AverageRPM",
          "type": "number",
          "description": "",
          "required": false
        },
        {
          "name": "IdleMotorTime",
          "type": "number",
          "description": "",
          "required": false
        },
        {
          "name": "Displacement",
          "type": "number",
          "description": "",
          "required": false
        },
        {
          "name": "Duration",
          "type": "number",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-report-maintenance-list",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Maintenance List",
    "method": "POST",
    "path": "/Tracking/Report/Maintenance/List",
    "description": "Método utilizado para gerar o relatório de manutenção.",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "MaintenanceListResult[]",
      "fields": [
        {
          "name": "MaintenanceCode",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-report-sensorsactivation",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Sensors Activation",
    "method": "POST",
    "path": "/Tracking/Report/SensorsActivation",
    "description": "Método utilizado para gerar o relatório de ativação de atuadores (saídas)",
    "defaultPayload": {
      "StartDate": "",
      "EndDate": ""
    },
    "schema": {
      "name": "InputOutputActivationFilterParameter",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "InputOutputActivationResult[]",
      "fields": [
        {
          "name": "TrackerOrder",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-report-trackedunitusage",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Tracked Unit Usage",
    "method": "POST",
    "path": "/Tracking/Report/TrackedUnitUsage",
    "description": "Método utilizado para gerar o relatório de utilização de unidade rastreada (BDV)",
    "defaultPayload": {
      "StartDate": "",
      "EndDate": "",
      "OrganizationalUnitList": ""
    },
    "schema": {
      "name": "TrackedUnitUsageFilterParameter",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "OrganizationalUnitList",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "TrackedUnitUsageResult[]",
      "fields": [
        {
          "name": "Driver",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "TrackerOrder",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-report-trackedunitusageconsolidated",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Tracked Unit Usage Consolidated",
    "method": "POST",
    "path": "/Tracking/Report/TrackedUnitUsageConsolidated",
    "description": "Método utilizado para gerar o relatório de utilização de unidade rastreada consolidado (BDV Consolidado)",
    "defaultPayload": {
      "StartDate": "",
      "EndDate": "",
      "ConsolidationType": 0
    },
    "schema": {
      "name": "TrackedUnitUsageConsolidatedFilterParameter",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "ConsolidationType",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "TrackedUnitUsageConsolidatedResult[]",
      "fields": [
        {
          "name": "TrackerOrder",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-report-workdaysteps",
    "category": "API Reference",
    "group": "Report",
    "name": "Report Workday Steps",
    "method": "POST",
    "path": "/Tracking/Report/WorkdaySteps",
    "description": "Método utilizado para gerar o relatório Etapas de jornada de trabalho.",
    "defaultPayload": {
      "StartDate": "",
      "EndDate": ""
    },
    "schema": {
      "name": "WorkdayStepsFilterParameter",
      "fields": [
        {
          "name": "StartDate",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "EndDate",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "WorkdayStepsResult[]",
      "fields": [
        {
          "name": "WorkdayStepFunctionId",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-rulecompatible-list",
    "category": "API Reference",
    "group": "RuleCompatible",
    "name": "Rule Compatible List",
    "method": "POST",
    "path": "/Tracking/RuleCompatible/List",
    "description": "Método utlizado para listar as regras compátíveis com rastreador/unidades rastreadas. Pelo menos um filtro deve ser utilizado.",
    "defaultPayload": {
      "TrackingUnitIntegrationCode": ""
    },
    "schema": {
      "name": "RuleCompatibleListParameter",
      "fields": [
        {
          "name": "TrackingUnitIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "RuleCompatibleResult[]",
      "fields": [
        {
          "name": "RuleIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-rulecompatible-setassociationoftrackedunitwithrule",
    "category": "API Reference",
    "group": "RuleCompatible",
    "name": "Rule Compatible Set Association Of Tracked Unit With Rule",
    "method": "POST",
    "path": "/Tracking/RuleCompatible/SetAssociationOfTrackedUnitWithRule",
    "description": "Método utlizado para associar uma regra a uma unidade rastreada.",
    "defaultPayload": {
      "TrackedUnitIntegrationCode": "",
      "RuleIntegrationCode": "",
      "TrackedUnitOrder": 0
    },
    "schema": {
      "name": "TrackedUnitAndRuleParameter",
      "fields": [
        {
          "name": "TrackedUnitIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "RuleIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "TrackedUnitOrder",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "Response",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-rulelist-listruleofloggeduser",
    "category": "API Reference",
    "group": "RuleList",
    "name": "Rule List List Rule Of Logged User",
    "method": "POST",
    "path": "/Tracking/RuleList/ListRuleOfLoggedUser",
    "description": "Método utlizado para listar as regras do usuário logado.",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "RulesByLoggedUserResult[]",
      "fields": [
        {
          "name": "RuleIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-rulelist-listrulesbyunittracked",
    "category": "API Reference",
    "group": "RuleList",
    "name": "Rule List List Rules By Unit Tracked",
    "method": "POST",
    "path": "/Tracking/RuleList/ListRulesByUnitTracked",
    "description": "Método utlizado para listar regras associadas a uma unidade rastreada.",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "RulesByUnitTrackedResult[]",
      "fields": [
        {
          "name": "RuleIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-rulelist-listunittrackedbyrule",
    "category": "API Reference",
    "group": "RuleList",
    "name": "Rule List List Unit Tracked By Rule",
    "method": "POST",
    "path": "/Tracking/RuleList/ListUnitTrackedByRule",
    "description": "Método utlizado para listar unidades rastreadas associadas a uma regra.",
    "defaultPayload": {
      "RuleIntegrationCode": ""
    },
    "schema": {
      "name": "UnitTrackedByRuleParameter",
      "fields": [
        {
          "name": "RuleIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "UnitTrackedByRuleResult[]",
      "fields": [
        {
          "name": "TrackedUnit",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-ruleviolation-list",
    "category": "API Reference",
    "group": "RuleViolation",
    "name": "Rule Violation List",
    "method": "POST",
    "path": "/Tracking/RuleViolation/List",
    "description": "Método utlizado para listar o histórico de violações de regra das unidades rastreadas. Pelo menos um filtro deve ser utilizado.",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "RuleViolationResult[]",
      "fields": [
        {
          "name": "IdRuleViolation",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-ruleviolation-v2-list",
    "category": "API Reference",
    "group": "RuleViolation",
    "name": "Rule Violation v2 List",
    "method": "POST",
    "path": "/Tracking/RuleViolation/v2/List",
    "description": "Método utlizado para listar o histórico de violações de regra das unidades rastreadas. Pelo menos um filtro deve ser utilizado. Obs.: Versão V2 trazendo o código de integração da Unidade Organizacional",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "RuleViolationResultV2[]",
      "fields": [
        {
          "name": "IdRuleViolation",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-sensor-list",
    "category": "API Reference",
    "group": "Sensor",
    "name": "Sensor List",
    "method": "POST",
    "path": "/Tracking/Sensor/List",
    "description": "Método utlizado para listar os sensores dos rastreadores.",
    "defaultPayload": {},
    "schema": {
      "name": "Payload",
      "fields": []
    },
    "responseSchema": {
      "name": "SensorResult[]",
      "fields": [
        {
          "name": "IdSensor",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-telemetry-list",
    "category": "API Reference",
    "group": "Telemetry",
    "name": "Telemetry List",
    "method": "POST",
    "path": "/Tracking/Telemetry/List",
    "description": "Método utlizado para listar as telemetrias dos rastreadores.",
    "defaultPayload": {},
    "schema": {
      "name": "Payload",
      "fields": []
    },
    "responseSchema": {
      "name": "TelemetryResult[]",
      "fields": [
        {
          "name": "IdTelemetry",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  },
  {
    "id": "tracking-trailer-list",
    "category": "API Reference",
    "group": "Trailer",
    "name": "Trailer List",
    "method": "POST",
    "path": "/Tracking/Trailer/List",
    "description": "Método utilizado para listar reboques ( carretas, implementos agrícolas e etc ).",
    "defaultPayload": [
      {
        "PropertyName": "",
        "Condition": "",
        "Value": ""
      }
    ],
    "schema": {
      "name": "QueryCondition[]",
      "fields": [
        {
          "name": "PropertyName",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Condition",
          "type": "string",
          "description": "",
          "required": true
        },
        {
          "name": "Value",
          "type": "string",
          "description": "Valor a ser utilizado no filtro.",
          "required": true
        }
      ]
    },
    "responseSchema": {
      "name": "TrailerResult[]",
      "fields": []
    },
    "presets": []
  },
  {
    "id": "tracking-videotelemetry-geturlstreamlink",
    "category": "API Reference",
    "group": "Videotelemetry",
    "name": "Videotelemetry Get URLStream Link",
    "method": "POST",
    "path": "/Tracking/Videotelemetry/GetURLStreamLink",
    "description": "Retorna a URL para consumo de vídeo ao vivo, baseado no canal solicitado.",
    "defaultPayload": {
      "VehicleIntegrationCode": "",
      "Channel": 0
    },
    "schema": {
      "name": "VideotelemetryRequest",
      "fields": [
        {
          "name": "VehicleIntegrationCode",
          "type": "string",
          "description": "",
          "required": false
        },
        {
          "name": "Channel",
          "type": "integer",
          "description": "",
          "required": false
        }
      ]
    },
    "responseSchema": {
      "name": "VideoTelemetryResult",
      "fields": [
        {
          "name": "URLStream",
          "type": "string",
          "description": "",
          "required": false
        }
      ]
    },
    "presets": []
  }
];
