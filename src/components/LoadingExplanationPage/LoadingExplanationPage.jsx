import React, { useState, useEffect } from 'react';
import './LoadingExplanationPage.css';
import { runQwen } from '../../Redux/Qwen/QwenAction';
import { runFakeShieldMFLM } from '../../Redux/FakeShield/FakeShieldAction';
import { useDispatch, useSelector } from "react-redux";
import { HelperUtilities } from '../../utilities/HelperUtilities';

const LoadingExplanationPage = ({ uploadedImage }) => {

    const messages = [
        "🔍 Analyzing image with AI models...",
        "🧠 Detecting signs of manipulation...",
        "📝 Simplifying explanation for humans..."
    ];

    const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
    const { complex_explanation: fakeShieldComplexExplanation} = useSelector((store) => store.fakeShieldData);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const sequence = [8000, 8000, 8000]; // total 24s
        let index = 0;

        const timer = () => {
        if (index < sequence.length - 1) {
            setTimeout(() => {
            setCurrentMsgIndex(++index);
            timer();
            }, sequence[index]);
        }
        };

        timer();
    }, []);

    useEffect(() => {
        if (fakeShieldComplexExplanation) {
    
          const file = HelperUtilities.dataURLtoFile(uploadedImage, "upload.png");
          dispatch(runFakeShieldMFLM(file, fakeShieldComplexExplanation));
          dispatch(runQwen(file, fakeShieldComplexExplanation));
        }
      }, [fakeShieldComplexExplanation]);   

    return (
        <div className="loading-screen">
        <div className="loading-image-wrapper">
            <img src={uploadedImage} alt="Analyzing" className="loading-image" />
            <div className="scan-overlay" />
        </div>
        <p className="loading-text">{messages[currentMsgIndex]}</p>
        </div>
    );
};

export default LoadingExplanationPage;