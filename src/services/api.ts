import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000";

console.log("✅ Using API URL:", API_URL);

export const getUserByEmail = async (email: string) => {
  console.log(`🔍 Fetching user from ${API_URL}/api/user/${email}`);

  try {
    const response = await axios.get(`${API_URL}/api/user/${email}`);

    console.log(`📢 Response Data:`, response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return null;
  }
};
