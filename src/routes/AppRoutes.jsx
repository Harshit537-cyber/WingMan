import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import Native from '../pages/Place/Native';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Base path "/" par Landing Page dikhega */}
        <Route path="/" element={<LandingPage />} />
          <Route path="/native" element={<Native />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;