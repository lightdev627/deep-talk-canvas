import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Trash2, Edit3, User, LogOut } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  onRenameConversation: (id: string, title: string) => void;
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
}: ChatSidebarProps) {
  const [hoveredConversation, setHoveredConversation] = useState<string | null>(null);
  const [editingConversation, setEditingConversation] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  return (
    <div className="flex flex-col h-full bg-chatbot-sidebar" style={{ width: "226px" }}>
      {/* Header */}
      <div className="p-4 border-b border-chatbot-message-border">
        <div className="text-lg font-semibold text-chatbot-sidebar-text mb-4">
          CHAT A.I.+
        </div>
        
        <Button
          onClick={onNewChat}
          className="w-full bg-chatbot-primary hover:bg-chatbot-primary/90 text-primary-foreground rounded-lg h-10"
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
                    ? "bg-card shadow-sm"
                    : "hover:bg-card/50"
                )}
                onClick={() => onSelectConversation(conversation.id)}
                onMouseEnter={() => setHoveredConversation(conversation.id)}
                onMouseLeave={() => setHoveredConversation(null)}
              >
                <MessageSquare className="w-4 h-4 mr-3 text-chatbot-sidebar-text/60 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  {editingConversation === conversation.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={() => {
                        onRenameConversation(conversation.id, editTitle);
                        setEditingConversation(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onRenameConversation(conversation.id, editTitle);
                          setEditingConversation(null);
                        }
                        if (e.key === 'Escape') {
                          setEditingConversation(null);
                        }
                      }}
                      className="w-full bg-transparent text-sm text-chatbot-sidebar-text font-medium border-none outline-none"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p className="text-sm text-chatbot-sidebar-text font-medium truncate">
                      {conversation.title}
                    </p>
                  )}
                </div>
                
                {hoveredConversation === conversation.id && editingConversation !== conversation.id && (
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingConversation(conversation.id);
                        setEditTitle(conversation.title);
                      }}
                    >
                      <Edit3 className="w-3 h-3 text-chatbot-sidebar-text/60" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conversation.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3 text-chatbot-sidebar-text/60" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-chatbot-message-border">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full p-0 h-auto justify-start hover:bg-card/50">
              <div className="flex items-center space-x-3 p-2 w-full">
                <div className="w-8 h-8 bg-chatbot-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-chatbot-sidebar-text">Andrew Neilson</p>
                  <p className="text-xs text-chatbot-sidebar-text/60">andrew@example.com</p>
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end" side="top">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm h-8 px-2 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                // Handle logout
                console.log("Logout clicked");
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}