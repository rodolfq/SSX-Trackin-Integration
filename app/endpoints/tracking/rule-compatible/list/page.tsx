import { EndpointView } from '@/components/EndpointView';

export default function Page() {
  return (
    <div className="h-full">
      <EndpointView
        title="Rule Compatible List"
        method="POST"
        path="/Tracking/RuleCompatible/List"
        description="Método utlizado para listar as regras compátíveis com rastreador/unidades rastreadas."
      />
    </div>
  );
}
