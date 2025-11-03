import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  onNewChat: () => void;
}

export function Sidebar({ onNewChat }: SidebarProps) {
  return (
    <aside className="w-[280px] h-screen bg-card border-r border-border flex flex-col p-4">
      {/* Logo */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Listen</h1>
      </div>

      {/* New Chat Button */}
      <Button
        onClick={onNewChat}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium mb-4 transition-all duration-200 active:scale-95"
      >
        <Plus className="w-5 h-5 mr-2" />
        New Chat
      </Button>

      {/* Chat History - placeholder for future */}
      <div className="flex-1 overflow-y-auto">
        <p className="text-sm text-muted-foreground px-2">No previous chats</p>
      </div>
    </aside>
  );
}
