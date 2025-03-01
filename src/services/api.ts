import axios from "axios";

const API_URL = "/api/user"; // Automatically works for both local & Railway

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
