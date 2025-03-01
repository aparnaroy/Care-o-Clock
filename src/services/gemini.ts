import axios from "axios";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

export const fetchGeminiResponse = async (prompt: string): Promise<string> => {
  // Prepend a medical assistant context to ensure Gemini only responds to medical queries
  const medicalPrompt = `You are a medical assistant chatbot, and you should only answer questions related to medical topics, 
      such as symptoms, treatment, diagnosis, medications, health conditions, etc. Please provide a medical answer to the 
      following question: ${prompt}`;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: medicalPrompt }] }],
    });

    const aiResponse =
      response.data.candidates?.[0]?.content?.parts
        ?.map((part: { text: string }) => part.text)
        .join("\n") || "No response";

    return aiResponse;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Error fetching response";
  }
};
