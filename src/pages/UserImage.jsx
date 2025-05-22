import React from "react";
import { useState, useRef } from "react";
// import gallery from "../assets/gallery.png";
// import camera from "../assets/camera.png";

const UserImage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);

        await uploadFile(file);
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('image', file); // adjust key if needed by API

        try {
            const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log('Upload response:', result);
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <button onClick={() => fileInputRef.current.click()}>
                Upload from Gallery
            </button>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {imagePreview && (
                <div style={{ marginTop: '1rem' }}>
                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
}

export default UserImage;
