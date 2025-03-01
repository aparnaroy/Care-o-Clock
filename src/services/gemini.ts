import axios from "axios";
// import Tesseract from "tesseract.js";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

// export const extractTextFromImage = async (imageFile: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('file', imageFile);
//   formData.append('apikey', 'API_KEY'); // Replace with your actual OCR.Space API key
  
//   try {
//     const response = await axios.post('https://api.ocr.space/parse/image', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     const text = response.data.ParsedResults[0]?.ParsedText || 'No text found';
//     return text;
//   } catch (error) {
//     console.error("Error with OCR.Space API:", error);
//     throw new Error("Error extracting text from image");
//   }
// };

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
