import { useState, useEffect } from 'react';
import "./App.css";
import ChatBot from "./Chatbot";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState<string>("");
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

        setName(response.data.medical_profile.legal_name.split(" ")[0]);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setName(""); // Ensures UI updates even if the request fails
      }
    };

    fetchUser();
  }, [API_URL]);

  return (
    <div className="home-container">
      <h1>{ name ? "Welcome, " + name + "!" : "Welcome!" }!</h1>
      <p>How can I help you today?</p>
      <ChatBot />
    </div>
  );
};

export default Home;
