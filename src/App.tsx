import logo from "./assets/full-logo.png";
import "./App.css";
import Home from "./Home";
import UserProfile from "./components/UserProfile";
import { Login } from "./Login";
import { useAuth } from "./hooks/useAuth";
import { FaUserCircle } from 'react-icons/fa';
import { Center } from "@chakra-ui/react";

function App() {
  const user = useAuth();

  return (
    <>
      <div className="logo-container">
        <img src={logo} className="logo" alt="Care o'Clock logo" />
        {user && (
          <div className="profile-icon">
            <FaUserCircle size={48} />
          </div>
        )}
      </div>

      <Center style={{ margin: "0 auto" }}>
        {!user ? (
          <Login />
        ) : (
          <>
            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <Home />
              <UserProfile />
            </div>
          </>
        )}
      </Center>
    </>
  );
}

export default App;
