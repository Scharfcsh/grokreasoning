import React from "react";
import { MessageSquare, Sparkles } from "lucide-react";

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`animate-fade-in group flex w-full items-start gap-4 py-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar/Icon */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Sparkles size={16} className="text-primary animate-pulse-minimal" />
        </div>
      )}

      <div
        className={`flex max-w-[85%] md:max-w-[75%] flex-col gap-2 rounded-2xl px-4 py-3 transition-opacity ${
          isUser
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-primary-foreground shadow-lg shadow-purple-500/20"
            : "glass-card text-card-foreground shadow-md"
        }`}
      >
        <div className="text-sm md:text-base text-balance leading-relaxed">
          {message.content}
        </div>
        <div
          className={`text-xs opacity-70 self-end flex items-center gap-1 ${
            isUser ? "text-primary-foreground/80" : "text-card-foreground/70"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* Avatar/Icon for user */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center">
          <MessageSquare size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
