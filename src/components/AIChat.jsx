import { useState, useRef, useEffect } from "react";
import { askTravelAI } from "../services/aiService";
import { Bot, Send, Sparkles, User, RefreshCw } from "lucide-react";

function AIChat({ destinationName = "this destination" }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello! I am **Wander AI**, your concierge for **${destinationName}**. Ask me anything about when to visit, how long to stay, budget tips, or hidden local spots! ✨`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    `Best time to visit ${destinationName}?`,
    `How many days to stay in ${destinationName}?`,
    `Budget tips for ${destinationName}?`,
    `Top food & dining in ${destinationName}?`,
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    // Add user message
    const userMsg = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const responseText = await askTravelAI(messageText, destinationName);
      setMessages((prev) => [...prev, { sender: "ai", text: responseText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I am having trouble connecting right now. Please try asking your question again!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <div className="ai-header-left">
          <div className="ai-avatar-glow">
            <Bot size={20} />
          </div>
          <div>
            <h3>Wander AI Concierge</h3>
            <p className="ai-status">
              <span className="online-dot"></span> Powered by Gemini & Local Intelligence
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                sender: "ai",
                text: `Conversation restarted! How can I assist your travel plans to **${destinationName}** today?`,
              },
            ])
          }
          className="chat-clear-btn"
          title="Restart Chat"
        >
          <RefreshCw size={14} /> Clear
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="quick-prompts-bar">
        <Sparkles size={14} className="sparkle-icon" />
        <div className="quick-prompts-scroll">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={loading}
              className="quick-prompt-chip"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="chat-messages-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "chat-row user-row" : "chat-row ai-row"}
          >
            {msg.sender === "ai" && (
              <div className="msg-avatar ai-avatar">
                <Bot size={16} />
              </div>
            )}

            <div className="msg-bubble">
              <div
                className="msg-text"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(msg.text),
                }}
              />
            </div>

            {msg.sender === "user" && (
              <div className="msg-avatar user-avatar">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="chat-row ai-row">
            <div className="msg-avatar ai-avatar">
              <Bot size={16} />
            </div>
            <div className="msg-bubble ai-typing">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="chat-input-area">
        <input
          type="text"
          placeholder={`Ask about ${destinationName}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="chat-send-btn"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

// Simple text formatter for bold/bullets
function formatMarkdown(text = "") {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n• /g, "<br/>• ");
}

export default AIChat;
