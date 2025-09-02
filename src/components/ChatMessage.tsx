import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Copy, RotateCcw, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
  };
  onRegenerate?: () => void;
  onEdit?: () => void;
}

export function ChatMessage({ message, onRegenerate, onEdit }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-4 py-6", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0",
        isUser 
          ? "bg-gray-600" 
          : "bg-chatbot-primary"
      )}>
        {isUser ? "U" : "A"}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className={cn(
          "rounded-lg p-4 max-w-4xl",
          isUser 
            ? "bg-gray-100 ml-auto" 
            : "bg-chatbot-message-ai border border-chatbot-message-border"
        )}>
          <div className="prose prose-sm max-w-none">
            {message.content.split('\n').map((line, index) => (
              <p key={index} className="mb-2 last:mb-0 text-sm leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-3">
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "h-8 w-8 p-0 hover:bg-gray-100",
                liked === true && "bg-green-50 text-green-600"
              )}
              onClick={() => setLiked(liked === true ? null : true)}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "h-8 w-8 p-0 hover:bg-gray-100",
                liked === false && "bg-red-50 text-red-600"
              )}
              onClick={() => setLiked(liked === false ? null : false)}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4" />
            </Button>
            
            {onRegenerate && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-3 hover:bg-gray-100"
                onClick={onRegenerate}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Regenerate
              </Button>
            )}
            
            {copied && (
              <span className="text-xs text-green-600 ml-2">Copied!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}