import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-card px-10 py-6">
      <div className="max-w-[900px] mx-auto flex gap-3 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about customer feedback..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-input border-2 border-border rounded-xl px-5 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            minHeight: "52px",
            maxHeight: "150px",
            overflowY: input.length > 100 ? "auto" : "hidden",
          }}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          size="icon"
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 disabled:bg-secondary disabled:text-secondary-foreground hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
