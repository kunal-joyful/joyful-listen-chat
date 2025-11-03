import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/joyful-logo.svg";

interface Conversation {
  id: string;
  title: string;
  messages: any[];
  createdAt: Date;
}

interface SidebarProps {
  onNewChat: () => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function Sidebar({ 
  onNewChat, 
  conversations, 
  activeConversationId, 
  onSelectConversation 
}: SidebarProps) {
  return (
    <aside className="w-[280px] h-screen bg-card border-r border-border flex flex-col p-4">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3">
        <img src={logo} alt="Joyful Listen Logo" className="w-10 h-10" />
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

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <p className="text-sm text-muted-foreground px-2">No previous chats</p>
        ) : (
          <div className="space-y-1">
            <p className="text-xs uppercase text-muted-foreground px-2 mb-2 font-medium">
              Previous Chats
            </p>
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeConversationId === conversation.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {conversation.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
