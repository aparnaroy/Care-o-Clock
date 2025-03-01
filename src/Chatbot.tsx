// import { useState } from "react";
// import { fetchGeminiResponse } from "./services/gemini";

// const ChatBot = () => {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");

//   const handleSubmit = async () => {
//     const aiResponse = await fetchGeminiResponse(prompt);
//     setResponse(aiResponse);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Gemini AI Chat</h1>
//       <textarea
//         className="border p-2 w-full"
//         placeholder="Ask me anything..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//       />
//       <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleSubmit}>
//         Send
//       </button>
//       {response && <p className="mt-4 p-2 border">{response}</p>}
//     </div>
//   );
// };

// export default ChatBot;

import { useState } from "react";
import { fetchGeminiResponse } from "./services/gemini";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  // SpeechRecognition setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US"; // Set language
  recognition.continuous = false; // Stop after a result is returned
  recognition.interimResults = false; // No need to show partial results

  const handleSpeechStart = () => {
    setIsListening(true);
    recognition.start();
  };

  // When speech is recognized, update the prompt with the result
  recognition.onresult = async (event: { results: { transcript: unknown; }[][]; }) => {
    const voiceInput = event.results[0][0].transcript as string; // Get the speech text
    setPrompt(voiceInput); // Update the prompt with voice input
    setIsListening(false); // Stop the listening state

    // Call the backend to fetch the Gemini response
    const aiResponse = await fetchGeminiResponse(voiceInput);
    setResponse(aiResponse); // Set the response from Gemini
  };

  // Handle errors in speech recognition
  recognition.onerror = (event: { error: unknown; }) => {
    console.error("Speech Recognition Error:", event.error);
    setIsListening(false); // Stop listening on error
  };

  // Handle submit via button
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
      <div className="mt-2">
        <button
          className="bg-blue-500 text-white p-2 mr-2"
          onClick={handleSubmit}
        >
          Send
        </button>

        {/* Voice Input Button */}
        <button
          className="bg-green-500 text-white p-2"
          onClick={handleSpeechStart}
          disabled={isListening} // Disable if already listening
        >
          {isListening ? "Listening..." : "Start Voice Input"}
        </button>
      </div>

      {response && <p className="mt-4 p-2 border">{response}</p>}
    </div>
  );
};

export default ChatBot;
