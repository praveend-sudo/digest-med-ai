import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function ChatInterface({ messages, onSendMessage, isLoading, disabled }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestedQuestions = [
    "What are the main diagnoses?",
    "List all medications mentioned",
    "What tests were performed?",
    "Summarize the treatment plan",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="rounded-full bg-accent p-4 mb-4">
              <Bot className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Ask Questions About Your Records
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              {disabled 
                ? "Upload documents and generate a summary first to start asking questions."
                : "I can help you understand your medical records. Ask me anything!"
              }
            </p>
            
            {!disabled && (
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => onSendMessage(question)}
                    className="p-3 text-xs text-left rounded-xl bg-card shadow-soft hover:shadow-card transition-all border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="rounded-full bg-primary p-2 shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-card p-4 shadow-soft">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-card/50">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={disabled ? "Generate a summary first..." : "Ask a question about your records..."}
              disabled={disabled || isLoading}
              rows={1}
              className={cn(
                "w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm",
                "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "min-h-[48px] max-h-[120px]"
              )}
            />
          </div>
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading || disabled}
            className="h-12 w-12 rounded-xl shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn(
      "flex items-start gap-3 animate-slide-up",
      isUser && "flex-row-reverse"
    )}>
      <div className={cn(
        "rounded-full p-2 shrink-0",
        isUser ? "bg-secondary" : "bg-primary"
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-secondary-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-primary-foreground" />
        )}
      </div>
      
      <div className={cn(
        "rounded-2xl p-4 shadow-soft max-w-[80%]",
        isUser 
          ? "rounded-tr-none bg-primary text-primary-foreground" 
          : "rounded-tl-none bg-card"
      )}>
        <p className={cn(
          "text-sm whitespace-pre-wrap",
          !isUser && "text-foreground"
        )}>
          {message.content}
        </p>
        <p className={cn(
          "text-xs mt-2",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
