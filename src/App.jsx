import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Typewriter from "./components/Typewriter";

import "./styles/App.css";

import NewHome from "./pages/NewHome";
import PlayerProfile from "./pages/PlayerProfile";
import NotFound from "./pages/NotFound";
import Home from "@mui/icons-material/Home";
import HoverButtonComponent from "./components/HoverButtonComponent";
import { GitHub } from "@mui/icons-material";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGitHub = () => {
    window.open("https://github.com/ksaii");
  };

  return (
    <div className="App">
      <header style={{ display: "flex", justifyContent: "center", alignItems: "center" , flexDirection: "column"}}>

        <h1
          style={{ width: "fit-content", alignItems: "center",margin: "15px 0 " }}
          id="logoTitle"
        >
          <Typewriter text="League Stat Tracker" typingSpeed={150} />
        </h1>
        <div style={{ paddingBottom:'5px',display: "flex", gap: "20px", alignItems: "center", flexDirection: "row"}}>
        <HoverButtonComponent
          width="5vw"
          height="3vh"
          text=""
          onClick={handleGoHome}
          icon={Home}
        ></HoverButtonComponent>
             <HoverButtonComponent
          height="3vh"
          width="5vw"
          text=""
          icon={GitHub}
          onClick={handleGitHub}
        />
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<NewHome />} />
          <Route path="/profile/:summonerName" element={<PlayerProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        <p>© 2025 League Stat Tracker</p>
      </footer>
    </div>
  );
}

export default App;
