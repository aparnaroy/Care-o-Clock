import { useState, useEffect, useRef } from "react";
import {
  fetchGeminiResponse, extractTextFromImage,
} from "./services/gemini";
import { Mic, Send, Camera } from "lucide-react";
import { marked } from "marked";
import cece from "./assets/cece.png";
import DOMPurify from "dompurify";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  recognition.onresult = async (event: {
    results: { transcript: unknown }[][];
  }) => {
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

  useEffect(() => {
    const convertMarkdown = async () => {
      const html = await marked(response);
      setMarkdown(DOMPurify.sanitize(html));
    };

    convertMarkdown();
  }, [response]);

  // Start the camera to capture images
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  // Stop the camera to turn off video stream
  const stopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraStream(null); // Clean up the camera stream state
  };

  // Capture the image from the video feed
  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setImage(dataUrl); // Set the image to show in the UI
        processImage(dataUrl);
      }
    }
    setIsCameraActive(false); // Hide the camera feed after capturing the image
    stopCamera(); // Stop the camera after capturing the image

    // After 6 seconds, submit:
    setTimeout(() => {
      handleSubmit();
    }, 6000);
  };

  // Process the captured image
  const processImage = async (imageDataUrl: string) => {
    setLoading(true);
    try {
      // Convert the base64 image to a Blob
      const byteArray = atob(imageDataUrl.split(",")[1]);
      const byteArrayBuffer = new ArrayBuffer(byteArray.length);
      const uintArray = new Uint8Array(byteArrayBuffer);

      for (let i = 0; i < byteArray.length; i++) {
        uintArray[i] = byteArray.charCodeAt(i);
      }

      const file = new File([uintArray], "captured_image.png", { type: "image/png" });

      // Extract text from the image using Tesseract.js
      const text = await extractTextFromImage(file);
      setPrompt(text);

      // Get the Gemini response
      const aiResponse = await fetchGeminiResponse(text);
      setResponse(aiResponse);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setResponse("Error processing the image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="chatbot-container">
        <h1 className="ask-cece">Ask Cece</h1>
        <div className="textarea-container">
          <textarea
            className="textarea-input"
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="button-container">
            <button className="button send-button" onClick={handleSubmit}>
              <span>Send</span> <Send size={20} />
            </button>
            <button
              className="button voice-button"
              onClick={handleSpeechStart}
              disabled={isListening}
            >
              <Mic size={26} color="white" />
            </button>

            <button className="button camera-button" onClick={() => {
              setIsCameraActive(!isCameraActive);
              if (!isCameraActive) {
                startCamera();
              } else {
                stopCamera();
              }
            }}>
             <Camera size={26} color="white" />
            </button>
          </div>
        </div>
        {image && (
          <div className="captured-image-container">
            <img src={image} alt="Captured" width="100%" />
          </div>
        )}

            
        {isCameraActive && (
          <div className="camera-container">
            <video ref={videoRef} autoPlay width="100%" height="auto" />
            <canvas ref={canvasRef} style={{ display: "none" }} width={640} height={480}></canvas>
            <button className="button capture-button" onClick={captureImage}>
              <Camera size={26} color="white" />
            </button>
          </div>
        )}
       </div> 

      {loading && <p>Loading...</p>}
      {response && markdown && (
        <div
          className="response mt-4 p-2 border"
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      )}

      <img src={cece} alt="Chatbot" className="chatbot-img" />
    </div>
  );
};

export default ChatBot;
