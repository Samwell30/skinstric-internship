import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gallery from "../assets/gallery.png";
import camera from "../assets/camera.png";
import CameraCapture from "../components/CameraCapture";
import ImagePreview from "../components/ImagePreview";
import GalleryUpload from "../components/GalleryUpload";
import backButton from "../assets/button-icon-text-shrunk.png";

const UserImage = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const resizeImage = (fileOrBase64, maxWidth = 600, maxHeight = 600) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src =
        typeof fileOrBase64 === "string"
          ? fileOrBase64
          : URL.createObjectURL(fileOrBase64);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          } else {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8);
        resolve(resizedBase64);
      };

      img.onerror = reject;
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    try {
      const resizedBase64 = await resizeImage(file);
      await uploadBase64(resizedBase64, previewURL);
    } catch (err) {
      console.error("Error processing image:", err);
      setLoading(false);
    }
  };

  const uploadBase64 = async (base64, preview = null) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        }
      );
      const json = await res.json();

      setTimeout(() => {
        navigate("/diamond-menu", {
          state: {
            demographics: json.data,
            preview: preview || base64,
          },
        });
        setLoading(false); 
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again.");
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (showCamera && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [showCamera, cameraStream]);

  const startCamera = async () => {
    setCameraLoading(true); 
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStream(stream);
      setCameraLoading(false); 
    } catch (err) {
      alert("Camera access denied.");
      setShowCamera(false);
      setCameraLoading(false);
    }
  };

  if (cameraLoading) {
    return (
        <div className="rhombus__container">
          <div className="rhombus rhombus--large"></div>
          <div className="rhombus rhombus--medium"></div>
          <div className="rhombus__content">
          <div className="loading__wrapper">
            <p className="loading__text">Setting up camera...</p>
            <div className="dots__loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        </div>
    );
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const handleCameraCapture = async (base64) => {
    setLoading(true);
    setImagePreview(base64);
    const resizedBase64 = await resizeImage(base64);
    await uploadBase64(resizedBase64, base64);
    stopCamera();
  };

  if (loading) {
    return (
        <div className="rhombus__container">
          <div className="userimage__loading-container">
          <div className="rhombus rhombus--large"></div>
          <div className="rhombus rhombus--medium"></div>
          <div className="rhombus__content">
          <div className="loading__wrapper">
            <p className="loading__text">Processing your analysis</p>
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

  return (
    <div className="userimage__container">
      <div className="analysis">TO START ANALYSIS</div>

      <div className="userimage__preview">
        <ImagePreview imagePreview={imagePreview} />
      </div>
      <div className="userimage__center">
        <div className="userimage__actions">
          <div className="rhombus__container">
            <div className="rhombus rhombus--large"></div>
            <div className="rhombus rhombus--medium"></div>

            <div className="rhombus">
              <img
                src={camera}
                alt="Take a Selfie"
                onClick={startCamera}
                className="userimage__camera"
              />
            </div>
            <div className="camera__label-line">
              <div className="camera__label">
                ALLOW A.I.
                <br />
                TO SCAN YOUR FACE
              </div>
            </div>
          </div>
          <div className="rhombus__container">
            <div className="rhombus rhombus--large"></div>
            <div className="rhombus rhombus--medium"></div>

            <div className="rhombus">
              <GalleryUpload
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
                galleryImg={gallery}
              />
            </div>
            <div className="camera__label-line">
              <div className="camera__label">
                ALLOW A.I.
                <br />
                TO ACCESS GALLERY
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="userimage__backbtn">
        <img onClick={() => navigate("/")} src={backButton} alt="" />
      </div>
      {showCamera && (
        <CameraCapture
          videoRef={videoRef}
          canvasRef={canvasRef}
          onCapture={handleCameraCapture}
          onClose={stopCamera}
        />
      )}
    </div>
  );
};

export default UserImage;