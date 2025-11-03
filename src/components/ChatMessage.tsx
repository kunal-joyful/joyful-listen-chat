import { Smile } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  // Format content to support **bold** markdown
  const formatContent = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={`flex gap-3 animate-fade-in ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      {/* Avatar for assistant */}
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Smile className="w-5 h-5 text-primary-foreground" />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[65%] px-5 py-3 ${
          isAssistant
            ? "bg-card text-foreground shadow-sm rounded-[18px_18px_18px_4px]"
            : "bg-primary text-primary-foreground rounded-[18px_18px_4px_18px]"
        }`}
      >
        <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {formatContent(content)}
        </div>
      </div>
    </div>
  );
}
