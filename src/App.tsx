import logo from "./assets/full-logo.png";
import "./App.css";
import ChatBot from "./Chatbot";
import UserProfile from "./components/UserProfile";
import { Login } from "./Login";
import { useAuth } from "./hooks/useAuth";

function App() {
  const user = useAuth();

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>

      {!user ? <Login /> : (
        <>
          <ChatBot />
          <UserProfile />
        </>
      )}
    </>
  );
}

export default App;
