import React from "react";
import takePic from "../assets/take-pic.png";
import cameraText from "../assets/Group 39763.png"
import backButton from "../assets/button-icon-text-shrunk.png"
import { useNavigate } from "react-router-dom";

const CameraCapture = ({ videoRef, canvasRef, onCapture, onClose }) => {
  const navigate = useNavigate();
  return (
  
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#fff",
      zIndex: 1000,
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
    }}
  >
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        background: "#000",
        borderRadius: 0,
      }}
    />
    <div
      style={{
        position: "absolute",
        right: "40px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        zIndex: 1100,
      }}
    >
      <img src={takePic} alt="" onClick={onCapture} className="take-pic"/>
      <img
        src={backButton}
        alt="back button"
        onClick={() => navigate("/")}
        className="left-corner-btn"
      />
    </div>
    <canvas ref={canvasRef} style={{ display: "none" }} />
      <img className="camera-text" src={cameraText} alt="" />
  </div>
);
}

export default CameraCapture;