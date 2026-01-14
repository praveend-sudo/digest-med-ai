import { FileText, Sparkles, Clock, User, Activity, Pill } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryPanelProps {
  summary: string | null;
  isGenerating: boolean;
  documentCount: number;
}

export function SummaryPanel({ summary, isGenerating, documentCount }: SummaryPanelProps) {
  if (!summary && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="rounded-full bg-accent p-6 mb-4">
          <FileText className="h-10 w-10 text-accent-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No Summary Yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Upload your medical documents and click "Generate Summary" to get an AI-powered analysis.
        </p>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="relative">
          <div className="rounded-full bg-primary/10 p-6 mb-4 animate-pulse-soft">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Analyzing Documents...
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Our AI is reviewing {documentCount} document{documentCount !== 1 ? "s" : ""} to create a comprehensive summary.
        </p>
      </div>
    );
  }

  // Parse the summary into sections
  const sections = parseSummary(summary);

  return (
    <div className="h-full overflow-auto p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="rounded-full bg-primary/10 p-2">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Medical Summary</h3>
          <p className="text-xs text-muted-foreground">
            Based on {documentCount} uploaded document{documentCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {sections.map((section, index) => (
        <SummarySection key={index} section={section} />
      ))}
    </div>
  );
}

interface Section {
  icon: React.ReactNode;
  title: string;
  content: string;
  type: "patient" | "conditions" | "medications" | "timeline" | "general";
}

function parseSummary(summary: string | null): Section[] {
  if (!summary) return [];

  // For now, return the entire summary as a general section
  // In a real app, you'd parse structured data from the AI response
  return [
    {
      icon: <FileText className="h-4 w-4" />,
      title: "Summary Overview",
      content: summary,
      type: "general",
    },
  ];
}

function SummarySection({ section }: { section: Section }) {
  const iconBgClass = {
    patient: "bg-blue-100 text-blue-600",
    conditions: "bg-red-100 text-red-600",
    medications: "bg-green-100 text-green-600",
    timeline: "bg-amber-100 text-amber-600",
    general: "bg-accent text-accent-foreground",
  };

  return (
    <div className="rounded-xl bg-card p-4 shadow-soft space-y-3">
      <div className="flex items-center gap-2">
        <div className={cn("rounded-lg p-2", iconBgClass[section.type])}>
          {section.icon}
        </div>
        <h4 className="font-medium text-foreground">{section.title}</h4>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {section.content}
      </div>
    </div>
  );
}
