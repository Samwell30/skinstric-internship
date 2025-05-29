import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "../demographics.css";
import backButton from "../assets/button-icon-text-shrunk.png";
import DiamondMenu from "../components/DiamondMenu";

export default function DemographicsInfo() {
  const [activeCategory, setActiveCategory] = React.useState("race");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = React.useState(!!state);
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

  const { demographics } = state;

  return (
    <div class="demographics-page">
    <div className="results__wrapper" style={{ paddingTop: "60px" }}>
      <div className="analysis">A.I. ANALYSIS</div>
      <div className="demo-layout">
        <div className="demo-title">DEMOGRAPHICS</div>
        <p className="demo-text">PREDICTED RACE & AGE</p>
      </div>

      {!showDemo && <DiamondMenu onDiamondClick={handleDiamondClick} />}

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
                  className={`sidebar-item${
                    activeCategory === category ? " active" : ""
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
                const confidence = (data[value] * 100).toFixed(0);
                return (
                  <>
                    <span>
                      {activeCategory === "age" ? `${value} y.o.` : value}
                    </span>
                    <span
                      className="main-confidence"
                      style={{
                        marginLeft: 8,
                        fontSize: "0.9em",
                        color: "#888",
                      }}
                    >
                      {confidence}%
                    </span>
                  </>
                );
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
                    className={`confidence-item${
                      (selected[activeCategory] ||
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
        onClick={() => navigate("/diamond-menu")}
        className="left-corner-btn"
      />
    </div>
    </div>
  );
}
