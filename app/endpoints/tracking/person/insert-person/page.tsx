import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Insert Person"
        method="POST"
        path="/Tracking/Person/InsertPerson"
        description="Método utilizado para inserir uma pessoa."
        defaultPayload={{
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
        }}
        schema={{
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
        }}
        presets={[
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
        ]}
      />
    </div>
  );
}
