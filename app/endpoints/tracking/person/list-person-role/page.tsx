import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="List Person Role"
        method="POST"
        path="/Tracking/Person/ListPersonRole"
        description="Método utlizado para listar os cargos dos funcionários."
        defaultPayload={{}}
        schema={{
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
        }}
      />
    </div>
  );
}
