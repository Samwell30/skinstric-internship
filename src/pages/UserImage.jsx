import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gallery from "../assets/gallery.png";
import CameraCapture from "../components/CameraCapture";
import ImagePreview from "../components/ImagePreview";
import GalleryUpload from "../components/GalleryUpload";

const UserImage = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef();
    const [loading, setLoading] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);

    const resizeImage = (fileOrBase64, maxWidth = 600, maxHeight = 600) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = typeof fileOrBase64 === "string" ? fileOrBase64 : URL.createObjectURL(fileOrBase64);

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

        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);

        try {
            const resizedBase64 = await resizeImage(file);
            await uploadBase64(resizedBase64, previewURL);
        } catch (err) {
            console.error("Error processing image:", err);
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

            navigate("/demographics", {
                state: {
                    demographics: json.data,
                    preview: preview || base64,
                },
            });
        } catch (err) {
            console.error(err);
            alert("Upload failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showCamera && videoRef.current && cameraStream) {
            videoRef.current.srcObject = cameraStream;
        }
    }, [showCamera, cameraStream]);

    const startCamera = async () => {
        setShowCamera(true); // Show the video element first
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStream(stream); // Save the stream in state
        } catch (err) {
            console.error("Camera error:", err);
            alert("Camera access denied: " + err.name + " - " + err.message);
            setShowCamera(false);
        }
    };

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

    const captureSelfie = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Ensure video is ready
        if (!video.videoWidth || !video.videoHeight) {
            alert("Camera not ready. Please try again.");
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL("image/jpeg", 0.8);
        setImagePreview(base64);
        const resizedBase64 = await resizeImage(base64);
        await uploadBase64(resizedBase64, base64);

        stopCamera(); // Stop camera after capture
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            {/* Upload from Gallery */}
            <GalleryUpload fileInputRef={fileInputRef} onFileChange={handleFileChange} galleryImg={gallery} />

            {/* Take a Selfie */}
            <button onClick={startCamera} className="primary-btn">
                Take a Selfie
            </button>

            {showCamera && (
                <CameraCapture
                    videoRef={videoRef}
                    canvasRef={canvasRef}
                    onCapture={captureSelfie}
                    onClose={stopCamera}
                />
            )}

            <ImagePreview imagePreview={imagePreview} />

            <a href="/">
                <button>Go back</button>
            </a>
        </div>
    );
};

export default UserImage;
