import { useState } from "react";
import { Expand } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";
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

  // Format content and insert charts inline where [CHART:title] markers appear
  const formatContent = (text: string) => {
    const sections: JSX.Element[] = [];
    const parts = text.split(/(\[CHART:.*?\])/g);
    
    parts.forEach((part, partIndex) => {
      // Check if this is a chart marker
      const chartMatch = part.match(/\[CHART:(.*?)\]/);
      if (chartMatch) {
        const chartTitle = chartMatch[1];
        sections.push(
          <div key={`chart-${partIndex}`} className="my-6 bg-card/50 rounded-lg p-4 border border-border">
            <h4 className="text-sm font-semibold mb-3 text-foreground">{chartTitle}</h4>
            {renderChart(false)}
            <button
              onClick={() => setExpandedChart(true)}
              className="mt-2 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Expand chart"
            >
              <Expand className="w-3 h-3" />
              Click to expand
            </button>
          </div>
        );
        return;
      }
      
      // Regular text content
      if (!part.trim()) return;
      
      const lines = part.split('\n');
      const lineElements = lines.map((line, lineIndex) => {
        if (!line.trim()) return <br key={lineIndex} />;
        
        const textParts = line.split(/(\*\*.*?\*\*)/g);
        const formatted = textParts.map((textPart, index) => {
          if (textPart.startsWith("**") && textPart.endsWith("**")) {
            return (
              <strong key={index} className="font-semibold">
                {textPart.slice(2, -2)}
              </strong>
            );
          }
          return <span key={index}>{textPart}</span>;
        });
        
        return (
          <div key={lineIndex} className="mb-1">
            {formatted}
          </div>
        );
      });
      
      sections.push(
        <div key={`text-${partIndex}`}>
          {lineElements}
        </div>
      );
    });
    
    return sections;
  };

  const renderChart = (fullSize = false) => {
    if (!chartData || !chartType) return null;

    const height = fullSize ? 400 : 250;

    if (chartType === "donut") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={fullSize ? 80 : 50}
              outerRadius={fullSize ? 140 : 90}
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={true}
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip />
            <Bar dataKey="complaints" fill="#FE5C66" label={{ position: 'top' }} />
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
          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Assistant" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`max-w-[65%] px-5 py-3 ${
            isAssistant
              ? "bg-card text-foreground shadow-sm rounded-[4px_18px_18px_18px]"
              : "bg-primary text-primary-foreground rounded-[18px_18px_4px_18px]"
          }`}
        >
          <div className="text-[15px] leading-relaxed break-words">
            {formatContent(content)}
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
