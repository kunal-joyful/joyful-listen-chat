import { useState } from "react";
import { Expand } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Dialog, DialogContent } from "./ui/dialog";
import logo from "@/assets/joyful-logo.svg";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  chartData?: any;
  chartType?: "line" | "bar" | "donut";
}

export function ChatMessage({ role, content, chartData, chartType }: ChatMessageProps) {
  const [expandedChart, setExpandedChart] = useState(false);
  const isAssistant = role === "assistant";

  // Format content to support **bold** and ## headings markdown
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
      if (line.startsWith('## ')) {
        return (
          <h3 key={lineIndex} className="text-lg font-semibold mt-4 mb-2 text-primary">
            {line.slice(3)}
          </h3>
        );
      }
      
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formatted = parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      });
      
      return (
        <div key={lineIndex} className="mb-1">
          {formatted}
        </div>
      );
    });
  };

  const renderChart = (fullSize = false) => {
    if (!chartData || !chartType) return null;

    const height = fullSize ? 400 : 200;

    if (chartType === "donut") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={fullSize ? 80 : 40}
              outerRadius={fullSize ? 140 : 70}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="complaints" fill="#FE5C66" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <>
      <div
        className={`flex gap-3 animate-fade-in ${
          isAssistant ? "justify-start" : "justify-end"
        }`}
      >
        {/* Avatar for assistant */}
        {isAssistant && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Assistant" className="w-full h-full object-cover" />
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
          <div className="text-[15px] leading-relaxed break-words">
            {formatContent(content)}
            
            {/* Chart visualization */}
            {chartData && chartType && (
              <div className="mt-4 bg-background/50 rounded-lg p-4 relative">
                {renderChart()}
                <button
                  onClick={() => setExpandedChart(true)}
                  className="absolute top-2 right-2 p-2 bg-card rounded-lg shadow-sm hover:bg-muted transition-colors"
                  aria-label="Expand chart"
                >
                  <Expand className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded chart dialog */}
      <Dialog open={expandedChart} onOpenChange={setExpandedChart}>
        <DialogContent className="max-w-3xl">
          <div className="p-4">
            {renderChart(true)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
