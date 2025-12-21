import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://ai-chatbot-2-no8b.onrender.com"); // backend URL

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for bot responses
  useEffect(() => {
    socket.on("response", (data) => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { user: "bot", text: data.reply }]);
    });

    return () => {
      socket.off("response");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    // Add user's message
    setMessages((prev) => [...prev, { user: "you", text: message }]);

    // Emit to backend
    socket.emit("prompt", { prompt: message });

    // Clear input and show typing
    setMessage("");
    setIsTyping(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Chatbot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.user === "you" ? "flex-end" : "flex-start",
              backgroundColor: msg.user === "you" ? "#DCF8C6" : "#F1F0F0",
            }}
          >
            <b>{msg.user}:</b> {msg.text}
          </div>
        ))}
        {isTyping && (
          <div style={{ ...styles.message, alignSelf: "flex-start", fontStyle: "italic" }}>
            Bot is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

// Simple inline CSS
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
  },
  header: {
    textAlign: "center",
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    padding: "15px",
    height: "400px",
    overflowY: "auto",
    marginBottom: "15px",
    backgroundColor: "#f5f5f5",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
  },
  message: {
    padding: "10px 16px",
    borderRadius: "20px",
    margin: "6px 0",
    maxWidth: "75%",
    wordBreak: "break-word",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    fontSize: "0.95rem",
    lineHeight: "1.4",
  },
  inputContainer: {
    display: "flex",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    flex: 1,
    padding: "12px 15px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    backgroundColor: "#f0f0f0",
  },
  button: {
    padding: "12px 20px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
  },
};


export default Chat;
