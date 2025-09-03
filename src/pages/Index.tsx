import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatArea } from "@/components/ChatArea";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessage?: string;
  timestamp: Date;
  tenant?: string;
  entity?: string;
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewChatForm, setShowNewChatForm] = useState(true);

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  const handleNewChat = () => {
    setActiveConversationId(undefined);
    setShowNewChatForm(true);
  };

  const handleStartNewChat = (tenant: string, entity: string, firstMessage: string) => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: firstMessage.length > 50 ? firstMessage.substring(0, 50) + "..." : firstMessage,
      messages: [],
      timestamp: new Date(),
      tenant,
      entity,
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setShowNewChatForm(false);
    
    // Send the first message
    handleSendMessage(firstMessage, newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setShowNewChatForm(false);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter(conv => conv.id !== id);
      if (remaining.length > 0) {
        setActiveConversationId(remaining[0].id);
        setShowNewChatForm(false);
      } else {
        setActiveConversationId(undefined);
        setShowNewChatForm(true);
      }
    }
  };

  const handleRenameConversation = (id: string, title: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, title } : conv
    ));
  };

  const handleSendMessage = (message: string, conversationId?: string) => {
    const targetConversationId = conversationId || activeConversationId;
    if (!targetConversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    setConversations(prev => prev.map(conv => 
      conv.id === targetConversationId 
        ? { 
            ...conv, 
            messages: [...conv.messages, userMessage],
            lastMessage: message,
            timestamp: new Date()
          }
        : conv
    ));

    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to help! Ask me anything.",
        role: "assistant",
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => 
        conv.id === targetConversationId 
          ? { 
              ...conv, 
              messages: [...conv.messages, aiMessage],
              lastMessage: "I'm here to help! Ask me anything.",
              timestamp: new Date()
            }
          : conv
      ));
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen flex bg-background">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <ChatArea
            messages={activeConversation?.messages || []}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            tenant={activeConversation?.tenant}
            entity={activeConversation?.entity}
            showNewChatForm={showNewChatForm}
            onStartNewChat={handleStartNewChat}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;