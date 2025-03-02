import logo from "./assets/full-logo.png";
import "./App.css";
import Home from "./Home";
import { Login } from "./Login";
import { useAuth } from "./hooks/useAuth";
import { Avatar, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Calendar from "./Calendar";
import Profile from "./Profile";
import { Page } from "./PageEnums";
import axios from "axios";

function App() {
  const user = useAuth();
  const [currPage, setCurrPage] = useState(Page.Home);
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

        setName(response.data.medical_profile.legal_name);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setName(""); // Ensures UI updates even if the request fails
      }
    };

    fetchUser();
  }, [API_URL]);

  return (
    <>
      <div className="logo-container">
        <img
          src={logo}
          className="logo"
          alt="Care o'Clock logo"
          onClick={() => setCurrPage(Page.Home)}
        />
        {user && (
          <div
            className="profile-icon"
            onClick={() => setCurrPage(Page.Profile)}
          >
            <Avatar.Root>
              <Avatar.Fallback name={name ? name : "AA"} />
              <Avatar.Image src="https://bit.ly/broken-link" />
            </Avatar.Root>
          </div>
        )}
      </div>

      <Center style={{ margin: "0 auto" }}>
        {!user ? (
          <Login />
        ) : (
          <>
            <div style={{ paddingLeft: "0", paddingRight: "0" }}>
              {currPage === Page.Home && <Home />}
              {currPage === Page.Calendar && <Calendar />}
              {currPage === Page.Profile && <Profile />}

              <NavBar setCurrentPage={setCurrPage} />
            </div>
          </>
        )}
      </Center>
    </>
  );
}

export default App;
