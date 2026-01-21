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
import Native from '../pages/Place/Native';
import Story from '../pages/Story/Story';
import Working from '../pages/Working/Working';
import Study from '../pages/Study/Study';
import Work from '../pages/Work/Work';
import Education from '../pages/Education/Education';
import Religion from '../pages/Religion/Religion';
import ManualLocation from '../pages/ManualLocation/ManualLocation';
import LocationSuccess from '../pages/LocationSuccess/LocationSuccess';
import Home from '../pages/HomePages/Home/Home';
import VerifyProfile from '../pages/HomePages/VerifyProfile/VerifyProfile';
import Schedule from '../pages/HomePages/Schedule/Schedule';
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
        <Route path="/Native" element={<Native/>} />
        <Route path="/Story" element={<Story/>} />
        <Route path="/Working" element={<Working/>} />
        <Route path="/Study" element={<Study/>} />
        <Route path="/Work" element={<Work/>} />
        <Route path="/Education" element={<Education/>} />
        <Route path="/Religion" element={<Religion/>} />
        <Route path="/ManualLocation" element={<ManualLocation/>} />
        <Route path="/LocationSuccess" element={<LocationSuccess/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home/*" element={<VerifyProfile/>} />
        <Route path="/schedule" element={<Schedule/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;