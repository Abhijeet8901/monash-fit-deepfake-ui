import React, { useState } from 'react';
import { pollImageData } from '../../assets/poll_images';
import SlidoResultsPage from '../SlidoResultsPage/SlidoResultsPage';
import './SlidoPollPage.css';

const SlidoPollPage = () => {
  const [showResults, setShowResults] = useState(false);

  if (showResults) {
    return <SlidoResultsPage />;
  }

  return (
    <div className="poll-container">
      <h2>Which image do you think is a deepfake?</h2>

      <div className="image-grid">
        {pollImageData.map((img, index) => (
          <div key={img.id} className="image-card">
            <img src={img.image} alt={img.alt || `Image ${index + 1}`} />
            <div className="image-number">{index + 1}</div>
          </div>
        ))}
      </div>

      <button onClick={() => setShowResults(true)} className="submit-button">
        View Results
      </button>
    </div>
  );
};

export default SlidoPollPage;
