import { useEffect, useState } from "react";
import { getUserByEmail } from "../services/api";

// Define User Type
interface MedicalProfile {
  legal_name: string;
  dob: string;
  emergency_contact: string;
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
      const data: User | null = await getUserByEmail("johndoe@gmail.com");
      console.log("Fetched User:", data);
      setUser(data);
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
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
