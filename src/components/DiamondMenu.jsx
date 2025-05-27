import React from "react";
import { useNavigate } from "react-router-dom";
import backButton from "../assets/button-icon-text-shrunk.png";


const DiamondMenu = ({ onDiamondClick }) => {
  const navigate = useNavigate();

  return (
  <div className="diamond-menu-center">
    <div className="analysis">A.I ANALYSIS
    <p>A. I. has estimated the following. <br />
Fix estimated information if needed.</p>
    </div>

    <div className="diamond-menu">
      <div className="diamond-row">
        <div
          className="diamond diamond-top"
          onClick={() => onDiamondClick("demographics")}
        >
          <span>DEMOGRAPHICS</span>
        </div>
      </div>
      <div className="diamond-row">
        <div
          className="diamond diamond-left"
          onClick={() => onDiamondClick("skinType")}
        >
          <span>
            SKIN TYPE
            <br /> DETAILS
          </span>
        </div>
        <div
          className="diamond diamond-right"
          onClick={() => onDiamondClick("cosmeticConcerns")}
        >
          <span>
            COSMETIC
            <br />
            CONCERNS
          </span>
        </div>
      </div>
      <div className="diamond-row">
        <div
          className="diamond diamond-bottom"
          onClick={() => onDiamondClick("weather")}
        >
          <span>WEATHER</span>
        </div>
      </div>
    </div>
          <img
        src={backButton}
        alt="back button"
        onClick={() => navigate("/userImage")}
        className="left-corner-btn"
      />

  </div>
  )
}

export default DiamondMenu;