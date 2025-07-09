import React, { useState } from "react";
import { pollImageData } from "../../assets/poll_images";
import "./ImageEditingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { generateImage } from "../../Redux/Gemini/GeminiAction";
import { HelperUtilities } from "../../utilities/HelperUtilities";

const ImageEditingPage = () => {
  const [prompt, setPrompt] = useState("");
  const realImage = pollImageData.find((img) => img.secret === "Real");

  const dispatch = useDispatch();
  const { loading, generatedImageUrl, error } = useSelector(
    (store) => store.geminiData
  );

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    try {
      const base64Image = await HelperUtilities.imageUrlToBase64(
        realImage.image
      );
      dispatch(generateImage(prompt, base64Image));
    } catch (error) {
      console.error("Failed to convert image to Base64:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  return (
    <div className="image-editing-page">
      <h2 className="page-title">🧠 Image Editing Lab</h2>

      <div
        className={`image-pair ${
          loading || generatedImageUrl ? "two-column" : "single-column"
        }`}
      >
        <div className="image-box">
          <h3>Original Image</h3>
          <img src={realImage.image} alt="Original" className="image-display" />

          {/* {loading && (
            <div className="reconstruction-loading-wrapper">
              <img
                src={realImage.image}
                alt="Loading Preview"
                className="background-image"
              />
              <div className="reconstruction-overlay">
                <div className="shimmer-layer"></div>
              </div>
            </div>
          )} */}
        </div>

        {(loading || generatedImageUrl) && (
          <div className="image-box">
            <h3>Generated Image</h3>
            {!generatedImageUrl ? (
              <div className="reconstruction-loading-wrapper">
                <img
                  src={realImage.image}
                  alt="Loading Preview"
                  className="background-image"
                />
                <div className="reconstruction-overlay">
                  <div className="shimmer-layer"></div>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={generatedImageUrl}
                  alt="Generated"
                  className="image-display"
                />
                <button className="explain-button" onClick={() => {}}>
                  Explain
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="prompt-row">
        <input
          type="text"
          value={prompt}
          placeholder="Describe what you'd like to add or edit..."
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "..." : "Generate 🔄"}
        </button>
      </div>
    </div>
  );
};

export default ImageEditingPage;
