import logo from "./assets/full-logo.png";
import "./App.css";
import ChatBot from "./Chatbot";
import UserProfile from "./components/UserProfile";
import { Login } from "./Login";
import Home from "./Home";
// import ProfilePage from './Profile'

function App() {
  return (
    <>
      <div className="logo-container">
        <img src={logo} className="logo" alt="Care o'Clock logo" />
      </div>
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <Home />
        {/* <ProfilePage /> */}
        {/* <Login /> */}
        {/* <ChatBot /> */}
        {/* <UserProfile /> */}
      </div>
    </>
  );
}

export default App;
