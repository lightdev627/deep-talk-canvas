import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function ChatArea({ messages, onSendMessage, isLoading = false }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-chatbot-chat-bg">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-chatbot-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">AI</span>
                </div>
                <h2 className="text-xl font-semibold text-chatbot-sidebar-text mb-2">
                  Welcome to RAG Chat
                </h2>
                <p className="text-chatbot-sidebar-text/70 max-w-md">
                  Start a conversation with our AI assistant. Ask questions about your documents or have a general chat.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-4">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message}
                  onRegenerate={message.role === "assistant" ? () => console.log("Regenerate") : undefined}
                />
              ))}
              
              {isLoading && (
                <div className="flex gap-4 py-6">
                  <div className="w-8 h-8 rounded-full bg-chatbot-primary flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="bg-chatbot-message-ai border border-chatbot-message-border rounded-lg p-4 max-w-4xl">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-chatbot-primary rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <ChatInput 
        onSendMessage={onSendMessage}
        disabled={isLoading}
      />
    </div>
  );
}