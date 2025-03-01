import { useState } from "react";
import { fetchGeminiResponse } from "./services/gemini";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const aiResponse = await fetchGeminiResponse(prompt);
    setResponse(aiResponse);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Gemini AI Chat</h1>
      <textarea
        className="border p-2 w-full"
        placeholder="Ask me anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleSubmit}>
        Send
      </button>
      {response && <p className="mt-4 p-2 border">{response}</p>}
    </div>
  );
};

export default ChatBot;
