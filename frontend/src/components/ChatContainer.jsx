import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

const ChatContainer = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container flex-1 overflow-y-auto p-4 space-y-2">
      {Array.isArray(messages) && messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground text-center">
            <p className="text-lg font-light">No messages yet</p>
            <p className="text-sm">Type a message to start the conversation</p>
          </div>
        </div>
      ) : (
        messages?.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} className="h-1"></div>
    </div>
  );
};

export default ChatContainer;
