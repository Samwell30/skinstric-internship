import React from "react";
import { useState, useRef, useEffect } from "react";
import backButton from "../assets/button-icon-text-shrunk.png";
import { Link } from "react-router-dom";
import proceed from "../assets/proceed-icon-text-shrunk.png";

const ConsumerData = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState("name");
  const [status, setStatus] = useState(null);
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const locationInputRef = useRef(null);

  const isValidInput = (value) => {
    const trimmed = value.trim();
    const onlyLettersAndSpaces = /^[A-Za-z\s]+$/;
    return trimmed.length > 0 && onlyLettersAndSpaces.test(trimmed);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isValidInput(name)) {
        setNameError(
          "Please enter a valid name without numbers or special characters."
        );
        return;
      }
      setNameError("");
      setStep("location");
    }
  };

  useEffect(() => {
    if (step === "location" && locationInputRef.current) {
      locationInputRef.current.focus();
    }
  }, [step]);

  const handleLocationKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isValidInput(location)) {
        setLocationError(
          "Please enter a valid location without numbers or special characters."
        );
        return;
      }

      setLocationError("");
      setStep("loading");

      try {
        const res = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, location }),
          }
        );
        const data = await res.json();
        if (data.success) {
          setStatus({ type: "success" });
        } else {
          setStatus({ type: "error", text: data.message || "Unknown error" });
        }
      } catch (err) {
        setStatus({ type: "error", text: err.message });
      } finally {
        setStep("status");
      }
    }
  };

  const handleProceed = () => { };

  return (
    <div className="consumer__page">
      <div className="analysis">TO START ANALYSIS</div>
      <div className="back__btn">
        <Link to="/">
          <img src={backButton} alt="" />
        </Link>
      </div>
      {step === "name" && (
        <div className="rhombus__container">
          <div className="rhombus rhombus--large"></div>
          <div className="rhombus rhombus--medium"></div>
          <div className="rhombus">
            <div className="rhombus__content">
              <div className="input__wrapper">
                <label htmlFor="name" className="input__label">
                  Click to type
                </label>
                {nameError && <p className="input__error">{nameError}</p>}
                <input
                  className="user__input"
                  type="text"
                  name="name"
                  placeholder="Introduce Yourself"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "location" && (
        <div className="rhombus__container">
          <div className="rhombus rhombus--large"></div>
          <div className="rhombus rhombus--medium"></div>
          <div className="rhombus">
            <div className="input__wrapper">
              <label htmlFor="location" className="input__label">
                Where are you from?
              </label>
              {locationError && <p className="input__error">{locationError}</p>}
              <input
                className="user__input"
                type="text"
                name="location"
                placeholder="Enter City Name"
                autoComplete="off"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleLocationKeyDown}
                ref={locationInputRef}
              />
            </div>
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="rhombus__container">
          <div className="rhombus rhombus--large"></div>
          <div className="loading__wrapper">
            <p className="loading__text">Processing submission...</p>
            <div className="dots__loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {step === "status" && status && (
        <div className="rhombus__container">
          <div className="rhombus rhombus--large"></div>
          <div className="rhombus rhombus--medium"></div>
          <div className="rhombus">
            <div className="rhombus__content">
              <div className="status__wrapper">
                {status.type === "success" ? (
                  <>
                    <div className="thank__you">Thank you!</div>
                    <p className="proceed__text">Proceed for the next step</p>
                  </>
                ) : (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontSize: "1.25rem",
                    }}
                  >
                    {status.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {step === "status" && status && status.type === "success" && (
        <div className="proceed__btn">
          <Link to="/userImage">
            <img src={proceed} onClick={handleProceed} alt="" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ConsumerData;
