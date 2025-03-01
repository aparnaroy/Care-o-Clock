import axios from "axios";

// ✅ Automatically use correct backend URL (local or deployed)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/${email}`, {
      withCredentials: true, // 👈 Allow cookies/auth headers if needed
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
