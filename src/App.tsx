import logo from "./assets/full-logo.png";
import "./App.css";
import Home from "./Home";
import { Login } from "./Login";
import { useAuth } from "./hooks/useAuth";
import { FaUserCircle } from 'react-icons/fa';
import { Center } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "./NavBar";
import Calendar from "./Calendar";
import Profile from "./Profile";
import { Page } from "./PageEnums";


function App() {
  const user = useAuth();
  const [currPage, setCurrPage] = useState(Page.Home);

  return (
    <>
      <div className="logo-container">
        <img src={logo} className="logo" alt="Care o'Clock logo"  />
        {user && (
          <div className="profile-icon" onClick={() => setCurrPage(Page.Profile)}>
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
            {currPage === Page.Home && <Home />}
            {currPage === Page.Calendar && <Calendar />}
            {currPage === Page.Profile && <Profile />}

              <NavBar setCurrentPage={setCurrPage}/>
            </div>
          </>
        )}
      </Center>
    </>
  );
}

export default App;
