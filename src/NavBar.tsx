import { Home, Calendar } from "lucide-react";
import { Page } from "./PageEnums";

const NavBar = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-button" onClick={() => setCurrentPage(Page.Home)}>
          <Home size={24} />
          <span className="text-sm">Home</span>
        </button>
      </div>
      <div className="nav-right">
        <button className="nav-button" onClick={() => setCurrentPage(Page.Calendar)}>
          <Calendar size={24}></Calendar>
          <span className="text-sm">Calendar</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
