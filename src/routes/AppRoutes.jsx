import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import Appreciate from '../pages/Appreciate/Appreciate';
import Interests from '../pages/Interests/Interests';
import UploadPhoto  from  '../pages/UploadPhoto/UploadPhoto';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Base path "/" par Landing Page dikhega */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/appreciate" element={<Appreciate />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/uploads" element={<UploadPhoto />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;