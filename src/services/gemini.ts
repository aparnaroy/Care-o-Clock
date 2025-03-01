import axios from "axios";

// const API_KEY = "AIzaSyC-Ph81VmtMhlsfE8dn3afyR1WEqLM_Mow"; // Replace with your key
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC-Ph81VmtMhlsfE8dn3afyR1WEqLM_Mow`;

export const fetchGeminiResponse = async (prompt: string) => {
  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const aiResponse = response.data.candidates?.[0]?.content?.parts?.map((part: { text: unknown; }) => part.text).join("\n") || "No response";
    
    return aiResponse;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Error fetching response";
  }
};
