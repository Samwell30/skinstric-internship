import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "../demographics.css";

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

      {showDemo && demographics && (
        <div className="demo-table">
          <div className="demo-table-row">
            <div className="demo-table-col label-col">
              {["race", "gender", "age"].map((category) => (
                <div
                  key={category}
                  className={`label-item${
                    activeCategory === category ? " active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                  style={{ cursor: "pointer", marginBottom: "2rem" }}
                >
                  <strong
                    style={{
                      color:
                        activeCategory === category ? "#0052d9" : "inherit",
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </strong>
                </div>
              ))}
            </div>
            <div className="demo-table-col confidence-col">
              {(() => {
                const data = demographics[activeCategory];
                const [topKey] = getTopPrediction(data);
                const userVal = selected[activeCategory];
                const displayValue = userVal || topKey;
                const confidenceScore = data[displayValue];
                const percent = (confidenceScore * 100).toFixed(1);

                const radius = 28;
                const stroke = 6;
                const normalizedRadius = radius - stroke / 2;
                const circumference = normalizedRadius * 2 * Math.PI;
                const offset = circumference - confidenceScore * circumference;

                return (
                  <div className="confidence-row">
                    <svg
                      height={radius * 2}
                      width={radius * 2}
                      className="circular-spinner"
                    >
                      <circle
                        stroke="#e0e0e0"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                      />
                      <circle
                        stroke="#4caf50"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        style={{ transition: "stroke-dashoffset 0.5s" }}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dy=".3em"
                        fontSize="1.1rem"
                        fontWeight="bold"
                        fill="#333"
                      >
                        {percent}%
                      </text>
                    </svg>
                  </div>
                );
              })()}
            </div>{" "}
            <div className="demo-table-col user-col">
              {(() => {
                const data = demographics[activeCategory];
                const userVal = selected[activeCategory];
                return (
                  <div className="user-row">
                    <select
                      id={`${activeCategory}-select`}
                      value={userVal || ""}
                      onChange={(e) =>
                        setSelected((prev) => ({
                          ...prev,
                          [activeCategory]: e.target.value,
                        }))
                      }
                    >
                      {Object.entries(data)
                        .sort((a, b) => b[1] - a[1])
                        .map(([key, val]) => (
                          <option key={key} value={key}>
                            {key} ({(val * 100).toFixed(1)}%)
                          </option>
                        ))}
                    </select>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => navigate("/userImage")} className="primary-btn">
        go back
      </button>
    </div>
  );
}
