import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "../demographics.css";
import backButton from "../assets/button-icon-text-shrunk.png";

export default function DemographicsInfo() {
  const [activeCategory, setActiveCategory] = React.useState("race");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [showDemo, setShowDemo] = React.useState(false);
  const [selected, setSelected] = React.useState({
    race: "",
    gender: "",
    age: "",
  });

  const handleDiamondClick = (section) => {
    if (section === "demographics") setShowDemo(true);
  };

  const getTopPrediction = (dataObj) => {
    return Object.entries(dataObj).sort((a, b) => b[1] - a[1])[0];
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="rhombus__container">
        <div className="rhombus rhombus--large"></div>
        <div className="rhombus rhombus--medium"></div>
        <div className="rhombus">
          <div className="rhombus__content">
            <div className="loading-screen">
              <p>Preparing your analysis...</p>
              <div className="dots__loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { demographics, preview } = state;

  return (
    <div className="results__wrapper">
      {!showDemo && (
        <div className="diamond-menu-center">
          <div className="diamond-menu">
            <div className="diamond-row">
              <div
                className="diamond diamond-top"
                onClick={() => handleDiamondClick("demographics")}
              >
                <span>DEMOGRAPHICS</span>
              </div>
            </div>
            <div className="diamond-row">
              <div
                className="diamond diamond-left"
                onClick={() => handleDiamondClick("skinType")}
              >
                <span>
                  SKIN TYPE
                  <br /> DETAILS
                </span>
              </div>
              <div
                className="diamond diamond-right"
                onClick={() => handleDiamondClick("cosmeticConcerns")}
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
                onClick={() => handleDiamondClick("weather")}
              >
                <span>WEATHER</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDemo && demographics && (
        <div className="demo-table">
          <div className="demo-sidebar">
            {["race", "age", "gender"].map((category) => {
              const data = demographics[category];
              const [topKey] = getTopPrediction(data);
              const value = selected[category] || topKey;
              return (
                <div
                  key={category}
                  className={`sidebar-item${activeCategory === category ? " active" : ""
                    }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <div className="sidebar-value">{value}</div>
                  <div className="sidebar-label">{category.toUpperCase()}</div>
                </div>
              );
            })}
          </div>

          <div className="demo-main">
            <div className="main-value">
              {(() => {
                const data = demographics[activeCategory];
                const [topKey] = getTopPrediction(data);
                const value = selected[activeCategory] || topKey;
                return activeCategory === "age" ? `${value} y.o.` : value;
              })()}
            </div>
            <div className="main-circle">
              {(() => {
                const data = demographics[activeCategory];
                const [topKey] = getTopPrediction(data);
                const value = selected[activeCategory] || topKey;
                const confidence = (data[value] * 100).toFixed(0);
                return (
                  <svg width="220" height="220">
                    <circle
                      cx="110"
                      cy="110"
                      r="100"
                      stroke="#ddd"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="110"
                      cy="110"
                      r="100"
                      stroke="#222"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 100}
                      strokeDashoffset={2 * Math.PI * 100 * (1 - data[value])}
                      style={{ transition: "stroke-dashoffset 0.5s" }}
                    />
                    <text
                      x="110"
                      y="120"
                      textAnchor="middle"
                      fontSize="36"
                      fill="#222"
                    >
                      {confidence}%
                    </text>
                  </svg>
                );
              })()}
            </div>
          </div>

          <div className="demo-confidence">
            <div className="confidence-header">
              <span>{activeCategory.toUpperCase()}</span>
              <span>A.I. CONFIDENCE</span>
            </div>
            <div className="confidence-list">
              {Object.entries(demographics[activeCategory])
                .sort((a, b) => b[1] - a[1])
                .map(([key, val]) => (
                  <div
                    key={key}
                    className={`confidence-item${(selected[activeCategory] ||
                        getTopPrediction(demographics[activeCategory])[0]) ===
                        key
                        ? " active"
                        : ""
                      }`}
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [activeCategory]: key,
                      }))
                    }
                  >
                    <span>{key}</span>
                    <span>{(val * 100).toFixed(0)}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {showDemo && selected[activeCategory] && (
        <div className="demo-actions">
          <button
            className="reset-btn"
            onClick={() =>
              setSelected((prev) => ({
                ...prev,
                [activeCategory]: "",
              }))
            }
          >
            Reset
          </button>
          <button
            className="confirm-btn"
            onClick={() => {
              // Handle confirm logic here
              // For example, save or submit the selected value
            }}
          >
            Confirm
          </button>
        </div>
      )}
      {showDemo && (
        <div className="select-text">
          If A.I. estimate is wrong, select the correct one.
        </div>
      )}

      <img
        src={backButton}
        alt="back button"
        onClick={() => navigate("/userImage")}
        className="left-corner-btn"
      />
    </div>
  );
}
