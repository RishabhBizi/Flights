import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const ws = useRef(null);
  let SOCKET_URL=import.meta.env.VITE_LLM_WEB_SOCKET+"/chat"

  useEffect(() => {

    ws.current = new WebSocket(SOCKET_URL); // Connect to FastAPI WebSocket

    ws.current.onmessage = (event) => {
      if (event.data === "[END]") return; // Ignore end token
      if(event.data === "[START]") return;
      setMessages((prev) => [...prev, { sender: "bot", text: event.data }]);
    };

    return () => ws.current.close(); // Close connection on unmount
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    ws.current.send(input);
    setInput("");
    
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="p-4 text-center text-lg font-semibold bg-gray-800">Chatbot</div>
      <div ref={chatRef} className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "ml-auto bg-blue-600" : "bg-gray-700"}`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      <div className="p-4 bg-gray-800 flex items-center">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-600 rounded-lg">
          <Send className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
}
