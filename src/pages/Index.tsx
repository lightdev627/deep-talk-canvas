import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatArea } from "@/components/ChatArea";
import { NewChatModal } from "@/components/NewChatModal";

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
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  const handleStartChat = (tenant: string, entity: string, firstMessage: string) => {
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
    
    // Send the first message
    handleSendMessage(firstMessage, newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter(conv => conv.id !== id);
      setActiveConversationId(remaining.length > 0 ? remaining[0].id : undefined);
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
          {activeConversation ? (
            <ChatArea
              messages={activeConversation.messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              tenant={activeConversation.tenant}
              entity={activeConversation.entity}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-chatbot-chat-bg">
              <div className="text-center">
                <div className="w-16 h-16 bg-chatbot-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">AI</span>
                </div>
                <h2 className="text-xl font-semibold text-chatbot-sidebar-text mb-2">
                  Welcome to RAG Chat
                </h2>
                <p className="text-chatbot-sidebar-text/70 max-w-md mb-6">
                  Start a new conversation to begin chatting with our AI assistant.
                </p>
                <button
                  onClick={handleNewChat}
                  className="bg-chatbot-primary hover:bg-chatbot-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Start New Chat
                </button>
              </div>
            </div>
          )}
        </div>

        <NewChatModal
          isOpen={showNewChatModal}
          onClose={() => setShowNewChatModal(false)}
          onStartChat={handleStartChat}
        />
      </div>
    </div>
  );
};

export default Index;