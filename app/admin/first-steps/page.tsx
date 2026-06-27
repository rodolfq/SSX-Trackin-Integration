'use client';
import { useFirstStepsStore, Step } from '@/store/firstStepsStore';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function FirstStepsAdmin() {
  const { steps, setSteps } = useFirstStepsStore();
  const [draftSteps, setDraftSteps] = useState<Step[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [imagePromptStep, setImagePromptStep] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftSteps(JSON.parse(JSON.stringify(steps)));
    setIsClient(true);
  }, [steps]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setSteps(draftSteps);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 400);
  };

  const addStep = () => {
    const newId = draftSteps.length > 0 ? Math.max(...draftSteps.map(s => s.id)) + 1 : 1;
    setDraftSteps([...draftSteps, { id: newId, title: '', description: '', contentMarkdown: '' }]);
  };

  const removeStep = (index: number) => {
    const newSteps = [...draftSteps];
    newSteps.splice(index, 1);
    // Re-number IDs to keep them sequential
    newSteps.forEach((step, i) => step.id = i + 1);
    setDraftSteps(newSteps);
  };

  const updateStep = (index: number, field: keyof Step, value: string) => {
    const newSteps = [...draftSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setDraftSteps(newSteps);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newSteps = [...draftSteps];
      const temp = newSteps[index];
      newSteps[index] = newSteps[index - 1];
      newSteps[index - 1] = temp;
      newSteps.forEach((step, i) => step.id = i + 1);
      setDraftSteps(newSteps);
    } else if (direction === 'down' && index < draftSteps.length - 1) {
      const newSteps = [...draftSteps];
      const temp = newSteps[index];
      newSteps[index] = newSteps[index + 1];
      newSteps[index + 1] = temp;
      newSteps.forEach((step, i) => step.id = i + 1);
      setDraftSteps(newSteps);
    }
  };

  if (!isClient) return null;

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para o Painel
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Editar First Steps</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addStep}
            className="flex items-center bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Passo
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
            ) : showSuccess ? (
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-300" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {showSuccess ? 'Salvo!' : 'Salvar'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {draftSteps.map((step, index) => (
          <div key={step.id} className="bg-card border border-border rounded-xl p-6 relative">
            <div className="absolute top-6 left-2 flex flex-col gap-1 items-center opacity-50">
              <button onClick={() => moveStep(index, 'up')} disabled={index === 0} className="hover:text-primary disabled:opacity-30">▲</button>
              <GripVertical className="w-4 h-4" />
              <button onClick={() => moveStep(index, 'down')} disabled={index === draftSteps.length - 1} className="hover:text-primary disabled:opacity-30">▼</button>
            </div>
            
            <div className="ml-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {step.id}
                  </span>
                  Passo {step.id}
                </h3>
                <button onClick={() => removeStep(index)} className="text-red-500 hover:text-red-400 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Título</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(index, 'title', e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Descrição Curta</label>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none text-foreground"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-muted-foreground">Conteúdo (Markdown suportado)</label>
                  <div className="flex gap-2">
                    {imagePromptStep === index ? (
                      <div className="flex items-center gap-2">
                        <input
                          autoFocus
                          type="text"
                          placeholder="Cole a URL (ex: github, imgur...)"
                          className="text-xs bg-background border border-border rounded px-2 py-1 w-64 text-foreground focus:outline-none focus:border-primary"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                               let url = imageUrl;
                               if (url.includes('github.com') && url.includes('/blob/')) {
                                 url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                               }
                               const imgMarkdown = `\n![Descrição da imagem](${url})\n`;
                               updateStep(index, 'contentMarkdown', step.contentMarkdown + imgMarkdown);
                               setImagePromptStep(null);
                               setImageUrl('');
                            } else if (e.key === 'Escape') {
                               setImagePromptStep(null);
                               setImageUrl('');
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            let url = imageUrl;
                            if (url.includes('github.com') && url.includes('/blob/')) {
                               url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                            }
                            const imgMarkdown = `\n![Descrição da imagem](${url})\n`;
                            updateStep(index, 'contentMarkdown', step.contentMarkdown + imgMarkdown);
                            setImagePromptStep(null);
                            setImageUrl('');
                          }}
                          className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-2 py-1.5 rounded font-medium transition-colors"
                        >
                          Inserir
                        </button>
                        <button
                          onClick={() => {
                            setImagePromptStep(null);
                            setImageUrl('');
                          }}
                          className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-2 py-1.5 rounded font-medium transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setImagePromptStep(index)}
                        className="text-xs flex items-center bg-secondary/50 hover:bg-secondary text-secondary-foreground px-2 py-1 rounded transition-colors"
                      >
                        <ImageIcon className="w-3 h-3 mr-1" />
                        Inserir Imagem (Por Link)
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={step.contentMarkdown}
                  onChange={(e) => updateStep(index, 'contentMarkdown', e.target.value)}
                  rows={8}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-mono text-foreground"
                  placeholder="Você pode adicionar imagens usando ![alt](url), links [texto](url) e blocos de código ```..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
