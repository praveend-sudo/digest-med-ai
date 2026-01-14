import { Activity, Shield } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="rounded-xl bg-primary p-2 shadow-glow">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">MedRecord AI</h1>
            <p className="text-xs text-muted-foreground">Intelligent Medical Analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-4 w-4 text-success" />
          <span>HIPAA Compliant</span>
        </div>
      </div>
    </header>
  );
}
