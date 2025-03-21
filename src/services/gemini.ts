import axios from "axios";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
  import.meta.env.VITE_GEMINI_API_KEY
}`;

export const extractTextFromImage = async (
  imageFile: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("apikey", `${import.meta.env.VITE_OCR_API_KEY}`);

  try {
    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const text = response.data.ParsedResults[0]?.ParsedText || "No text found";
    return text;
  } catch (error) {
    console.error("Error with OCR.Space API:", error);
    throw new Error("Error extracting text from image");
  }
};

export const fetchGeminiResponse = async (prompt: string, conditions: string): Promise<string> => {
  // Prepend a medical assistant context to ensure Gemini only responds to medical queries
  const medicalPrompt = `You are a medical assistant chatbot who responds to "Cece", and you only answer questions 
  related to medical topics, such as symptoms, treatment, diagnosis, medications, health conditions, 
  etc. Please be as helpful as possible by responding thoughtfully and informatively to their needs.
  The user's medical conditions are: ${conditions}. If it is relevant to the question, please incorporate
  this information into your response (e.g., "Based on your history of diabetes...").
  Please try to be concise and limit your answer to 10-50 words. Please provide a medical answer
  to the following question:

  BEGIN QUESTION: ${prompt}
  END QUESTION
  
  Please format your answer as follows: {a}%%%{b}. {a} represents the answer you provide to the
  question for the user to see. Then, 3 percent signs are used to separate the answer from the secret
  command, {b}. Finally, {b} is a string of text that matches one of the following secret commands:
  - "addAppointment:title,datetime,location,additional_info": return this command if the question asks about adding an appointment or gives
  appointment information. Make datetime the actual date and time of the event, assuming today is Sunday, March 2, 2025. If this command is used, please make {a} be a confirmation/success of 
  the appointment being added.
  - "addMedication:name,dose,frequency unit (day or week ONLY),frequency value (e.g. 5 would mean every 5 days/hours),filled_date (otherwise default to today),expiration_date (or when it ends),refills,amount (in the bottle),dates_taken)": return this command if the question asks about adding a medication or gives
  medication information. If this command is used, please make {a} be a confirmation/success of the
  medication being added.
  - "showReminders": return this command if the question is a greeting (like "good morning" or "good afternoon") or 
  asks for daily reminders. If this command is used, please make {a} either say "Good morning!" back or "Good afternoon!" back.
  - "callEmergencyContact": return this command if the question requires seeking medical attention or
  mentions calling an emergency contact, or mentions severe physical pain or distress.
  - "none": return this command if the question does not match any of the other secret commands.

  For each of these, please make sure ALL of the arguments are included in the command, even if they are empty.
  `;

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
