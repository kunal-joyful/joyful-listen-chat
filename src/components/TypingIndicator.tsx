import { Smile } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <Smile className="w-5 h-5 text-primary-foreground" />
      </div>

      {/* Typing bubble */}
      <div className="bg-card text-foreground shadow-sm rounded-[18px_18px_18px_4px] px-5 py-3">
        <div className="flex gap-1.5">
          <div
            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing-dot"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing-dot"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing-dot"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}
