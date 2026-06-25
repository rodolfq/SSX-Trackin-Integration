import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="List Rule Of Logged User"
        method="POST"
        path="/Tracking/RuleList/ListRuleOfLoggedUser"
        description="Método utlizado para listar as regras do usuário logado."
      />
    </div>
  );
}
