import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "../demographics.css";

export default function DemographicsInfo() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [showDemo, setShowDemo] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [selected, setSelected] = React.useState({
        race: null,
        gender: null,
        age: null,
    });

    React.useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timeout);
    }, []);

    if (!state?.demographics) {
        return (
            <div className="center-box">
                <p>No data found. Please upload an image first.</p>
                <button onClick={() => navigate("/")}>Go back</button>
            </div>
        );
    }

    const { demographics, preview } = state;

    const renderList = (obj, category) =>
        Object.entries(obj)
            .sort((a, b) => b[1] - a[1])
            .map(([key, val]) => {
                const isSelected = selected[category] === key;
                return (
                    <li
                        key={key}
                        className={`list-item ${isSelected ? "selected" : ""}`}
                        onClick={() =>
                            setSelected((prev) => ({ ...prev, [category]: key }))
                        }
                    >
                        {key}: {(val * 100).toFixed(1)}%
                    </li>
                );
            });

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Preparing your analysis...</p>
            </div>
        );
    }

    return (
        <div className="results-wrapper">

            {/* uploaded preview */}
            {preview && <img src={preview} alt="Uploaded face" className="preview-img" />}

            {/* show-demographics button */}
            {!showDemo && (
                <button className="demo-btn" onClick={() => setShowDemo(true)}>
                    Show Demographics
                </button>
            )}

            {/* demographics grid */}
            {showDemo && (
                <div className="demo-grid">
                    <section className="category-card">
                        <h3>Race</h3>
                        <ul>{renderList(demographics.race, "race")}</ul>
                    </section>

                    <section className="category-card">
                        <h3>Gender</h3>
                        <ul>{renderList(demographics.gender, "gender")}</ul>
                    </section>

                    <section className="category-card">
                        <h3>Age</h3>
                        <ul>{renderList(demographics.age, "age")}</ul>
                    </section>
                </div>
            )}

            {/* corrections summary */}
            {showDemo && Object.values(selected).some(Boolean) && (
                <div className="summary-box">
                    <p><strong>Your corrections:</strong></p>
                    <ul>
                        {selected.race && <li>Race:   {selected.race}</li>}
                        {selected.gender && <li>Gender: {selected.gender}</li>}
                        {selected.age && <li>Age:    {selected.age}</li>}
                    </ul>
                    <button
                        className="reset-btn"
                        onClick={() => setSelected({ race: null, gender: null, age: null })}
                    >
                        Reset corrections
                    </button>
                </div>
            )}

            <button onClick={() => navigate("/userImage")} className="primary-btn">
                Analyze another image
            </button>
        </div>
    );
}