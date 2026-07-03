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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
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
        "example": {
          "AccessToken": "",
          "ExpiresIn": 0
        }
      },
      {
        "code": "401",
        "description": "Unauthorized",
        "example": null
      },
      {
        "code": "403",
        "description": "Usuário ou senha inválido.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "416",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "ActuatorResult[]",
          "fields": [
            {
              "name": "IdActuator",
              "type": "integer",
              "description": "ID do atuador",
              "required": true
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome do atuador",
              "required": true
            }
          ]
        },
        "example": [
          {
            "IdActuator": 0,
            "Name": "string"
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Success",
        "schema": {
          "name": "CommandStatusResult",
          "fields": [
            {
              "name": "IdCommandStatus",
              "type": "integer",
              "description": "Identificador único do status do comando: \r\n1\t- Aguardando para envio automático; \r\n2\t- Enviando automático; \r\n3\t- Aguardando posição do veículo;\r\n4\t- Enviando após transmisão; \r\n5\t- Cancelado por excesso de tentativas;\r\n6\t- Comando cancelado pelo usuário; \r\n7\t- Processado com sucesso; \r\n8\t- Comando rejeitado pelo módulo; \r\n9\t- Não enviado por alguma falha no sistema; \r\n10\t- Enviado para dispositivo periférico; \r\n11\t- Processado pelo periférico; \r\n12\t- Enviado para servidor HTTP;",
              "required": false
            },
            {
              "name": "CommandStatusName",
              "type": "string",
              "description": "Nome do status do comando.",
              "required": false
            },
            {
              "name": "IdTracker",
              "type": "string",
              "description": "Identificação do rastreador.",
              "required": false
            },
            {
              "name": "QueueEntryDate",
              "type": "string",
              "description": "Data em que o comando entrou na fila de envio.",
              "required": false
            },
            {
              "name": "LastUpdateDate",
              "type": "string",
              "description": "Data do último envio.",
              "required": false
            },
            {
              "name": "CompletionDate",
              "type": "string",
              "description": "Data da finalização.",
              "required": false
            }
          ]
        },
        "example": {
          "IdCommandStatus": 0,
          "CommandStatusName": "",
          "IdTracker": "",
          "QueueEntryDate": "2026-07-03T14:19:29.832Z",
          "LastUpdateDate": "2026-07-03T14:19:29.833Z",
          "CompletionDate": "2026-07-03T14:19:29.833Z"
        }
      },
      {
        "code": "401",
        "description": "Unauthorized",
        "example": null
      },
      {
        "code": "409",
        "description": "Conflict",
        "schema": {
          "name": "ResultErrorCode",
          "fields": [
            {
              "name": "Code",
              "type": "integer",
              "description": "Código do erro gerado na operação.",
              "required": false
            },
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Code": 0,
          "Message": ""
        }
      },
      {
        "code": "415",
        "description": "Client Error",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Success",
        "example": false
      },
      {
        "code": "401",
        "description": "Unauthorized",
        "example": null
      },
      {
        "code": "409",
        "description": "Conflict",
        "schema": {
          "name": "ResultErrorCode",
          "fields": [
            {
              "name": "Code",
              "type": "integer",
              "description": "Código do erro gerado na operação.",
              "required": false
            },
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Code": 0,
          "Message": ""
        }
      },
      {
        "code": "415",
        "description": "Client Error",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "EventResult[]",
          "fields": [
            {
              "name": "IdEvent",
              "type": "integer",
              "description": "Id do evento no sistema SSX.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome do evento",
              "required": false
            }
          ]
        },
        "example": [
          {
            "IdEvent": 0,
            "Name": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "FuelInsertResult",
          "fields": [
            {
              "name": "FuellingCode",
              "type": "integer",
              "description": "Código do abastecimento cadastrado",
              "required": false
            }
          ]
        },
        "example": {
          "FuellingCode": 0
        }
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "FuelListInsertResult",
          "fields": [
            {
              "name": "ListInserted",
              "type": "array",
              "description": "Lista de abastecimentos inseridos",
              "required": false
            },
            {
              "name": "ListInserted[].FuellingIntegrationCode",
              "type": "string",
              "description": "Código de integração do abastecimento",
              "required": false
            },
            {
              "name": "ListNonInserted",
              "type": "array",
              "description": "Lista de abastecimentos não inseridos",
              "required": false
            },
            {
              "name": "ListNonInserted[].ErrorMessage",
              "type": "string",
              "description": "Mensagem do erro de inserção",
              "required": false
            },
            {
              "name": "ListNonInserted[].FuellingIntegrationCode",
              "type": "string",
              "description": "Código de integração do abastecimento",
              "required": false
            }
          ]
        },
        "example": {
          "ListInserted": [
            {
              "FuellingIntegrationCode": ""
            }
          ],
          "ListNonInserted": [
            {
              "ErrorMessage": "",
              "FuellingIntegrationCode": ""
            }
          ]
        }
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "FuelListResult[]",
          "fields": [
            {
              "name": "FuellingIntegrationCode",
              "type": "string",
              "description": "Código único que identifica o abastecimento.",
              "required": false
            },
            {
              "name": "FuelTypeCode",
              "type": "integer",
              "description": "Código único que identifica o tipo de combustível: 1=Gasolina; 2=Álcool; 3=Diesel; 4=Gás natural; 5=Diesel S10; 6=ARLA32; 7=Diesel S10 Aditivado; 8=Diesel S10 Especial; 9=Diesel S500 Comum.",
              "required": false
            },
            {
              "name": "VehicleIntegrationCodeCentral",
              "type": "string",
              "description": "Código único que identifica o veículo para ser utilizado pelas integrações da Central. Este campo tem maior prioridade do que o VehicleIntegrationClient.",
              "required": false
            },
            {
              "name": "VehicleIntegrationCodeClient",
              "type": "string",
              "description": "Código único que identifica o veículo para ser utilizado pelas integrações do Cliente final.",
              "required": false
            },
            {
              "name": "DriverIntegrationCodeCentral",
              "type": "string",
              "description": "Código único que identifica o motorista ou responsável pelo abastecimento para ser utilizado pelas integrações da Central.",
              "required": false
            },
            {
              "name": "DriverIntegrationCodeClient",
              "type": "string",
              "description": "Código único que identifica o motorista para ser utilizado pelas integrações do Cliente final.",
              "required": false
            },
            {
              "name": "FuelStationIntegrationCode",
              "type": "string",
              "description": "Código único que identifica o posto de combustível.",
              "required": false
            },
            {
              "name": "Odometer",
              "type": "number",
              "description": "Odômetro do veículo no momento do abastecimento.",
              "required": false
            },
            {
              "name": "PreviusOdometer",
              "type": "number",
              "description": "Odômetro do veículo no momento do abastecimento anterior.",
              "required": false
            },
            {
              "name": "Hourmeter",
              "type": "number",
              "description": "Horímetro do veículo no momento do abastecimento.",
              "required": false
            },
            {
              "name": "PreviusHourmeter",
              "type": "number",
              "description": "Horímetro do veículo no momento do abastecimento anterior.",
              "required": false
            },
            {
              "name": "FuelAmountLiters",
              "type": "number",
              "description": "Quantidade de litros abastecidos.",
              "required": false
            },
            {
              "name": "LiterPrice",
              "type": "number",
              "description": "Valor pago pelo litro do combustível.",
              "required": false
            },
            {
              "name": "TotalPayment",
              "type": "number",
              "description": "Valor total pago pelo abastecimento.",
              "required": false
            },
            {
              "name": "FuelDate",
              "type": "string",
              "description": "Data do abastecimento",
              "required": false
            },
            {
              "name": "TankComplete",
              "type": "boolean",
              "description": "O tanque de combustível do veículo foi completo no abastecimento",
              "required": false
            }
          ]
        },
        "example": [
          {
            "FuellingIntegrationCode": "",
            "FuelTypeCode": 0,
            "VehicleIntegrationCodeCentral": "",
            "VehicleIntegrationCodeClient": "",
            "DriverIntegrationCodeCentral": "",
            "DriverIntegrationCodeClient": "",
            "FuelStationIntegrationCode": "",
            "Odometer": 0,
            "PreviusOdometer": 0,
            "Hourmeter": 0,
            "PreviusHourmeter": 0,
            "FuelAmountLiters": 0,
            "LiterPrice": 0,
            "TotalPayment": 0,
            "FuelDate": "2026-07-03T14:19:29.833Z",
            "TankComplete": false
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "MessageStatusResult",
          "fields": [
            {
              "name": "IdCommandLog",
              "type": "integer",
              "description": "Identificador único do envio da mensagem.",
              "required": false
            },
            {
              "name": "IdCommandStatus",
              "type": "integer",
              "description": "Identificador único do status do envio da mensagem.\r\n\r\n1=Aguardando para envio automático\r\n2-Enviando\r\n3=Aguardando posição do veículo\r\n4=Enviando\r\n5=Cancelado por excesso de tentativas\r\n6=Comando cancelado pelo usuário\r\n7=Processado com sucesso\r\n8=Comando rejeitado pelo módulo\r\n9=Não enviado\r\n10=Enviado para periférico",
              "required": false
            },
            {
              "name": "Status",
              "type": "string",
              "description": "Texto do status do envio da mensagem.",
              "required": false
            },
            {
              "name": "SendDate",
              "type": "string",
              "description": "Data que a mensagem foi colocada na fila para envio. A hora não tem correção de fuso horário.",
              "required": false
            },
            {
              "name": "ProcessDate",
              "type": "string",
              "description": "Data do recebimento da confirmação de entrega da mesangem. A hora não tem correção de fuso horário.",
              "required": false
            }
          ]
        },
        "example": {
          "IdCommandLog": 0,
          "IdCommandStatus": 0,
          "Status": "",
          "SendDate": "2026-07-03T14:19:29.833Z",
          "ProcessDate": "2026-07-03T14:19:29.833Z"
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "409",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultErrorCode",
          "fields": [
            {
              "name": "Code",
              "type": "integer",
              "description": "Código do erro gerado na operação.",
              "required": false
            },
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Code": 0,
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "MessageResult[]",
          "fields": [
            {
              "name": "IdMessage",
              "type": "integer",
              "description": "Identificador único da mensagem enviada.",
              "required": false
            },
            {
              "name": "MessageCode",
              "type": "string",
              "description": "Código da mensagem.",
              "required": false
            },
            {
              "name": "MessageDirection",
              "type": "integer",
              "description": "Sentida da mensagem: 1: Portal para APP; 2: APP param Portal.",
              "required": false
            },
            {
              "name": "IdWorkFunction",
              "type": "integer",
              "description": "Identificacao da função de jornada de trabalho.\r\n1:Condução\r\n2: Espera\r\n3: Descanso\r\n4: Refeição\r\n5: Fim de jornada",
              "required": false
            },
            {
              "name": "IdOperationalFunction",
              "type": "integer",
              "description": "Identificacao do status operacional.\r\n0: Fora de serviço\r\n1: Disponível\r\n2: Ocupado",
              "required": false
            },
            {
              "name": "RuleIntegrationCode",
              "type": "string",
              "description": "Código de integração da regra associada a mensagem.",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Unidade rastreada associada ao APP Onboard.",
              "required": false
            },
            {
              "name": "IdTrackedUnit",
              "type": "integer",
              "description": "Código de identificação da Unidade Rastreada.",
              "required": false
            },
            {
              "name": "TrackedUnitIntegrationCode",
              "type": "string",
              "description": "Código de integração da Unidade Rastreada.",
              "required": false
            },
            {
              "name": "APPIntegrationCode",
              "type": "string",
              "description": "Código de integração do APP Onboard.",
              "required": false
            },
            {
              "name": "TripCode",
              "type": "string",
              "description": "Código da viagem associada a unidade rastreada no momento do envio da mensagem.",
              "required": false
            },
            {
              "name": "SendDate",
              "type": "string",
              "description": "Data de envio da mensagem (GMT 0).",
              "required": false
            },
            {
              "name": "ReceiveDate",
              "type": "string",
              "description": "Data de recebimento da mensagem (GMT 0).",
              "required": false
            },
            {
              "name": "ReadDate",
              "type": "string",
              "description": "Data de leitura da mensagem (GMT 0).",
              "required": false
            },
            {
              "name": "SenderPersonName",
              "type": "string",
              "description": "Pessoa responsável pelo envio da mensagem.",
              "required": false
            },
            {
              "name": "SenderPersonIntegrationCode",
              "type": "string",
              "description": "Código de integração da pessoa responsável pelo envio da mensagem.",
              "required": false
            },
            {
              "name": "ReaderPersonName",
              "type": "string",
              "description": "Pessoa responsável pela leitura da mensagem.",
              "required": false
            },
            {
              "name": "ReaderPersonIntegrationCode",
              "type": "string",
              "description": "Código de integração da pessoa responsável pela leitura da mensagem.",
              "required": false
            },
            {
              "name": "Text",
              "type": "string",
              "description": "Título da mensagem.",
              "required": false
            },
            {
              "name": "Description",
              "type": "string",
              "description": "Descrição da mensagem.",
              "required": false
            },
            {
              "name": "Lat",
              "type": "number",
              "description": "Latitude do APP no momento do envio da mensagem.",
              "required": false
            },
            {
              "name": "Long",
              "type": "number",
              "description": "Longitude do APP no momento do envio da mensagem.",
              "required": false
            },
            {
              "name": "Attributes",
              "type": "array",
              "description": "Atributos da mensagem.",
              "required": false
            },
            {
              "name": "Attributes[].Attribute",
              "type": "string",
              "description": "Nome do atributo.",
              "required": false
            },
            {
              "name": "Attributes[].AttributeIntegrationCode",
              "type": "string",
              "description": "Código de integração do atributo.",
              "required": false
            },
            {
              "name": "Attributes[].Value",
              "type": "string",
              "description": "Valor do atributo definido pelo usuário no momento do envio.",
              "required": false
            }
          ]
        },
        "example": [
          {
            "IdMessage": 0,
            "MessageCode": "",
            "MessageDirection": 0,
            "IdWorkFunction": 0,
            "IdOperationalFunction": 0,
            "RuleIntegrationCode": "",
            "TrackedUnit": "",
            "IdTrackedUnit": 0,
            "TrackedUnitIntegrationCode": "",
            "APPIntegrationCode": "",
            "TripCode": "",
            "SendDate": "2026-07-03T14:19:29.833Z",
            "ReceiveDate": "2026-07-03T14:19:29.833Z",
            "ReadDate": "2026-07-03T14:19:29.833Z",
            "SenderPersonName": "",
            "SenderPersonIntegrationCode": "",
            "ReaderPersonName": "",
            "ReaderPersonIntegrationCode": "",
            "Text": "",
            "Description": "",
            "Lat": 0,
            "Long": 0,
            "Attributes": [
              {
                "Attribute": "",
                "AttributeIntegrationCode": "",
                "Value": ""
              }
            ]
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "OnboardMessageSendResult",
          "fields": [
            {
              "name": "CommandSendCode",
              "type": "integer",
              "description": "Código do envio do comando para consulta do status.",
              "required": false
            }
          ]
        },
        "example": {
          "CommandSendCode": 0
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "409",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultErrorCode",
          "fields": [
            {
              "name": "Code",
              "type": "integer",
              "description": "Código do erro gerado na operação.",
              "required": false
            },
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Code": 0,
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "example": false
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "PersonResult",
          "fields": [
            {
              "name": "ClientIntegrationCode",
              "type": "string",
              "description": "Código identificador do cliente. Deve ser único em ambos os sistemas integrados. É através dele que as operações ente os sistemas serão realizadas.",
              "required": false
            },
            {
              "name": "PersonIntegrationCode",
              "type": "string",
              "description": "Código identificador da pessoa. Deve ser único em ambos os sistemas integrados.",
              "required": false
            },
            {
              "name": "PersonIntegrationCodeCentral",
              "type": "string",
              "description": "Código identificador da pessoa da central. Deve ser único em ambos os sistemas integrados.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome da pessoa.",
              "required": false
            },
            {
              "name": "RoleName",
              "type": "string",
              "description": "Nome do cargo da pessoa caso seja um colaborador.",
              "required": false
            }
          ]
        },
        "example": {
          "ClientIntegrationCode": "",
          "PersonIntegrationCode": "",
          "PersonIntegrationCodeCentral": "",
          "Name": "",
          "RoleName": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "409",
        "description": "Conflito de informações.",
        "schema": {
          "name": "ResultErrorCode",
          "fields": [
            {
              "name": "Code",
              "type": "integer",
              "description": "Código do erro gerado na operação.",
              "required": false
            },
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Code": 0,
          "Message": ""
        }
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "ResultListPerson[]",
          "fields": [
            {
              "name": "IsActivatedClient",
              "type": "boolean",
              "description": "Cliente ativado?.",
              "required": false
            },
            {
              "name": "IsBlockedClient",
              "type": "boolean",
              "description": "Cliente com acesso bloqueado?.",
              "required": false
            },
            {
              "name": "ClientOrganizationUnitIntegrationCode",
              "type": "string",
              "description": "Código de integração da Unidade Organizacional do cliente da pessoa.",
              "required": false
            },
            {
              "name": "PersonOrganizationUnitIntegrationCode",
              "type": "string",
              "description": "Código de integração da Unidade Organizacional da pessoa.",
              "required": false
            },
            {
              "name": "OrganizationUnitName",
              "type": "string",
              "description": "Nome da Unidade organizacional da pessoa.",
              "required": false
            },
            {
              "name": "PersonIntegrationCodeClient",
              "type": "string",
              "description": "Código de integração da pessoa para ser utilizado pelas integrações do Cliente final.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome da pessoa.",
              "required": false
            },
            {
              "name": "CPF",
              "type": "string",
              "description": "Número do CPF.",
              "required": false
            },
            {
              "name": "IDCard",
              "type": "string",
              "description": "Número da carteira de identidade",
              "required": false
            },
            {
              "name": "Registration",
              "type": "string",
              "description": "Número da matrícula da pessoa.",
              "required": false
            },
            {
              "name": "AccessCode",
              "type": "integer",
              "description": "Número do Código de Acesso da pessoa (Exibido em decimal)",
              "required": false
            },
            {
              "name": "WorkScheduleIntegrationCode",
              "type": "string",
              "description": "Código de integração da Escala de Trabalho",
              "required": false
            },
            {
              "name": "PersonRoleIntegrationCode",
              "type": "string",
              "description": "Código de integração do Cargo da pessoa.",
              "required": false
            },
            {
              "name": "Email",
              "type": "string",
              "description": "E-mail da pessoa.",
              "required": false
            },
            {
              "name": "Login",
              "type": "string",
              "description": "Login do usuário no sistema.",
              "required": false
            },
            {
              "name": "Gender",
              "type": "string",
              "description": "Gênero da pessoa\r\nM: Masculino | F: Feminino",
              "required": false
            },
            {
              "name": "DateOfBirth",
              "type": "string",
              "description": "Data de nascimento da pessoa",
              "required": false
            },
            {
              "name": "CellPhoneNumber",
              "type": "string",
              "description": "Número do celular de contato da pessoa",
              "required": false
            },
            {
              "name": "PhoneNumber",
              "type": "string",
              "description": "Número do telefone de contato da pessoa",
              "required": false
            },
            {
              "name": "Language",
              "type": "integer",
              "description": "Identificador único do idioma a ser apresentado no sistema.\r\nAtualmente disponíveis: 1 - português, 3 - espanhol",
              "required": false
            },
            {
              "name": "GMT",
              "type": "number",
              "description": "Correção do fuso horário do usuário (Em horas).",
              "required": false
            },
            {
              "name": "DaylightSaving",
              "type": "boolean",
              "description": "Informa se o usuário participa do horário de verão.",
              "required": false
            },
            {
              "name": "ConsolidationType",
              "type": "integer",
              "description": "Tipo de consolidação da jornada",
              "required": false
            },
            {
              "name": "LicenseDriver",
              "type": "string",
              "description": "Número da carteira de habilitação.",
              "required": false
            },
            {
              "name": "EmissionDateLicenseDriver",
              "type": "string",
              "description": "Data de emissão da carteira de habilitação.",
              "required": false
            },
            {
              "name": "FirstDateLicenseDriver",
              "type": "string",
              "description": "Data da primeira carteira de habilitação.",
              "required": false
            },
            {
              "name": "ExpirationDateLicenseDriver",
              "type": "string",
              "description": "Data de vencimento da carteira de habilitação.",
              "required": false
            },
            {
              "name": "LicenseRegistrationType",
              "type": "integer",
              "description": "Categoria da habilitação (CNH) da pessoa",
              "required": false
            },
            {
              "name": "IsActivated",
              "type": "boolean",
              "description": "Pessoa ativada?.",
              "required": false
            }
          ]
        },
        "example": [
          {
            "IsActivatedClient": false,
            "IsBlockedClient": false,
            "ClientOrganizationUnitIntegrationCode": "",
            "PersonOrganizationUnitIntegrationCode": "",
            "OrganizationUnitName": "",
            "PersonIntegrationCodeClient": "",
            "Name": "",
            "CPF": "",
            "IDCard": "",
            "Registration": "",
            "AccessCode": 0,
            "WorkScheduleIntegrationCode": "",
            "PersonRoleIntegrationCode": "",
            "Email": "",
            "Login": "",
            "Gender": "",
            "DateOfBirth": "2026-07-03T14:19:29.833Z",
            "CellPhoneNumber": "",
            "PhoneNumber": "",
            "Language": 0,
            "GMT": 0,
            "DaylightSaving": false,
            "ConsolidationType": 0,
            "LicenseDriver": "",
            "EmissionDateLicenseDriver": "2026-07-03T14:19:29.833Z",
            "FirstDateLicenseDriver": "2026-07-03T14:19:29.833Z",
            "ExpirationDateLicenseDriver": "2026-07-03T14:19:29.833Z",
            "LicenseRegistrationType": 0,
            "IsActivated": false
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "PersonRoleResult[]",
          "fields": [
            {
              "name": "PersonRoleIntegrationCode",
              "type": "string",
              "description": "Código de integração do cargo do colaborador",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome do cargo do colaborador",
              "required": false
            },
            {
              "name": "Functions",
              "type": "string",
              "description": "Funcões atribuidas ao cargo do colaborador",
              "required": false
            }
          ]
        },
        "example": [
          {
            "PersonRoleIntegrationCode": "",
            "Name": "",
            "Functions": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "PersonResult",
          "fields": [
            {
              "name": "ClientIntegrationCode",
              "type": "string",
              "description": "Código identificador do cliente. Deve ser único em ambos os sistemas integrados. É através dele que as operações ente os sistemas serão realizadas.",
              "required": false
            },
            {
              "name": "PersonIntegrationCode",
              "type": "string",
              "description": "Código identificador da pessoa. Deve ser único em ambos os sistemas integrados.",
              "required": false
            },
            {
              "name": "PersonIntegrationCodeCentral",
              "type": "string",
              "description": "Código identificador da pessoa da central. Deve ser único em ambos os sistemas integrados.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome da pessoa.",
              "required": false
            },
            {
              "name": "RoleName",
              "type": "string",
              "description": "Nome do cargo da pessoa caso seja um colaborador.",
              "required": false
            }
          ]
        },
        "example": {
          "ClientIntegrationCode": "",
          "PersonIntegrationCode": "",
          "PersonIntegrationCodeCentral": "",
          "Name": "",
          "RoleName": ""
        }
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "example": null
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "409",
        "description": "Conflict",
        "schema": {
          "name": "ResultErrorCode",
          "fields": [
            {
              "name": "Code",
              "type": "integer",
              "description": "Código do erro gerado na operação.",
              "required": false
            },
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Code": 0,
          "Message": ""
        }
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    ],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "PositionWithTrailerAndPlateResult[]",
          "fields": [
            {
              "name": "ListTrailer",
              "type": "array",
              "description": "Lista de reboques associados à posição.",
              "required": false
            },
            {
              "name": "ListTrailer[].IntegrationCode",
              "type": "string",
              "description": "Código de identificação do reboque.",
              "required": false
            },
            {
              "name": "ListTrailer[].Name",
              "type": "string",
              "description": "Nome do reboque",
              "required": false
            },
            {
              "name": "ListTrailer[].Identification",
              "type": "string",
              "description": "Identificação do reboque",
              "required": false
            },
            {
              "name": "Plate",
              "type": "string",
              "description": "Placa do veículo",
              "required": false
            },
            {
              "name": "DriverIdentification",
              "type": "number",
              "description": "Identificação do motorista (RFID ou IButton)",
              "required": false
            },
            {
              "name": "DocumentNumber",
              "type": "string",
              "description": "CPF do motorista",
              "required": false
            },
            {
              "name": "IdPosition",
              "type": "integer",
              "description": "Código identificador único da posição recebida do rastreador.",
              "required": false
            },
            {
              "name": "IdTrackedUnitType",
              "type": "integer",
              "description": "Código identificador único do tipo da unidade rastreada: 1=Veículo ou 2=Pessoa.",
              "required": false
            },
            {
              "name": "TrackedUnitIntegrationCode",
              "type": "string",
              "description": "Código identificador único da unidade rastreada no sistema (Único por tipo de unidade rastreada: Veículo, pessoa, etc.).",
              "required": false
            },
            {
              "name": "TrackerSlot",
              "type": "integer",
              "description": "Ordem de instalação do rastreador na unidade rastreada, sendo que o SSX permite a associação de vários rasreadores a uma unidade rastreada.",
              "required": false
            },
            {
              "name": "IdTrackedUnit",
              "type": "integer",
              "description": "Código interno da unidade rastreada",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Descrição da unidade rastreada. Este é o valor apresentado nas telas do SSX.",
              "required": false
            },
            {
              "name": "IdEvent",
              "type": "integer",
              "description": "Código do evento gerador da posição.",
              "required": false
            },
            {
              "name": "IdMainBatteryMeasureUnit",
              "type": "integer",
              "description": "Unidade de medida da bateria do veiculo: Percentual / Voltagem",
              "required": false
            },
            {
              "name": "IdBackupBatteryMeasureUnit",
              "type": "integer",
              "description": "Unidade de medida da bateria interna do rastreador: Percentual / Voltagem",
              "required": false
            },
            {
              "name": "Ignition",
              "type": "boolean",
              "description": "Status da ignição na posição.",
              "required": false
            },
            {
              "name": "Available",
              "type": "boolean",
              "description": "Status operaciona da unidade rastreada: NULL=Fora de operação; 0=Disponível; 1=Ocupado;",
              "required": false
            },
            {
              "name": "ValidGPS",
              "type": "boolean",
              "description": "Status do GPS: 0=Inválido; 1=Válido;",
              "required": false
            },
            {
              "name": "EventDate",
              "type": "string",
              "description": "Data da posição gerada pelo rastreador.",
              "required": false
            },
            {
              "name": "UpdateDate",
              "type": "string",
              "description": "Data do recebimento da posição pelo SSX.",
              "required": false
            },
            {
              "name": "Driver",
              "type": "string",
              "description": "Motorista do veículo.",
              "required": false
            },
            {
              "name": "Latitude",
              "type": "number",
              "description": "Latitude da posição.",
              "required": false
            },
            {
              "name": "Longitude",
              "type": "number",
              "description": "Longitude da posição.",
              "required": false
            },
            {
              "name": "Address",
              "type": "string",
              "description": "Endereço da posição.",
              "required": false
            },
            {
              "name": "DistanceFromGeographicArea",
              "type": "string",
              "description": "Distância da área geográfica.",
              "required": false
            },
            {
              "name": "ListInputSensor",
              "type": "object",
              "description": "Lista dos status das entradas do rastreador (Sensores) na posição.",
              "required": false
            },
            {
              "name": "ListOutputActuator",
              "type": "object",
              "description": "Lista dos status das saídas do rastreador (Atuadores) na posição.",
              "required": false
            },
            {
              "name": "ListTelemetry",
              "type": "object",
              "description": "Lista dos valores das telemetrias do rastreador na posição.",
              "required": false
            },
            {
              "name": "PersonIntegrationCodeCenter",
              "type": "string",
              "description": "Código identificador da central de pessoa no sistema (Único por pessoa).",
              "required": false
            },
            {
              "name": "PersonIntegrationCodeClient",
              "type": "string",
              "description": "Código identificador do cliente de pessoa no sistema (Único por pessoa).",
              "required": false
            }
          ]
        },
        "example": [
          {
            "ListTrailer": [
              {
                "IntegrationCode": "",
                "Name": "",
                "Identification": ""
              }
            ],
            "Plate": "",
            "DriverIdentification": 0,
            "DocumentNumber": "",
            "IdPosition": 0,
            "IdTrackedUnitType": 0,
            "TrackedUnitIntegrationCode": "",
            "TrackerSlot": 0,
            "IdTrackedUnit": 0,
            "TrackedUnit": "",
            "IdEvent": 0,
            "IdMainBatteryMeasureUnit": 0,
            "IdBackupBatteryMeasureUnit": 0,
            "Ignition": false,
            "Available": false,
            "ValidGPS": false,
            "EventDate": "2026-07-03T14:19:29.834Z",
            "UpdateDate": "2026-07-03T14:19:29.834Z",
            "Driver": "",
            "Latitude": 0,
            "Longitude": 0,
            "Address": "",
            "DistanceFromGeographicArea": "",
            "ListInputSensor": {},
            "ListOutputActuator": {},
            "ListTelemetry": {},
            "PersonIntegrationCodeCenter": "",
            "PersonIntegrationCodeClient": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "429",
        "description": "Limite de consulta excedido.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "InputOutputActivationResult[]",
          "fields": [
            {
              "name": "TrackerOrder",
              "type": "integer",
              "description": "Ordem do rastreador",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Unidade rastrada",
              "required": false
            },
            {
              "name": "OrganizationlUnit",
              "type": "string",
              "description": "Unidade organizacional",
              "required": false
            },
            {
              "name": "TrackedUnitGroup",
              "type": "string",
              "description": "Grupo da unidade rastreada",
              "required": false
            },
            {
              "name": "Driver",
              "type": "string",
              "description": "Motorista",
              "required": false
            },
            {
              "name": "ActivationType",
              "type": "string",
              "description": "Tipo de ativação (sensores/atuadores)",
              "required": false
            },
            {
              "name": "ActivationName",
              "type": "string",
              "description": "Nome do sensor/atuador",
              "required": false
            },
            {
              "name": "StartDate",
              "type": "string",
              "description": "Data inicial",
              "required": false
            },
            {
              "name": "EndDate",
              "type": "string",
              "description": "Data final",
              "required": false
            },
            {
              "name": "Duration",
              "type": "number",
              "description": "Duração",
              "required": false
            }
          ]
        },
        "example": [
          {
            "TrackerOrder": 0,
            "TrackedUnit": "",
            "OrganizationlUnit": "",
            "TrackedUnitGroup": "",
            "Driver": "",
            "ActivationType": "",
            "ActivationName": "",
            "StartDate": "2026-07-03T14:19:29.834Z",
            "EndDate": "2026-07-03T14:19:29.834Z",
            "Duration": 0
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "AreaPassageResult[]",
          "fields": [
            {
              "name": "StartDate",
              "type": "string",
              "description": "Data inicial",
              "required": false
            },
            {
              "name": "EndDate",
              "type": "string",
              "description": "Data final",
              "required": false
            },
            {
              "name": "Duration",
              "type": "number",
              "description": "Duração",
              "required": false
            },
            {
              "name": "Driver",
              "type": "string",
              "description": "Motorista",
              "required": false
            },
            {
              "name": "TrackerOrder",
              "type": "integer",
              "description": "Ordem do rastreador",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Unidade rastreada",
              "required": false
            },
            {
              "name": "TrackedUnitGroup",
              "type": "string",
              "description": "Grupo da unidade rastreada",
              "required": false
            },
            {
              "name": "OrganizationalUnit",
              "type": "string",
              "description": "Unidade organizacional",
              "required": false
            },
            {
              "name": "MaximumSpeed",
              "type": "number",
              "description": "Velocidade máxima",
              "required": false
            },
            {
              "name": "AverageCruiserSpeed",
              "type": "number",
              "description": "Velocidade média de cruzeiro",
              "required": false
            },
            {
              "name": "MaximumRPM",
              "type": "number",
              "description": "RPM máximo",
              "required": false
            },
            {
              "name": "AverageRPM",
              "type": "number",
              "description": "RPM médio",
              "required": false
            },
            {
              "name": "IdleMotorTime",
              "type": "number",
              "description": "Tempo de motor ocioso",
              "required": false
            },
            {
              "name": "IdleMotorPercentage",
              "type": "number",
              "description": "Tempo de motor ocioso (percentual)",
              "required": false
            },
            {
              "name": "LitersConsumption",
              "type": "number",
              "description": "Consumo (litros)",
              "required": false
            },
            {
              "name": "LitersPerHourConsumption",
              "type": "number",
              "description": "Consumo (litros/hora)",
              "required": false
            },
            {
              "name": "IdleMotorLitersConsumption",
              "type": "number",
              "description": "Consumo com motor ocioso (litros)",
              "required": false
            },
            {
              "name": "KilometerPerLiterConsumption",
              "type": "number",
              "description": "Consumo (Km/l)",
              "required": false
            },
            {
              "name": "GeographyName",
              "type": "string",
              "description": "Nome da área geográfica",
              "required": false
            },
            {
              "name": "GeographyGroup",
              "type": "string",
              "description": "Grupo da área geográfica",
              "required": false
            },
            {
              "name": "GeographyType",
              "type": "string",
              "description": "Tipo da área geográfica",
              "required": false
            },
            {
              "name": "GeographyCategory",
              "type": "string",
              "description": "Categoria da área geográfica",
              "required": false
            },
            {
              "name": "GeographyIntegrationCode",
              "type": "string",
              "description": "Código de integração da área geográfica",
              "required": false
            },
            {
              "name": "StartingOdometer",
              "type": "number",
              "description": "Odometro inicial",
              "required": false
            },
            {
              "name": "EndingOdometer",
              "type": "number",
              "description": "Odometro final",
              "required": false
            },
            {
              "name": "OdometerDistance",
              "type": "number",
              "description": "Distância odometro",
              "required": false
            },
            {
              "name": "StartingGPSOdometer",
              "type": "number",
              "description": "Odometro inicial GPS",
              "required": false
            },
            {
              "name": "EndingGPSOdometer",
              "type": "number",
              "description": "Odometro final GPS",
              "required": false
            },
            {
              "name": "GPSDistance",
              "type": "number",
              "description": "Distância odometro GPS",
              "required": false
            },
            {
              "name": "StartingHourmeter",
              "type": "number",
              "description": "Horímetro inicial",
              "required": false
            },
            {
              "name": "EndingHourmeter",
              "type": "number",
              "description": "Horímetro final",
              "required": false
            },
            {
              "name": "HourmeterDuration",
              "type": "number",
              "description": "Duração horímetro",
              "required": false
            },
            {
              "name": "InitialLocation",
              "type": "string",
              "description": "Localização inicial",
              "required": false
            },
            {
              "name": "FinalLocation",
              "type": "string",
              "description": "Localizãção final",
              "required": false
            }
          ]
        },
        "example": [
          {
            "StartDate": "2026-07-03T14:19:29.834Z",
            "EndDate": "2026-07-03T14:19:29.834Z",
            "Duration": 0,
            "Driver": "",
            "TrackerOrder": 0,
            "TrackedUnit": "",
            "TrackedUnitGroup": "",
            "OrganizationalUnit": "",
            "MaximumSpeed": 0,
            "AverageCruiserSpeed": 0,
            "MaximumRPM": 0,
            "AverageRPM": 0,
            "IdleMotorTime": 0,
            "IdleMotorPercentage": 0,
            "LitersConsumption": 0,
            "LitersPerHourConsumption": 0,
            "IdleMotorLitersConsumption": 0,
            "KilometerPerLiterConsumption": 0,
            "GeographyName": "",
            "GeographyGroup": "",
            "GeographyType": "",
            "GeographyCategory": "",
            "GeographyIntegrationCode": "",
            "StartingOdometer": 0,
            "EndingOdometer": 0,
            "OdometerDistance": 0,
            "StartingGPSOdometer": 0,
            "EndingGPSOdometer": 0,
            "GPSDistance": 0,
            "StartingHourmeter": 0,
            "EndingHourmeter": 0,
            "HourmeterDuration": 0,
            "InitialLocation": "",
            "FinalLocation": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "DailyConsolidatedWorkdayResult[]",
          "fields": [
            {
              "name": "Employee",
              "type": "string",
              "description": "O nome ou identificação do funcionário.",
              "required": false
            },
            {
              "name": "Odometer",
              "type": "number",
              "description": "O odometro.",
              "required": false
            },
            {
              "name": "GPSOdometer",
              "type": "number",
              "description": "O odometro do GPS.",
              "required": false
            },
            {
              "name": "Vehicles",
              "type": "string",
              "description": "O nome ou identificação do(s) veículo(s).",
              "required": false
            },
            {
              "name": "DayOfTheMonth",
              "type": "integer",
              "description": "O dia do mês.",
              "required": false
            },
            {
              "name": "WeekDay",
              "type": "integer",
              "description": "Um inteiro que representa o dia da semana.\r\n1: Domingo\r\n2: SegundaFeira\r\n3: TercaFeira\r\n4: QuartaFeira\r\n5: QuintaFeira\r\n6: SextaFeira\r\n7: Sabado",
              "required": false
            },
            {
              "name": "StartDate",
              "type": "string",
              "description": "A data inicial.",
              "required": false
            },
            {
              "name": "EndDate",
              "type": "string",
              "description": "A data final.",
              "required": false
            },
            {
              "name": "DailyShift",
              "type": "integer",
              "description": "O total do tempo no período diurno.",
              "required": false
            },
            {
              "name": "NightShift",
              "type": "integer",
              "description": "O total do tempo no período noturno.",
              "required": false
            },
            {
              "name": "JobPosition",
              "type": "string",
              "description": "O cargo do funcionário.",
              "required": false
            },
            {
              "name": "OrganizationalUnit",
              "type": "string",
              "description": "O nome ou identificação da unidade organizacional.",
              "required": false
            },
            {
              "name": "Registration",
              "type": "string",
              "description": "A matrícula do funcionário.",
              "required": false
            },
            {
              "name": "WorkdayId",
              "type": "integer",
              "description": "O ID da jornada de trabalho.",
              "required": false
            },
            {
              "name": "RegistryType",
              "type": "integer",
              "description": "Um inteiro que representa o tipo do registro.\r\n0: Jornada\r\n1: Férias\r\n2: Licença\r\n3: Abono\r\n4: Falta não justificada\r\n5: Folga\r\n6: Abono parcial",
              "required": false
            },
            {
              "name": "NextWorkdayDateSuggestion",
              "type": "string",
              "description": "A data sugerida para a próxima jornada.",
              "required": false
            },
            {
              "name": "WorkdayIsModified",
              "type": "boolean",
              "description": "Um boleano que informa se o registro teve modificação.",
              "required": false
            },
            {
              "name": "ClosingPeriod",
              "type": "string",
              "description": "O perído de fechamento da jornada.",
              "required": false
            },
            {
              "name": "Overtime1",
              "type": "integer",
              "description": "A faixa de hora extra 1.",
              "required": false
            },
            {
              "name": "Overtime2",
              "type": "integer",
              "description": "A faixa de hora extra 2.",
              "required": false
            },
            {
              "name": "AbsenceAllowance",
              "type": "integer",
              "description": "O abono.",
              "required": false
            },
            {
              "name": "Compensatory",
              "type": "integer",
              "description": "A quantidade indenizatória.",
              "required": false
            },
            {
              "name": "IsDayOff",
              "type": "boolean",
              "description": "Um boleano que identifica se é um dia de folga.",
              "required": false
            },
            {
              "name": "Cpf",
              "type": "string",
              "description": "O CPF do funcionário.",
              "required": false
            },
            {
              "name": "Validity",
              "type": "string",
              "description": "A vigência.",
              "required": false
            },
            {
              "name": "WorkSchedule",
              "type": "string",
              "description": "A escala do funcionário.",
              "required": false
            },
            {
              "name": "HourBank",
              "type": "number",
              "description": "Total do banco de horas.",
              "required": false
            },
            {
              "name": "FillDrivingTimeWithStandby",
              "type": "boolean",
              "description": "Booleano. Completar condução com espera?",
              "required": false
            },
            {
              "name": "OperationTime",
              "type": "integer",
              "description": "Tempo em operação.",
              "required": false
            },
            {
              "name": "PlannedDriving",
              "type": "integer",
              "description": "Tempo de condução prevista",
              "required": false
            },
            {
              "name": "DrivingTotal",
              "type": "integer",
              "description": "Tempo total de condução.",
              "required": false
            },
            {
              "name": "MaximumDrivingTime",
              "type": "integer",
              "description": "Tempo máximo de condução.",
              "required": false
            },
            {
              "name": "ShortStandBy",
              "type": "integer",
              "description": "Espera curta.",
              "required": false
            },
            {
              "name": "LongStandBy",
              "type": "integer",
              "description": "Espera longa.",
              "required": false
            },
            {
              "name": "Meal",
              "type": "integer",
              "description": "Refeição.",
              "required": false
            },
            {
              "name": "Rest",
              "type": "integer",
              "description": "Descanso.",
              "required": false
            },
            {
              "name": "UsageTime",
              "type": "integer",
              "description": "Tempo em operação.",
              "required": false
            },
            {
              "name": "IntraJourneyTotal",
              "type": "integer",
              "description": "Total intrajornada.",
              "required": false
            },
            {
              "name": "MandatoryRestBetweenShifts",
              "type": "integer",
              "description": "Descanso obrigatório entre jornadas.",
              "required": false
            },
            {
              "name": "OtherMandatoryRests",
              "type": "integer",
              "description": "Outros descansos obrigatórios entre jornadas.",
              "required": false
            },
            {
              "name": "MandatoryRestsTotal",
              "type": "integer",
              "description": "Total de descanso obrigatório entre jornadas.",
              "required": false
            },
            {
              "name": "CompensatoryHour",
              "type": "integer",
              "description": "Hora indenizatória.",
              "required": false
            },
            {
              "name": "CompensatoryRange1",
              "type": "integer",
              "description": "Faixa indenizatória 1.",
              "required": false
            },
            {
              "name": "CompensatoryRange2",
              "type": "integer",
              "description": "Faixa indenizatória 2.",
              "required": false
            },
            {
              "name": "CompensatoryRange3",
              "type": "integer",
              "description": "Faixa indenizatória 3.",
              "required": false
            },
            {
              "name": "IsWorkdayFinished",
              "type": "boolean",
              "description": "Booleano. Jornada encerrada?",
              "required": false
            },
            {
              "name": "DrivingLimitViolationAlert",
              "type": "boolean",
              "description": "Booleano. Alerta de limite de direção violado?",
              "required": false
            },
            {
              "name": "WorkdayDurationLimitAlert",
              "type": "boolean",
              "description": "Booleano. Alerta de duração de jornada acima do limite superior?",
              "required": false
            },
            {
              "name": "MaximumDailyDrivingTimeAlert",
              "type": "boolean",
              "description": "Booleano. Alerta de tempo máximo de condução diário excedido?",
              "required": false
            },
            {
              "name": "MaximumContinuousDrivingTimeAlert",
              "type": "boolean",
              "description": "Booleano. Alerta de tempo máximo de condução continua excedido?",
              "required": false
            },
            {
              "name": "MinimumRestTimeBetweenShiftsAlert",
              "type": "boolean",
              "description": "Booleano. Alerta de tempo mínimo de descanso entre jornada não cumprido?",
              "required": false
            },
            {
              "name": "MinimumMandatoryRestTimeAlert",
              "type": "boolean",
              "description": "Booleano. Alerta de tempo mínimo de descanso obrigatório não cumprido?",
              "required": false
            },
            {
              "name": "MinimumMealTimeAlert",
              "type": "boolean",
              "description": "Booleano. Alerta de tempo mínimo de refeição não cumprido?",
              "required": false
            },
            {
              "name": "LongestWorkdayStep",
              "type": "number",
              "description": "Tempo maior etapa.",
              "required": false
            }
          ]
        },
        "example": [
          {
            "Employee": "",
            "Odometer": 0,
            "GPSOdometer": 0,
            "Vehicles": "",
            "DayOfTheMonth": 0,
            "WeekDay": 0,
            "StartDate": "2026-07-03T14:19:29.835Z",
            "EndDate": "2026-07-03T14:19:29.835Z",
            "DailyShift": 0,
            "NightShift": 0,
            "JobPosition": "",
            "OrganizationalUnit": "",
            "Registration": "",
            "WorkdayId": 0,
            "RegistryType": 0,
            "NextWorkdayDateSuggestion": "2026-07-03T14:19:29.835Z",
            "WorkdayIsModified": false,
            "ClosingPeriod": "",
            "Overtime1": 0,
            "Overtime2": 0,
            "AbsenceAllowance": 0,
            "Compensatory": 0,
            "IsDayOff": false,
            "Cpf": "",
            "Validity": "2026-07-03T14:19:29.835Z",
            "WorkSchedule": "",
            "HourBank": 0,
            "FillDrivingTimeWithStandby": false,
            "OperationTime": 0,
            "PlannedDriving": 0,
            "DrivingTotal": 0,
            "MaximumDrivingTime": 0,
            "ShortStandBy": 0,
            "LongStandBy": 0,
            "Meal": 0,
            "Rest": 0,
            "UsageTime": 0,
            "IntraJourneyTotal": 0,
            "MandatoryRestBetweenShifts": 0,
            "OtherMandatoryRests": 0,
            "MandatoryRestsTotal": 0,
            "CompensatoryHour": 0,
            "CompensatoryRange1": 0,
            "CompensatoryRange2": 0,
            "CompensatoryRange3": 0,
            "IsWorkdayFinished": false,
            "DrivingLimitViolationAlert": false,
            "WorkdayDurationLimitAlert": false,
            "MaximumDailyDrivingTimeAlert": false,
            "MaximumContinuousDrivingTimeAlert": false,
            "MinimumRestTimeBetweenShiftsAlert": false,
            "MinimumMandatoryRestTimeAlert": false,
            "MinimumMealTimeAlert": false,
            "LongestWorkdayStep": 0
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "DriverRankingResult[]",
          "fields": [
            {
              "name": "OrganizationalUnit",
              "type": "string",
              "description": "Unidade organizacional do funcionário",
              "required": false
            },
            {
              "name": "Driver",
              "type": "string",
              "description": "Identificação do motorista",
              "required": false
            },
            {
              "name": "EmployeePosition",
              "type": "string",
              "description": "Cargo do funcionário",
              "required": false
            },
            {
              "name": "MaximumSpeed",
              "type": "number",
              "description": "Velocidade máxima atingida pelo motorista no período",
              "required": false
            },
            {
              "name": "AverageCruiserSpeed",
              "type": "number",
              "description": "Velocidade média de cruzeiro (velocidade média em movimento)",
              "required": false
            },
            {
              "name": "AverageSpeed",
              "type": "number",
              "description": "Velocidade média",
              "required": false
            },
            {
              "name": "MaximumRPM",
              "type": "number",
              "description": "RPM máximo.",
              "required": false
            },
            {
              "name": "AverageRPM",
              "type": "number",
              "description": "RPM médio.",
              "required": false
            },
            {
              "name": "IdleMotorTime",
              "type": "number",
              "description": "Tempo motor ocioso.",
              "required": false
            },
            {
              "name": "Displacement",
              "type": "number",
              "description": "Deslocamento (km).",
              "required": false
            },
            {
              "name": "Duration",
              "type": "number",
              "description": "Tempo de condução..",
              "required": false
            },
            {
              "name": "LowGearRangeTime",
              "type": "number",
              "description": "Faixa: marcha lenta.",
              "required": false
            },
            {
              "name": "NeutralGearRangeTime",
              "type": "number",
              "description": "Faixa: movimento sem tração.",
              "required": false
            },
            {
              "name": "LowRPMRangeTime",
              "type": "number",
              "description": "Faixa: RPM baixo.",
              "required": false
            },
            {
              "name": "EconomicRangeTime",
              "type": "number",
              "description": "Faixa: econômica.",
              "required": false
            },
            {
              "name": "SuperEconomicRangeTime",
              "type": "number",
              "description": "Faixa: super econômica.",
              "required": false
            },
            {
              "name": "HighRPMRangeTime",
              "type": "number",
              "description": "Faixa: RPM alto.",
              "required": false
            },
            {
              "name": "IdleAccelerationRangeTime",
              "type": "number",
              "description": "Faixa: parado acelerando.",
              "required": false
            },
            {
              "name": "RPMViolationRangeTime",
              "type": "number",
              "description": "Faixa: violação de RPM.",
              "required": false
            },
            {
              "name": "OtherRangeTime",
              "type": "number",
              "description": "Faixa: outras faixas.",
              "required": false
            },
            {
              "name": "ToleranceTime",
              "type": "number",
              "description": "Faixa: tolerância.",
              "required": false
            },
            {
              "name": "InertiaTime",
              "type": "number",
              "description": "Faixa: inércia.",
              "required": false
            },
            {
              "name": "LostPointsEconomic",
              "type": "number",
              "description": "Pontos perdidos faixa econômica.",
              "required": false
            },
            {
              "name": "LostPointsSuperEconomic",
              "type": "number",
              "description": "Pontos perdidos faixa super econômica.",
              "required": false
            },
            {
              "name": "LostPointsIdleSpeed",
              "type": "number",
              "description": "Pontos perdidos marcha lenta.",
              "required": false
            },
            {
              "name": "LostPointsLowRPM",
              "type": "number",
              "description": "Pontos perdidos RPM baixo.",
              "required": false
            },
            {
              "name": "LostPointsHighRPM",
              "type": "number",
              "description": "Pontos perdidos RPM alto.",
              "required": false
            },
            {
              "name": "LostPointsNeutralGear",
              "type": "number",
              "description": "Pontos perdidos movimento sem tração.",
              "required": false
            },
            {
              "name": "LostPointsIdleAcceleration",
              "type": "number",
              "description": "Pontos perdidos parado acelarando.",
              "required": false
            },
            {
              "name": "LostPointsRPMViolation",
              "type": "number",
              "description": "Pontos perdidos violação de RPM.",
              "required": false
            },
            {
              "name": "DailyAverageInfractionQuantity",
              "type": "integer",
              "description": "Média diária de infrações (Qtd).",
              "required": false
            },
            {
              "name": "DailyAverageTotalInfractionTime",
              "type": "number",
              "description": "Média diária de infrações (h).",
              "required": false
            },
            {
              "name": "RPMGrade",
              "type": "number",
              "description": "Nota perfil de condução.",
              "required": false
            },
            {
              "name": "DailyAverageGrade",
              "type": "number",
              "description": "Nota condução segura.",
              "required": false
            },
            {
              "name": "DailyAverageLostPoints",
              "type": "number",
              "description": "Total de pontos perdidos por período.",
              "required": false
            },
            {
              "name": "IdleMotorConsumption",
              "type": "number",
              "description": "Consumo motor ocioso.",
              "required": false
            },
            {
              "name": "KilometerPerLiterEfficiency",
              "type": "number",
              "description": "Eficiência (km/l).",
              "required": false
            },
            {
              "name": "LiterPerHourEfficiency",
              "type": "number",
              "description": "Eficiência (l/h).",
              "required": false
            },
            {
              "name": "LitersConsumption",
              "type": "number",
              "description": "Consumo (l).",
              "required": false
            },
            {
              "name": "ConsumptionGoalDistance",
              "type": "number",
              "description": "Meta de consumo (km).",
              "required": false
            },
            {
              "name": "ConsumptionGoalTime",
              "type": "number",
              "description": "Meta de consumo (h).",
              "required": false
            },
            {
              "name": "LowSpeedRangeTime",
              "type": "number",
              "description": "Faixa: velocidade baixa",
              "required": false
            },
            {
              "name": "LostPointsLowSpeed",
              "type": "number",
              "description": "Pontos perdidos faixa velocidade baixa",
              "required": false
            },
            {
              "name": "EcoRollRangeTime",
              "type": "number",
              "description": "Faixa: EcoRoll",
              "required": false
            },
            {
              "name": "RetarderRangeTime",
              "type": "number",
              "description": "Faixa: Retarder",
              "required": false
            }
          ]
        },
        "example": [
          {
            "OrganizationalUnit": "",
            "Driver": "",
            "EmployeePosition": "",
            "MaximumSpeed": 0,
            "AverageCruiserSpeed": 0,
            "AverageSpeed": 0,
            "MaximumRPM": 0,
            "AverageRPM": 0,
            "IdleMotorTime": 0,
            "Displacement": 0,
            "Duration": 0,
            "LowGearRangeTime": 0,
            "NeutralGearRangeTime": 0,
            "LowRPMRangeTime": 0,
            "EconomicRangeTime": 0,
            "SuperEconomicRangeTime": 0,
            "HighRPMRangeTime": 0,
            "IdleAccelerationRangeTime": 0,
            "RPMViolationRangeTime": 0,
            "OtherRangeTime": 0,
            "ToleranceTime": 0,
            "InertiaTime": 0,
            "LostPointsEconomic": 0,
            "LostPointsSuperEconomic": 0,
            "LostPointsIdleSpeed": 0,
            "LostPointsLowRPM": 0,
            "LostPointsHighRPM": 0,
            "LostPointsNeutralGear": 0,
            "LostPointsIdleAcceleration": 0,
            "LostPointsRPMViolation": 0,
            "DailyAverageInfractionQuantity": 0,
            "DailyAverageTotalInfractionTime": 0,
            "RPMGrade": 0,
            "DailyAverageGrade": 0,
            "DailyAverageLostPoints": 0,
            "IdleMotorConsumption": 0,
            "KilometerPerLiterEfficiency": 0,
            "LiterPerHourEfficiency": 0,
            "LitersConsumption": 0,
            "ConsumptionGoalDistance": 0,
            "ConsumptionGoalTime": 0,
            "LowSpeedRangeTime": 0,
            "LostPointsLowSpeed": 0,
            "EcoRollRangeTime": 0,
            "RetarderRangeTime": 0
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "MaintenanceListResult[]",
          "fields": [
            {
              "name": "MaintenanceCode",
              "type": "integer",
              "description": "Código da manutenção",
              "required": false
            },
            {
              "name": "VehicleId",
              "type": "integer",
              "description": "Id do veículo",
              "required": false
            },
            {
              "name": "TypeId",
              "type": "integer",
              "description": "Tipo: 1=Detectiva; 2=Corretiva; 3=Preventiva; 4=Preditiva;",
              "required": false
            },
            {
              "name": "StatusId",
              "type": "integer",
              "description": "Situação: 1=Planejada; 2=Realizada; 3=Cancelada; 4=Migrada para outra manutenção; 99=Excluída;",
              "required": false
            },
            {
              "name": "MaintenancePlanStageId",
              "type": "integer",
              "description": "Código da etapa do plano de manutenção",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome da manutenção",
              "required": false
            },
            {
              "name": "Observation",
              "type": "string",
              "description": "Observação",
              "required": false
            },
            {
              "name": "PlannedDate",
              "type": "string",
              "description": "Data prevista",
              "required": false
            },
            {
              "name": "PlannedHodometer",
              "type": "integer",
              "description": "Hodômetro previsto",
              "required": false
            },
            {
              "name": "PlannedHourmeter",
              "type": "integer",
              "description": "Horímetro previsto",
              "required": false
            },
            {
              "name": "PlannedItemPrice",
              "type": "number",
              "description": "Valor total peça previsto",
              "required": false
            },
            {
              "name": "PlannedServicePrice",
              "type": "number",
              "description": "Valor serviço previsto",
              "required": false
            },
            {
              "name": "PlannedServiceTime",
              "type": "integer",
              "description": "Tempo serviço previsto",
              "required": false
            },
            {
              "name": "ExecutedDate",
              "type": "string",
              "description": "Data realizado",
              "required": false
            },
            {
              "name": "ExecutedHodometer",
              "type": "integer",
              "description": "Hodômetro realizado",
              "required": false
            },
            {
              "name": "ExecutedHourmeter",
              "type": "integer",
              "description": "Horímetro realizado",
              "required": false
            },
            {
              "name": "ExecutedItemPrice",
              "type": "number",
              "description": "Valor total peça realizado",
              "required": false
            },
            {
              "name": "ExecutedServicePrice",
              "type": "number",
              "description": "Valor serviço realizado",
              "required": false
            },
            {
              "name": "ExecutedServiceTime",
              "type": "integer",
              "description": "Tempo serviço realizado",
              "required": false
            },
            {
              "name": "UserRegisterId",
              "type": "integer",
              "description": "IdUsuario cadastro",
              "required": false
            },
            {
              "name": "RegisterDate",
              "type": "string",
              "description": "Data cadastro",
              "required": false
            },
            {
              "name": "LastModificationUserId",
              "type": "integer",
              "description": "IdUsuario última modificação",
              "required": false
            },
            {
              "name": "LastModificationDate",
              "type": "string",
              "description": "Data última modificação",
              "required": false
            },
            {
              "name": "VehicleIntegrationCode",
              "type": "string",
              "description": "Código único de identificação do veículo para ser utilizado nas integrações da Central.",
              "required": false
            },
            {
              "name": "VehicleClientIntegrationCode",
              "type": "string",
              "description": "Código único de identificação do veículo para ser utilizado nas integrações do Cliente final.",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Unidade rastreada",
              "required": false
            },
            {
              "name": "VehicleOrganizationUnit",
              "type": "string",
              "description": "Unidade organizacional do veículo",
              "required": false
            },
            {
              "name": "TrackedUnitGroup",
              "type": "string",
              "description": "Grupo de unidade rastreada",
              "required": false
            },
            {
              "name": "VehicleModel",
              "type": "string",
              "description": "Modelo do veículo",
              "required": false
            },
            {
              "name": "Itens",
              "type": "array",
              "description": "Lista de itens da manutenção",
              "required": false
            },
            {
              "name": "Itens[].Code",
              "type": "string",
              "description": "Código do item",
              "required": false
            },
            {
              "name": "Itens[].Name",
              "type": "string",
              "description": "Nome do item",
              "required": false
            },
            {
              "name": "Itens[].TypeId",
              "type": "integer",
              "description": "Id do tipo de item",
              "required": false
            },
            {
              "name": "Itens[].Type",
              "type": "string",
              "description": "Descrição do tipo de item",
              "required": false
            },
            {
              "name": "Itens[].Price",
              "type": "number",
              "description": "Valor do item",
              "required": false
            },
            {
              "name": "Itens[].Quantity",
              "type": "number",
              "description": "Quantidade do item",
              "required": false
            },
            {
              "name": "Itens[].WarrantyTime",
              "type": "integer",
              "description": "Tempo de garantia",
              "required": false
            },
            {
              "name": "Itens[].ExecutedHodometerUsefulLife",
              "type": "integer",
              "description": "Vida útil do item hodômetro realizado",
              "required": false
            },
            {
              "name": "Itens[].ExecutedHourmeterUsefulLife",
              "type": "integer",
              "description": "Vida útil do item horímetro realizado",
              "required": false
            },
            {
              "name": "Itens[].ExecutedDateUsefulLife",
              "type": "string",
              "description": "Vida útil data realizado",
              "required": false
            },
            {
              "name": "Itens[].StatusCode",
              "type": "integer",
              "description": "Situação: 1=Planejado; 2=Realizado; 3=Cancelado; 4=Migrado para outra manutenção; 99=Excluído;",
              "required": false
            },
            {
              "name": "Itens[].ReasonCode",
              "type": "integer",
              "description": "Código do motivo",
              "required": false
            },
            {
              "name": "Itens[].Reason",
              "type": "string",
              "description": "Descrição do motivo",
              "required": false
            }
          ]
        },
        "example": [
          {
            "MaintenanceCode": 0,
            "VehicleId": 0,
            "TypeId": 0,
            "StatusId": 0,
            "MaintenancePlanStageId": 0,
            "Name": "",
            "Observation": "",
            "PlannedDate": "2026-07-03T14:19:29.835Z",
            "PlannedHodometer": 0,
            "PlannedHourmeter": 0,
            "PlannedItemPrice": 0,
            "PlannedServicePrice": 0,
            "PlannedServiceTime": 0,
            "ExecutedDate": "2026-07-03T14:19:29.835Z",
            "ExecutedHodometer": 0,
            "ExecutedHourmeter": 0,
            "ExecutedItemPrice": 0,
            "ExecutedServicePrice": 0,
            "ExecutedServiceTime": 0,
            "UserRegisterId": 0,
            "RegisterDate": "2026-07-03T14:19:29.835Z",
            "LastModificationUserId": 0,
            "LastModificationDate": "2026-07-03T14:19:29.835Z",
            "VehicleIntegrationCode": "",
            "VehicleClientIntegrationCode": "",
            "TrackedUnit": "",
            "VehicleOrganizationUnit": "",
            "TrackedUnitGroup": "",
            "VehicleModel": "",
            "Itens": [
              {
                "Code": "",
                "Name": "",
                "TypeId": 0,
                "Type": "",
                "Price": 0,
                "Quantity": 0,
                "WarrantyTime": 0,
                "ExecutedHodometerUsefulLife": 0,
                "ExecutedHourmeterUsefulLife": 0,
                "ExecutedDateUsefulLife": "2026-07-03T14:19:29.835Z",
                "StatusCode": 0,
                "ReasonCode": 0,
                "Reason": ""
              }
            ]
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "InputOutputActivationResult[]",
          "fields": [
            {
              "name": "TrackerOrder",
              "type": "integer",
              "description": "Ordem do rastreador",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Unidade rastrada",
              "required": false
            },
            {
              "name": "OrganizationlUnit",
              "type": "string",
              "description": "Unidade organizacional",
              "required": false
            },
            {
              "name": "TrackedUnitGroup",
              "type": "string",
              "description": "Grupo da unidade rastreada",
              "required": false
            },
            {
              "name": "Driver",
              "type": "string",
              "description": "Motorista",
              "required": false
            },
            {
              "name": "ActivationType",
              "type": "string",
              "description": "Tipo de ativação (sensores/atuadores)",
              "required": false
            },
            {
              "name": "ActivationName",
              "type": "string",
              "description": "Nome do sensor/atuador",
              "required": false
            },
            {
              "name": "StartDate",
              "type": "string",
              "description": "Data inicial",
              "required": false
            },
            {
              "name": "EndDate",
              "type": "string",
              "description": "Data final",
              "required": false
            },
            {
              "name": "Duration",
              "type": "number",
              "description": "Duração",
              "required": false
            }
          ]
        },
        "example": [
          {
            "TrackerOrder": 0,
            "TrackedUnit": "",
            "OrganizationlUnit": "",
            "TrackedUnitGroup": "",
            "Driver": "",
            "ActivationType": "",
            "ActivationName": "",
            "StartDate": "2026-07-03T14:19:29.835Z",
            "EndDate": "2026-07-03T14:19:29.835Z",
            "Duration": 0
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "TrackedUnitUsageResult[]",
          "fields": [
            {
              "name": "Driver",
              "type": "string",
              "description": "Motorista",
              "required": false
            },
            {
              "name": "DriverIntegrationCode",
              "type": "string",
              "description": "Código de integração do motorista",
              "required": false
            },
            {
              "name": "TrackerOrder",
              "type": "integer",
              "description": "Ordem do rastreador",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Unidade rastreada",
              "required": false
            },
            {
              "name": "VehicleIntegrationCode",
              "type": "string",
              "description": "Grupo da unidade rastreada",
              "required": false
            },
            {
              "name": "VehicleIntegrationCodeClient",
              "type": "string",
              "description": "Grupo da unidade rastreada",
              "required": false
            },
            {
              "name": "TrackedUnitGroup",
              "type": "string",
              "description": "Código de integraçao do veículo",
              "required": false
            },
            {
              "name": "OrganizationalUnit",
              "type": "string",
              "description": "Unidade organizacional",
              "required": false
            },
            {
              "name": "MaximumSpeed",
              "type": "number",
              "description": "Velocidade máxima",
              "required": false
            },
            {
              "name": "AverageCruiserSpeed",
              "type": "number",
              "description": "Velocidade média de cruzeiro",
              "required": false
            },
            {
              "name": "StartingTankLevel",
              "type": "number",
              "description": "Nível inicial do tanque",
              "required": false
            },
            {
              "name": "EndingTankLevel",
              "type": "number",
              "description": "Nível final do tanque",
              "required": false
            },
            {
              "name": "PassengerTotal",
              "type": "integer",
              "description": "Quantidade de passageiros",
              "required": false
            },
            {
              "name": "ProductiveTime",
              "type": "number",
              "description": "Tempo produtivo",
              "required": false
            },
            {
              "name": "ProductiveDistance",
              "type": "number",
              "description": "Distância produtiva",
              "required": false
            },
            {
              "name": "MaximumRPM",
              "type": "number",
              "description": "RPM máximo",
              "required": false
            },
            {
              "name": "AverageRPM",
              "type": "number",
              "description": "RPM médio",
              "required": false
            },
            {
              "name": "InitialAdress",
              "type": "string",
              "description": "Localização inicial",
              "required": false
            },
            {
              "name": "FinalAdress",
              "type": "string",
              "description": "Localização final",
              "required": false
            },
            {
              "name": "Renavam",
              "type": "string",
              "description": "Renavam",
              "required": false
            },
            {
              "name": "Registration",
              "type": "string",
              "description": "Matrícula",
              "required": false
            },
            {
              "name": "GPSDistancePercentage",
              "type": "number",
              "description": "Percentual Distancia GPS",
              "required": false
            },
            {
              "name": "DateDurationPercentage",
              "type": "number",
              "description": "Percentual Duração",
              "required": false
            },
            {
              "name": "StartDate",
              "type": "string",
              "description": "Data inicial",
              "required": false
            },
            {
              "name": "EndDate",
              "type": "string",
              "description": "Data final",
              "required": false
            },
            {
              "name": "DateDuration",
              "type": "number",
              "description": "Duração",
              "required": false
            },
            {
              "name": "StartingHourmeter",
              "type": "number",
              "description": "Horímetro inicial",
              "required": false
            },
            {
              "name": "EndingHourmeter",
              "type": "number",
              "description": "Horímetro final",
              "required": false
            },
            {
              "name": "HourmeterDuration",
              "type": "number",
              "description": "Duração horímetro",
              "required": false
            },
            {
              "name": "StartingOdometer",
              "type": "number",
              "description": "Odômetro inicial",
              "required": false
            },
            {
              "name": "EndingOdometer",
              "type": "number",
              "description": "Odômetro final",
              "required": false
            },
            {
              "name": "OdometerDistance",
              "type": "number",
              "description": "Distância odômetro",
              "required": false
            },
            {
              "name": "OdometerAverageSpeed",
              "type": "number",
              "description": "Velocidade média odômetro",
              "required": false
            },
            {
              "name": "StartingGPSOdometer",
              "type": "number",
              "description": "Odômetro GPS incial",
              "required": false
            },
            {
              "name": "EndingGPSOdometer",
              "type": "number",
              "description": "Odômetro GPS final",
              "required": false
            },
            {
              "name": "GPSDistance",
              "type": "number",
              "description": "Distância odômetro GPS",
              "required": false
            },
            {
              "name": "GPSAverageSpeed",
              "type": "number",
              "description": "Velocidade média odômetro GPS",
              "required": false
            },
            {
              "name": "StoppedTime",
              "type": "number",
              "description": "Tempo parado (em horas)",
              "required": false
            },
            {
              "name": "StartPointDistance",
              "type": "number",
              "description": "Distância em relação ao ponto inicial",
              "required": false
            },
            {
              "name": "StartPointDistanceDescription",
              "type": "string",
              "description": "Distância em relação ao ponto inicial (descrição)",
              "required": false
            },
            {
              "name": "EndPointDistance",
              "type": "number",
              "description": "Distância em relação ao ponto final",
              "required": false
            },
            {
              "name": "EndPointDistanceDescription",
              "type": "string",
              "description": "Distância em relação ao ponto final (descrição)",
              "required": false
            },
            {
              "name": "IdleMotorTime",
              "type": "number",
              "description": "Tempo motor ocioso",
              "required": false
            },
            {
              "name": "IdleMotorPercentage",
              "type": "number",
              "description": "Pecentual motor ocioso",
              "required": false
            },
            {
              "name": "ReeferTrailer1MinimumTemperature",
              "type": "number",
              "description": "Temperatura mínima baú frigorífico 1",
              "required": false
            },
            {
              "name": "ReeferTrailer1AverageTemperature",
              "type": "number",
              "description": "Temperatura média baú frigorífico 1",
              "required": false
            },
            {
              "name": "ReeferTrailer1MaximumTemperature",
              "type": "number",
              "description": "Temperatura máxima baú frigorífico 1",
              "required": false
            },
            {
              "name": "ReeferTrailer2MinimumTemperature",
              "type": "number",
              "description": "Temperatura mínima baú frigorífico 2",
              "required": false
            },
            {
              "name": "ReeferTrailer2AverageTemperature",
              "type": "number",
              "description": "Temperatura média baú frigorífico 2",
              "required": false
            },
            {
              "name": "ReeferTrailer2MaximumTemperature",
              "type": "number",
              "description": "Temperatura máxima baú frigorífico 2",
              "required": false
            },
            {
              "name": "ReeferTrailer3MinimumTemperature",
              "type": "number",
              "description": "Temperatura mínima baú frigorífico 3",
              "required": false
            },
            {
              "name": "ReeferTrailer3AverageTemperature",
              "type": "number",
              "description": "Temperatura média baú frigorífico 3",
              "required": false
            },
            {
              "name": "ReeferTrailer3MaximumTemperature",
              "type": "number",
              "description": "Temperatura máxima baú frigorífico 3",
              "required": false
            },
            {
              "name": "IdleSpeedRangeTime",
              "type": "number",
              "description": "Faixa: marcha lenta",
              "required": false
            },
            {
              "name": "NeutralGearRangeTime",
              "type": "number",
              "description": "Faixa: banguela",
              "required": false
            },
            {
              "name": "LowRPMRangeTime",
              "type": "number",
              "description": "Faixa: RPM baixa",
              "required": false
            },
            {
              "name": "EconomicRangeTime",
              "type": "number",
              "description": "Faixa: economica",
              "required": false
            },
            {
              "name": "SuperEconomicRangeTime",
              "type": "number",
              "description": "Faixa: super economica",
              "required": false
            },
            {
              "name": "HighRPMRangeTime",
              "type": "number",
              "description": "Faixa: RPM alto",
              "required": false
            },
            {
              "name": "IdleAccelerationRangeTime",
              "type": "number",
              "description": "Faixa: parado acelerando",
              "required": false
            },
            {
              "name": "RPMViolationRangeTime",
              "type": "number",
              "description": "Faixa: violação de RPM",
              "required": false
            },
            {
              "name": "OtherRangeTime",
              "type": "number",
              "description": "Faixa: outros",
              "required": false
            },
            {
              "name": "ToleranceTime",
              "type": "number",
              "description": "Faixa: tolerância",
              "required": false
            },
            {
              "name": "InertiaTime",
              "type": "number",
              "description": "Faixa: inércia",
              "required": false
            },
            {
              "name": "InitialAccumulatedLiterConsumption",
              "type": "number",
              "description": "Consumo litros acumulados inicial",
              "required": false
            },
            {
              "name": "FinalAccumulatedLiterConsumption",
              "type": "number",
              "description": "Consumo litros acumulados final",
              "required": false
            },
            {
              "name": "ConsumptionGoalPercentage",
              "type": "number",
              "description": "Meta percentual de consumo",
              "required": false
            },
            {
              "name": "LitersConsumptionPeriod",
              "type": "number",
              "description": "Litros consumidos no período",
              "required": false
            },
            {
              "name": "LitersConsumptionPeriodEconomy",
              "type": "number",
              "description": "Litros economizados no período",
              "required": false
            },
            {
              "name": "IdealLitersConsumptionPeriod",
              "type": "number",
              "description": "Consumo ideal no período",
              "required": false
            },
            {
              "name": "IdleMotorConsumption",
              "type": "number",
              "description": "Consumo com motor ocioso",
              "required": false
            },
            {
              "name": "KilometersPerLiterConsumption",
              "type": "number",
              "description": "Consumo em km/l",
              "required": false
            },
            {
              "name": "LitersPerHourConsumption",
              "type": "number",
              "description": "Consumo em l/h",
              "required": false
            },
            {
              "name": "StartingHourmeter2",
              "type": "number",
              "description": "Horimetro 2 - início",
              "required": false
            },
            {
              "name": "EndingHourmeter2",
              "type": "number",
              "description": "Horimetro 2 - fim",
              "required": false
            },
            {
              "name": "StartingHourmeter3",
              "type": "number",
              "description": "Horimetro 3 - início",
              "required": false
            },
            {
              "name": "EndingHourmeter3",
              "type": "number",
              "description": "Horimetro 3 - fim",
              "required": false
            },
            {
              "name": "InertiaDistance",
              "type": "number",
              "description": "Distância percorrida inercia",
              "required": false
            },
            {
              "name": "RetarderDistance",
              "type": "number",
              "description": "Distância percorrida retarder",
              "required": false
            },
            {
              "name": "EcoRollDistance",
              "type": "number",
              "description": "Distância percorrida EcoRoll",
              "required": false
            },
            {
              "name": "TractionDistance",
              "type": "number",
              "description": "Distância percorrida tração",
              "required": false
            },
            {
              "name": "LowSpeedDistance",
              "type": "number",
              "description": "Distância percorrida velocidade baixa",
              "required": false
            },
            {
              "name": "LowSpeedRangeTime",
              "type": "number",
              "description": "Tempo faixa velocidade baixa",
              "required": false
            },
            {
              "name": "OverSpeedTime",
              "type": "number",
              "description": "Tempo acima da velocidade",
              "required": false
            },
            {
              "name": "SpeedRangeTime1",
              "type": "number",
              "description": "Tempo faixa de velocidade 1",
              "required": false
            },
            {
              "name": "SpeedRangeTime2",
              "type": "number",
              "description": "Tempo faixa de velocidade 2",
              "required": false
            },
            {
              "name": "SpeedRangeTime3",
              "type": "number",
              "description": "Tempo faixa de velocidade 3",
              "required": false
            },
            {
              "name": "SpeedRangeTime4",
              "type": "number",
              "description": "Tempo faixa de velocidade 4",
              "required": false
            },
            {
              "name": "EcoRollRangeTime",
              "type": "number",
              "description": "Tempo faixa EcoRoll",
              "required": false
            },
            {
              "name": "RetarderRangeTime",
              "type": "number",
              "description": "Tempo faixa Retarder",
              "required": false
            },
            {
              "name": "PedalRange01_20",
              "type": "number",
              "description": "Faixa de pedal 01-20%",
              "required": false
            },
            {
              "name": "PedalRange21_40",
              "type": "number",
              "description": "Faixa de pedal 21-40%",
              "required": false
            },
            {
              "name": "PedalRange41_60",
              "type": "number",
              "description": "Faixa de pedal 41-60%",
              "required": false
            },
            {
              "name": "PedalRange61_80",
              "type": "number",
              "description": "Faixa de pedal 61-80%",
              "required": false
            },
            {
              "name": "PedalRange81_90",
              "type": "number",
              "description": "Faixa de pedal 81-90%",
              "required": false
            },
            {
              "name": "PedalRange91_120",
              "type": "number",
              "description": "Faixa de pedal 91-120%",
              "required": false
            },
            {
              "name": "BaseValueEconomy",
              "type": "number",
              "description": "Valor base da economia km/l",
              "required": false
            },
            {
              "name": "TargetConsumptionValue",
              "type": "number",
              "description": "Valor meta de consumo km/l",
              "required": false
            },
            {
              "name": "BrakeCount",
              "type": "integer",
              "description": "Valor quantidade de frenagens",
              "required": false
            },
            {
              "name": "BrakeDuration",
              "type": "number",
              "description": "Valor duração da frenagem",
              "required": false
            },
            {
              "name": "AverageWeight",
              "type": "number",
              "description": "Valor do peso médio do veículo",
              "required": false
            }
          ]
        },
        "example": [
          {
            "Driver": "",
            "DriverIntegrationCode": "",
            "TrackerOrder": 0,
            "TrackedUnit": "",
            "VehicleIntegrationCode": "",
            "VehicleIntegrationCodeClient": "",
            "TrackedUnitGroup": "",
            "OrganizationalUnit": "",
            "MaximumSpeed": 0,
            "AverageCruiserSpeed": 0,
            "StartingTankLevel": 0,
            "EndingTankLevel": 0,
            "PassengerTotal": 0,
            "ProductiveTime": 0,
            "ProductiveDistance": 0,
            "MaximumRPM": 0,
            "AverageRPM": 0,
            "InitialAdress": "",
            "FinalAdress": "",
            "Renavam": "",
            "Registration": "",
            "GPSDistancePercentage": 0,
            "DateDurationPercentage": 0,
            "StartDate": "2026-07-03T14:19:29.835Z",
            "EndDate": "2026-07-03T14:19:29.835Z",
            "DateDuration": 0,
            "StartingHourmeter": 0,
            "EndingHourmeter": 0,
            "HourmeterDuration": 0,
            "StartingOdometer": 0,
            "EndingOdometer": 0,
            "OdometerDistance": 0,
            "OdometerAverageSpeed": 0,
            "StartingGPSOdometer": 0,
            "EndingGPSOdometer": 0,
            "GPSDistance": 0,
            "GPSAverageSpeed": 0,
            "StoppedTime": 0,
            "StartPointDistance": 0,
            "StartPointDistanceDescription": "",
            "EndPointDistance": 0,
            "EndPointDistanceDescription": "",
            "IdleMotorTime": 0,
            "IdleMotorPercentage": 0,
            "ReeferTrailer1MinimumTemperature": 0,
            "ReeferTrailer1AverageTemperature": 0,
            "ReeferTrailer1MaximumTemperature": 0,
            "ReeferTrailer2MinimumTemperature": 0,
            "ReeferTrailer2AverageTemperature": 0,
            "ReeferTrailer2MaximumTemperature": 0,
            "ReeferTrailer3MinimumTemperature": 0,
            "ReeferTrailer3AverageTemperature": 0,
            "ReeferTrailer3MaximumTemperature": 0,
            "IdleSpeedRangeTime": 0,
            "NeutralGearRangeTime": 0,
            "LowRPMRangeTime": 0,
            "EconomicRangeTime": 0,
            "SuperEconomicRangeTime": 0,
            "HighRPMRangeTime": 0,
            "IdleAccelerationRangeTime": 0,
            "RPMViolationRangeTime": 0,
            "OtherRangeTime": 0,
            "ToleranceTime": 0,
            "InertiaTime": 0,
            "InitialAccumulatedLiterConsumption": 0,
            "FinalAccumulatedLiterConsumption": 0,
            "ConsumptionGoalPercentage": 0,
            "LitersConsumptionPeriod": 0,
            "LitersConsumptionPeriodEconomy": 0,
            "IdealLitersConsumptionPeriod": 0,
            "IdleMotorConsumption": 0,
            "KilometersPerLiterConsumption": 0,
            "LitersPerHourConsumption": 0,
            "StartingHourmeter2": 0,
            "EndingHourmeter2": 0,
            "StartingHourmeter3": 0,
            "EndingHourmeter3": 0,
            "InertiaDistance": 0,
            "RetarderDistance": 0,
            "EcoRollDistance": 0,
            "TractionDistance": 0,
            "LowSpeedDistance": 0,
            "LowSpeedRangeTime": 0,
            "OverSpeedTime": 0,
            "SpeedRangeTime1": 0,
            "SpeedRangeTime2": 0,
            "SpeedRangeTime3": 0,
            "SpeedRangeTime4": 0,
            "EcoRollRangeTime": 0,
            "RetarderRangeTime": 0,
            "PedalRange01_20": 0,
            "PedalRange21_40": 0,
            "PedalRange41_60": 0,
            "PedalRange61_80": 0,
            "PedalRange81_90": 0,
            "PedalRange91_120": 0,
            "BaseValueEconomy": 0,
            "TargetConsumptionValue": 0,
            "BrakeCount": 0,
            "BrakeDuration": 0,
            "AverageWeight": 0
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "TrackedUnitUsageConsolidatedResult[]",
          "fields": [
            {
              "name": "TrackerOrder",
              "type": "integer",
              "description": "",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "",
              "required": false
            },
            {
              "name": "TrackedUnitGroup",
              "type": "string",
              "description": "",
              "required": false
            },
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
              "name": "Registration",
              "type": "string",
              "description": "",
              "required": false
            },
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
              "name": "DateDuration",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "DateDurationPercentage",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "StartingOdometer",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "EndingOdometer",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "OdometerDistance",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "OdometerAverageSpeed",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "StartingGPSOdometer",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "EndingGPSOdometer",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "GPSDistance",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "GPSAverageSpeed",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "GPSDistancePercentage",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "StartingHourmeter",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "EndingHourmeter",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "HourmeterDuration",
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
              "name": "MaximumSpeed",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "InitialAccumulatedLiterConsumption",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "FinalAccumulatedLiterConsumption",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "LitersConsumptionPeriod",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "KilometersPerLiterConsumption",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "LitersPerHourConsumption",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "ConsumptionGoalPercentage",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "LitersConsumptionPeriodEconomy",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "IdealLitersConsumptionPeriod",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "IdleMotorConsumption",
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
              "name": "IdleMotorPercentage",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "IdleSpeedRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "NeutralGearRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "LowRPMRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "EconomicRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "SuperEconomicRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "HighRPMRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "IdleAccelerationRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "RPMViolationRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "OtherRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "ToleranceTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "InertiaTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "LowSpeedRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "EcoRollRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "RetarderRangeTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "TraveledDistance",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "TraveledGPSDistance",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "PassengerTotal",
              "type": "integer",
              "description": "",
              "required": false
            },
            {
              "name": "ProductiveTime",
              "type": "number",
              "description": "",
              "required": false
            },
            {
              "name": "ProductiveDistance",
              "type": "number",
              "description": "",
              "required": false
            }
          ]
        },
        "example": [
          {
            "TrackerOrder": 0,
            "TrackedUnit": "",
            "TrackedUnitGroup": "",
            "OrganizationalUnit": "",
            "Driver": "",
            "Registration": "",
            "StartDate": "2026-07-03T14:19:29.835Z",
            "EndDate": "2026-07-03T14:19:29.835Z",
            "DateDuration": 0,
            "DateDurationPercentage": 0,
            "StartingOdometer": 0,
            "EndingOdometer": 0,
            "OdometerDistance": 0,
            "OdometerAverageSpeed": 0,
            "StartingGPSOdometer": 0,
            "EndingGPSOdometer": 0,
            "GPSDistance": 0,
            "GPSAverageSpeed": 0,
            "GPSDistancePercentage": 0,
            "StartingHourmeter": 0,
            "EndingHourmeter": 0,
            "HourmeterDuration": 0,
            "MaximumRPM": 0,
            "MaximumSpeed": 0,
            "InitialAccumulatedLiterConsumption": 0,
            "FinalAccumulatedLiterConsumption": 0,
            "LitersConsumptionPeriod": 0,
            "KilometersPerLiterConsumption": 0,
            "LitersPerHourConsumption": 0,
            "ConsumptionGoalPercentage": 0,
            "LitersConsumptionPeriodEconomy": 0,
            "IdealLitersConsumptionPeriod": 0,
            "IdleMotorConsumption": 0,
            "IdleMotorTime": 0,
            "IdleMotorPercentage": 0,
            "IdleSpeedRangeTime": 0,
            "NeutralGearRangeTime": 0,
            "LowRPMRangeTime": 0,
            "EconomicRangeTime": 0,
            "SuperEconomicRangeTime": 0,
            "HighRPMRangeTime": 0,
            "IdleAccelerationRangeTime": 0,
            "RPMViolationRangeTime": 0,
            "OtherRangeTime": 0,
            "ToleranceTime": 0,
            "InertiaTime": 0,
            "LowSpeedRangeTime": 0,
            "EcoRollRangeTime": 0,
            "RetarderRangeTime": 0,
            "TraveledDistance": 0,
            "TraveledGPSDistance": 0,
            "PassengerTotal": 0,
            "ProductiveTime": 0,
            "ProductiveDistance": 0
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "WorkdayStepsResult[]",
          "fields": [
            {
              "name": "WorkdayStepFunctionId",
              "type": "integer",
              "description": "A função da etapa da jornada.\r\n1:\tCondução\r\n2:\tEspera\r\n3:\tDescanso\r\n4:\tRefeição\r\n5:\tFim de jornada",
              "required": false
            },
            {
              "name": "Vehicle",
              "type": "string",
              "description": "A identificação do veículo.",
              "required": false
            },
            {
              "name": "OrganizationalUnit",
              "type": "string",
              "description": "O nome ou identificação da unidade organizacional.",
              "required": false
            },
            {
              "name": "Employee",
              "type": "string",
              "description": "O nome ou identificação do funcionário.",
              "required": false
            },
            {
              "name": "JobPosition",
              "type": "string",
              "description": "O cargo do funcionário.",
              "required": false
            },
            {
              "name": "StartDate",
              "type": "string",
              "description": "Data inicial da etapa.",
              "required": false
            },
            {
              "name": "EndDate",
              "type": "string",
              "description": "Data final da etapa.",
              "required": false
            },
            {
              "name": "StepTime",
              "type": "integer",
              "description": "Duração da etapa.",
              "required": false
            },
            {
              "name": "Location",
              "type": "string",
              "description": "A localização.",
              "required": false
            },
            {
              "name": "Latitude",
              "type": "number",
              "description": "A latitude.",
              "required": false
            },
            {
              "name": "Longitude",
              "type": "number",
              "description": "A longitude.",
              "required": false
            },
            {
              "name": "LastModifiedBy",
              "type": "string",
              "description": "O último usuário a fazer modificações na jornada.",
              "required": false
            },
            {
              "name": "Workday",
              "type": "string",
              "description": "A jornada de trabalho.",
              "required": false
            },
            {
              "name": "IconPath",
              "type": "string",
              "description": "Caminho do ícone.",
              "required": false
            }
          ]
        },
        "example": [
          {
            "WorkdayStepFunctionId": 0,
            "Vehicle": "",
            "OrganizationalUnit": "",
            "Employee": "",
            "JobPosition": "",
            "StartDate": "2026-07-03T14:19:29.835Z",
            "EndDate": "2026-07-03T14:19:29.835Z",
            "StepTime": 0,
            "Location": "",
            "Latitude": 0,
            "Longitude": 0,
            "LastModifiedBy": "",
            "Workday": "2026-07-03T14:19:29.835Z",
            "IconPath": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "RuleCompatibleResult[]",
          "fields": [
            {
              "name": "RuleIntegrationCode",
              "type": "string",
              "description": "Código  de integração da Regra.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome da Regra.",
              "required": false
            },
            {
              "name": "IsInCompatible",
              "type": "boolean",
              "description": "Indica se o Sensor/Entrada é compatível com o rastreador/unidade rastreada.",
              "required": false
            },
            {
              "name": "IsOutCompatible",
              "type": "boolean",
              "description": "Indica se o Atuador/Saída é compatível com o rastreador/unidade rastreada.",
              "required": false
            },
            {
              "name": "IsTelemetryCompatible",
              "type": "boolean",
              "description": "Indica se a Telemetria é compatível com o rastreador/unidade rastreada.",
              "required": false
            },
            {
              "name": "IsEventControlCompatible",
              "type": "boolean",
              "description": "Indica se o Evento é compatível com o rastreador/unidade rastreada.",
              "required": false
            }
          ]
        },
        "example": [
          {
            "RuleIntegrationCode": "",
            "Name": "",
            "IsInCompatible": false,
            "IsOutCompatible": false,
            "IsTelemetryCompatible": false,
            "IsEventControlCompatible": false
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "example": 0
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "429",
        "description": "Limite de consulta excedido.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "RulesByLoggedUserResult[]",
          "fields": [
            {
              "name": "RuleIntegrationCode",
              "type": "string",
              "description": "Código de integração da regra.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome da regra",
              "required": false
            }
          ]
        },
        "example": [
          {
            "RuleIntegrationCode": "",
            "Name": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "429",
        "description": "Limite de consulta excedido.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "RulesByUnitTrackedResult[]",
          "fields": [
            {
              "name": "RuleIntegrationCode",
              "type": "string",
              "description": "Código de integração da regra.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome da regra",
              "required": false
            },
            {
              "name": "Order",
              "type": "integer",
              "description": "Ordem da unidade rastreada",
              "required": false
            }
          ]
        },
        "example": [
          {
            "RuleIntegrationCode": "",
            "Name": "",
            "Order": 0
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "429",
        "description": "Limite de consulta excedido.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "UnitTrackedByRuleResult[]",
          "fields": [
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Identificação da unidade rastreada.",
              "required": false
            },
            {
              "name": "TrackedUnitIntegrationCode",
              "type": "string",
              "description": "Código de integração da unidade rastreada.",
              "required": false
            },
            {
              "name": "ClientName",
              "type": "string",
              "description": "Nome do cliente associado a unidade rastreada",
              "required": false
            },
            {
              "name": "Order",
              "type": "integer",
              "description": "Ordem da unidade rastreada",
              "required": false
            }
          ]
        },
        "example": [
          {
            "TrackedUnit": "",
            "TrackedUnitIntegrationCode": "",
            "ClientName": "",
            "Order": 0
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "429",
        "description": "Limite de consulta excedido.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "RuleViolationResult[]",
          "fields": [
            {
              "name": "IdRuleViolation",
              "type": "integer",
              "description": "Código identificador único da violação da regra.",
              "required": false
            },
            {
              "name": "RuleIntegrationCode",
              "type": "string",
              "description": "Código de integração da regra violada.",
              "required": false
            },
            {
              "name": "TrackedUnitIntegrationCode",
              "type": "string",
              "description": "Código de integração da unidade rastreada. Pode ser um veículo ou uma pessoa. Depende do valor da propriedade IdTrackedUnitType.",
              "required": false
            },
            {
              "name": "TrackerSlot",
              "type": "integer",
              "description": "Ordem de instalação do rastreador na unidade rastreada, sendo que o SSX permite a associação de vários rasreadores a uma unidade rastreada.",
              "required": false
            },
            {
              "name": "Rule",
              "type": "string",
              "description": "Nome da regra violada.",
              "required": false
            },
            {
              "name": "Driver",
              "type": "string",
              "description": "Nome do motorista que violou a regra",
              "required": false
            },
            {
              "name": "Ticket",
              "type": "integer",
              "description": "Número do chamado que tratou a violação da regra.",
              "required": false
            },
            {
              "name": "InitialDate",
              "type": "string",
              "description": "Data do início da violação da regra.",
              "required": false
            },
            {
              "name": "FinalDate",
              "type": "string",
              "description": "Data do fim da violação da regra.",
              "required": false
            },
            {
              "name": "InitialAddress",
              "type": "string",
              "description": "Endereço do início da violação da regra.",
              "required": false
            },
            {
              "name": "FinalAddress",
              "type": "string",
              "description": "Endereço do fim da violação da regra.",
              "required": false
            },
            {
              "name": "LostPoints",
              "type": "number",
              "description": "Pontos perdidos pelo motorista que violou a regra de acordo com a fórmula de avaliação.",
              "required": false
            },
            {
              "name": "EvaluationFormula",
              "type": "string",
              "description": "Fórmula de avaliação do motorista.",
              "required": false
            }
          ]
        },
        "example": [
          {
            "IdRuleViolation": 0,
            "RuleIntegrationCode": "",
            "TrackedUnitIntegrationCode": "",
            "TrackerSlot": 0,
            "Rule": "",
            "Driver": "",
            "Ticket": 0,
            "InitialDate": "2026-07-03T14:19:29.835Z",
            "FinalDate": "2026-07-03T14:19:29.835Z",
            "InitialAddress": "",
            "FinalAddress": "",
            "LostPoints": 0,
            "EvaluationFormula": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "429",
        "description": "Limite de consulta excedido.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "RuleViolationResultV2[]",
          "fields": [
            {
              "name": "IdRuleViolation",
              "type": "integer",
              "description": "Código identificador único da violação da regra.",
              "required": false
            },
            {
              "name": "RuleIntegrationCode",
              "type": "string",
              "description": "Código de integração da regra violada.",
              "required": false
            },
            {
              "name": "TrackedUnitIntegrationCode",
              "type": "string",
              "description": "Código de integração da unidade rastreada. Pode ser um veículo ou uma pessoa. Depende do valor da propriedade IdTrackedUnitType.",
              "required": false
            },
            {
              "name": "IdTrackedUnitType",
              "type": "integer",
              "description": "Código identificador único do tipo da unidade rastreada: 1=Veículo ou 2=Pessoa.",
              "required": false
            },
            {
              "name": "TrackedUnit",
              "type": "string",
              "description": "Descrição da unidade rastreada. Este é o valor apresentado nas telas do SSX.",
              "required": false
            },
            {
              "name": "TrackerSlot",
              "type": "integer",
              "description": "Ordem de instalação do rastreador na unidade rastreada, sendo que o SSX permite a associação de vários rasreadores a uma unidade rastreada.",
              "required": false
            },
            {
              "name": "Rule",
              "type": "string",
              "description": "Nome da regra violada.",
              "required": false
            },
            {
              "name": "OrganizationalUnitIntegrationCode",
              "type": "string",
              "description": "Código de integração da unidade organizacional da unidade rastreada que violou a regra.",
              "required": false
            },
            {
              "name": "DriverIntegrationCode",
              "type": "string",
              "description": "Código de integração do motorista que violou da regra.",
              "required": false
            },
            {
              "name": "Driver",
              "type": "string",
              "description": "Nome do motorista que violou a regra",
              "required": false
            },
            {
              "name": "Ticket",
              "type": "integer",
              "description": "Número do chamado que tratou a violação da regra.",
              "required": false
            },
            {
              "name": "InitialDate",
              "type": "string",
              "description": "Data do início da violação da regra.",
              "required": false
            },
            {
              "name": "FinalDate",
              "type": "string",
              "description": "Data do fim da violação da regra.",
              "required": false
            },
            {
              "name": "InitialAddress",
              "type": "string",
              "description": "Endereço do início da violação da regra.",
              "required": false
            },
            {
              "name": "FinalAddress",
              "type": "string",
              "description": "Endereço do fim da violação da regra.",
              "required": false
            },
            {
              "name": "LatitudeStartViolation",
              "type": "number",
              "description": "Latitude do inicio da violação da regra.",
              "required": false
            },
            {
              "name": "LongitudeStartViolation",
              "type": "number",
              "description": "Longitude do inicio da violação da regra.",
              "required": false
            },
            {
              "name": "LatitudeEndViolation",
              "type": "number",
              "description": "Latitude do fim da violação da regra.",
              "required": false
            },
            {
              "name": "LongitudeEndViolation",
              "type": "number",
              "description": "Longitude do fim da violação da regra.",
              "required": false
            },
            {
              "name": "OdometroIncial",
              "type": "number",
              "description": "Odometro no inicio da violação da regra em quilômetros.",
              "required": false
            },
            {
              "name": "OdometroFinal",
              "type": "number",
              "description": "Odometro no fim da violação da regra em quilômetros.",
              "required": false
            },
            {
              "name": "TravelledDistance",
              "type": "number",
              "description": "Distância percorrida na violação da regra em quilômetros.",
              "required": false
            },
            {
              "name": "RoadSpeedLimit",
              "type": "number",
              "description": "Velocidade da via.",
              "required": false
            },
            {
              "name": "TelemetryList",
              "type": "array",
              "description": "Lista das telemetrias violadas",
              "required": false
            },
            {
              "name": "TelemetryList[].IdTelemetry",
              "type": "integer",
              "description": "Id da telemetria no sistema SSX.",
              "required": false
            },
            {
              "name": "TelemetryList[].Name",
              "type": "string",
              "description": "Nome da telemetria",
              "required": false
            },
            {
              "name": "TelemetryList[].Minimum",
              "type": "number",
              "description": "Valor mínimo da telemetria",
              "required": false
            },
            {
              "name": "TelemetryList[].Average",
              "type": "number",
              "description": "Valor médio da telemetria",
              "required": false
            },
            {
              "name": "TelemetryList[].Maximum",
              "type": "number",
              "description": "Valor máximo da telemetria",
              "required": false
            },
            {
              "name": "GeographyArea",
              "type": "object",
              "description": "",
              "required": false
            },
            {
              "name": "GeographyArea.GeographyIntegrationCode",
              "type": "string",
              "description": "Código de integração para identificação do Geography.",
              "required": false
            },
            {
              "name": "GeographyArea.Name",
              "type": "string",
              "description": "Nome da área geografica da ocorrência.",
              "required": false
            },
            {
              "name": "LostPoints",
              "type": "number",
              "description": "Pontos perdidos pelo motorista que violou a regra de acordo com a fórmula de avaliação.",
              "required": false
            },
            {
              "name": "EvaluationFormula",
              "type": "string",
              "description": "Fórmula de avaliação do motorista.",
              "required": false
            },
            {
              "name": "Videos",
              "type": "array",
              "description": "Lista de vídeos associados à violação da regra.",
              "required": false
            },
            {
              "name": "Videos[].URL",
              "type": "string",
              "description": "",
              "required": false
            },
            {
              "name": "Videos[].Channel",
              "type": "integer",
              "description": "",
              "required": false
            },
            {
              "name": "Videos[].CameraDescription",
              "type": "string",
              "description": "",
              "required": false
            }
          ]
        },
        "example": [
          {
            "IdRuleViolation": 0,
            "RuleIntegrationCode": "",
            "TrackedUnitIntegrationCode": "",
            "IdTrackedUnitType": 0,
            "TrackedUnit": "",
            "TrackerSlot": 0,
            "Rule": "",
            "OrganizationalUnitIntegrationCode": "",
            "DriverIntegrationCode": "",
            "Driver": "",
            "Ticket": 0,
            "InitialDate": "2026-07-03T14:19:29.835Z",
            "FinalDate": "2026-07-03T14:19:29.835Z",
            "InitialAddress": "",
            "FinalAddress": "",
            "LatitudeStartViolation": 0,
            "LongitudeStartViolation": 0,
            "LatitudeEndViolation": 0,
            "LongitudeEndViolation": 0,
            "OdometroIncial": 0,
            "OdometroFinal": 0,
            "TravelledDistance": 0,
            "RoadSpeedLimit": 0,
            "TelemetryList": [
              {
                "IdTelemetry": 0,
                "Name": "",
                "Minimum": 0,
                "Average": 0,
                "Maximum": 0
              }
            ],
            "GeographyArea": {
              "GeographyIntegrationCode": "",
              "Name": ""
            },
            "LostPoints": 0,
            "EvaluationFormula": "",
            "Videos": [
              {
                "URL": "",
                "Channel": 0,
                "CameraDescription": ""
              }
            ]
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "429",
        "description": "Limite de consulta excedido.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "SensorResult[]",
          "fields": [
            {
              "name": "IdSensor",
              "type": "integer",
              "description": "Id do sensor (entrada) no sistema SSX.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome do sensor (entrada)",
              "required": false
            }
          ]
        },
        "example": [
          {
            "IdSensor": 0,
            "Name": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "TelemetryResult[]",
          "fields": [
            {
              "name": "IdTelemetry",
              "type": "integer",
              "description": "Id da telemetria no sistema SSX.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome da telemetria",
              "required": false
            }
          ]
        },
        "example": [
          {
            "IdTelemetry": 0,
            "Name": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "TrailerResult[]",
          "fields": [
            {
              "name": "IntegrationCode",
              "type": "string",
              "description": "Código de identificação do reboque.",
              "required": false
            },
            {
              "name": "Name",
              "type": "string",
              "description": "Nome do reboque",
              "required": false
            },
            {
              "name": "Identification",
              "type": "string",
              "description": "Identificação do reboque",
              "required": false
            }
          ]
        },
        "example": [
          {
            "IntegrationCode": "",
            "Name": "",
            "Identification": ""
          }
        ]
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "415",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
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
    "presets": [],
    "responses": [
      {
        "code": "200",
        "description": "Sucesso.",
        "schema": {
          "name": "VideoTelemetryResult",
          "fields": [
            {
              "name": "URLStream",
              "type": "string",
              "description": "URL para consumo do streaming.",
              "required": false
            }
          ]
        },
        "example": {
          "URLStream": ""
        }
      },
      {
        "code": "204",
        "description": "O servidor processou a solicitação com sucesso, mas não retornou nenhum conteúdo.",
        "schema": {
          "name": "ResultError",
          "fields": [
            {
              "name": "Message",
              "type": "string",
              "description": "Mensagem do erro gerado na operação.",
              "required": false
            }
          ]
        },
        "example": {
          "Message": ""
        }
      },
      {
        "code": "400",
        "description": "Parâmetros com formato incorreto.",
        "example": null
      },
      {
        "code": "401",
        "description": "Token inválido.",
        "example": null
      },
      {
        "code": "404",
        "description": "Dados não encontrados.",
        "example": null
      },
      {
        "code": "500",
        "description": "Erro inesperado do servidor, tente novamente mais tarde.",
        "example": null
      }
    ]
  }
];
