import React from "react";

const ImagePreview = ({ imagePreview }) => (
  <div className="upload__preview">
    {imagePreview ? (
      <img
        src={imagePreview}
        alt="Preview"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    ) : (
      <span>Image preview will appear here</span>
    )}
  </div>
);

export default ImagePreview;