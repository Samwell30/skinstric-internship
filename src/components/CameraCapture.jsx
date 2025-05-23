import React from "react";

const CameraCapture = ({ videoRef, canvasRef, onCapture, onClose }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <video ref={videoRef} autoPlay playsInline width="300" />
    <button onClick={onCapture} className="secondary-btn" style={{ marginTop: "10px" }}>
      Capture
    </button>
    <button onClick={onClose} style={{ marginTop: "10px" }}>
      Close Camera
    </button>
    <canvas ref={canvasRef} style={{ display: "none" }} />
  </div>
);

export default CameraCapture;