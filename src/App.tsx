import logo from "./assets/full-logo.png";
import "./App.css";
import Home from "./Home";
import UserProfile from "./components/UserProfile";
import { Login } from "./Login";
import { useAuth } from "./hooks/useAuth";

function App() {
  const user = useAuth();

  return (
    <>
      <div className="logo-container">
        <img src={logo} className="logo" alt="Care o'Clock logo" />
      </div>

      {!user ? <Login /> : (
        <>
          <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <Home />
            <UserProfile />
          </div>
        </>
      )}
    </>
  );
}

export default App;
