import React, { useEffect } from "react";
import ExplainabilityPage from "../ExplainabilityPage/ExplainabilityPage";
import LoadingExplanationPage from "../LoadingExplanationPage/LoadingExplanationPage";
import { useDispatch, useSelector } from "react-redux";
import { HelperUtilities } from "../../utilities/HelperUtilities";
import { runFakeShieldDTE } from "../../Redux/FakeShield/FakeShieldAction";
import { useLocation, useNavigate } from "react-router-dom";
import { PagePaths } from "../../constants/Pages";

const ExplanabilityModulePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { imageToExplain } = location.state || {};

  const dispatch = useDispatch();
  useEffect(() => {
    if (imageToExplain) {
      const file = HelperUtilities.dataURLtoFile(imageToExplain);
      dispatch(runFakeShieldDTE(file));
    } else navigate(PagePaths.IMAGE_LAB);
  }, [imageToExplain]);

  const { explanations: qwenExplanations } = useSelector(
    (store) => store.qwenData
  );

  const qwenDataLoaded = Object.keys(qwenExplanations || {}).length > 0;
  return (
    <div>
      {!qwenDataLoaded ? (
        <LoadingExplanationPage uploadedImage={imageToExplain} />
      ) : (
        <ExplainabilityPage uploadedImage={imageToExplain} />
      )}
    </div>
  );
};

export default ExplanabilityModulePage;
