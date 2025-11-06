import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/intro.css";

// ✅ Import images dynamically from src/assets
import collegeLogo from "../assets/CLG_LOGO.png"; // rectangular
import sympoLogo from "../assets/SYMPO.jpg"; // round logo 1
import clubLogo from "../assets/clublogo.png"; // round logo 2

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      {/* College Logo */}
      <img src={collegeLogo} alt="College Logo" className="college-logo" />

      {/* Symposium + Club Logos side by side */}
      <div className="logo-row">
        <img src={sympoLogo} alt="Symposium Logo" className="circle-logo" />
        <img src={clubLogo} alt="Club Logo" className="circle-logo" />
      </div>

      {/* Symposium Title */}
      <h1 className="sympo-title">INNOVATION IGNITE SYMPOSIUM</h1>

      {/* Navigation Button */}
      <Button
        variant="contained"
        color="primary"
        className="enter-btn"
        onClick={() => navigate("/home")}
      >
        Enter Site
      </Button>
    </div>
  );
};

export default Intro;
