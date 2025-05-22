import React from "react";
import { Link } from "react-router-dom";
import toTest from "../assets/button-icon-text-expanded.png"

const Landing = () => {
    return (
        <>
            <div className="test__btn">
            <Link to="/consumerData">
                <img style={{ height: "70px"}} src={toTest} alt=""/>
            </Link>
            </div>
        <div className="landing__page">
            <div className="center__container">
                <h1 className="title">
                    Sophisticated <br /> skincare
                </h1>
            </div>
        </div>
        </>
    );
};

export default Landing;
