import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (tenant: string, entity: string, message: string) => void;
}

export function NewChatModal({ isOpen, onClose, onStartChat }: NewChatModalProps) {
  const [tenant, setTenant] = useState("");
  const [entity, setEntity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (tenant && entity && message.trim()) {
      onStartChat(tenant, entity, message.trim());
      setTenant("");
      setEntity("");
      setMessage("");
      onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-chatbot-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Start New Conversation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Greeting */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Welcome! Let's begin a conversation with our AI assistant.
              Select your tenant and entity, then ask your first question.
            </p>
          </div>

          {/* Tenant Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tenant</label>
            <Select value={tenant} onValueChange={setTenant}>
              <SelectTrigger className="w-full">
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
            <label className="text-sm font-medium">Entity</label>
            <Select value={entity} onValueChange={setEntity}>
              <SelectTrigger className="w-full">
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
            <label className="text-sm font-medium">Your first message</label>
            <div className="relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What would you like to know?"
                className="pr-12 h-12 rounded-xl border-2 focus:border-chatbot-primary"
              />
              <Button
                onClick={handleSubmit}
                disabled={!isValid}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-chatbot-primary hover:bg-chatbot-primary/90 disabled:opacity-50 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Press Enter to start the conversation
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}