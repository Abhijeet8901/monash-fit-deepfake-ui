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


  const handleGenerate = async () => {;

    try {
      const base64Image = await HelperUtilities.imageUrlToBase64(realImage.image);
      console.log("Base64 Image:", base64Image);
      // console.log("MIME Type:", mimeType); 
      dispatch(generateImage(prompt, base64Image));
    } catch (error) {
      console.error("Failed to convert image to Base64:", error);
    }
  };


  return (
    <div className="image-editing-page">
      <div className="image-section">
        <img src={realImage.image} alt="Original" className="original-image" />
      </div>

      <div className="prompt-section">
        <input
          type="text"
          value={prompt}
          placeholder="Enter your prompt..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {generatedImageUrl && (
        <div className="generated-section">
          <h3>Generated Image</h3>
          <img
            src={generatedImageUrl}
            id='base64image'
            alt="Generated"
            className="generated-image"
          />
        </div>
      )}
    </div>
  );
};

export default ImageEditingPage;
