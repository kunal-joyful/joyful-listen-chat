import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ChatInput } from "@/components/ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE =
  "Hello! I'm Joyful Listen. Ask me anything about your customer feedback, complaints, or social media sentiment. I can analyze patterns, create dashboards, and provide actionable insights.";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      let response = "";
      
      // Simple response logic based on keywords
      if (userMessage.toLowerCase().includes("credit card")) {
        response = "Based on recent social media analysis, **credit card complaints** have increased by 15% this month. The main issues are:\n\n• High interest rates (45% of mentions)\n• Delayed fraud resolution (30%)\n• Confusing fee structures (25%)\n\nWould you like me to create a detailed dashboard for these insights?";
      } else if (userMessage.toLowerCase().includes("compare")) {
        response = "Comparing **August vs September** complaints:\n\n**August:** 1,247 total complaints\n**September:** 1,089 total complaints (-13%)\n\nKey changes:\n• Credit card issues: ↓ 20%\n• Mobile banking: ↑ 8%\n• ATM services: ↓ 5%\n\nThe overall improvement is driven by the credit card team's recent policy updates.";
      } else {
        response = "I can help you analyze customer feedback data. I have access to:\n\n• Social media sentiment tracking\n• Complaint pattern analysis\n• Multi-channel feedback aggregation\n• Trend identification and forecasting\n\nWhat specific insights would you like to explore?";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (message: string) => {
    if (showWelcome) {
      setShowWelcome(false);
    }
    
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    simulateResponse(message);
  };

  const handleNewChat = () => {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    setShowWelcome(true);
    setIsTyping(false);
  };

  const handlePromptClick = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="flex h-screen w-full max-w-[1400px] mx-auto bg-background">
      <Sidebar onNewChat={handleNewChat} />
      
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-10 flex items-center">
          <h2 className="text-lg font-medium text-foreground">
            {showWelcome ? "New Conversation" : "Joyful Listen"}
          </h2>
        </header>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto"
        >
          {showWelcome && messages.length === 1 ? (
            <WelcomeSection onPromptClick={handlePromptClick} />
          ) : (
            <div className="px-10 py-8 space-y-6 max-w-[900px] mx-auto">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </main>
    </div>
  );
};

export default Index;
