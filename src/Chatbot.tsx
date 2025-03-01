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
import { fetchGeminiResponse, extractTextFromImage } from "./services/gemini";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // State to track OCR progress

  // SpeechRecognition setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  const handleSpeechStart = () => {
    setIsListening(true);
    recognition.start();
  };

  recognition.onresult = async (event: { results: { transcript: unknown }[][] }) => {
    const voiceInput = event.results[0][0].transcript as string;
    setPrompt(voiceInput);
    setIsListening(false);

    const aiResponse = await fetchGeminiResponse(voiceInput);
    setResponse(aiResponse);
  };

  recognition.onerror = (event: { error: unknown }) => {
    console.error("Speech Recognition Error:", event.error);
    setIsListening(false);
  };

  const handleSubmit = async () => {
    const aiResponse = await fetchGeminiResponse(prompt);
    setResponse(aiResponse);
  };

  // Handle image upload and extract text using Tesseract.js
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
      setLoading(true); // Start loading while processing the image

      try {
        // Extract text from the image using Tesseract.js
        const text = await extractTextFromImage(file);
        setPrompt(text); // Set the extracted text as the prompt

        // Get the Gemini response
        const aiResponse = await fetchGeminiResponse(text);
        setResponse(aiResponse);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setResponse("Error processing the image");
      } finally {
        setLoading(false); // Stop loading after processing
      }
    }
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
        <button className="bg-blue-500 text-white p-2 mr-2" onClick={handleSubmit}>
          Send
        </button>

        {/* Voice Input Button */}
        <button
          className="bg-green-500 text-white p-2"
          onClick={handleSpeechStart}
          disabled={isListening}
        >
          {isListening ? "Listening..." : "Start Voice Input"}
        </button>
      </div>

      {/* Image upload button */}
      <div className="mt-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2"
        />
        {image && <p>Image: {image.name}</p>}
        {loading && <p>Loading...</p>} {/* Show loading while processing */}
      </div>

      {response && <p className="mt-4 p-2 border">{response}</p>}
    </div>
  );
};

export default ChatBot;
