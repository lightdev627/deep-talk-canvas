import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Sparkles } from "lucide-react";

interface NewChatFormProps {
  onStartChat: (tenant: string, entity: string, message: string) => void;
}

export function NewChatForm({ onStartChat }: NewChatFormProps) {
  const [tenant, setTenant] = useState("");
  const [entity, setEntity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (tenant && entity && message.trim()) {
      onStartChat(tenant, entity, message.trim());
      setTenant("");
      setEntity("");
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isValid = tenant && entity && message.trim();

  return (
    <div className="flex items-center justify-center h-full bg-chatbot-chat-bg">
      <div className="max-w-2xl w-full mx-auto p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-chatbot-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-chatbot-sidebar-text mb-2">
            Welcome to RAG Chat
          </h1>
          <p className="text-chatbot-sidebar-text/70 text-lg">
            Let's start a conversation with our AI assistant. Select your tenant and entity, then ask your first question.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-chatbot-message-border space-y-6">
          {/* Tenant Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-chatbot-sidebar-text">Tenant</label>
            <Select value={tenant} onValueChange={setTenant}>
              <SelectTrigger className="w-full h-12 rounded-xl border-2 focus:border-chatbot-primary">
                <SelectValue placeholder="Select a tenant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tenant-1">Tenant 1</SelectItem>
                <SelectItem value="tenant-2">Tenant 2</SelectItem>
                <SelectItem value="tenant-3">Tenant 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Entity Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-chatbot-sidebar-text">Entity</label>
            <Select value={entity} onValueChange={setEntity}>
              <SelectTrigger className="w-full h-12 rounded-xl border-2 focus:border-chatbot-primary">
                <SelectValue placeholder="Select an entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entity-1">Entity 1</SelectItem>
                <SelectItem value="entity-2">Entity 2</SelectItem>
                <SelectItem value="entity-3">Entity 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-chatbot-sidebar-text">Your first message</label>
            <div className="relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What would you like to know?"
                className="pr-14 h-14 text-base rounded-xl border-2 focus:border-chatbot-primary"
              />
              <Button
                onClick={handleSubmit}
                disabled={!isValid}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-chatbot-primary hover:bg-chatbot-primary/90 disabled:opacity-50 rounded-lg"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-chatbot-sidebar-text/60">
              Press Enter to start the conversation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}