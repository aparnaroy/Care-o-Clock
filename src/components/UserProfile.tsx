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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("❌ No token found, user not logged in.");
          return;
        }

        const response = await axios.get("https://care-o-clock.up.railway.app/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched User:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.medical_profile?.legal_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>DOB:</strong> {user.medical_profile?.dob}</p>
          <p><strong>Emergency Contact:</strong> {user.medical_profile?.emergency_contact.name} ({user.medical_profile?.emergency_contact.phone_number})</p>
          <p><strong>Medical Conditions:</strong> {user.medical_profile?.medical_conditions.join(", ")}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;