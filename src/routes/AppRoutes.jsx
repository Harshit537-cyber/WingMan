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
import ScheduleVideoCall from '../pages/HomePages/ScheduleVideoCall/ScheduleVideoCall';
import ScheduleConfirmed from '../pages/HomePages/ScheduleConfirmed/ScheduleConfirmed';
import ProfileVerified from '../pages/HomePages/ProfileVerified/ProfileVerified';
import Dates from '../pages/Date/Dates/Dates';
import AskedOutList from '../pages/Date/AskedOutList/AskedOutList';
import PlanedDates from '../pages/Date/PlanedDates/PlanedDates';
import PlanDetails from '../pages/Date/PlanDetails/PlanDetails';
import DatePlanned from '../pages/Date/DatePlanned/DatePlanned';
import DosAndDonts from '../pages/Date/DosAndDonts/DosAndDonts';
import CancelDate from '../pages/Date/CancelDate/CancelDate';
import ProposedDates from '../pages/Date/ProposedDates/ProposedDates';
import Profile from '../pages/Profile/Profile/Profile';
import About from '../pages/About/About';
import Habit from '../pages/Habit/Habit.jsx';
import Request from '../pages/Request/Request.jsx';
import AccountSetting from '../pages/Profile/AccountSetting/AccountSetting';
import Invite from '../pages/Profile/Invite/Invite';
import ChangePassword from '../pages/Profile/ChangePassword/ChangePassword';
import Feedback from '../pages/Profile/Feedback/Feedback';
import EditProfile from '../pages/Profile/EditProfile/EditProfile';
import Matches from '../pages/Matches/Matches/Matches';
import ProfileDetail from '../pages/Matches/ProfileDetail/ProfileDetail.jsx';
import Gallery from '../pages/Matches/Gallery/Gallery.jsx';
import CallScreen from '../pages/HomePages/CallScreen/CallScreen.jsx';
import DateRequested from '../pages/HomePages/DateRequested/DateRequested.jsx';
import Appreciate from '../pages/Appreciate/Appreciate';
import Interests from '../pages/Interests/Interests';
import UploadPhoto  from  '../pages/UploadPhoto/UploadPhoto';
import Notifications from '../pages/HomePages/Notifications/Notifications.jsx';
import VibeSurvey from '../pages/HomePages/VibeSurvey/VibeSurvey.jsx';
import DatePreferences from '../pages/HomePages/DatePreferences/DatePreferences.jsx';

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
        <Route path="/About" element={<About/>} />
        <Route path="/Habit" element={<Habit/>} />
        <Route path="/Story" element={<Story/>} />
        <Route path="/Working" element={<Working/>} />
        <Route path="/Study" element={<Study/>} />
        <Route path="/Work" element={<Work/>} />
        <Route path="/Education" element={<Education/>} />
        <Route path="/Religion" element={<Religion/>} />
        <Route path="/ManualLocation" element={<ManualLocation/>} />
        <Route path="/LocationSuccess" element={<LocationSuccess/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/verify-profile" element={<VerifyProfile/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/schedule-video-call" element={<ScheduleVideoCall />} />
        <Route path="/schedule-confirmed" element={<ScheduleConfirmed />} />
        <Route path="/verified" element={<ProfileVerified />} />
        <Route path="/dates" element={<Dates />} />
        <Route path="/asked-out" element={<AskedOutList />} />
        <Route path="/planned-dates" element={<PlanedDates />} />
        <Route path="/plan-details" element={<PlanDetails />} />
        <Route path="/date-planned" element={<DatePlanned />} />
        <Route path="/dos-donts" element={<DosAndDonts />} />
        <Route path="/cancel-date" element={<CancelDate />} />
        <Route path="/proposed-dates" element={<ProposedDates />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Request" element={<Request />} />
        <Route path="/settings" element={<AccountSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/profile-details" element={<ProfileDetail />} />
        <Route path="gallery-preview" element={<Gallery />} />
        <Route path="/match" element={<Matches />} />
        <Route path="/notifications" element={<Notifications />} />
        {/* <Route path="/curate-vibee" element={<CurateVibe />} /> */}
        <Route path="/curate-vibe" element={<VibeSurvey />} />
        <Route path="/date-preferences" element={<DatePreferences />} />
        <Route path="/date-requested" element={<DateRequested />} />
        <Route path="/call" element={<CallScreen />} />
      
        <Route path="/appreciate" element={<Appreciate />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/uploads" element={<UploadPhoto />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;