import { Home, Calendar } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-button">
          <Home size={24} />
          <span className="text-sm">Home</span>
        </button>
      </div>
      <div className="nav-right">
        <button className="nav-button">
          <Calendar size={24} />
          <span className="text-sm">Calendar</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
