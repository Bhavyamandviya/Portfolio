"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    const userMessage = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: messageText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.response.content,
            sender: "bot",
            meta: data.response,
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await handleSendMessage(input);
  };

  const renderBotMessage = (content, meta) => {
    if (typeof content === "string") {
      return (
        <div className="whitespace-pre-line">
          {content.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {content.suggestions && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-600">Suggestions:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {content.suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(suggestion)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-[#70757f] px-3 py-1 rounded-full"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {content.followUp && (
          <div className="mt-2 text-sm italic text-gray-600">
            {content.followUp}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-80 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden"
        >
          <div className="bg-[#70757f] text-white p-3 flex justify-between items-center">
            <h3 className="font-bold">Bhavya's AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 h-full flex items-center justify-center">
                <div>
                  <p className="mb-4">
                    Hi! I'm Bhavya's AI assistant. Ask me about:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() =>
                        handleSendMessage("Tell me about your projects")
                      }
                      className="bg-gray-50 hover:bg-gray-100 text-[#70757f] px-4 py-2 rounded-lg text-sm"
                    >
                      My Projects
                    </button>
                    <button
                      onClick={() =>
                        handleSendMessage("What are your technical skills?")
                      }
                      className="bg-gray-50 hover:bg-gray-100 text-[#70757f] px-4 py-2 rounded-lg text-sm"
                    >
                      Technical Skills
                    </button>
                    <button
                      onClick={() =>
                        handleSendMessage("How can I contact you?")
                      }
                      className="bg-gray-50 hover:bg-gray-100 text-[#70757f] px-4 py-2 rounded-lg text-sm"
                    >
                      Contact Information
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.sender === "user"
                        ? "bg-[#70757f] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.sender === "bot"
                      ? renderBotMessage(message.text, message.meta)
                      : message.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 bg-white p-3">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70757f] text-sm text-[#70757f]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-[#70757f] text-white px-3 py-2 rounded-lg hover:bg-[#70757f] disabled:bg-gray-100 transition-colors text-sm"
              >
                {isLoading ? "..." : "Send"}
              </button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-[#70757f] text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default ChatBot;
