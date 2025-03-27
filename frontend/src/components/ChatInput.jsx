import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import LoadingIndicator from "./LoadingIndicator";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="sticky bottom-0 w-full bg-background/80 backdrop-blur-md py-4 px-4 border-t border-border">
      <form 
        onSubmit={handleSubmit} 
        className="glass-morphism rounded-2xl transition-all duration-200 shadow-lg mx-auto max-w-3xl relative overflow-hidden"
      >
        {/* Shimmer effect overlay */}
        <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none"></div>
        
        <div className="relative flex items-center">
          {/* Decorative element */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Sparkles size={18} className="text-primary/80" />
          </div>
          
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full bg-transparent text-foreground resize-none min-h-[56px] max-h-[200px] py-4 pl-10 pr-14 focus:outline-none placeholder:text-muted-foreground/70"
            disabled={isLoading}
            rows={1}
          />
          
          <div className="absolute right-3 bottom-3">
            {isLoading ? (
              <div className="w-9 h-9 flex items-center justify-center">
                <LoadingIndicator />
              </div>
            ) : (
              <button
                type="submit"
                disabled={message.trim() === "" || isLoading}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-primary-foreground transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <Send size={16} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
