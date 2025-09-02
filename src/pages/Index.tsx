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
  lastMessage?: string;
  timestamp: Date;
  messages: Message[];
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Create Chatbot GPT...",
      lastMessage: "These are just the basic steps to get started...",
      timestamp: new Date(Date.now() - 3600000),
      messages: [
        {
          id: "1",
          content: "Create a chatbot gpt using python language what will be step for that",
          role: "user",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "2",
          content: "Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:\n\n1. Install the required libraries: You'll need to install the transformers library from Hugging Face to use GPT. You can install it using pip.\n\n2. Load the pre-trained model: GPT comes in several sizes and versions, so you'll need to choose the one that fits your needs. You can load a pre-trained GPT model. This loads the 1.3B parameter version of GPT-Neo, which is a powerful and relatively recent model.\n\n3. Create a chatbot loop: You'll need to create a loop that takes user input, generates a response using the GPT model, and outputs it to the user. Here's an example loop that uses the input() function to get user input and the gpt() function to generate a response. This loop will keep running until the user exits the program or the loop is interrupted.\n\n4. Add some personality to the chatbot: While GPT can generate text, it doesn't have any inherent personality or style. You can make your chatbot more interesting by adding custom prompts or responses that reflect your desired personality. You can then modify the chatbot loop to use these prompts and responses when appropriate. This will make the chatbot seem more human-like and engaging.\n\nThese are just the basic steps to get started with a GPT chatbot in Python. Depending on your requirements, you may need to add more features or complexity to the chatbot. Good luck!",
          role: "assistant",
          timestamp: new Date(Date.now() - 3500000),
        },
      ],
    },
    {
      id: "2",
      title: "What Is UI UX Design?",
      lastMessage: "UI/UX design focuses on creating intuitive...",
      timestamp: new Date(Date.now() - 7200000),
      messages: [],
    },
    {
      id: "3",
      title: "Create POS System",
      lastMessage: "A Point of Sale system needs several...",
      timestamp: new Date(Date.now() - 10800000),
      messages: [],
    },
    {
      id: "4",
      title: "What Is UX Audit?",
      lastMessage: "A UX audit evaluates the user experience...",
      timestamp: new Date(Date.now() - 14400000),
      messages: [],
    },
  ]);

  const [activeConversationId, setActiveConversationId] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(false);

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      timestamp: new Date(),
      messages: [],
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter(conv => conv.id !== id);
      setActiveConversationId(remaining.length > 0 ? remaining[0].id : "");
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    // Add user message
    setConversations(prev => prev.map(conv => 
      conv.id === activeConversationId 
        ? { 
            ...conv, 
            messages: [...conv.messages, userMessage],
            title: conv.messages.length === 0 ? content.slice(0, 30) + "..." : conv.title,
            lastMessage: content,
            timestamp: new Date(),
          }
        : conv
    ));

    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your question about " + content + ". This is a simulated response from the RAG-based chatbot system. In a real implementation, this would query your document database and provide contextual answers based on your data.",
        role: "assistant",
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? { 
              ...conv, 
              messages: [...conv.messages, aiMessage],
              lastMessage: aiMessage.content.slice(0, 50) + "...",
            }
          : conv
      ));
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="h-screen flex bg-background">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
      />
      
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <ChatArea
            messages={activeConversation.messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-chatbot-chat-bg">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-chatbot-sidebar-text mb-2">
                No conversation selected
              </h2>
              <p className="text-chatbot-sidebar-text/70">
                Select a conversation from the sidebar or start a new chat.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
