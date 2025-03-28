import { useState, useEffect, useRef } from "react";
import { fetchGeminiResponse, extractTextFromImage } from "./services/gemini";
import { Mic, Send, Camera } from "lucide-react";
import { marked } from "marked";
import cece from "./assets/cece.png";
import DOMPurify from "dompurify";
import axios from "axios";

// Emergency Contact Type
interface EmergencyContact {
  name: string;
  phone_number: string;
}

// Medical Profile Type
interface MedicalProfile {
  legal_name: string;
  dob: string;
  emergency_contact: EmergencyContact;
  medical_conditions: string | undefined;
}

interface Frequency {
  value: number;
  unit: string;
}

// Medication Type
interface Medication {
  name: string;
  dose: string;
  frequency: Frequency;
  filled_date: string;
  expiration_date: string;
  refills: number;
  amount: number;
  dates_taken: number;
}

// Appointments Type
interface Appointment {
  title: string;
  datetime: string;
  location: string;
  notes: string;
}

// Reminders Type (Includes Medications & Appointments)
interface Reminders {
  medications: Medication[];
  appointments: Appointment[];
}

// User Type
interface User {
  email: string;
  medical_profile: MedicalProfile;
  reminders: Reminders;
}

const ChatBot = () => {
  const [user, setUser] = useState<User | null>(null);
  const [prompt, setPrompt] = useState("");
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://care-o-clock.up.railway.app";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("❌ No token found, user not logged in.");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setUser(null); // Ensures UI updates even if the request fails
      }
    };

    fetchUser();
  }, [API_URL]);

  useEffect(() => {
    if (command !== "none") {
      console.log(`Command: ${command}`);

      const handleCommand = async () => {
        const API_URL =
          import.meta.env.VITE_API_URL || "https://care-o-clock.up.railway.app";

        if (command.startsWith("addAppointment")) {
          try {
            // ✅ Extract values safely
            const commandParts = command
              .split(":")
              .slice(1)
              .join(":")
              .split(",");

            if (!commandParts || commandParts.length < 3) {
              throw new Error("❌ Missing required appointment details.");
            }

            const [title, datetime, location, notes = ""] = commandParts.map(
              (part) => part.trim()
            );

            // ✅ Ensure required fields are present
            if (!title || !datetime || !location) {
              throw new Error("❌ Missing required appointment details.");
            }

            // ✅ Construct appointment payload
            const appointmentData = {
              title,
              datetime: new Date(datetime).toISOString(), // Convert to ISO format
              location,
              notes, // Optional
            };

            // Send appointment to backend
            const response = await axios.post(
              `${API_URL}/api/reminders/appointments`,
              appointmentData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            console.log(response);
            // setResponse(`✅ Appointment added: ${response.data.title}`);
          } catch (error) {
            console.error("❌ Error adding appointment:", error);
          }
        } else if (command.startsWith("addMedication")) {
          try {
            const [
              name,
              dose,
              unit,
              value,
              filled_date,
              expiration_date,
              refills,
              amount,
              dates_taken,
            ] = command.split(":").slice(1).join(":").split(",");

            const medicationData = {
              name: name?.trim() || "Amoxicillin", // Default to "Amoxicillin" if empty
              dose: dose?.trim() || "875 MG", // Default to "875 MG" if empty
              frequency: {
                unit: unit?.trim() || "day", // Default to "day" if empty
                value: value ? parseInt(value, 10) : 1, // Default to every 1 day if empty
              },
              filled_date:
                filled_date?.trim() || new Date().toISOString().split("T")[0], // Default to today
              expiration_date: expiration_date?.trim() || "2026-01-01", // Default to a future date
              refills: refills ? parseInt(refills, 10) : 0, // Default to 0 refills if empty
              amount: amount ? parseInt(amount, 10) : 30, // Default to 30 pills if empty
              dates_taken: dates_taken ? parseInt(dates_taken, 10) : 0, // Default to 0 if empty
            };

            const response = await axios.post(
              `${API_URL}/api/reminders/medications`,
              medicationData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            setResponse(`✅ Medication added: ${response.data.name}`);
          } catch (error) {
            // Catch and log any errors
            console.log(error);
          }
        } else if (command.startsWith("showReminders")) {
          // eslint-disable-next-line prefer-const
          let allReminders = [];

          const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

          const dayAppointments =
            user?.reminders?.appointments.filter((appointment) =>
              appointment.datetime.startsWith(today)
            ) || [];

          const dayMedications =
            user?.reminders?.medications.filter(
              (medication) =>
                new Date(medication.filled_date) <= new Date(today) &&
                new Date(today) <= new Date(medication.expiration_date)
            ) || [];

          // 🗓️ Add appointments with their time
          for (const appointment of dayAppointments || []) {
            allReminders.push({
              time: new Date(appointment.datetime),
              details: `🗓️ Appointment: ${appointment.title} at ${appointment.location}`,
            });
          }

          // 💊 Add medications with calculated dose times
          for (const medication of dayMedications || []) {
            // eslint-disable-next-line prefer-const
            let doseTime = new Date();
            doseTime.setHours(8, 0, 0, 0); // Start at 8 AM

            const frequencyHours = medication.frequency?.value || 24;

            while (doseTime.getHours() < 24) {
              allReminders.push({
                time: new Date(doseTime),
                details: `💊 Medication: ${medication.name} - ${medication.dose}`,
              });

              doseTime.setHours(doseTime.getHours() + frequencyHours);
              if (doseTime.getDate() !== new Date().getDate()) break;
            }
          }

          // 🔄 Sort all reminders by time
          allReminders.sort((a, b) => a.time.getTime() - b.time.getTime());

          // 🔹 Generate reminder list
          let dayReminders = "<br><br>Here are your reminders for today:<ul>";

          for (const reminder of allReminders) {
            dayReminders += `<li>${reminder.time.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })} - ${reminder.details}</li>`;
          }

          dayReminders += "</ul>";

          // 🗓️ Get current day name
          const weekday = new Date().toLocaleDateString("en-US", {
            weekday: "long",
          });

          dayReminders += `<br>Happy ${weekday}!`;

          const currentHour = new Date().getHours();
          const greeting =
            currentHour < 12
              ? "Good morning"
              : currentHour < 18
              ? "Good afternoon"
              : "Good evening";

          setResponse(
            `${greeting}, ${
              user?.medical_profile.legal_name.split(" ")[0]
            }! ${dayReminders}`
          );
        } else if (command.startsWith("callEmergencyContact")) {
          if (!response.includes("Click here to call your emergency contact")) {
            setResponse(
              `${response}<br><br><a href="tel:${user?.medical_profile.emergency_contact.phone_number}">📞 Click here to call your emergency contact (${user?.medical_profile.emergency_contact.name})</a>`
            );
          }
        }
      };

      handleCommand();
    }
  }, [command, response, user]);

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

    setCommand("none");
    const aiResponse = await fetchGeminiResponse(
      voiceInput,
      user?.medical_profile.medical_conditions || ""
    );
    const [userResponse, aiCommand] = aiResponse.split("%%%");
    setResponse(userResponse);
    setCommand(aiCommand);
  };

  recognition.onerror = (event: { error: unknown }) => {
    console.error("Speech Recognition Error:", event.error);
    setIsListening(false);
  };

  const handleSubmit = async () => {
    setCommand("none");
    const aiResponse = await fetchGeminiResponse(
      prompt,
      user?.medical_profile.medical_conditions || ""
    );
    const [userResponse, aiCommand] = aiResponse.split("%%%");
    setResponse(userResponse);
    setCommand(aiCommand);
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
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
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
    }, 10000);
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

      const file = new File([uintArray], "captured_image.png", {
        type: "image/png",
      });

      // Extract text from the image using Tesseract.js
      const text = await extractTextFromImage(file);
      setPrompt(
        "This text is extracted from a medicine bottle. Please use the following data to add a medication reminder: " +
          text
      );

      // Get the Gemini response
      const aiResponse = await fetchGeminiResponse(
        text,
        user?.medical_profile.medical_conditions || ""
      );
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
        <img src={cece} alt="Chatbot" className="chatbot-img" />
        <div className="textarea-container">
          <textarea
            className="textarea-input"
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="button-container">
            <button className="button send-button" onClick={handleSubmit}>
              <span>Ask Cece</span> <Send size={20} />
            </button>
            <button
              className="button voice-button"
              onClick={handleSpeechStart}
              disabled={isListening}
            >
              <Mic size={26} color="white" />
            </button>

            <button
              className="button camera-button"
              onClick={() => {
                setIsCameraActive(!isCameraActive);
                if (!isCameraActive) {
                  startCamera();
                } else {
                  stopCamera();
                }
              }}
            >
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
            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
              width={640}
              height={480}
            ></canvas>
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
    </div>
  );
};

export default ChatBot;
