import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import Gender from '../pages/gender/Gender';
import AskName from '../pages/AskName/AskName';
import SayHy from '../pages/SayHy/SayHy';
import Birthday from '../pages/Birthday/Birthday';
import AskHight from '../pages/AskHight/AskHight';
import Intrest from '../pages/Intrest/Intrest';
import AccessLocation from '../pages/AccessLocation/AccessLocation';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Base path "/" par Landing Page dikhega */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/askName" element={<AskName />} />
        <Route path="/hy" element={<SayHy />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/hight" element={<AskHight />} />
        <Route path="/intrest" element={<Intrest />} />
        <Route path="/Acesslocation" element={<AccessLocation />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;