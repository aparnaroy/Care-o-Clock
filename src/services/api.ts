import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/user"; // Use env variable or fallback to local

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
