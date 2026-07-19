import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";
import { useWaypointContext } from "../../context/WaypointContext";
import { getAIResponse } from "../../services/aiService";
import Button from "./Button";
import Input from "./Input";

export const AIChatbot = () => {
  const { businesses, searchLocation } = useWaypointContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! I am your AI Search Assistant. Ask me to find the best cafes, clinics, or compare local places near you!"
    }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInput("");

    // Simulate AI response delay
    setTimeout(() => {
      const locName = searchLocation ? searchLocation.name.split(',')[0] : "your area";
      const aiResult = getAIResponse(userText, locName, businesses);
      setMessages(prev => [...prev, { sender: "bot", text: aiResult.text }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
          title="Talk to AI Assistant"
        >
          <Sparkles className="animate-pulse" size={24} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
      )}

      {/* Glassmorphic Chat Widget */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[480px] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Waypoint AI Guide</h4>
                <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === "user"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {msg.sender === "user" ? "U" : "AI"}
                </div>
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-slate-100 shadow-sm rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input field */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-150 flex gap-2">
            <input
              type="text"
              placeholder="Ask AI (e.g. recommend best cafes)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center active:scale-95 shrink-0"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
