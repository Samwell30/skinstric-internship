import React from "react";

const GalleryUpload = ({ fileInputRef, onFileChange, galleryImg, style }) => (
  <>
    <img
      src={galleryImg}
      alt="Upload from Gallery"
      onClick={() => fileInputRef.current.click()}
      style={style}
      className="userimage__gallery"
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
