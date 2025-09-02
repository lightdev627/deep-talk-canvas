import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Trash2, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
}: ChatSidebarProps) {
  const [hoveredConversation, setHoveredConversation] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-chatbot-sidebar" style={{ width: "226px" }}>
      {/* Header */}
      <div className="p-4 border-b border-chatbot-message-border">
        <h1 className="text-lg font-semibold text-chatbot-sidebar-text mb-4">
          CHAT A.I.+
        </h1>
        
        <Button
          onClick={onNewChat}
          className="w-full bg-chatbot-primary hover:bg-chatbot-primary/90 text-white rounded-lg h-10"
        >
          <Plus className="w-4 h-4 mr-2" />
          New chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h3 className="text-xs text-chatbot-sidebar-text/70 font-medium mb-2 px-2">
            Your conversations
          </h3>
          
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "group relative flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors",
                  activeConversationId === conversation.id
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/50"
                )}
                onClick={() => onSelectConversation(conversation.id)}
                onMouseEnter={() => setHoveredConversation(conversation.id)}
                onMouseLeave={() => setHoveredConversation(null)}
              >
                <MessageSquare className="w-4 h-4 mr-3 text-chatbot-sidebar-text/60 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-chatbot-sidebar-text font-medium truncate">
                    {conversation.title}
                  </p>
                  {conversation.lastMessage && (
                    <p className="text-xs text-chatbot-sidebar-text/60 truncate">
                      {conversation.lastMessage}
                    </p>
                  )}
                </div>
                
                {hoveredConversation === conversation.id && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3 text-chatbot-sidebar-text/60" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-chatbot-message-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-chatbot-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-chatbot-sidebar-text">Andrew Neilson</p>
            <p className="text-xs text-chatbot-sidebar-text/60">andrew@example.com</p>
          </div>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Settings className="w-4 h-4 text-chatbot-sidebar-text/60" />
          </Button>
        </div>
      </div>
    </div>
  );
}