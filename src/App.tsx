import logo from "./assets/full-logo.png";
import "./App.css";
import ChatBot from "./Chatbot";
import UserProfile from "./components/UserProfile";
import { Login } from "./Login";
// import ProfilePage from './Profile'

function App() {
  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      {/* <ProfilePage /> */}
      <Login />
      <ChatBot />
      <UserProfile />
    </>
  );
}

export default App;
