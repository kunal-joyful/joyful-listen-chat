import { PromptCard } from "./PromptCard";

interface WelcomeSectionProps {
  onPromptClick: (prompt: string) => void;
}

export function WelcomeSection({ onPromptClick }: WelcomeSectionProps) {
  const prompts = [
    {
      emoji: "💳",
      title: "Social Media Analysis",
      prompt: "What's happening with credit card complaints on social media this month?",
    },
    {
      emoji: "📊",
      title: "Trend Comparison",
      prompt: "Compare August and September complaints across all channels. What changed?",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-10 animate-fade-in">
      {/* Welcome text */}
      <div className="text-center mb-10">
        <h2 className="text-[32px] font-semibold text-foreground mb-3">
          Welcome to Joyful Listen
        </h2>
        <p className="text-muted-foreground text-base">
          Ask questions about customer feedback and get instant insights
        </p>
      </div>

      {/* Section title */}
      <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-6 uppercase">
        Try Asking About:
      </p>

      {/* Prompt cards */}
      <div className="grid grid-cols-2 gap-5">
        {prompts.map((prompt, index) => (
          <PromptCard
            key={index}
            emoji={prompt.emoji}
            title={prompt.title}
            prompt={prompt.prompt}
            onClick={() => onPromptClick(prompt.prompt)}
          />
        ))}
      </div>
    </div>
  );
}
