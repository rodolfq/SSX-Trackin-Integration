const fs = require('fs');

const input = `ResultToken{
AccessToken	string
nullable: true
ExpiresIn	integer($int64)
}
ResultError{
Message	string
nullable: true
Mensagem do erro gerado na operação.

}
ActuatorResult{
IdActuator	integer($int32)
Id do atuador (saídas) no sistema SSX.

Name	string
nullable: true
Nome do atuador (saídas)

}
SendFreeTextMessageParameter{
TrackerIdentifier*	string
A identificação do rastreador

Text*	string
O texto a ser enviado

}
ResultErrorCode{
Code	integer($int32)
nullable: true
Código do erro gerado na operação.

Message	string
nullable: true
Mensagem do erro gerado na operação.

}
GetCommandStatusParameter{
IdCommand	integer($int32)
Identificador único do comando enviado ao rastreador.

}
CommandStatusResult{
IdCommandStatus	integer($int32)
Identificador único do status do comando: 1 - Aguardando para envio automático; 2 - Enviando automático; 3 - Aguardando posição do veículo; 4 - Enviando após transmisão; 5 - Cancelado por excesso de tentativas; 6 - Comando cancelado pelo usuário; 7 - Processado com sucesso; 8 - Comando rejeitado pelo módulo; 9 - Não enviado por alguma falha no sistema; 10 - Enviado para dispositivo periférico; 11 - Processado pelo periférico; 12 - Enviado para servidor HTTP;

CommandStatusName	string
nullable: true
Nome do status do comando.

IdTracker	string
nullable: true
Identificação do rastreador.

QueueEntryDate	string($date-time)
Data em que o comando entrou na fila de envio.

LastUpdateDate	string($date-time)
nullable: true
Data do último envio.

CompletionDate	string($date-time)
nullable: true
Data da finalização.

}
EventResult{
IdEvent	integer($int32)
Id do evento no sistema SSX.

Name	string
nullable: true
Nome do evento

}
FuelInsertParameter{
FuellingIntegrationCode*	string
maxLength: 40
minLength: 1
Código único que identifica o abastecimento.

FuelTypeCode*	integer($int32)
Código único que identifica o tipo de combustível: 1=Gasolina; 2=Álcool; 3=Diesel; 4=Gás natural; 5=Diesel S10; 6=ARLA32; 7=Diesel S10 Aditivado; 8=Diesel S10 Especial; 9=Diesel S500 Comum.

VehicleIntegrationCode*	string
maxLength: 40
minLength: 1
Código único que identifica o veículo abastecido.

DriverIntegrationCode	string
maxLength: 40
minLength: 1
nullable: true
Código único que identifica o motorista ou responsável pelo abastecimento.

FuelStationIntegrationCode	string
maxLength: 40
minLength: 1
nullable: true
Código único que identifica o posto de abastecimento.

Odometer	number($double)
nullable: true
Odômetro do veículo no momento do abastecimento;

Hourmeter	number($double)
nullable: true
Horímetro do veículo no momento do abastecimento;

FuelAmountLiters*	number($double)
Quantidade de litros abastecidos;

LiterPrice	number($double)
nullable: true
Valor pago pelo litro do combustível;

TotalPayment	number($double)
nullable: true
Valor total pago pelo abastecimento;

FuelDate*	string($date-time)
Data do abastecimento;

TankComplete	boolean
nullable: true
O tanque de combustível do veículo foi completo no abastecimento;

}
FuelInsertResult{
FuellingCode	integer($int32)
Código do abastecimento cadastrado

}
FuelListInsertResult_Inserted{
FuellingIntegrationCode	string
nullable: true
Código de integração do abastecimento

}
FuelListInsertResult_NonInserted{
ErrorMessage	string
nullable: true
Mensagem do erro de inserção

FuellingIntegrationCode	string
nullable: true
Código de integração do abastecimento

}
FuelListInsertResult{
ListInserted	[...]
ListNonInserted	[...]
}
QueryCondition{
PropertyName*	string
maxLength: 150
minLength: 1
Nome da propriedade que se deseja filtrar.

Condition*	string
Condição utilizada no filtro: Contains, NotContains, StartsWith, EndsWith, Equal, DoesNotEqual, GreaterThan, LessThan, GreaterThanOrEqualTo, LessThanOrEqualTo

Value*	{...}
}
FuelListResult{
FuellingIntegrationCode	string
nullable: true
Código único que identifica o abastecimento.

FuelTypeCode	integer($int32)
nullable: true
Código único que identifica o tipo de combustível: 1=Gasolina; 2=Álcool; 3=Diesel; 4=Gás natural; 5=Diesel S10; 6=ARLA32; 7=Diesel S10 Aditivado; 8=Diesel S10 Especial; 9=Diesel S500 Comum.

VehicleIntegrationCodeCentral	string
nullable: true
Código único que identifica o veículo para ser utilizado pelas integrações da Central. Este campo tem maior prioridade do que o VehicleIntegrationClient.

VehicleIntegrationCodeClient	string
nullable: true
Código único que identifica o veículo para ser utilizado pelas integrações do Cliente final.

DriverIntegrationCodeCentral	string
nullable: true
Código único que identifica o motorista ou responsável pelo abastecimento para ser utilizado pelas integrações da Central.

DriverIntegrationCodeClient	string
nullable: true
Código único que identifica o motorista para ser utilizado pelas integrações do Cliente final.

FuelStationIntegrationCode	string
nullable: true
Código único que identifica o posto de combustível.

Odometer	number($double)
nullable: true
Odômetro do veículo no momento do abastecimento.

PreviusOdometer	number($double)
nullable: true
Odômetro do veículo no momento do abastecimento anterior.

Hourmeter	number($double)
nullable: true
Horímetro do veículo no momento do abastecimento.

PreviusHourmeter	number($double)
nullable: true
Horímetro do veículo no momento do abastecimento anterior.

FuelAmountLiters	number($double)
Quantidade de litros abastecidos.

LiterPrice	number($double)
nullable: true
Valor pago pelo litro do combustível.

TotalPayment	number($double)
nullable: true
Valor total pago pelo abastecimento.

FuelDate	string($date-time)
Data do abastecimento

TankComplete	boolean
O tanque de combustível do veículo foi completo no abastecimento

}
MessageAttributesResult{
Attribute	string
nullable: true
Nome do atributo.

AttributeIntegrationCode	string
nullable: true
Código de integração do atributo.

Value	string
nullable: true
Valor do atributo definido pelo usuário no momento do envio.

}
MessageResult{
IdMessage	integer($int32)
Identificador único da mensagem enviada.

MessageCode	string
nullable: true
Código da mensagem.

MessageDirection	integer($int32)
Sentida da mensagem: 1: Portal para APP; 2: APP param Portal.

IdWorkFunction	integer($int32)
nullable: true
Identificacao da função de jornada de trabalho. 1:Condução 2: Espera 3: Descanso 4: Refeição 5: Fim de jornada

IdOperationalFunction	integer($int32)
nullable: true
Identificacao do status operacional. 0: Fora de serviço 1: Disponível 2: Ocupado

RuleIntegrationCode	string
nullable: true
Código de integração da regra associada a mensagem.

TrackedUnit	string
nullable: true
Unidade rastreada associada ao APP Onboard.

IdTrackedUnit	integer($int32)
Código de identificação da Unidade Rastreada.

TrackedUnitIntegrationCode	string
nullable: true
Código de integração da Unidade Rastreada.

APPIntegrationCode	string
nullable: true
Código de integração do APP Onboard.

TripCode	string
nullable: true
Código da viagem associada a unidade rastreada no momento do envio da mensagem.

SendDate	string($date-time)
nullable: true
Data de envio da mensagem (GMT 0).

ReceiveDate	string($date-time)
nullable: true
Data de recebimento da mensagem (GMT 0).

ReadDate	string($date-time)
nullable: true
Data de leitura da mensagem (GMT 0).

SenderPersonName	string
nullable: true
Pessoa responsável pelo envio da mensagem.

SenderPersonIntegrationCode	string
nullable: true
Código de integração da pessoa responsável pelo envio da mensagem.

ReaderPersonName	string
nullable: true
Pessoa responsável pela leitura da mensagem.

ReaderPersonIntegrationCode	string
nullable: true
Código de integração da pessoa responsável pela leitura da mensagem.

Text	string
nullable: true
Título da mensagem.

Description	string
nullable: true
Descrição da mensagem.

Lat	number($double)
nullable: true
Latitude do APP no momento do envio da mensagem.

Long	number($double)
nullable: true
Longitude do APP no momento do envio da mensagem.

Attributes	[...]
}
OnboardMessageSendParameter{
MessageType	string
nullable: true
Tipo de mensagem: 1= Mensagem predefinida; 2= Mensagem de texto livre;

MessageCode	string
nullable: true
Código da mensagem predifinida a ser enviada.

APPIntegrationCode	string
nullable: true
Código de integração do APP Onboard.

SenderPersonIntegrationCode	string
nullable: true
Código de integração da pessoa para quem a mensagem será enviada.

SenderVehicleIntegrationCode	string
nullable: true
Código de integração do veiculo para o qual a mensagem será enviada.

Text	string
nullable: true
Texto da mensagem.

TTS	boolean
Se a mensagem deve ser fala para o usuário.

VisibleChat	boolean
Se a mensagem deve aparecer no chat para o usuário da web.

Alert	boolean
Se a mensagem deve aparecer como um alerta.

}
OnboardMessageSendResult{
CommandSendCode	integer($int32)
Código do envio do comando para consulta do status.

}
MessageStatusParameter{
IdCommandLog	integer($int32)
Identificador único do envio da mensagem.

}
MessageStatusResult{
IdCommandLog	integer($int32)
Identificador único do envio da mensagem.

IdCommandStatus	integer($int32)
Identificador único do status do envio da mensagem.

1=Aguardando para envio automático 2-Enviando 3=Aguardando posição do veículo 4=Enviando 5=Cancelado por excesso de tentativas 6=Comando cancelado pelo usuário 7=Processado com sucesso 8=Comando rejeitado pelo módulo 9=Não enviado 10=Enviado para periférico

Status	string
nullable: true
Texto do status do envio da mensagem.

SendDate	string($date-time)
Data que a mensagem foi colocada na fila para envio. A hora não tem correção de fuso horário.

ProcessDate	string($date-time)
nullable: true
Data do recebimento da confirmação de entrega da mesangem. A hora não tem correção de fuso horário.

}
ResultListPerson{
IsActivatedClient	boolean
Cliente ativado?.

IsBlockedClient	boolean
Cliente com acesso bloqueado?.

ClientOrganizationUnitIntegrationCode	string
nullable: true
Código de integração da Unidade Organizacional do cliente da pessoa.

PersonOrganizationUnitIntegrationCode	string
nullable: true
Código de integração da Unidade Organizacional da pessoa.

OrganizationUnitName	string
nullable: true
Nome da Unidade organizacional da pessoa.

PersonIntegrationCodeClient	string
nullable: true
Código de integração da pessoa para ser utilizado pelas integrações do Cliente final.

Name	string
nullable: true
Nome da pessoa.

CPF	string
nullable: true
Número do CPF.

IDCard	string
nullable: true
Número da carteira de identidade

Registration	string
nullable: true
Número da matrícula da pessoa.

AccessCode	integer($int64)
nullable: true
Número do Código de Acesso da pessoa (Exibido em decimal)

WorkScheduleIntegrationCode	string
nullable: true
Código de integração da Escala de Trabalho

PersonRoleIntegrationCode	string
nullable: true
Código de integração do Cargo da pessoa.

Email	string
nullable: true
E-mail da pessoa.

Login	string
nullable: true
Login do usuário no sistema.

Gender	string
nullable: true
Gênero da pessoa M: Masculino | F: Feminino

DateOfBirth	string($date-time)
nullable: true
Data de nascimento da pessoa

CellPhoneNumber	string
nullable: true
Número do celular de contato da pessoa

PhoneNumber	string
nullable: true
Número do telefone de contato da pessoa

Language	integer($int32)
nullable: true
Identificador único do idioma a ser apresentado no sistema. Atualmente disponíveis: 1 - português, 3 - espanhol

GMT	number($double)
nullable: true
Correção do fuso horário do usuário (Em horas).

DaylightSaving	boolean
nullable: true
Informa se o usuário participa do horário de verão.

ConsolidationType	integer($int32)
nullable: true
Tipo de consolidação da jornada

LicenseDriver	string
nullable: true
Número da carteira de habilitação.

EmissionDateLicenseDriver	string($date-time)
nullable: true
Data de emissão da carteira de habilitação.

FirstDateLicenseDriver	string($date-time)
nullable: true
Data da primeira carteira de habilitação.

ExpirationDateLicenseDriver	string($date-time)
nullable: true
Data de vencimento da carteira de habilitação.

LicenseRegistrationType	integer($int32)
nullable: true
Categoria da habilitação (CNH) da pessoa

IsActivated	boolean
Pessoa ativada?.

}
PersonRoleResult{
PersonRoleIntegrationCode	string
nullable: true
Código de integração do cargo do colaborador

Name	string
nullable: true
Nome do cargo do colaborador

Functions	string
nullable: true
Funcões atribuidas ao cargo do colaborador

}
PersonInsertParameter_Tracking{
PersonIntegrationCode	string
maxLength: 40
minLength: 1
nullable: true
Código de integração da pessoa para ser utilizado pelas integrações do Cliente final.

OrganizationUnitIntegrationCode	string
maxLength: 40
minLength: 0
nullable: true
Código de integração da Unidade Organizacional da pessoa.

Name*	string
maxLength: 100
minLength: 1
Nome da pessoa.

Email	string($email)
maxLength: 150
minLength: 0
nullable: true
E-mail da pessoa. É obrigatório informar pelo menos 1: Email e/ou CellPhoneNumber).

CountryCode	string
maxLength: 3
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do DDI do contato da pessoa

AreaCode	string
maxLength: 3
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do DDD do contato da pessoa

CellPhoneNumber	string
maxLength: 9
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do celular de contato da pessoa. É obrigatório informar pelo menos 1: CellPhoneNumber e/ou Email).

PhoneNumber	string($tel)
maxLength: 10
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do telefone de contato da pessoa

IDCard	string
maxLength: 15
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número da carteira de identidade

CPF	string
maxLength: 11
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do CPF.

DateOfBirth	string($date)
nullable: true
Data de nascimento da pessoa

Gender	string
maxLength: 1
minLength: 0
pattern: ^m?$|^M?$|^f?$|^F?$
nullable: true
Gênero da pessoa M: Masculino | F: Feminino

IdentifierType	integer($int32)
maximum: 2
minimum: 1
nullable: true
Tipo do Identificador 1 - RFID ou 2 - IButton

AccessCodeType	integer($int32)
maximum: 2
minimum: 1
nullable: true
Tipo do Código de Acesso 1 - Decimal ou 2 - Hexadecimal

AccessCode	string
maxLength: 16
minLength: 0
nullable: true
Número do Código de Acesso da pessoa

TimeZone	integer($int32)
maximum: 32
minimum: 1
nullable: true
Fuso horário do usuário. Brasil(-3) = 31; Brasil(-4) = 28; Caso seja necessário outros códigos solicite a lista ao suporte.

DaylightSaving	boolean
default: false
nullable: true
Informa se o usuário participa do horário de verão.

Language	integer($int32)
maximum: 3
minimum: 1
nullable: true
Identificador único do idioma a ser apresentado no sistema. Atualmente disponíveis: 1 - português, 3 - espanhol

Country	integer($int32)
maximum: 255
minimum: 1
nullable: true
Código do país do usuário. Brasil = 29. Caso sejam necessários outros paises solicite a lista ao CRC ou suporte.

PersonRoleIntegrationCode	string
maxLength: 40
minLength: 0
nullable: true
Código de integração do Cargo da pessoa.

WorkScheduleIntegrationCode	string
maxLength: 40
minLength: 0
nullable: true
Código de integração da Escala de Trabalho

ConsolidationType	integer($int32)
maximum: 2
minimum: 1
nullable: true
Tipo de consolidação da jornada

Registration	string
maxLength: 15
minLength: 0
nullable: true
Número da matrícula da pessoa.

LicenseDriver	string
maxLength: 15
minLength: 0
nullable: true
Número da carteira de habilitação.

ExpirationDateLicenseDriver	string($date)
nullable: true
Data de vencimento da carteira de habilitação.

EmissionDateLicenseDriver	string($date)
nullable: true
Data de emissão da carteira de habilitação.

FirstDateLicenseDriver	string($date)
nullable: true
Data da primeira carteira de habilitação.

LicenseRegistrationType	integer($int32)
maximum: 11
minimum: 1
nullable: true
Categoria da habilitação (CNH) da pessoa

UserProfileTemplateIntegrationCode	string
maxLength: 40
minLength: 0
nullable: true
Template de perfil de acesso. Este template funciona como um modelo para a criação de perfis de acesso e contém todas as funções permitidas ao usuário. O template de perfil de acesso deve ser criado no SSX e o seu código utilizado pelo sistema integrado. Caso não seja informado, a pessoa será inserida mas não será criado um usuário para o mesmo.

Login	string
maxLength: 150
minLength: 0
nullable: true
Login do usuário no sistema. *Campo torna-se obrigatório quando a propriedade UserProfileTemplateIntegrationCode é informada

Password	string($password)
maxLength: 20
minLength: 0
nullable: true
Senha do usuário. *Campo torna-se obrigatório quando a propriedade UserProfileTemplateIntegrationCode é informada

}
PersonResult{
ClientIntegrationCode	string
nullable: true
Código identificador do cliente. Deve ser único em ambos os sistemas integrados. É através dele que as operações ente os sistemas serão realizadas.

PersonIntegrationCode	string
nullable: true
Código identificador da pessoa. Deve ser único em ambos os sistemas integrados.

PersonIntegrationCodeCentral	string
nullable: true
Código identificador da pessoa da central. Deve ser único em ambos os sistemas integrados.

Name	string
nullable: true
Nome da pessoa.

RoleName	string
nullable: true
Nome do cargo da pessoa caso seja um colaborador.

}
PersonUpdateParameter_Tracking{
PersonIntegrationCode*	string
maxLength: 40
minLength: 1
Código de integração da pessoa.

OrganizationUnitIntegrationCode	string
maxLength: 40
minLength: 0
nullable: true
Código de integração da Unidade Organizacional da pessoa.

Name*	string
maxLength: 100
minLength: 1
Nome da pessoa.

Email	string($email)
maxLength: 150
minLength: 0
nullable: true
E-mail da pessoa. É obrigatório informar pelo menos 1: Email e/ou CellPhoneNumber).

CountryCode	string
maxLength: 3
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do DDI do contato da pessoa

AreaCode	string
maxLength: 3
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do DDD do contato da pessoa

CellPhoneNumber	string
maxLength: 9
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do celular de contato da pessoa. É obrigatório informar pelo menos 1: CellPhoneNumber e/ou Email).

PhoneNumber	string($tel)
maxLength: 10
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do telefone de contato da pessoa

IDCard	string
maxLength: 15
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número da carteira de identidade

CPF	string
maxLength: 11
minLength: 0
pattern: ^[0-9]*$
nullable: true
Número do CPF.

DateOfBirth	string($date)
nullable: true
Data de nascimento da pessoa

Gender	string
maxLength: 1
minLength: 0
pattern: ^m?$|^M?$|^f?$|^F?$
nullable: true
Gênero da pessoa M: Masculino | F: Feminino

IdentifierType	integer($int32)
maximum: 2
minimum: 1
nullable: true
Tipo do Identificador 1 - RFID ou 2 - IButton

AccessCodeType	integer($int32)
maximum: 2
minimum: 1
nullable: true
Tipo do Código de Acesso 1 - Decimal ou 2 - Hexadecimal

AccessCode	string
maxLength: 16
minLength: 0
nullable: true
Número do Código de Acesso da pessoa

TimeZone	integer($int32)
maximum: 32
minimum: 1
nullable: true
Fuso horário do usuário. Brasil(-3) = 31; Brasil(-4) = 28; Caso seja necessário outros códigos solicite a lista ao suporte.

DaylightSaving	boolean
default: false
nullable: true
Informa se o usuário participa do horário de verão.

Language	integer($int32)
maximum: 3
minimum: 1
nullable: true
Identificador único do idioma a ser apresentado no sistema. Atualmente disponíveis: 1 - português, 3 - espanhol

Country	integer($int32)
maximum: 255
minimum: 1
nullable: true
Código do país do usuário. Brasil = 29. Caso sejam necessários outros paises solicite a lista ao CRC ou suporte.

PersonRoleIntegrationCode*	string
maxLength: 40
minLength: 0
Código de integração do Cargo da pessoa.

WorkScheduleIntegrationCode	string
maxLength: 40
minLength: 0
nullable: true
Código de integração da Escala de Trabalho

ConsolidationType	integer($int32)
maximum: 2
minimum: 1
nullable: true
Tipo de consolidação da jornada

Registration	string
maxLength: 15
minLength: 0
nullable: true
Número da matrícula da pessoa.

LicenseDriver	string
maxLength: 15
minLength: 0
nullable: true
Número da carteira de habilitação.

ExpirationDateLicenseDriver	string($date)
nullable: true
Data de vencimento da carteira de habilitação.

EmissionDateLicenseDriver	string($date)
nullable: true
Data de emissão da carteira de habilitação.

FirstDateLicenseDriver	string($date)
nullable: true
Data da primeira carteira de habilitação.

LicenseRegistrationType	integer($int32)
maximum: 11
minimum: 1
nullable: true
Categoria da habilitação (CNH) da pessoa

UserProfileTemplateIntegrationCode	string
maxLength: 40
minLength: 0
nullable: true
Template de perfil de acesso. Este template funciona como um modelo para a criação de perfis de acesso e contém todas as funções permitidas ao usuário. O template de perfil de acesso deve ser criado no SSX e o seu código utilizado pelo sistema integrado. Caso não seja informado, a pessoa será inserida mas não será criado um usuário para o mesmo.

Login	string
maxLength: 150
minLength: 0
nullable: true
Login do usuário no sistema. Este campo torna-se obrigatório quando o código de integração do perfil de acesso é informado ///

Password	string($password)
maxLength: 20
minLength: 0
nullable: true
Senha do usuário. Este campo torna-se obrigatório quando o login e o código de integração do perfil de acesso são informados

InsertIfNotExists	boolean
default: false
nullable: true
Se você passar a propriedade InsertIfNotExists = true, o sistema irá cadastrar a pessoa automaticamente caso não seja encontrado no banco de dados.

}
TrailerResult{
IntegrationCode	string
nullable: true
Código de identificação do reboque.

Name	string
nullable: true
Nome do reboque

Identification	string
nullable: true
Identificação do reboque

}
PositionWithTrailerAndPlateResult{
ListTrailer	[...]
Plate	string
nullable: true
Placa do veículo

DriverIdentification	number($double)
nullable: true
Identificação do motorista (RFID ou IButton)

DocumentNumber	string
nullable: true
CPF do motorista

IdPosition	integer($int64)
Código identificador único da posição recebida do rastreador.

IdTrackedUnitType	integer($int32)
Código identificador único do tipo da unidade rastreada: 1=Veículo ou 2=Pessoa.

TrackedUnitIntegrationCode	string
nullable: true
Código identificador único da unidade rastreada no sistema (Único por tipo de unidade rastreada: Veículo, pessoa, etc.).

TrackerSlot	integer($int32)
Ordem de instalação do rastreador na unidade rastreada, sendo que o SSX permite a associação de vários rasreadores a uma unidade rastreada.

IdTrackedUnit	integer($int32)
Código interno da unidade rastreada

TrackedUnit	string
nullable: true
Descrição da unidade rastreada. Este é o valor apresentado nas telas do SSX.

IdEvent	integer($int32)
Código do evento gerador da posição.

IdMainBatteryMeasureUnit	integer($int32)
Unidade de medida da bateria do veiculo: Percentual / Voltagem

IdBackupBatteryMeasureUnit	integer($int32)
Unidade de medida da bateria interna do rastreador: Percentual / Voltagem

Ignition	boolean
nullable: true
Status da ignição na posição.

Available	boolean
nullable: true
Status operaciona da unidade rastreada: NULL=Fora de operação; 0=Disponível; 1=Ocupado;

ValidGPS	boolean
nullable: true
Status do GPS: 0=Inválido; 1=Válido;

EventDate	string($date-time)
Data da posição gerada pelo rastreador.

UpdateDate	string($date-time)
Data do recebimento da posição pelo SSX.

Driver	string
nullable: true
Motorista do veículo.

Latitude	number($double)
readOnly: true
Latitude da posição.

Longitude	number($double)
readOnly: true
Longitude da posição.

Address	string
nullable: true
Endereço da posição.

DistanceFromGeographicArea	string
nullable: true
Distância da área geográfica.

ListInputSensor	{...}
nullable: true
ListOutputActuator	{...}
nullable: true
ListTelemetry	{...}
nullable: true
PersonIntegrationCodeCenter	string
nullable: true
Código identificador da central de pessoa no sistema (Único por pessoa).

PersonIntegrationCodeClient	string
nullable: true
Código identificador do cliente de pessoa no sistema (Único por pessoa).

}
PositionResult{
IdPosition	integer($int64)
Código identificador único da posição recebida do rastreador.

IdTrackedUnitType	integer($int32)
Código identificador único do tipo da unidade rastreada: 1=Veículo ou 2=Pessoa.

TrackedUnitIntegrationCode	string
nullable: true
Código identificador único da unidade rastreada no sistema (Único por tipo de unidade rastreada: Veículo, pessoa, etc.).

TrackerSlot	integer($int32)
Ordem de instalação do rastreador na unidade rastreada, sendo que o SSX permite a associação de vários rasreadores a uma unidade rastreada.

IdTrackedUnit	integer($int32)
Código interno da unidade rastreada

TrackedUnit	string
nullable: true
Descrição da unidade rastreada. Este é o valor apresentado nas telas do SSX.

IdEvent	integer($int32)
Código do evento gerador da posição.

IdMainBatteryMeasureUnit	integer($int32)
Unidade de medida da bateria do veiculo: Percentual / Voltagem

IdBackupBatteryMeasureUnit	integer($int32)
Unidade de medida da bateria interna do rastreador: Percentual / Voltagem

Ignition	boolean
nullable: true
Status da ignição na posição.

Available	boolean
nullable: true
Status operaciona da unidade rastreada: NULL=Fora de operação; 0=Disponível; 1=Ocupado;

ValidGPS	boolean
nullable: true
Status do GPS: 0=Inválido; 1=Válido;

EventDate	string($date-time)
Data da posição gerada pelo rastreador.

UpdateDate	string($date-time)
Data do recebimento da posição pelo SSX.

Driver	string
nullable: true
Motorista do veículo.

Latitude	number($double)
readOnly: true
Latitude da posição.

Longitude	number($double)
readOnly: true
Longitude da posição.

Address	string
nullable: true
Endereço da posição.

DistanceFromGeographicArea	string
nullable: true
Distância da área geográfica.

ListInputSensor	{...}
nullable: true
ListOutputActuator	{...}
nullable: true
ListTelemetry	{...}
nullable: true
PersonIntegrationCodeCenter	string
nullable: true
Código identificador da central de pessoa no sistema (Único por pessoa).

PersonIntegrationCodeClient	string
nullable: true
Código identificador do cliente de pessoa no sistema (Único por pessoa).

}
SoapPositionResult{
idPosition	integer($int64)
dataHora	string($date-time)
codigoIntegracaoRastreador	string
nullable: true
placaVeiculo	string
nullable: true
latitude	number($float)
longitude	number($float)
estado	string
nullable: true
cidade	string
nullable: true
logradouro	string
nullable: true
}
PositionWithTrailerResult{
ListTrailer	[...]
IdPosition	integer($int64)
Código identificador único da posição recebida do rastreador.

IdTrackedUnitType	integer($int32)
Código identificador único do tipo da unidade rastreada: 1=Veículo ou 2=Pessoa.

TrackedUnitIntegrationCode	string
nullable: true
Código identificador único da unidade rastreada no sistema (Único por tipo de unidade rastreada: Veículo, pessoa, etc.).

TrackerSlot	integer($int32)
Ordem de instalação do rastreador na unidade rastreada, sendo que o SSX permite a associação de vários rasreadores a uma unidade rastreada.

IdTrackedUnit	integer($int32)
Código interno da unidade rastreada

TrackedUnit	string
nullable: true
Descrição da unidade rastreada. Este é o valor apresentado nas telas do SSX.

IdEvent	integer($int32)
Código do evento gerador da posição.

IdMainBatteryMeasureUnit	integer($int32)
Unidade de medida da bateria do veiculo: Percentual / Voltagem

IdBackupBatteryMeasureUnit	integer($int32)
Unidade de medida da bateria interna do rastreador: Percentual / Voltagem

Ignition	boolean
nullable: true
Status da ignição na posição.

Available	boolean
nullable: true
Status operaciona da unidade rastreada: NULL=Fora de operação; 0=Disponível; 1=Ocupado;

ValidGPS	boolean
nullable: true
Status do GPS: 0=Inválido; 1=Válido;

EventDate	string($date-time)
Data da posição gerada pelo rastreador.

UpdateDate	string($date-time)
Data do recebimento da posição pelo SSX.

Driver	string
nullable: true
Motorista do veículo.

Latitude	number($double)
readOnly: true
Latitude da posição.

Longitude	number($double)
readOnly: true
Longitude da posição.

Address	string
nullable: true
Endereço da posição.

DistanceFromGeographicArea	string
nullable: true
Distância da área geográfica.

ListInputSensor	{...}
nullable: true
ListOutputActuator	{...}
nullable: true
ListTelemetry	{...}
nullable: true
PersonIntegrationCodeCenter	string
nullable: true
Código identificador da central de pessoa no sistema (Único por pessoa).

PersonIntegrationCodeClient	string
nullable: true
Código identificador do cliente de pessoa no sistema (Único por pessoa).

}
DriverRankingFilterParameter{
StartDate*	string($date-time)
Data incial. Escolha uma para filtrar o relatório

EndDate*	string($date-time)
Data final. A data máxima a ser filtrada.

OrganizationalUnitList	string
nullable: true
Lista de unidades organizacionais. Uma lista com os códigos de integração das unidades organizacionais a serem filtradas, separados por vírgula (","). Caso a lista seja vazia, TODAS as unidades serão retornadas.

DriverList	string
nullable: true
Lista de motoristas. Uma lista com os códigos de integração dos motoristas a serem filtrados, separados por vírgula (","). Caso seja vazia, TODOS os motoristas serão retornados.

EmployeeTypeIntegrationCode	string
nullable: true
Código de integração do cargo do funcionário. Use-o para filtrar por cargo.

}
DriverRankingResult{
OrganizationalUnit	string
nullable: true
Unidade organizacional do funcionário

Driver	string
nullable: true
Identificação do motorista

EmployeePosition	string
nullable: true
Cargo do funcionário

MaximumSpeed	number($double)
nullable: true
Velocidade máxima atingida pelo motorista no período

AverageCruiserSpeed	number($double)
nullable: true
Velocidade média de cruzeiro (velocidade média em movimento)

AverageSpeed	number($double)
nullable: true
Velocidade média

MaximumRPM	number($double)
nullable: true
RPM máximo.

AverageRPM	number($double)
nullable: true
RPM médio.

IdleMotorTime	number($double)
nullable: true
Tempo motor ocioso.

Displacement	number($double)
nullable: true
Deslocamento (km).

Duration	number($double)
nullable: true
Tempo de condução..

LowGearRangeTime	number($double)
nullable: true
Faixa: marcha lenta.

NeutralGearRangeTime	number($double)
nullable: true
Faixa: movimento sem tração.

LowRPMRangeTime	number($double)
nullable: true
Faixa: RPM baixo.

EconomicRangeTime	number($double)
nullable: true
Faixa: econômica.

SuperEconomicRangeTime	number($double)
nullable: true
Faixa: super econômica.

HighRPMRangeTime	number($double)
nullable: true
Faixa: RPM alto.

IdleAccelerationRangeTime	number($double)
nullable: true
Faixa: parado acelerando.

RPMViolationRangeTime	number($double)
nullable: true
Faixa: violação de RPM.

OtherRangeTime	number($double)
nullable: true
Faixa: outras faixas.

ToleranceTime	number($double)
nullable: true
Faixa: tolerância.

InertiaTime	number($double)
nullable: true
Faixa: inércia.

LostPointsEconomic	number($double)
nullable: true
Pontos perdidos faixa econômica.

LostPointsSuperEconomic	number($double)
nullable: true
Pontos perdidos faixa super econômica.

LostPointsIdleSpeed	number($double)
nullable: true
Pontos perdidos marcha lenta.

LostPointsLowRPM	number($double)
nullable: true
Pontos perdidos RPM baixo.

LostPointsHighRPM	number($double)
nullable: true
Pontos perdidos RPM alto.

LostPointsNeutralGear	number($double)
nullable: true
Pontos perdidos movimento sem tração.

LostPointsIdleAcceleration	number($double)
nullable: true
Pontos perdidos parado acelarando.

LostPointsRPMViolation	number($double)
nullable: true
Pontos perdidos violação de RPM.

DailyAverageInfractionQuantity	integer($int32)
nullable: true
Média diária de infrações (Qtd).

DailyAverageTotalInfractionTime	number($double)
nullable: true
Média diária de infrações (h).

RPMGrade	number($double)
nullable: true
Nota perfil de condução.

DailyAverageGrade	number($double)
nullable: true
Nota condução segura.

DailyAverageLostPoints	number($double)
nullable: true
Total de pontos perdidos por período.

IdleMotorConsumption	number($double)
nullable: true
Consumo motor ocioso.

KilometerPerLiterEfficiency	number($double)
nullable: true
readOnly: true
Eficiência (km/l).

LiterPerHourEfficiency	number($double)
nullable: true
readOnly: true
Eficiência (l/h).

LitersConsumption	number($double)
nullable: true
Consumo (l).

ConsumptionGoalDistance	number($double)
nullable: true
Meta de consumo (km).

ConsumptionGoalTime	number($double)
nullable: true
Meta de consumo (h).

LowSpeedRangeTime	number($double)
Faixa: velocidade baixa

LostPointsLowSpeed	number($double)
Pontos perdidos faixa velocidade baixa

EcoRollRangeTime	number($double)
Faixa: EcoRoll

RetarderRangeTime	number($double)
Faixa: Retarder

}
AreaPassageFilterParameter{
StartDate*	string($date-time)
Data incial. Escolha uma para filtrar o relatório

EndDate*	string($date-time)
Data final. A data máxima a ser filtrada.

OrganizationalUnitList	string
nullable: true
Lista com os códigos de integração das unidades organizacionais a serem exibidas, separados por vírgula(","). Use uma lista vazia se quiser retornar todas as unidades orgazinacionais.

TrackedUnitList	string
nullable: true
Lista com os códigos de integração das unidades rastreadas a serem exibidas. Use uma lista vazia se quiser retornar todas as unidades rastreadas.

MinimumPeriod	string($date-span)
Período mínimo a ser exibido. Somente passagens por áreas/rotas que execederem esse valor serão retornados.

AreaCategoryList	string
nullable: true
Uma lista com os códigos de integração das categorias de áreas/rotas a serem exibidas, separados por vírgula(","). Use uma lista vazia se quiser retornar todas as categorias de áreas/rotas.

AreaGroupList	string
nullable: true
Uma lista com os códigos de integração dos grupos de áreas/rotas a serem exibidos, separados por vírgula(","). Use uma lista vazia se quiser retornar todos os grupos de áreas/rotas.

AreaList	string
nullable: true
Uma lista com os códigos de integração das áreas/rotas a serem exibidas, separados por vírgula(","). Use uma lista vazia se quiser retornar todas as áreas/rotas.

InitalTime	string($date-span)
A hora incial do dia. Use se quiser filtrar o horário da passagem pela área/rota.

EndTime	string($date-span)
A hora final do dia. Use se quiser filtrar o horário da passagem pela área/rota.

}
AreaPassageResult{
StartDate	string($date-time)
Data inicial

EndDate	string($date-time)
Data final

Duration	number($double)
readOnly: true
Duração

Driver	string
nullable: true
Motorista

TrackerOrder	integer($int32)
Ordem do rastreador

TrackedUnit	string
nullable: true
Unidade rastreada

TrackedUnitGroup	string
nullable: true
Grupo da unidade rastreada

OrganizationalUnit	string
nullable: true
Unidade organizacional

MaximumSpeed	number($double)
Velocidade máxima

AverageCruiserSpeed	number($double)
Velocidade média de cruzeiro

MaximumRPM	number($double)
nullable: true
RPM máximo

AverageRPM	number($double)
nullable: true
RPM médio

IdleMotorTime	number($double)
Tempo de motor ocioso

IdleMotorPercentage	number($double)
readOnly: true
Tempo de motor ocioso (percentual)

LitersConsumption	number($double)
nullable: true
Consumo (litros)

LitersPerHourConsumption	number($double)
nullable: true
readOnly: true
Consumo (litros/hora)

IdleMotorLitersConsumption	number($double)
nullable: true
Consumo com motor ocioso (litros)

KilometerPerLiterConsumption	number($double)
nullable: true
readOnly: true
Consumo (Km/l)

GeographyName	string
nullable: true
Nome da área geográfica

GeographyGroup	string
nullable: true
Grupo da área geográfica

GeographyType	string
nullable: true
Tipo da área geográfica

GeographyCategory	string
nullable: true
Categoria da área geográfica

GeographyIntegrationCode	string
nullable: true
Código de integração da área geográfica

StartingOdometer	number($double)
nullable: true
Odometro inicial

EndingOdometer	number($double)
nullable: true
Odometro final

OdometerDistance	number($double)
nullable: true
readOnly: true
Distância odometro

StartingGPSOdometer	number($double)
Odometro inicial GPS

EndingGPSOdometer	number($double)
Odometro final GPS

GPSDistance	number($double)
readOnly: true
Distância odometro GPS

StartingHourmeter	number($double)
Horímetro inicial

EndingHourmeter	number($double)
Horímetro final

HourmeterDuration	number($double)
readOnly: true
Duração horímetro

InitialLocation	string
nullable: true
Localização inicial

FinalLocation	string
nullable: true
Localizãção final

}
TrackedUnitUsageFilterParameter{
StartDate*	string($date-time)
Data incial. Escolha uma para filtrar o relatório

EndDate*	string($date-time)
Data final. A data máxima a ser filtrada.

OrganizationalUnitList	string
nullable: true
Lista de unidades organizacionais a serem exibidas. Vazio = todos, até 1000 registros.

TrackedUnitList	string
nullable: true
Lista de unidades rastreadas a serem exibidas. Vazio = todas.

AreaOption	integer($int32)
maximum: 3
minimum: 1
Entrada/saída de áreas/rotas [1: todos | 2: Somente fora de todas as areas | 3: Somente dentro de alguma das areas]

AreaGroupList	string
nullable: true
Uma lista com os grupos de áreas/rotas a serem exibidos. Use uma lista vazia se quiser retornar todas os grupos de áreas/rotas.

AreaCategoryList	string
nullable: true
Uma lista com as categorias de áreas/rotas a serem exibidas. Use uma lista vazia se quiser retornar todas as categorias de áreas/rotas.

AreaList	string
nullable: true
Lista de áreas/rotas. Uma lista com os códigos de integração das áreas/rotas a serem exibidas, separada por vírgula(","). Use uma lista vazia se quiser retornar todas as categorias de áreas/rotas.

MinimumPeriod	string($date-span)
Período mínimo a ser exibido.

IntialTime	string($date-span)
A hora incial do dia. Use se quiser filtrar o horário da passagem pela área.

EndTime	string($date-span)
A hora final do dia. Use se quiser filtrar o horário da passagem pela área.

}
TrackedUnitUsageResult{
Driver	string
nullable: true
Motorista

TrackerOrder	integer($int32)
Ordem do rastreador

TrackedUnit	string
nullable: true
Unidade rastreada

VehicleIntegrationCode	string
nullable: true
Grupo da unidade rastreada

VehicleIntegrationCodeClient	string
nullable: true
Grupo da unidade rastreada

TrackedUnitGroup	string
nullable: true
Código de integraçao do veículo

OrganizationalUnit	string
nullable: true
Unidade organizacional

MaximumSpeed	number($double)
nullable: true
Velocidade máxima

AverageCruiserSpeed	number($double)
nullable: true
Velocidade média de cruzeiro

StartingTankLevel	number($double)
nullable: true
Nível inicial do tanque

EndingTankLevel	number($double)
nullable: true
Nível final do tanque

PassengerTotal	integer($int32)
nullable: true
Quantidade de passageiros

ProductiveTime	number($double)
nullable: true
Tempo produtivo

ProductiveDistance	number($double)
nullable: true
Distância produtiva

MaximumRPM	number($double)
nullable: true
RPM máximo

AverageRPM	number($double)
nullable: true
RPM médio

InitialAdress	string
nullable: true
Localização inicial

FinalAdress	string
nullable: true
Localização final

Renavam	string
nullable: true
Renavam

Registration	string
nullable: true
Matrícula

GPSDistancePercentage	number($double)
readOnly: true
Percentual Distancia GPS

DateDurationPercentage	number($double)
readOnly: true
Percentual Duração

StartDate	string($date-time)
Data inicial

EndDate	string($date-time)
Data final

DateDuration	number($double)
readOnly: true
Duração

StartingHourmeter	number($double)
Horímetro inicial

EndingHourmeter	number($double)
Horímetro final

HourmeterDuration	number($double)
readOnly: true
Duração horímetro

StartingOdometer	number($double)
nullable: true
Odômetro inicial

EndingOdometer	number($double)
nullable: true
Odômetro final

OdometerDistance	number($double)
nullable: true
readOnly: true
Distância odômetro

OdometerAverageSpeed	number($double)
nullable: true
readOnly: true
Velocidade média odômetro

StartingGPSOdometer	number($double)
nullable: true
Odômetro GPS incial

EndingGPSOdometer	number($double)
nullable: true
Odômetro GPS final

GPSDistance	number($double)
nullable: true
readOnly: true
Distância odômetro GPS

GPSAverageSpeed	number($double)
nullable: true
readOnly: true
Velocidade média odômetro GPS

StoppedTime	number($double)
nullable: true
readOnly: true
Tempo parado (em horas)

StartPointDistance	number($double)
Distância em relação ao ponto inicial

StartPointDistanceDescription	string
nullable: true
readOnly: true
Distância em relação ao ponto inicial (descrição)

EndPointDistance	number($double)
Distância em relação ao ponto final

EndPointDistanceDescription	string
nullable: true
readOnly: true
Distância em relação ao ponto final (descrição)

IdleMotorTime	number($double)
Tempo motor ocioso

IdleMotorPercentage	number($double)
readOnly: true
Pecentual motor ocioso

ReeferTrailer1MinimumTemperature	number($double)
nullable: true
Temperatura mínima baú frigorífico 1

ReeferTrailer1AverageTemperature	number($double)
nullable: true
Temperatura média baú frigorífico 1

ReeferTrailer1MaximumTemperature	number($double)
nullable: true
Temperatura máxima baú frigorífico 1

ReeferTrailer2MinimumTemperature	number($double)
nullable: true
Temperatura mínima baú frigorífico 2

ReeferTrailer2AverageTemperature	number($double)
nullable: true
Temperatura média baú frigorífico 2

ReeferTrailer2MaximumTemperature	number($double)
nullable: true
Temperatura máxima baú frigorífico 2

ReeferTrailer3MinimumTemperature	number($double)
nullable: true
Temperatura mínima baú frigorífico 3

ReeferTrailer3AverageTemperature	number($double)
nullable: true
Temperatura média baú frigorífico 3

ReeferTrailer3MaximumTemperature	number($double)
nullable: true
Temperatura máxima baú frigorífico 3

IdleSpeedRangeTime	number($double)
nullable: true
Faixa: marcha lenta

NeutralGearRangeTime	number($double)
nullable: true
Faixa: banguela

LowRPMRangeTime	number($double)
nullable: true
Faixa: RPM baixa

EconomicRangeTime	number($double)
nullable: true
Faixa: economica

SuperEconomicRangeTime	number($double)
nullable: true
Faixa: super economica

HighRPMRangeTime	number($double)
nullable: true
Faixa: RPM alto

IdleAccelerationRangeTime	number($double)
nullable: true
Faixa: parado acelerando

RPMViolationRangeTime	number($double)
nullable: true
Faixa: violação de RPM

OtherRangeTime	number($double)
nullable: true
Faixa: outros

ToleranceTime	number($double)
nullable: true
Faixa: tolerância

InertiaTime	number($double)
nullable: true
Faixa: inércia

InitialAccumulatedLiterConsumption	number($double)
nullable: true
Consumo litros acumulados inicial

FinalAccumulatedLiterConsumption	number($double)
nullable: true
Consumo litros acumulados final

ConsumptionGoalPercentage	number($double)
nullable: true
Meta percentual de consumo

LitersConsumptionPeriod	number($double)
nullable: true
Litros consumidos no período

LitersConsumptionPeriodEconomy	number($double)
nullable: true
Litros economizados no período

IdealLitersConsumptionPeriod	number($double)
nullable: true
readOnly: true
Consumo ideal no período

IdleMotorConsumption	number($double)
nullable: true
readOnly: true
Consumo com motor ocioso

KilometersPerLiterConsumption	number($double)
nullable: true
readOnly: true
Consumo em km/l

LitersPerHourConsumption	number($double)
nullable: true
readOnly: true
Consumo em l/h

StartingHourmeter2	number($double)
Horimetro 2 - início

EndingHourmeter2	number($double)
Horimetro 2 - fim

StartingHourmeter3	number($double)
Horimetro 3 - início

EndingHourmeter3	number($double)
Horimetro 3 - fim

InertiaDistance	number($double)
Distância percorrida inercia

RetarderDistance	number($double)
Distância percorrida retarder

EcoRollDistance	number($double)
Distância percorrida EcoRoll

TractionDistance	number($double)
Distância percorrida tração

LowSpeedDistance	number($double)
Distância percorrida velocidade baixa

LowSpeedRangeTime	number($double)
Tempo faixa velocidade baixa

OverSpeedTime	number($double)
Tempo acima da velocidade

SpeedRangeTime1	number($double)
Tempo faixa de velocidade 1

SpeedRangeTime2	number($double)
Tempo faixa de velocidade 2

SpeedRangeTime3	number($double)
Tempo faixa de velocidade 3

SpeedRangeTime4	number($double)
Tempo faixa de velocidade 4

EcoRollRangeTime	number($double)
Tempo faixa EcoRoll

RetarderRangeTime	number($double)
Tempo faixa Retarder

PedalRange01_20	number($double)
Faixa de pedal 01-20%

PedalRange21_40	number($double)
Faixa de pedal 21-40%

PedalRange41_60	number($double)
Faixa de pedal 41-60%

PedalRange61_80	number($double)
Faixa de pedal 61-80%

PedalRange81_90	number($double)
Faixa de pedal 81-90%

PedalRange91_120	number($double)
Faixa de pedal 91-120%

BaseValueEconomy	number($double)
Valor base da economia km/l

TargetConsumptionValue	number($double)
Valor meta de consumo km/l

BrakeCount	integer($int32)
Valor quantidade de frenagens

BrakeDuration	number($double)
Valor duração da frenagem

AverageWeight	number($double)
Valor do peso médio do veículo

}
TrackedUnitUsageConsolidatedFilterParameter{
StartDate*	string($date-time)
Data inicial. Escolha uma para filtrar o relatório.

EndDate*	string($date-time)
Data final. A data máxima a ser filtrada.

ConsolidationType*	integer($int32)
maximum: 3
minimum: 1
Tipo de consolidação [1: Daily (por dia) | 2: Monthly (por mês) | 3: FullPeriod (todo o período)]

OrganizationalUnitList	string
nullable: true
Lista de unidades organizacionais a serem exibidas separadas por vírgula. Vazio = todos, até 1000 registros.

TrackedUnitList	string
nullable: true
Lista de unidades rastreadas a serem exibidas separadas por vírgula. Vazio = todas.

MinimumPeriod	string($date-span)
Período mínimo a ser exibido.

InitialTime	string($date-span)
A hora inicial do dia. Use se quiser filtrar o horário do período.

EndTime	string($date-span)
A hora final do dia. Use se quiser filtrar o horário do período.

}
TrackedUnitUsageConsolidatedResult{
TrackerOrder	integer($int32)
TrackedUnit	string
nullable: true
TrackedUnitGroup	string
nullable: true
OrganizationalUnit	string
nullable: true
Driver	string
nullable: true
Registration	string
nullable: true
StartDate	string($date-time)
EndDate	string($date-time)
DateDuration	number($double)
DateDurationPercentage	number($double)
readOnly: true
StartingOdometer	number($double)
nullable: true
EndingOdometer	number($double)
nullable: true
OdometerDistance	number($double)
nullable: true
readOnly: true
OdometerAverageSpeed	number($double)
nullable: true
readOnly: true
StartingGPSOdometer	number($double)
nullable: true
EndingGPSOdometer	number($double)
nullable: true
GPSDistance	number($double)
nullable: true
readOnly: true
GPSAverageSpeed	number($double)
nullable: true
readOnly: true
GPSDistancePercentage	number($double)
readOnly: true
StartingHourmeter	number($double)
EndingHourmeter	number($double)
HourmeterDuration	number($double)
readOnly: true
MaximumRPM	number($double)
nullable: true
MaximumSpeed	number($double)
nullable: true
InitialAccumulatedLiterConsumption	number($double)
nullable: true
FinalAccumulatedLiterConsumption	number($double)
nullable: true
LitersConsumptionPeriod	number($double)
nullable: true
KilometersPerLiterConsumption	number($double)
nullable: true
LitersPerHourConsumption	number($double)
nullable: true
ConsumptionGoalPercentage	number($double)
nullable: true
LitersConsumptionPeriodEconomy	number($double)
nullable: true
IdealLitersConsumptionPeriod	number($double)
nullable: true
readOnly: true
IdleMotorConsumption	number($double)
nullable: true
IdleMotorTime	number($double)
IdleMotorPercentage	number($double)
IdleSpeedRangeTime	number($double)
nullable: true
NeutralGearRangeTime	number($double)
nullable: true
LowRPMRangeTime	number($double)
nullable: true
EconomicRangeTime	number($double)
nullable: true
SuperEconomicRangeTime	number($double)
nullable: true
HighRPMRangeTime	number($double)
nullable: true
IdleAccelerationRangeTime	number($double)
nullable: true
RPMViolationRangeTime	number($double)
nullable: true
OtherRangeTime	number($double)
nullable: true
ToleranceTime	number($double)
nullable: true
InertiaTime	number($double)
nullable: true
LowSpeedRangeTime	number($double)
nullable: true
EcoRollRangeTime	number($double)
nullable: true
RetarderRangeTime	number($double)
nullable: true
TraveledDistance	number($double)
nullable: true
TraveledGPSDistance	number($double)
nullable: true
PassengerTotal	integer($int32)
nullable: true
ProductiveTime	number($double)
nullable: true
ProductiveDistance	number($double)
nullable: true
}
InputOutputActivationFilterParameter{
StartDate*	string($date-time)
Data incial. Escolha uma para filtrar o relatório.

EndDate*	string($date-time)
Data final. Escolha uma para filtrar o relatório.

OrganizationalUnitList	string
nullable: true
Lista de unidades organizacionais. Um lista com os códigos de integração das unidades organizacionais a serem exibidas, separadas por vírgula (","). Vazio = todas.

TrackedUnitList	string
nullable: true
Lista de unidades rastreadas. Uma lista com os Ids das unidades rastreadas a serem exibidas, separados por "," (vírgula). Vazio = todas.

MinimumPeriod	string($date-span)
Período mínimo a ser exibido. Somente serão retornadas as ativações que estiverem ativadas por um período maior que o valor informado.

IntialTime	string($date-span)
A hora incial do dia. Use se quiser filtrar o horário da ativação da entrada ou saída.

EndTime	string($date-span)
A hora final do dia. Use se quiser filtrar o horário da ativação da entrada ou saída.

DriverList	string
nullable: true
Lista de motoristas. Uma lista com os códigos de integração dos motoristas a serem filtrados, separados por vírgula (","). Caso seja vazia, TODOS os motoristas serão retornados.

SensorList	string
nullable: true
Lista de sensores. Uma lista com os IDs dos sensores a serem filtrados, separados por vírgula (","). Caso seja vazia, TODOS os sensores serão retornados. Somente para o relatório de ENTRADAS (INPUT)

ActuatorList	string
nullable: true
Lista de atuadores. Uma lista com os IDs dos atuadores a serem filtrados, separados por vírgula (","). Caso seja vazia, TODOS os atuadores serão retornados. Somente para o relatório de SAÍDAS (OUTPUT)

}
InputOutputActivationResult{
TrackerOrder	integer($int32)
Ordem do rastreador

TrackedUnit	string
nullable: true
Unidade rastrada

OrganizationlUnit	string
nullable: true
Unidade organizacional

TrackedUnitGroup	string
nullable: true
Grupo da unidade rastreada

Driver	string
nullable: true
Motorista

ActivationType	string
nullable: true
Tipo de ativação (sensores/atuadores)

ActivationName	string
nullable: true
Nome do sensor/atuador

StartDate	string($date-time)
Data inicial

EndDate	string($date-time)
Data final

Duration	number($double)
Duração

}
DailyConsolidatedWorkdayFilterParameter{
StartDate	string($date-time)
Data incial. Escolha uma para filtrar o relatório.

EndDate	string($date-time)
Data final. Escolha uma para filtrar o relatório.

ClosingPeriodList	string
nullable: true
Lista de períodos de fechamento. Uma lista com os códigos de integração dos períodos de fechamento a serem exibidos, separadas por vírgula (","). Vazio = todos.

OrganizationalUnitList	string
nullable: true
Lista de unidades organizacionais. Uma lista com os códigos de integração das unidades organizacionais a serem exibidas, separadas por vírgula (","). Vazio = todas.

EmployeeList	string
nullable: true
Lista de colaboradores. Uma lista com os códigos de integração dos colaboradores a serem exibidos, separados por "," (vírgula). Vazio = todos.

JobPositionList	string
nullable: true
Lista de cargos. Uma lista com os códigos de integração dos cargos a serem exibidos, separados por "," (vírgula). Vazio = todos.

}
DailyConsolidatedWorkdayResult{
Employee	string
nullable: true
O nome ou identificação do funcionário.

Odometer	number($double)
nullable: true
O odometro.

GPSOdometer	number($double)
nullable: true
O odometro do GPS.

Vehicles	string
nullable: true
O nome ou identificação do(s) veículo(s).

DayOfTheMonth	integer($int32)
O dia do mês.

WeekDay	integer($int32)
Um inteiro que representa o dia da semana. 1: Domingo 2: SegundaFeira 3: TercaFeira 4: QuartaFeira 5: QuintaFeira 6: SextaFeira 7: Sabado

StartDate	string($date-time)
nullable: true
A data inicial.

EndDate	string($date-time)
nullable: true
A data final.

DailyShift	integer($int32)
nullable: true
O total do tempo no período diurno.

NightShift	integer($int32)
nullable: true
O total do tempo no período noturno.

JobPosition	string
nullable: true
O cargo do funcionário.

OrganizationalUnit	string
nullable: true
O nome ou identificação da unidade organizacional.

Registration	string
nullable: true
A matrícula do funcionário.

WorkdayId	integer($int32)
O ID da jornada de trabalho.

RegistryType	integer($int32)
Um inteiro que representa o tipo do registro. 0: Jornada 1: Férias 2: Licença 3: Abono 4: Falta não justificada 5: Folga 6: Abono parcial

NextWorkdayDateSuggestion	string($date-time)
nullable: true
A data sugerida para a próxima jornada.

WorkdayIsModified	boolean
Um boleano que informa se o registro teve modificação.

ClosingPeriod	string
nullable: true
O perído de fechamento da jornada.

Overtime1	integer($int32)
nullable: true
A faixa de hora extra 1.

Overtime2	integer($int32)
nullable: true
A faixa de hora extra 2.

AbsenceAllowance	integer($int32)
nullable: true
O abono.

Compensatory	integer($int32)
nullable: true
A quantidade indenizatória.

IsDayOff	boolean
Um boleano que identifica se é um dia de folga.

Cpf	string
nullable: true
O CPF do funcionário.

Validity	string($date-time)
nullable: true
A vigência.

WorkSchedule	string
nullable: true
A escala do funcionário.

HourBank	number($double)
nullable: true
Total do banco de horas.

FillDrivingTimeWithStandby	boolean
Booleano. Completar condução com espera?

OperationTime	integer($int32)
nullable: true
Tempo em operação.

PlannedDriving	integer($int32)
nullable: true
Tempo de condução prevista

DrivingTotal	integer($int32)
nullable: true
Tempo total de condução.

MaximumDrivingTime	integer($int32)
nullable: true
Tempo máximo de condução.

ShortStandBy	integer($int32)
nullable: true
Espera curta.

LongStandBy	integer($int32)
nullable: true
Espera longa.

Meal	integer($int32)
nullable: true
Refeição.

Rest	integer($int32)
nullable: true
Descanso.

UsageTime	integer($int32)
nullable: true
Tempo em operação.

IntraJourneyTotal	integer($int32)
nullable: true
Total intrajornada.

MandatoryRestBetweenShifts	integer($int32)
nullable: true
Descanso obrigatório entre jornadas.

OtherMandatoryRests	integer($int32)
nullable: true
Outros descansos obrigatórios entre jornadas.

MandatoryRestsTotal	integer($int32)
nullable: true
Total de descanso obrigatório entre jornadas.

CompensatoryHour	integer($int32)
nullable: true
Hora indenizatória.

CompensatoryRange1	integer($int32)
nullable: true
Faixa indenizatória 1.

CompensatoryRange2	integer($int32)
nullable: true
Faixa indenizatória 2.

CompensatoryRange3	integer($int32)
nullable: true
Faixa indenizatória 3.

IsWorkdayFinished	boolean
Booleano. Jornada encerrada?

DrivingLimitViolationAlert	boolean
Booleano. Alerta de limite de direção violado?

WorkdayDurationLimitAlert	boolean
Booleano. Alerta de duração de jornada acima do limite superior?

MaximumDailyDrivingTimeAlert	boolean
Booleano. Alerta de tempo máximo de condução diário excedido?

MaximumContinuousDrivingTimeAlert	boolean
Booleano. Alerta de tempo máximo de condução continua excedido?

MinimumRestTimeBetweenShiftsAlert	boolean
Booleano. Alerta de tempo mínimo de descanso entre jornada não cumprido?

MinimumMandatoryRestTimeAlert	boolean
Booleano. Alerta de tempo mínimo de descanso obrigatório não cumprido?

MinimumMealTimeAlert	boolean
Booleano. Alerta de tempo mínimo de refeição não cumprido?

LongestWorkdayStep	number($double)
nullable: true
Tempo maior etapa.

}
WorkdayStepsFilterParameter{
StartDate	string($date-time)
Data incial. Escolha uma para filtrar o relatório.

EndDate	string($date-time)
Data final. Escolha uma para filtrar o relatório.

OrganizationalUnitList	string
nullable: true
Lista de unidades organizacionais. Uma lista com os códigos de integração das unidades organizacionais a serem exibidas, separadas por vírgula (","). Vazio = todas.

EmployeeList	string
nullable: true
Lista de colaboradores. Uma lista com os códigos de integração dos colaboradores a serem exibidos, separados por "," (vírgula). Vazio = todos.

JobPositionList	string
nullable: true
Lista de cargos. Uma lista com os códigos de integração dos cargos a serem exibidos, separados por "," (vírgula). Vazio = todos.

}
WorkdayStepsResult{
WorkdayStepFunctionId	integer($int32)
A função da etapa da jornada. 1: Condução 2: Espera 3: Descanso 4: Refeição 5: Fim de jornada

Vehicle	string
nullable: true
A identificação do veículo.

OrganizationalUnit	string
nullable: true
O nome ou identificação da unidade organizacional.

Employee	string
nullable: true
O nome ou identificação do funcionário.

JobPosition	string
nullable: true
O cargo do funcionário.

StartDate	string($date-time)
Data inicial da etapa.

EndDate	string($date-time)
Data final da etapa.

StepTime	integer($int32)
nullable: true
Duração da etapa.

Location	string
nullable: true
A localização.

Latitude	number($double)
nullable: true
A latitude.

Longitude	number($double)
nullable: true
A longitude.

LastModifiedBy	string
nullable: true
O último usuário a fazer modificações na jornada.

Workday	string($date-time)
A jornada de trabalho.

IconPath	string
nullable: true
Caminho do ícone.

}
MaintenanceListItensResult{
Code	string
nullable: true
Código do item

Name	string
nullable: true
Nome do item

TypeId	integer($int32)
Id do tipo de item

Type	string
nullable: true
Descrição do tipo de item

Price	number($double)
nullable: true
Valor do item

Quantity	number($double)
nullable: true
Quantidade do item

WarrantyTime	integer($int32)
nullable: true
Tempo de garantia

ExecutedHodometerUsefulLife	integer($int32)
nullable: true
Vida útil do item hodômetro realizado

ExecutedHourmeterUsefulLife	integer($int32)
nullable: true
Vida útil do item horímetro realizado

ExecutedDateUsefulLife	string($date-time)
nullable: true
Vida útil data realizado

StatusCode	integer($int32)
Situação: 1=Planejado; 2=Realizado; 3=Cancelado; 4=Migrado para outra manutenção; 99=Excluído;

ReasonCode	integer($int32)
nullable: true
Código do motivo

Reason	string
nullable: true
Descrição do motivo

}
MaintenanceListResult{
MaintenanceCode	integer($int32)
Código da manutenção

VehicleId	integer($int32)
Id do veículo

TypeId	integer($int32)
Tipo: 1=Detectiva; 2=Corretiva; 3=Preventiva; 4=Preditiva;

StatusId	integer($int32)
Situação: 1=Planejada; 2=Realizada; 3=Cancelada; 4=Migrada para outra manutenção; 99=Excluída;

MaintenancePlanStageId	integer($int32)
nullable: true
Código da etapa do plano de manutenção

Name	string
nullable: true
Nome da manutenção

Observation	string
nullable: true
Observação

PlannedDate	string($date-time)
nullable: true
Data prevista

PlannedHodometer	integer($int32)
nullable: true
Hodômetro previsto

PlannedHourmeter	integer($int32)
nullable: true
Horímetro previsto

PlannedItemPrice	number($double)
nullable: true
Valor total peça previsto

PlannedServicePrice	number($double)
nullable: true
Valor serviço previsto

PlannedServiceTime	integer($int32)
nullable: true
Tempo serviço previsto

ExecutedDate	string($date-time)
nullable: true
Data realizado

ExecutedHodometer	integer($int32)
nullable: true
Hodômetro realizado

ExecutedHourmeter	integer($int32)
nullable: true
Horímetro realizado

ExecutedItemPrice	number($double)
nullable: true
Valor total peça realizado

ExecutedServicePrice	number($double)
nullable: true
Valor serviço realizado

ExecutedServiceTime	integer($int32)
nullable: true
Tempo serviço realizado

UserRegisterId	integer($int32)
IdUsuario cadastro

RegisterDate	string($date-time)
Data cadastro

LastModificationUserId	integer($int32)
nullable: true
IdUsuario última modificação

LastModificationDate	string($date-time)
nullable: true
Data última modificação

VehicleIntegrationCode	string
nullable: true
Código único de identificação do veículo para ser utilizado nas integrações da Central.

VehicleClientIntegrationCode	string
nullable: true
Código único de identificação do veículo para ser utilizado nas integrações do Cliente final.

TrackedUnit	string
nullable: true
Unidade rastreada

VehicleOrganizationUnit	string
nullable: true
Unidade organizacional do veículo

TrackedUnitGroup	string
nullable: true
Grupo de unidade rastreada

VehicleModel	string
nullable: true
Modelo do veículo

Itens	[...]
}
RuleCompatibleListParameter{
TrackingUnitIntegrationCode*	string
maxLength: 40
minLength: 1
Código de integração da unidade rastreada.

}
RuleCompatibleResult{
RuleIntegrationCode	string
nullable: true
Código de integração da Regra.

Name	string
nullable: true
Nome da Regra.

IsInCompatible	boolean
Indica se o Sensor/Entrada é compatível com o rastreador/unidade rastreada.

IsOutCompatible	boolean
Indica se o Atuador/Saída é compatível com o rastreador/unidade rastreada.

IsTelemetryCompatible	boolean
Indica se a Telemetria é compatível com o rastreador/unidade rastreada.

IsEventControlCompatible	boolean
Indica se o Evento é compatível com o rastreador/unidade rastreada.

}
TrackedUnitAndRuleParameter{
TrackedUnitIntegrationCode*	string
Código de integração da unidade rastreada

RuleIntegrationCode*	string
Código de integração da regra

TrackedUnitOrder*	integer($int32)
Ordem da unidade rastreada

}
RulesByUnitTrackedResult{
RuleIntegrationCode	string
nullable: true
Código de integração da regra.

Name	string
nullable: true
Nome da regra

Order	integer($int32)
Ordem da unidade rastreada

}
UnitTrackedByRuleParameter{
RuleIntegrationCode*	string
Código de integração da regra

}
UnitTrackedByRuleResult{
TrackedUnit	string
nullable: true
Identificação da unidade rastreada.

TrackedUnitIntegrationCode	string
nullable: true
Código de integração da unidade rastreada.

ClientName	string
nullable: true
Nome do cliente associado a unidade rastreada

Order	integer($int32)
Ordem da unidade rastreada

}
RulesByLoggedUserResult{
RuleIntegrationCode	string
nullable: true
Código de integração da regra.

Name	string
nullable: true
Nome da regra

}
RuleViolationResult{
IdRuleViolation	integer($int32)
Código identificador único da violação da regra.

RuleIntegrationCode	string
nullable: true
Código de integração da regra violada.

TrackedUnitIntegrationCode	string
nullable: true
Código de integração da unidade rastreada. Pode ser um veículo ou uma pessoa. Depende do valor da propriedade IdTrackedUnitType.

TrackerSlot	integer($int32)
Ordem de instalação do rastreador na unidade rastreada, sendo que o SSX permite a associação de vários rasreadores a uma unidade rastreada.

Rule	string
nullable: true
Nome da regra violada.

Driver	string
nullable: true
Nome do motorista que violou a regra

Ticket	integer($int32)
nullable: true
Número do chamado que tratou a violação da regra.

InitialDate	string($date-time)
Data do início da violação da regra.

FinalDate	string($date-time)
nullable: true
Data do fim da violação da regra.

InitialAddress	string
nullable: true
Endereço do início da violação da regra.

FinalAddress	string
nullable: true
Endereço do fim da violação da regra.

LostPoints	number($double)
nullable: true
Pontos perdidos pelo motorista que violou a regra de acordo com a fórmula de avaliação.

AssessmentFormula	string
nullable: true
Fórmula de avaliação do motorista.

}
TelemetryInfo{
IdTelemetry	integer($int32)
Id da telemetria no sistema SSX.

Name	string
nullable: true
Nome da telemetria

Minimum	number($double)
nullable: true
Valor mínimo da telemetria

Average	number($double)
nullable: true
Valor médio da telemetria

Maximum	number($double)
nullable: true
Valor máximo da telemetria

}
GeographyArea{
GeographyIntegrationCode	string
nullable: true
Código de integração para identificação do Geography.

Name	string
nullable: true
Nome da área geografica da ocorrência.

}
VideoInfo{
URL	string
nullable: true
Channel	integer($int32)
CameraDescription	string
nullable: true
}
RuleViolationResultV2{
IdRuleViolation	integer($int32)
Código identificador único da violação da regra.

RuleIntegrationCode	string
nullable: true
Código de integração da regra violada.

TrackedUnitIntegrationCode	string
nullable: true
Código de integração da unidade rastreada. Pode ser um veículo ou uma pessoa. Depende do valor da propriedade IdTrackedUnitType.

IdTrackedUnitType	integer($int32)
Código identificador único do tipo da unidade rastreada: 1=Veículo ou 2=Pessoa.

TrackedUnit	string
nullable: true
Descrição da unidade rastreada. Este é o valor apresentado nas telas do SSX.

TrackerSlot	integer($int32)
Ordem de instalação do rastreador na unidade rastreada, sendo que o SSX permite a associação de vários rasreadores a uma unidade rastreada.

Rule	string
nullable: true
Nome da regra violada.

OrganizationalUnitIntegrationCode	string
nullable: true
Código de integração da unidade organizacional da unidade rastreada que violou a regra.

DriverIntegrationCode	string
nullable: true
Código de integração do motorista que violou da regra.

Driver	string
nullable: true
Nome do motorista que violou a regra

Ticket	integer($int32)
nullable: true
Número do chamado que tratou a violação da regra.

InitialDate	string($date-time)
Data do início da violação da regra.

FinalDate	string($date-time)
nullable: true
Data do fim da violação da regra.

InitialAddress	string
nullable: true
Endereço do início da violação da regra.

FinalAddress	string
nullable: true
Endereço do fim da violação da regra.

LatitudeStartViolation	number($double)
nullable: true
Latitude do inicio da violação da regra.

LongitudeStartViolation	number($double)
nullable: true
Longitude do inicio da violação da regra.

LatitudeEndViolation	number($double)
nullable: true
Latitude do fim da violação da regra.

LongitudeEndViolation	number($double)
nullable: true
Longitude do fim da violação da regra.

OdometroIncial	number($double)
nullable: true
Odometro no inicio da violação da regra em quilômetros.

OdometroFinal	number($double)
nullable: true
Odometro no fim da violação da regra em quilômetros.

TravelledDistance	number($double)
nullable: true
Distância percorrida na violação da regra em quilômetros.

RoadSpeedLimit	number($double)
nullable: true
Velocidade da via.

TelemetryList	[...]
GeographyArea	GeographyArea{...}
LostPoints	number($double)
nullable: true
Pontos perdidos pelo motorista que violou a regra de acordo com a fórmula de avaliação.

AssessmentFormula	string
nullable: true
Fórmula de avaliação do motorista.

Videos	[...]
}
SensorResult{
IdSensor	integer($int32)
Id do sensor (entrada) no sistema SSX.

Name	string
nullable: true
Nome do sensor (entrada)

}
TelemetryResult{
IdTelemetry	integer($int32)
Id da telemetria no sistema SSX.

Name	string
nullable: true
Nome da telemetria

}
VideotelemetryRequest{
VehicleIntegrationCode*	string
maxLength: 40
minLength: 1
Código único que identifica o veículo.

Channel*	integer($int32)
maximum: 16
minimum: 1
Código único que identifica o canal da câmera que deseja o vídeo ao vivo.
Possíveis canais: 1=Canal 1; 2=Canal 2; 3=Canal 3; 4=Canal 4; 5=Canal 5; 6=Canal 6; 7=Canal 7; 8=Canal 8; 9=Canal 9; 10=Canal 10; 11=Canal 11; 12=Canal 12; 13=Canal 13; 14=Canal 14; 15=Canal 15; 16=Canal 16;

}
VideoTelemetryResult{
URLStream	string
nullable: true
URL para consumo do streaming.

}`;

const blocks = input.split('}\n');
const schemas = {};

blocks.forEach(block => {
  const trimmed = block.trim();
  if (!trimmed) return;
  
  const headerMatch = trimmed.match(/^([A-Za-z0-9_]+)\s*\{/);
  if (!headerMatch) return;
  
  const schemaName = headerMatch[1];
  const body = trimmed.substring(headerMatch[0].length);
  
  const lines = body.split('\n');
  const fields = [];
  
  let currentField = null;
  
  lines.forEach(line => {
    line = line.trim();
    if (!line) return;
    
    const fieldMatch = line.match(/^([A-Za-z0-9_]+)(\*)?\s+(.+)$/);
    if (fieldMatch && !line.startsWith('nullable:') && !line.startsWith('maxLength:') && !line.startsWith('minLength:') && !line.startsWith('maximum:') && !line.startsWith('minimum:') && !line.startsWith('pattern:') && !line.startsWith('default:') && !line.startsWith('readOnly:')) {
      if (currentField) {
        fields.push(currentField);
      }
      currentField = {
        name: fieldMatch[1],
        required: !!fieldMatch[2],
        type: fieldMatch[3],
        description: ''
      };
    } else if (currentField) {
      if (!line.startsWith('nullable:') && !line.startsWith('maxLength:') && !line.startsWith('minLength:') && !line.startsWith('maximum:') && !line.startsWith('minimum:') && !line.startsWith('pattern:') && !line.startsWith('default:') && !line.startsWith('readOnly:')) {
        currentField.description = (currentField.description + ' ' + line).trim();
      }
    }
  });
  
  if (currentField) {
    fields.push(currentField);
  }
  
  schemas[schemaName] = {
    name: schemaName,
    fields: fields
  };
});

fs.writeFileSync('store/schemas.ts', `import { EndpointSchema } from '@/components/EndpointView';\n\nexport const sharedSchemas: Record<string, EndpointSchema> = ${JSON.stringify(schemas, null, 2)};\n`);
console.log('Schemas generated!');
