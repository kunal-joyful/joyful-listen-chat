interface PromptCardProps {
  emoji: string;
  title: string;
  prompt: string;
  onClick: () => void;
}

export function PromptCard({ emoji, title, prompt, onClick }: PromptCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-[300px] bg-card border border-border rounded-xl p-5 text-left transition-all duration-200 hover:shadow-lg hover:border-primary hover:-translate-y-1 active:scale-95"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="font-semibold text-foreground mb-2 text-base">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{prompt}</p>
    </button>
  );
}
