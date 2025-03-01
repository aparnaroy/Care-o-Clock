import { useState } from "react";
import { fetchGeminiResponse /*, extractTextFromImage */ } from "./services/gemini";

const ChatBot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading] = useState(false);
  // const [image, setImage] = useState<string | null>(null);
  // const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // // Start the camera to capture images
  // const startCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     setCameraStream(stream);
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //     }
  //   } catch (error) {
  //     console.error("Error accessing the camera:", error);
  //   }
  // };

  // // Stop the camera to turn off video stream
  // const stopCamera = () => {
  //   if (cameraStream) {
  //     const tracks = cameraStream.getTracks();
  //     tracks.forEach((track) => track.stop());
  //   }
  //   if (videoRef.current) {
  //     videoRef.current.srcObject = null;
  //   }
  //   setCameraStream(null); // Clean up the camera stream state
  // };

  // // Capture the image from the video feed
  // const captureImage = async () => {
  //   if (videoRef.current && canvasRef.current) {
  //     const context = canvasRef.current.getContext("2d");
  //     if (context) {
  //       context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
  //       const dataUrl = canvasRef.current.toDataURL("image/png");
  //       setImage(dataUrl); // Set the image to show in the UI
  //       processImage(dataUrl);
  //     }
  //   }
  //   stopCamera(); // Stop the camera after capturing the image
  // };

  // // Process the captured image
  // const processImage = async (imageDataUrl: string) => {
  //   setLoading(true);
  //   try {
  //     // Convert the base64 image to a Blob
  //     const byteArray = atob(imageDataUrl.split(",")[1]);
  //     const byteArrayBuffer = new ArrayBuffer(byteArray.length);
  //     const uintArray = new Uint8Array(byteArrayBuffer);

  //     for (let i = 0; i < byteArray.length; i++) {
  //       uintArray[i] = byteArray.charCodeAt(i);
  //     }

  //     const file = new File([uintArray], "captured_image.png", { type: "image/png" });

  //     // Extract text from the image using Tesseract.js
  //     const text = await extractTextFromImage(file);
  //     setPrompt(text);

  //     // Get the Gemini response
  //     const aiResponse = await fetchGeminiResponse(text);
  //     setResponse(aiResponse);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     setResponse("Error processing the image");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

        <button
          className="bg-green-500 text-white p-2"
          onClick={handleSpeechStart}
          disabled={isListening}
        >
          {isListening ? "Listening..." : "Start Voice Input"}
        </button>
      </div>

      {/* Start Camera Button
      <div className="mt-2">
        <button className="bg-yellow-500 text-white p-2" onClick={startCamera}>
          Start Camera
        </button>
      </div>

      <div className="mt-2">
        <video ref={videoRef} autoPlay width="100%" height="auto" />
      </div>

      Canvas Element to capture the image from the video feed
      <canvas ref={canvasRef} style={{ display: "none" }} width={640} height={480}></canvas>

      <div className="mt-2">
        <button className="bg-blue-500 text-white p-2" onClick={captureImage}>
          Capture Image
        </button>
      </div>

      {image && (
        <div className="mt-2">
          <img src={image} alt="Captured" width="100%" />
        </div>
      )} */}

      {loading && <p>Loading...</p>}

      {response && <p className="mt-4 p-2 border">{response}</p>}
    </div>
  );
};

export default ChatBot;
