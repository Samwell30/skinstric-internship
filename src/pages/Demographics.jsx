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

  const getTopPrediction = (dataObj) => {
    return Object.entries(dataObj).sort((a, b) => b[1] - a[1])[0];
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Preparing your analysis...</p>
      </div>
    );
  }

  const { demographics, preview } = state;

  return (
    <div className="results__wrapper">
      {!showDemo && (
        <button className="demo-btn" onClick={() => setShowDemo(true)}>
          Show Demographics
        </button>
      )}
      { }

      {showDemo && demographics && (
        <div className="demo-table">
          <div className="demo-table-row">
            <div className="demo-table-col label-col">
              {["race", "gender", "age"].map((category) => {
                const data = demographics[category];
                const [topKey] = getTopPrediction(data);
                const value = selected[category] || topKey;
                return (
                  <div
                    key={category}
                    className={`label-item${activeCategory === category ? " active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                    style={{ cursor: "pointer", marginBottom: "2rem" }}
                  >
                    <div style={{ fontSize: "1rem", color: "#0052d9", marginBottom: "0.25rem" }}>
                      {value}
                    </div>
                    <strong
                      style={{
                        color: activeCategory === category ? "#0052d9" : "inherit",
                      }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </strong>
                  </div>
                );
              })}
            </div>
            <div className="demo-table-col confidence-col">
              {(() => {
                const data = demographics[activeCategory];
                const [topKey] = getTopPrediction(data);
                const userVal = selected[activeCategory];
                const displayValue = userVal || topKey;
                const confidenceScore = data[displayValue];
                return (
                  <div className="confidence-row">
                    <p>{(confidenceScore * 100).toFixed(1)}%</p>
                    <div className="confidence-bar">
                      <div
                        className="confidence-fill"
                        style={{ width: `${confidenceScore * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="demo-table-col user-col">
              {(() => {
                const data = demographics[activeCategory];
                const userVal = selected[activeCategory];
                return (
                  <div className="user-row">
                    {Object.entries(data)
                      .sort((a, b) => b[1] - a[1])
                      .map(([key, val]) => (
                        <div
                          key={key}
                          className={`user-value${userVal === key ? " selected" : ""}`}
                          onClick={() =>
                            setSelected((prev) => ({
                              ...prev,
                              [activeCategory]: key,
                            }))
                          }
                          style={{
                            cursor: "pointer",
                            padding: "0.5rem 1rem",
                            margin: "0.25rem 0",
                            border: userVal === key ? "2px solid #0052d9" : "1px solid #ccc",
                            borderRadius: "6px",
                            background: userVal === key ? "#e6f0fa" : "#fff",
                          }}
                        >
                          {key} ({(val * 100).toFixed(1)}%)
                        </div>
                      ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      <img src={backButton} onClick={() => navigate("/userImage")} className="primary-btn left-corner-btn" />
    </div>
  );
}
