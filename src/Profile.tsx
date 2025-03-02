import { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaUserCircle } from 'react-icons/fa';


// Emergency Contact Type
interface EmergencyContact {
  name: string;
  phone_number: string;
}

// Medical Profile Type
interface MedicalProfile {
  legal_name: string;
  dob: string;
  emergency_contact: EmergencyContact;
  medical_conditions: string[];
}

// Medication Type
interface Medication {
  name: string;
  dose: string;
  frequency: string;
  filled_date: string;
  expiration_date: string;
  refills: number;
  amount: number;
  dates_taken: number;
}

// Appointments Type
interface Appointment {
  title: string;
  datetime: string;
  location: string;
  notes: string;
}

// Reminders Type (Includes Medications & Appointments)
interface Reminders {
  medications: Medication[];
  appointments: Appointment[];
}

// User Type
interface User {
  email: string;
  medical_profile: MedicalProfile;
  reminders: Reminders;
}

const handleLogout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("storage"));
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
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

        setUser(response.data);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setUser(null); // Ensures UI updates even if the request fails
      }
    };

    fetchUser();
  }, [API_URL]);

  return (
    <div className="container">
      {/* Name and Avatar Placeholder */}
      <div className="flex-container">
        <FaUserCircle size={48} />
        <h2 className="name-text">
          {user?.medical_profile?.legal_name || "Loading..."}
        </h2>
      </div>

      {/* Profile Details */}
      <br></br>
      <br></br>
      <Box width="100%">
        <Flex justifyContent="space-between" alignItems="flex-start" mb="10px">
          <Text
            textAlign="left"
            flexBasis="40%"
            pr="15px"
            boxSizing="border-box"
          >
            <b>DOB:</b>
          </Text>
          <Text textAlign="right" flexBasis="60%" boxSizing="border-box">
            {user?.medical_profile?.dob || "Loading..."}
          </Text>
        </Flex>
        <br></br>
        <Flex justifyContent="space-between" alignItems="flex-start" mb="10px">
          <Text
            textAlign="left"
            flexBasis="40%"
            pr="15px"
            boxSizing="border-box"
          >
            <b>Emergency Contact:</b>
          </Text>
          <Text textAlign="right" flexBasis="60%" boxSizing="border-box">
            {user?.medical_profile?.emergency_contact
              ? `${user.medical_profile.emergency_contact.name} (${user.medical_profile.emergency_contact.phone_number})`
              : "Loading..."}
          </Text>
        </Flex>
        <br></br>
        <Flex justifyContent="space-between" alignItems="flex-start" mb="10px">
          <Text
            textAlign="left"
            flexBasis="40%"
            pr="15px"
            boxSizing="border-box"
          >
            <b>Medical Condition(s):</b>
          </Text>
          <Text textAlign="right" flexBasis="60%" boxSizing="border-box">
            {user?.medical_profile?.medical_conditions.length
              ? user.medical_profile.medical_conditions.join(", ")
              : "None"}
          </Text>
        </Flex>
        <br></br>
      </Box>

      {/* Sign Out Button */}
      <button className="sign-out-button" onClick={handleLogout}>
        SIGN OUT
      </button>
    </div>
  );
};

export default Profile;
