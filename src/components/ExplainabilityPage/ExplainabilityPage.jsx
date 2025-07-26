import React, { useState, useEffect, useRef } from "react";
import "./ExplainabilityPage.css";
import { useDispatch, useSelector } from "react-redux";
import { runStep1X } from "../../Redux/Step1X/Step1XAction";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { HelperUtilities } from "../../utilities/HelperUtilities";

const ExplainabilityPage = ({ uploadedImage }) => {
  const { qwenData } = useSelector((store) => store);
  const { fakeShieldData } = useSelector((store) => store);
  const { step1XData } = useSelector((store) => store);

  const dispatch = useDispatch();

  const [showSimplified, setShowSimplified] = useState(true);

  const cardRef = useRef();
  const frontRef = useRef();
  const backRef = useRef();

  // useEffect(() => {
  //   const syncHeight = () => {
  //     const frontHeight = frontRef.current.offsetHeight;
  //     const backHeight = backRef.current.offsetHeight;
  //     cardRef.current.style.height = Math.max(frontHeight, backHeight) + "px";
  //   };

  //   syncHeight();
  //   window.addEventListener("resize", syncHeight);
  //   return () => window.removeEventListener("resize", syncHeight);
  // }, [showSimplified]);

  useEffect(() => {
    if (qwenData.edit_instructions) {
      const file = HelperUtilities.dataURLtoFile(uploadedImage, "upload.png");
      dispatch(runStep1X(file, qwenData.edit_instructions));
    }
  }, [qwenData.edit_instructions]);

  const FIRST_IMAGE = {
    imageUrl: uploadedImage
  };

  const SECOND_IMAGE = {
    imageUrl: step1XData.generated_image
  };

  const isImageReady = !!step1XData.generated_image;

  return (
    <div className="explainability-container">
      <div className="images-section">
        <div className="image-block layered">
          <h3 className="section-heading">
            🧐 Original Image with Suspected Tampering
          </h3>
          {/* <p className="section-subtext">🔍 The glowing areas show where the AI thinks something's fishy.</p> */}
          <div className="image-stack">
            <img src={uploadedImage} alt="Uploaded" className="base-image" />
            <img src={fakeShieldData.mask} className="mask-layer" />
          </div>
          {Object.keys(qwenData.explanations || {}).length > 0 && (
            <p className="section-subtext">
              👁️ Look at the{" "}
              <strong>
                {(() => {
                  const entities = Object.keys(qwenData.explanations || {});
                  if (entities.length === 0) return "";
                  if (entities.length === 1) return entities[0];
                  return (
                    entities.slice(0, -1).join(", ") +
                    " and " +
                    entities[entities.length - 1]
                  );
                })()}
              </strong>
            </p>
          )}
        </div>

        <div className="image-block">
          <h3 className="section-heading">
            🧠 What AI Thinks It *Should* Look Like
          </h3>
          {isImageReady ? (
            <ReactBeforeSliderComponent
              firstImage={FIRST_IMAGE}
              secondImage={SECOND_IMAGE}
            />
          ) : (
            <div className="reconstruction-loading-wrapper">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="background-image"
              />
              <div className="reconstruction-overlay">
                <div className="shimmer-layer"></div>
              </div>
            </div>
          )}

          <p className="section-subtext">
            {isImageReady
              ? "🔍 The AI cleaned up suspicious parts to show you what might have been real."
              : "⏳ Reconstructing the untampered version..."}
          </p>
        </div>
      </div>

      <div className="flip-card-container" ref={cardRef} >
        <div className={`flip-card ${showSimplified ? "flipped" : ""}`}>


          {/* Back - Simplified */}
          <div className="flip-card-back" ref={backRef}>
            {/* <div className="card-header-with-button">
              <h2 className="section-title">✨ Simplified Explanations</h2> */}
              {/* <button
                className="card-toggle-button"
                onClick={() => setShowSimplified(false)}
              >
                ← Back to Complex Explanation
              </button> */}
            {/* </div> */}
            <div className="entity-explanation-header">
              <span>🎯 Tampered Region</span>
              <span>🧠 Why It Feels Off</span>
            </div>
            <div className="simplified-pair-container">
              {Object.keys(qwenData.explanations || {}).length > 0 &&
                Object.entries(qwenData.explanations).map(
                  ([entity, { simple_explanation, emoji }], idx) => (
                    <div className="entity-explanation-pair" key={idx}>
                      <div className="entity-card">
                        <span className="emoji">{emoji || "🕵️"}</span> {entity}
                      </div>
                      <div className="explanation-card">
                        {simple_explanation}
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainabilityPage;
