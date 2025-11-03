import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatInput } from "@/components/ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
  chartData?: any;
  chartType?: "line" | "bar" | "donut";
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const WELCOME_MESSAGE =
  "Hello! I'm Joyful Listen. Ask me anything about your customer feedback, complaints, or social media sentiment. I can analyze patterns, create dashboards, and provide actionable insights.";

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateTitle = (firstMessage: string): string => {
    const words = firstMessage.split(' ').slice(0, 5).join(' ');
    return words.length > 40 ? words.substring(0, 37) + '...' : words;
  };

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = "";
      let chartData = null;
      let chartType: "line" | "bar" | "donut" | undefined = undefined;
      
      if (userMessage.toLowerCase().includes("credit card")) {
        response = "## Summary\nCredit card complaints have increased by 15% this month. The root cause is a combination of rising interest rates, slower fraud resolution times, and unclear fee structures that are confusing customers.\n\n## Key Insights\n• **High interest rates** (45% of mentions) - Customers are frustrated with recent APR increases\n• **Delayed fraud resolution** (30%) - Average resolution time increased from 3 to 7 days\n• **Confusing fee structures** (25%) - New fee categories lack clear documentation\n\n## Recommendation\nPrioritize fraud resolution process improvements and create clearer fee communication materials. Consider a customer education campaign about interest rate factors.\n\n## Follow-up\nWould you like me to break down complaints by customer segment or compare with industry benchmarks?";
        
        chartData = [
          { name: "High Interest Rates", value: 45, fill: "#FE5C66" },
          { name: "Fraud Resolution", value: 30, fill: "#FF8A91" },
          { name: "Fee Structures", value: 25, fill: "#FFB8BE" }
        ];
        chartType = "donut";
      } else if (userMessage.toLowerCase().includes("compare")) {
        response = "## Summary\nComplaint volume decreased by 13% from August to September. The primary driver was the credit card team's policy updates that addressed key customer pain points around interest rates and fees.\n\n## Key Changes\n• **Credit card issues**: Down 20% (248 → 198 complaints)\n• **Mobile banking**: Up 8% (156 → 168 complaints)  \n• **ATM services**: Down 5% (189 → 180 complaints)\n\n## Why It Matters\nThe credit card improvement offset increases in mobile banking complaints, resulting in net positive customer sentiment. Mobile banking issues are related to a recent app update.\n\n## Next Steps\nPrioritize mobile banking UX improvements and monitor credit card trends to ensure sustained improvement.\n\n## Follow-up\nShould we dive deeper into the mobile banking complaints or track weekly credit card trends?";
        
        chartData = [
          { month: "August", complaints: 1247 },
          { month: "September", complaints: 1089 }
        ];
        chartType = "bar";
      } else {
        response = "## Summary\nI can help you analyze customer feedback across multiple channels and identify actionable insights to improve customer satisfaction.\n\n## Available Capabilities\n• **Social media sentiment tracking** - Monitor brand mentions and sentiment trends\n• **Complaint pattern analysis** - Identify recurring issues and root causes\n• **Multi-channel feedback aggregation** - Unified view across all touchpoints\n• **Trend identification** - Predictive analytics for emerging issues\n\n## How to Get Started\nAsk me about specific topics like complaint trends, channel comparisons, or sentiment analysis.\n\n## Follow-up\nWhat specific aspect of customer feedback would you like to explore first?";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response, chartData, chartType }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (message: string) => {
    const newMessage: Message = { role: "user", content: message };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Auto-generate title for new conversation after first user message
    if (!activeConversationId && messages.length === 1) {
      const title = generateTitle(message);
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title,
        messages: updatedMessages,
        createdAt: new Date()
      };
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(newConversation.id);
    } else if (activeConversationId) {
      // Update existing conversation
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: updatedMessages }
            : conv
        )
      );
    }
    
    simulateResponse(message);
  };

  const handleNewChat = () => {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    setActiveConversationId(null);
    setIsTyping(false);
  };

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation) {
      setMessages(conversation.messages);
      setActiveConversationId(conversationId);
    }
  };

  const currentTitle = activeConversationId
    ? conversations.find((c) => c.id === activeConversationId)?.title || "Joyful Listen"
    : "New Conversation";

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar 
        onNewChat={handleNewChat}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
      />
      
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-10 flex items-center">
          <h2 className="text-lg font-medium text-foreground">
            {currentTitle}
          </h2>
        </header>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="px-10 py-8 space-y-6 max-w-[900px] mx-auto">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
                chartData={message.chartData}
                chartType={message.chartType}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </main>
    </div>
  );
};

export default Index;
