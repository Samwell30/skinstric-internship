import React from "react";
import { useState, useRef } from "react";
import gallery from "../assets/gallery.png"
import { useNavigate } from "react-router-dom";

const UserImage = () => {
    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef();
    const [demographics, setDemographics] = useState(null)
    const [loading, setLoading] = useState(false);


    const resizeImage = (file, maxWidth = 600, maxHeight = 600) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {

                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {

                    const canvas = document.createElement('canvas');
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
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(resizedBase64);
                };

                img.onerror = (err) => {
                    console.error('Image load error:', err);
                    reject(err);
                };
            };

            reader.onerror = (error) => {
                console.error('FileReader error:', error);
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }


        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);

        try {
            const resizedBase64 = await resizeImage(file);
            await uploadBase64(resizedBase64);
        } catch (err) {
            console.error('Error resizing or uploading:', err);
        }
    };

    const uploadBase64 = async (base64) => {
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
                    preview: imagePreview,
                },
            });
        } catch (err) {
            console.error(err);
            alert("Upload failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
                src={gallery}
                alt="Upload from Gallery"
                onClick={() => fileInputRef.current.click()}
                style={{ cursor: 'pointer', width: '150px' }}
            />

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <div className="upload__preview">
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                    />
                ) : (
                    <span>Image preview will appear here</span>
                )}
            </div>
        </div>
    );
};

export default UserImage;
