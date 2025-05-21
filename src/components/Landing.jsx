import React from "react";
import right from "../assets/Rectangle 2778.png";
import left from "../assets/Rectangle 2779.png"

const Landing = () => {
    return (
        <div className="landing__page">
            <div className="arrow"></div>
            <img src={left} className="arrow left__arrow" alt="" />
            <img src={right} className="arrow right__arrow" alt="" />
            <div className="center__container">
            <h1 className="title">
                Sophisticated <br /> skincare
            </h1>
            </div>
        </div>
    );
};

export default Landing;
