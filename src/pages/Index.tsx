import { useState, useCallback } from "react";
import { Sparkles, MessageSquare, FileText, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { DocumentUpload } from "@/components/DocumentUpload";
import { SummaryPanel } from "@/components/SummaryPanel";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "success" | "error";
  content?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFilesUploaded = useCallback((files: UploadedFile[]) => {
    setUploadedFiles((prev) => {
      const newFiles = files.filter((f) => !prev.some((p) => p.id === f.id));
      if (newFiles.length > 0) {
        return [...prev, ...newFiles];
      }
      // Update existing files
      return prev.map((p) => {
        const updated = files.find((f) => f.id === p.id);
        return updated || p;
      });
    });
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    if (uploadedFiles.length <= 1) {
      setSummary(null);
      setMessages([]);
    }
  }, [uploadedFiles.length]);

  const generateSummary = useCallback(async () => {
    const successfulFiles = uploadedFiles.filter((f) => f.status === "success" && f.content);
    
    if (successfulFiles.length === 0) {
      toast.error("Please upload at least one document first");
      return;
    }

    setIsGeneratingSummary(true);
    setActiveTab("summary");

    // Simulate AI processing (in production, this would call an AI API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      const combinedContent = successfulFiles
        .map((f) => f.content)
        .join("\n\n---\n\n");

      // Mock summary generation
      const mockSummary = generateMockSummary(combinedContent, successfulFiles.length);
      setSummary(mockSummary);
      toast.success("Summary generated successfully!");
    } catch (error) {
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setIsGeneratingSummary(false);
    }
  }, [uploadedFiles]);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsChatLoading(true);

    // Simulate AI response (in production, this would call an AI API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: generateMockResponse(content, summary),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsChatLoading(false);
    }
  }, [summary]);

  const successfulFilesCount = uploadedFiles.filter((f) => f.status === "success").length;
  const canGenerate = successfulFilesCount > 0 && !isGeneratingSummary;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Understand Your Medical Records
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your medical documents and let our AI create clear, comprehensive summaries. 
            Ask questions to better understand your health information.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Upload & Summary */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-card shadow-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-accent p-2">
                    <FileText className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Medical Documents</h3>
                </div>
                
                <Button
                  onClick={generateSummary}
                  disabled={!canGenerate}
                  variant="hero"
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Summary
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <DocumentUpload
                onFilesUploaded={handleFilesUploaded}
                uploadedFiles={uploadedFiles}
                onRemoveFile={handleRemoveFile}
              />
            </div>

            {/* Summary Card */}
            <div className={cn(
              "rounded-2xl bg-card shadow-card overflow-hidden transition-all duration-300",
              (summary || isGeneratingSummary) ? "min-h-[400px]" : "min-h-[200px]"
            )}>
              <SummaryPanel
                summary={summary}
                isGenerating={isGeneratingSummary}
                documentCount={successfulFilesCount}
              />
            </div>
          </div>

          {/* Right Panel - Chat */}
          <div className="rounded-2xl bg-card shadow-card overflow-hidden animate-slide-up h-[calc(100vh-220px)] min-h-[600px]">
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <div className="rounded-xl bg-primary/10 p-2">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask questions about your records</p>
              </div>
            </div>
            
            <div className="h-[calc(100%-73px)]">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isChatLoading}
                disabled={!summary}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Mock data generators (replace with actual AI calls)
function generateMockSummary(content: string, fileCount: number): string {
  return `Based on the analysis of ${fileCount} medical document${fileCount !== 1 ? 's' : ''}, here is a comprehensive summary:

**Patient Overview:**
The documents indicate routine medical care with several key health indicators being monitored. The patient appears to be in generally good health with some areas requiring ongoing attention.

**Key Findings:**
• Regular vital signs monitoring shows stable readings
• Blood pressure and heart rate within normal ranges
• Routine lab work has been conducted with results pending review

**Recommendations:**
• Continue current medication regimen as prescribed
• Schedule follow-up appointment in 3-6 months
• Maintain healthy lifestyle habits including regular exercise

**Notes:**
This summary is generated for informational purposes. Please consult with your healthcare provider for personalized medical advice.`;
}

function generateMockResponse(question: string, summary: string | null): string {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("diagnosis") || lowerQuestion.includes("diagnoses")) {
    return "Based on the uploaded documents, I can see references to routine health monitoring. The records indicate ongoing wellness care rather than specific diagnostic findings. For detailed diagnostic information, I recommend consulting directly with your healthcare provider.";
  }
  
  if (lowerQuestion.includes("medication") || lowerQuestion.includes("medicine")) {
    return "The documents reference standard care protocols. To get accurate information about specific medications mentioned in your records, please review the original documents or consult with your prescribing physician.";
  }
  
  if (lowerQuestion.includes("test") || lowerQuestion.includes("lab")) {
    return "Your medical records indicate that routine laboratory tests have been ordered or conducted. Common tests mentioned in similar records include complete blood count (CBC), metabolic panels, and lipid profiles. For specific test results and their interpretations, please consult your healthcare provider.";
  }
  
  if (lowerQuestion.includes("treatment") || lowerQuestion.includes("plan")) {
    return "Based on the summary, the treatment approach appears to focus on preventive care and monitoring. Key elements include:\n\n• Regular check-ups\n• Lifestyle management\n• Ongoing health monitoring\n\nFor a detailed treatment plan, please discuss with your healthcare team.";
  }
  
  return `Thank you for your question about "${question}". Based on the medical records you've uploaded, I can provide general insights. However, for specific medical advice or detailed interpretations, I recommend consulting with your healthcare provider who has access to your complete medical history.

Is there a specific aspect of the summary you'd like me to clarify?`;
}

export default Index;
