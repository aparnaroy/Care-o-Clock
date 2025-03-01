import { useState } from "react";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Calendar</h1>
      <textarea
        className="border p-2 w-full"
        placeholder="Ask me anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>
  );
};

export default ChatBot;
