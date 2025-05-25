import React, { useState } from "react";
import { Link } from "react-router-dom";
import toTest from "../assets/button-icon-text-expanded.png";

const Landing = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div className="test__btn">
        <Link to="/consumerData">
          <img
            style={{ height: "70px" }}
            src={toTest}
            alt=""
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </Link>
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
