import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// ✅ Define the JWT Payload type to ensure `exp` exists
interface JwtPayload {
  email: string;
  userId: string;
  exp?: number; // ✅ Optional exp field
}

export function useAuth() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token); // ✅ Type-safety

        if (decoded.exp) {
          const currentTime = Date.now() / 1000; // Convert to seconds

          if (decoded.exp < currentTime) {
            console.log("❌ Token expired");
            setUser(null);
            return;
          }
        }

        setUser(decoded);
      } catch (error) {
        console.error("❌ Invalid token:", error);
        setUser(null);
      }
    }
  }, []);

  return user; // Returns user info if logged in, otherwise null
}
