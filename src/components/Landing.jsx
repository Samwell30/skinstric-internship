import React, { useState } from "react";
import { Link } from "react-router-dom";
import toTest from "../assets/button-icon-text-expanded.png";
import discover from "../assets/DiscoverA.I.png"

const Landing = () => {
  const [hovered, setHovered] = useState(false);
  const [hideDiscover, setHideDiscover] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth > 900) {
      setHovered(true);
      setHideDiscover(true);
    }
  };
  const handleMouseLeave = () => {
    if (window.innerWidth > 900) {
      setHovered(false);
      setHideDiscover(false);
    }
  };

  return (
    <>
      {!hideDiscover && (
        <div className="discover__btn" style={{ position: "absolute", left: -155, top: "32%", zIndex: 1 }}>
          <div className="rhombus--button">
            <div className="rhombus--button-content">
              <Link to="/discover">
                <img
                  src={discover}
                  alt=""
                  style={{ marginLeft: "240px", height: "32px" }}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
      <div
        className="test__btn"
        style={{ position: "absolute", right: 155, top: "32%", zIndex: 1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="rhombus--button">
          <div className="rhombus--button-content">
            <Link to="/consumerData">
              <img
                src={toTest}
                alt=""
                style={{ marginRight: "220px", height: "50px" }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="landing__page">
        <h1 className={`title${hovered ? " title--left-abs" : ""}`}>
          Sophisticated <br /> skincare
        </h1>
        <p className="description--para">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
      </div>
    </>
  );
};

export default Landing;