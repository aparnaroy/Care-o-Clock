import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  email: string;
  userId: string;
  exp?: number;
}

export function useAuth() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  // ✅ Function to check token status
  const checkAuth = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          console.log("❌ Token expired");
          localStorage.removeItem("token"); // Remove expired token
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("❌ Invalid token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth(); // ✅ Run when component mounts

    // ✅ Listen for `storage` events (Triggers when localStorage changes)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return user; // ✅ Reactively returns user data
}
