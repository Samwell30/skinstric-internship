import React from "react";

const ImagePreview = ({ imagePreview }) => (
  <div className="upload__preview-wrapper">
    <div className="upload__preview-label">Preview</div>
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
      ) : null}
    </div>
  </div>
);

export default ImagePreview;