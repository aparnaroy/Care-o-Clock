import { useEffect, useState } from "react";
import axios from "axios";

// Define User Type
interface EmergencyContact {
  name: string;
  phone_number: string;
}

interface MedicalProfile {
  legal_name: string;
  dob: string;
  emergency_contact: EmergencyContact;
  medical_conditions: string[];
}

interface User {
  email: string;
  medical_profile: MedicalProfile;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || "https://care-o-clock.up.railway.app";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("❌ No token found, user not logged in.");
        return;
      }

      try {
        console.log("📢 Sending request to:", `${API_URL}/api/profile`);

        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Server Response:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setUser(null); // Ensures UI updates even if the request fails
      }
    };

    fetchUser();
  }, [API_URL]); // ✅ Include API_URL as a dependency

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>
            <strong>Name:</strong> {user.medical_profile?.legal_name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>DOB:</strong> {user.medical_profile?.dob}
          </p>
          <p>
            <strong>Emergency Contact:</strong> {user.medical_profile?.emergency_contact.name} (
            {user.medical_profile?.emergency_contact.phone_number})
          </p>
          <p>
            <strong>Medical Conditions:</strong> {user.medical_profile?.medical_conditions.join(", ")}
          </p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
