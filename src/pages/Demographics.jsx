import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "../demographics.css";

export default function DemographicsInfo() {
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

    const renderCategoryRow = (label, data, category) => {
        const [topKey, topVal] = getTopPrediction(data);
        const userVal = selected[category];

        // Final value and confidence score
        const displayValue = userVal || topKey;
        const confidenceScore = data[displayValue]; // Use user's selected or fallback to topKey

        return (
            <div className="category-row" key={category}>
                <div className="col prediction">
                    <strong>{label}:</strong>
                    <p>{displayValue}</p>
                </div>

                <div className="col confidence">
                    <p>{(confidenceScore * 100).toFixed(1)}%</p>
                    <div className="confidence-bar">
                        <div
                            className="confidence-fill"
                            style={{ width: `${confidenceScore * 100}%` }}
                        />
                    </div>
                </div>
                <div className="col user-correction">
                    <label htmlFor={`${category}-select`}>You are:</label>
                    <select
                        id={`${category}-select`}
                        value={userVal || ""}
                        onChange={(e) =>
                            setSelected((prev) => ({ ...prev, [category]: e.target.value }))
                        }
                    >
                        <option value="">-- Choose --</option>
                        {Object.entries(data)
                            .sort((a, b) => b[1] - a[1])
                            .map(([key, val]) => (
                                <option key={key} value={key}>
                                    {key} ({(val * 100).toFixed(1)}%)
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        );
    };

    return (
        <div className="results__wrapper">
            {preview && (
                <img src={preview} alt="Uploaded face" className="preview__img" />
            )}

            {!showDemo && (
                <button className="demo-btn" onClick={() => setShowDemo(true)}>
                    Show Demographics
                </button>
            )}

            {showDemo && demographics && (
                <div className="demo-table">
                    {renderCategoryRow("Race", demographics.race, "race")}
                    {renderCategoryRow("Gender", demographics.gender, "gender")}
                    {renderCategoryRow("Age", demographics.age, "age")}
                </div>
            )}

            <button onClick={() => navigate("/demographics")} className="primary-btn">
                go back
            </button>
        </div>
    );
}
