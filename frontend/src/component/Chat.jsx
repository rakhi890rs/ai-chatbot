import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // backend URL

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
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    padding: "10px",
    height: "400px",
    overflowY: "auto",
    marginBottom: "10px",
    backgroundColor: "#fafafa",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "12px",
    margin: "4px 0",
    maxWidth: "70%",
  },
  inputContainer: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "8px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default Chat;
