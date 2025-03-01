import { useEffect, useState } from "react";
import { getUserByEmail } from "../services/api";

const UserProfile = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserByEmail("johndoe@gmail.com");
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.medical_profile?legal_name}</p>
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
