import React from "react";

const GalleryUpload = ({ fileInputRef, onFileChange, galleryImg }) => (
  <>
    <img
      src={galleryImg}
      alt="Upload from Gallery"
      onClick={() => fileInputRef.current.click()}
      style={{ cursor: "pointer", width: "150px" }}
    />
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={onFileChange}
      style={{ display: "none" }}
    />
  </>
);

export default GalleryUpload;
