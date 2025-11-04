import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ChatInput } from "@/components/ChatInput";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        response = "Credit card complaints on social media have increased by 15% this month, with 127 mentions compared to 110 last month. The surge is primarily driven by three interconnected issues affecting different customer segments.\n\n[CHART:Credit Card Complaint Distribution]\n\n**High interest rates** account for 45% of all complaints (57 mentions). Customers are particularly frustrated with recent APR increases that were implemented without sufficient advance notice. The average rate jumped from 18.9% to 21.3%, and many customers feel blindsided by the change. Posts on Twitter and Facebook show customers comparing rates with competitors and expressing intent to switch cards.\n\n**Delayed fraud resolution** represents 30% of complaints (38 mentions). What used to take an average of 3 days now takes 7 days, creating significant anxiety for affected customers. The delay stems from a recent process change that added an extra verification layer, but the increased security hasn't been properly communicated. Customers report feeling abandoned during the waiting period, with inadequate updates on case status.\n\n**Confusing fee structures** make up 25% of complaints (32 mentions). Three new fee categories were introduced last quarter—international transaction fees, balance transfer fees, and expedited payment fees—but the documentation is buried in terms and conditions. Customers discover these fees only after being charged, leading to surprise and frustration.\n\nThe root cause connects to a broader issue: the credit card division rolled out multiple changes simultaneously without coordinated customer communication. Each change individually might have been manageable, but together they've created a perception that the bank is becoming less customer-friendly and more profit-focused.\n\nImmediate action should focus on the fraud resolution process, as this creates the most acute customer stress. Streamlining the verification process or adding proactive status updates could significantly reduce complaints. For interest rates, consider a customer education campaign explaining rate factors and offering rate review consultations. For fees, create a simple one-page summary document and proactively email it to all cardholders.\n\nWould you like me to break down complaints by customer segment (premium vs. standard cardholders), analyze competitor positioning on these issues, or dive deeper into the fraud resolution timeline to identify specific bottlenecks?";
        
        chartData = [
          { name: "High Interest Rates", value: 45, fill: "#FE5C66" },
          { name: "Fraud Resolution", value: 30, fill: "#FF8A91" },
          { name: "Fee Structures", value: 25, fill: "#FFB8BE" }
        ];
        chartType = "donut";
      } else if (userMessage.toLowerCase().includes("compare")) {
        response = "Comparing August to September reveals a 13% decrease in overall complaint volume, dropping from 1,247 to 1,089 complaints across all channels. This improvement is encouraging, but the underlying patterns tell a more nuanced story about what's working and what needs attention.\n\n[CHART:Monthly Complaint Volume Comparison]\n\n**Credit card issues** saw the most dramatic improvement, declining 20% from 248 to 198 complaints. This directly correlates with policy updates the credit card team implemented in late August, specifically addressing interest rate transparency and fee disclosure. The team sent proactive emails to all cardholders explaining upcoming changes and offering personalized rate reviews. This approach successfully defused potential complaints before they materialized. Social media sentiment for credit cards also improved from 62% negative to 48% negative, indicating the messaging resonated.\n\n**Mobile banking complaints** moved in the opposite direction, increasing 8% from 156 to 168 complaints. This uptick is directly tied to the September app update (version 4.2) that redesigned the navigation menu. While the new design follows modern UI patterns, long-time users are frustrated by the changed location of frequently-used features like bill pay and fund transfers. The App Store rating dropped from 4.3 to 3.9 stars, with 73% of recent negative reviews mentioning the navigation changes. The development team is already working on a hybrid approach that allows users to choose between classic and modern layouts.\n\n**ATM services** decreased slightly by 5% from 189 to 180 complaints. The improvement is modest but consistent with the previous three-month trend. It reflects ongoing maintenance upgrades across the ATM network, reducing out-of-service incidents. Customer mentions of \"ATM not working\" dropped 12% on social media, though complaints about ATM locations and fees remain stable.\n\nThe net positive trend masks an important consideration: complaint reduction doesn't automatically equal satisfaction increase. Exit surveys show that while fewer customers are actively complaining, engagement metrics (app logins, card usage) remain flat. Some customers may be quietly disengaging rather than voicing concerns.\n\nThe credit card team's success offers a blueprint for other divisions: proactive communication, clear explanation of changes, and giving customers agency (like the rate review option) significantly reduces complaint volume. The mobile banking situation demonstrates the risk of making changes without adequate user testing—even technically superior designs can frustrate users if they disrupt established workflows.\n\nPrioritize rolling out the mobile banking navigation fix within the next two weeks to prevent further rating damage. Continue monitoring credit card metrics weekly to ensure the improvement sustains, and consider applying their communication approach to other product launches. For ATM services, the gradual improvement suggests staying the course with current maintenance plans.\n\nShould we dive deeper into the mobile banking complaints to identify the top 5 most-missed features, track credit card trends by week to spot any early warning signs, or compare these results against industry benchmarks to understand our relative performance?";
        
        chartData = [
          { month: "August", complaints: 1247 },
          { month: "September", complaints: 1089 }
        ];
        chartType = "bar";
      } else {
        response = "I can help you analyze customer feedback across multiple channels—social media, call center transcripts, online reviews, surveys, and in-branch feedback—to identify actionable insights that improve customer satisfaction and reduce operational friction.\n\nMy capabilities span several key areas. For **social media sentiment tracking**, I monitor brand mentions across Twitter, Facebook, Instagram, and LinkedIn in real-time, analyzing both volume and tone. I can identify emerging issues within hours, track sentiment trends over time, and compare your brand positioning against competitors. This helps you respond proactively before isolated complaints become trending topics.\n\nFor **complaint pattern analysis**, I examine thousands of customer interactions to find recurring themes that might not be obvious from individual cases. I identify root causes by connecting complaints across different touchpoints—for example, linking social media frustration about fees to call center inquiries about statements to online review mentions of billing surprises. This reveals systemic issues rather than isolated incidents.\n\nThrough **multi-channel feedback aggregation**, I provide a unified view that breaks down silos between departments. A customer's journey might start with a social media question, continue with a call center interaction, and end with an online review—I connect these dots to show the complete picture. This prevents the common problem where each channel thinks they're handling isolated issues when they're actually seeing different symptoms of the same underlying problem.\n\nMy **trend identification and prediction** capabilities use historical patterns to forecast emerging issues before they peak. By analyzing complaint velocity (how quickly mentions are increasing), sentiment shifts (when tone changes from neutral to negative), and topic clustering (when previously separate issues start appearing together), I can alert you to brewing problems 5-7 days before they reach critical mass.\n\nI also track customer segments differently—premium customers, new customers, long-term customers, regional clusters—because they experience and express issues differently. A problem that barely registers with young urban customers might be a major issue for suburban families.\n\nTo get started, you might ask about specific complaint trends (\"What are the top issues this month?\"), channel comparisons (\"How does social media sentiment compare to call center feedback?\"), product-specific analysis (\"What's happening with mobile banking reviews?\"), time-based patterns (\"How have complaints changed since the last product update?\"), or competitive positioning (\"How do our complaint rates compare to industry benchmarks?\").\n\nWhat specific aspect of customer feedback would you like to explore first? I can analyze current trends, dig into historical patterns, compare across time periods or channels, or focus on a particular product or customer segment.";
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
        <header className="h-16 border-b border-border bg-card px-10 flex items-center justify-between">
          <h2 className="text-lg font-medium text-foreground">
            {currentTitle}
          </h2>
          <ThemeToggle />
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
