import React, { useState } from "react";
import takePic from "../assets/take-pic.png";
import cameraText from "../assets/Group 39763.png";
import backButton from "../assets/button-icon-text-shrunk.png";
import { useNavigate } from "react-router-dom";

const CameraCapture = ({ videoRef, canvasRef, onClose, onCapture }) => {
  const navigate = useNavigate();
  const [pictureTaken, setPictureTaken] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageUrl);
    }
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setPictureTaken(true);
  };

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
      {!pictureTaken ? (
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
      ) : (
        capturedImage && (
          <img
            src={capturedImage}
            alt="Captured"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1001,
            }}
          />
        )
      )}
      <div className="take-pic-btn">
        {!pictureTaken && (
          <img
            src={takePic}
            alt=""
            onClick={handleCapture}
          />
        )}
      </div>
      <img
        src={backButton}
        alt="back button"
        onClick={() => {
          onClose && onClose();
          navigate("/userImage");
        }}
        className="left-corner-btn"
      />      <canvas ref={canvasRef} style={{ display: "none" }} />
      <img className="camera-text" src={cameraText} alt="" />
      {pictureTaken && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            background: "rgba(0,0,0,0.6)",
            padding: "1rem",
            borderRadius: "8px",
            zIndex: 1200,
            textAlign: "center",
          }}
        >
          <p>Picture taken! You can now proceed.</p>
          <button
            onClick={() => {
              onCapture && onCapture(capturedImage);
              onClose && onClose();
            }}
            style={{ marginTop: "1rem" }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;