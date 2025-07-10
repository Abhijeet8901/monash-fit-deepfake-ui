import React, { useEffect } from 'react';
import './HomePage.css';
import SlidoPollPage from '../SlidoPollPage/SlidoPollPage';
import ImageEditingPage from '../ImageEditingPage/ImageEditingPage';
import ExplanabilityModulePage from '../ExplanabilityModulePage/ExplanabilityModulePage';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/image-lab" replace />} />
      <Route path='/poll' element={<SlidoPollPage />} />
      <Route path='/image-lab' element={<ImageEditingPage />} />
      <Route path='/explain-lab' element={<ExplanabilityModulePage />} />
    </Routes>
  );
};

export default HomePage;