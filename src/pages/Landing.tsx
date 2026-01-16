import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  MessageSquare, 
  Shield, 
  Zap, 
  Lock, 
  Brain,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: FileText,
      title: "Multi-Document Upload",
      description: "Upload multiple medical records, lab results, and clinical notes simultaneously with drag-and-drop ease."
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning extracts key insights, diagnoses, medications, and treatment plans automatically."
    },
    {
      icon: MessageSquare,
      title: "Interactive Q&A",
      description: "Ask natural language questions about your medical history and get instant, accurate answers."
    },
    {
      icon: Zap,
      title: "Instant Summaries",
      description: "Transform complex medical jargon into clear, actionable health summaries in seconds."
    }
  ];

  const trustBadges = [
    { icon: Shield, label: "HIPAA Compliant" },
    { icon: Lock, label: "256-bit Encryption" },
    { icon: CheckCircle2, label: "SOC 2 Certified" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-50 via-background to-accent/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-medical-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-medical-100/40 rounded-full blur-3xl animate-float" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-500 to-medical-600 flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-medical-600 to-medical-800 bg-clip-text text-transparent">
              MedRecord AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              About
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Security
            </Button>
            <Button 
              onClick={() => navigate("/app")}
              className="bg-medical-600 hover:bg-medical-700 text-white shadow-soft"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-50 border border-medical-200 mb-8">
              <Shield className="w-4 h-4 text-medical-600" />
              <span className="text-sm font-medium text-medical-700">Trusted by 10,000+ Healthcare Professionals</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Your Medical Records,</span>
              <br />
              <span className="bg-gradient-to-r from-medical-500 via-medical-600 to-accent bg-clip-text text-transparent">
                Brilliantly Simplified
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Transform complex medical documents into clear, actionable insights with AI-powered summarization and interactive Q&A.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => navigate("/app")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative px-8 py-6 text-lg bg-gradient-to-r from-medical-500 to-medical-600 hover:from-medical-600 hover:to-medical-700 text-white shadow-elevated transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Start Summarizing
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-2 hover:bg-medical-50"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustBadges.map((badge, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <badge.icon className="w-5 h-5 text-medical-500" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative max-w-5xl mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-medical-500/20 to-transparent rounded-3xl blur-2xl" />
              
              {/* Main Card */}
              <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border shadow-elevated p-8 overflow-hidden">
                {/* Mock Interface Preview */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Upload Zone */}
                  <div className="bg-background/60 rounded-2xl p-6 border border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-medical-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-medical-600" />
                      </div>
                      <span className="font-semibold text-foreground">Documents</span>
                    </div>
                    <div className="space-y-2">
                      {["Lab Results.pdf", "MRI Report.pdf", "Prescription.pdf"].map((file, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-medical-50 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="text-sm text-foreground truncate">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Preview */}
                  <div className="bg-background/60 rounded-2xl p-6 border border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-accent/50 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-medical-600" />
                      </div>
                      <span className="font-semibold text-foreground">AI Summary</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-medical-100 rounded-full w-full" />
                      <div className="h-3 bg-medical-100 rounded-full w-4/5" />
                      <div className="h-3 bg-medical-100 rounded-full w-5/6" />
                      <div className="h-3 bg-medical-100 rounded-full w-3/4" />
                    </div>
                  </div>

                  {/* Chat Preview */}
                  <div className="bg-background/60 rounded-2xl p-6 border border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-medical-100 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-medical-600" />
                      </div>
                      <span className="font-semibold text-foreground">Ask AI</span>
                    </div>
                    <div className="space-y-3">
                      <div className="p-2 bg-medical-50 rounded-lg rounded-bl-none">
                        <span className="text-xs text-muted-foreground">What medications am I taking?</span>
                      </div>
                      <div className="p-2 bg-medical-100 rounded-lg rounded-br-none ml-4">
                        <span className="text-xs text-foreground">Based on your records...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-medical-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make understanding your medical history effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-medical-300 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-medical-100 to-medical-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-medical-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-medical-500/20 via-accent/20 to-medical-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-card rounded-3xl border border-border p-12 shadow-elevated">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Simplify Your Medical Records?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of users who trust MedRecord AI to understand their health better.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/app")}
                className="px-10 py-6 text-lg bg-gradient-to-r from-medical-500 to-medical-600 hover:from-medical-600 hover:to-medical-700 text-white shadow-glow"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-medical-500" />
            <span className="font-semibold text-foreground">MedRecord AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 MedRecord AI. All rights reserved. Your data is secure and private.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
