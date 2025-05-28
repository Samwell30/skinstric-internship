import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DiamondMenu from "../components/DiamondMenu";

const DiamondMenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleDiamondClick = (section) => {
    if (section === "demographics") {
      navigate("/demographics", { state: location.state });
    }
  };

  return (
    <div className="results__wrapper">
      <DiamondMenu onDiamondClick={handleDiamondClick} />
    </div>
  );
};

export default DiamondMenuPage;