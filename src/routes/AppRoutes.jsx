import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages Imports
import LandingPage from '../pages/landing/LandingPage';
import Appreciate from '../pages/Appreciate/Appreciate';
import Interests from '../pages/Interests/Interests';
import UploadPhoto from '../pages/UploadPhoto/UploadPhoto';
import Gender from '../pages/gender/Gender';
import AskName from '../pages/AskName/AskName';
import SayHy from '../pages/SayHy/SayHy';
import Birthday from '../pages/Birthday/Birthday';
// import AskHight from '../pages/AskHight/AskHight';
import Preferences from '../pages/Preferences/Preferences';
import Celebration from '../pages/Celebration/Celebration';
import QuizPrompt from '../pages/QuizPrompt/QuizPrompt';
import PickCard from '../pages/PickCard/PickCard';
import LifestyleQuiz from '../pages/LifestyleQuiz/LifestyleQuiz';
import FinanceQuiz from '../pages/FinanceQuiz/FinanceQuiz';
import HabitQuiz from '../pages/HabitQuiz/HabitQuiz';
import RelationshipInputQuiz from '../pages/RelationshipInputQuiz/RelationshipInputQuiz';
import TopicSelector from '../pages/TopicSelector/TopicSelector';
import EmotionalQuiz from '../pages/EmotionalQuiz/EmotionalQuiz';
import EmotionalCommunication from '../pages/EmotionalCommunication/EmotionalCommunication';
import EmotionalCommQuiz from '../pages/EmotionalCommQuiz/EmotionalCommQuiz';
import Hight from '../pages/AskHight/AskHight.jsx';
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
import PickACard from '../pages/PickACard/PickACard.jsx';
import AttachmentQuiz from '../pages/AttachmentQuiz/AttachmentQuiz.jsx';
import LifestyleAndValue from '../pages/LifestyleAndValue/LifestyleAndValue.jsx';
import DatingReactionQuiz from '../pages/DatingReactionQuiz/DatingReactionQuiz.jsx';
import AttachmentEmojiQuiz from '../pages/AttachmentEmojiQuiz/AttachmentEmojiQuiz.jsx';
import CompletionScreen from '../pages/CompletionScreen/CompletionScreen.jsx';
import TopicSelection from '../pages/TopicSelection/TopicSelection.jsx';
import ConflictQuiz from '../pages/ConflictQuiz/ConflictQuiz.jsx';
import CallScreen from '../pages/HomePages/CallScreen/CallScreen.jsx';
import DateRequested from '../pages/HomePages/DateRequested/DateRequested.jsx';
import Notifications from '../pages/HomePages/Notifications/Notifications.jsx';
import VibeSurvey from '../pages/HomePages/VibeSurvey/VibeSurvey.jsx';
import DatePreferences from '../pages/HomePages/DatePreferences/DatePreferences.jsx';
import FullView from '../pages/Matches/FullView/FullView.jsx';
import RepairPatternQuiz from '../pages/RepairPatternQuiz.jsx/RepairPatternQuiz.jsx';
import ConflictRepairQuiz from '../pages/ConflictRepairQuiz/ConflictRepairQuiz.jsx';
import ChooseFocus from '../pages/ChooseFocus/ChooseFocus.jsx';
import AssessmentQuiz from '../pages/AssessmentQuiz/AssessmentQuiz.jsx';
import GrowthReadiness from '../pages/GrowthReadiness/GrowthReadiness.jsx';
import RelationshipLearning from '../pages/RelationshipLearning/RelationshipLearning.jsx';
import ViewMatches from '../pages/ViewMatches/ViewMatches.jsx';
import Upset from '../pages/Upset/Upset.jsx';
import HonestySuccess from '../pages/HonestySuccess/HonestySuccess.jsx';
import SharingSuccess from '../pages/SharingSuccess/SharingSuccess.jsx';
import { Landingroutes } from '../pages/landingfront/landingroutes.jsx';
import AskMobileNumber from '../pages/AskMobileNumber/AskMobileNumber.jsx';
import AskEmail from '../pages/AskEmail/AskEmail.jsx';




const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth & Onboarding */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/AskMobileNumber" element={<AskMobileNumber />} />
        <Route path="/gmail" element={<AskEmail />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/appreciate" element={<Appreciate />} />
        <Route path="/honestysuccess" element={<HonestySuccess />} />
        <Route path="/interests" element={<Interests />} />
        <Route path="/uploads" element={<UploadPhoto />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/askName" element={<AskName />} />
        <Route path="/hy" element={<SayHy />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/sharingSuccess" element={<SharingSuccess />} />

        {/* <Route path="/hight" element={<AskHight />} /> */}
        <Route path="/celebration" element={<Celebration />} />

        {/* Quizzes & Selection */}
        <Route path="/quiz-world" element={<QuizPrompt />} />
        <Route path="/pick-card" element={<PickCard />} />
        <Route path='/lifestyle-quiz' element={<LifestyleQuiz />} />
        <Route path='/finance-quiz' element={<FinanceQuiz />} />
        <Route path='/habit-quiz' element={<HabitQuiz />} />
        <Route path='/topic-selector' element={<TopicSelector />} />
        <Route path='/emotional-quiz' element={<EmotionalQuiz />} />
        <Route path='/emotional-communication' element={<EmotionalCommunication />} />
        <Route path='/upset' element={<Upset />} />
        <Route path='/relationship-quiz' element={<RelationshipInputQuiz />} />
        <Route path='/emotional-commQuiz' element={<EmotionalCommQuiz />} />
        <Route path='/pick-a-card' element={<PickACard />} />
        <Route path='/attachment' element={<AttachmentQuiz />} />
        <Route path='/life-style-card' element={<LifestyleAndValue />} />
        <Route path='/life-style-quiz' element={<DatingReactionQuiz />} />
        <Route path='/attach-quiz' element={<AttachmentEmojiQuiz />} />
        <Route path='/completions' element={<CompletionScreen />} />
        <Route path='/topic-selection' element={<TopicSelection />} />
        <Route path='/conflict-quiz' element={<ConflictQuiz />} />
        <Route path='/repair-patternQuiz' element={<RepairPatternQuiz />} />
        <Route path='/conflict-repair-Quiz' element={<ConflictRepairQuiz />} />
        {/* <Route path='/Choose-Focus' element={<ChooseFocus />} /> */}
        <Route path='/assessment-quiz' element={<AssessmentQuiz />} />

        <Route path='/growth-readiness' element={<GrowthReadiness />} />
        <Route path='/relationship-learning' element={<RelationshipLearning />} />
        <Route path='/view-matches' element={<ViewMatches />} />

        {/* Profile Details & Location */}
        <Route path="/hight" element={<Hight />} />
        <Route path="/intrest" element={<Intrest />} />
        <Route path="/Acesslocation" element={<AccessLocation />} />
        <Route path="/Native" element={<Native />} />
        <Route path="/About" element={<About />} />
        <Route path="/Habit" element={<Habit />} />
        <Route path="/Story" element={<Story />} />
        <Route path="/Working" element={<Working />} />
        <Route path="/Study" element={<Study />} />
        <Route path="/Work" element={<Work />} />
        <Route path="/Education" element={<Education />} />
        <Route path="/Religion" element={<Religion />} />
        <Route path="/ManualLocation" element={<ManualLocation />} />
        <Route path="/LocationSuccess" element={<LocationSuccess />} />

        {/* Home & Core App Features */}
        <Route path="/home" element={<Home />} />
        <Route path="/verify-profile" element={<VerifyProfile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule-video-call" element={<ScheduleVideoCall />} />
        <Route path="/schedule-confirmed" element={<ScheduleConfirmed />} />
        <Route path="/verified" element={<ProfileVerified />} />
        
        {/* Dates Section */}
        <Route path="/dates" element={<Dates />} />
        <Route path="/asked-out" element={<AskedOutList />} />
        <Route path="/planned-dates" element={<PlanedDates />} />
        <Route path="/plan-details" element={<PlanDetails />} />
        <Route path="/date-planned" element={<DatePlanned />} />
        <Route path="/dos-donts" element={<DosAndDonts />} />
        <Route path="/cancel-date" element={<CancelDate />} />
        <Route path="/proposed-dates" element={<ProposedDates />} />

        {/* Profile & Settings */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/Request" element={<Request />} />
        <Route path="/settings" element={<AccountSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        {/* Matches & Gallery */}
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/profile-details" element={<ProfileDetail />} />
        <Route path="/gallery-preview" element={<Gallery />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="FullView" element={<FullView />} />
        <Route path="/match" element={<Matches />} />

        {/* Communication & Vibe */}
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/curate-vibe" element={<VibeSurvey />} />
        <Route path="/date-preferences" element={<DatePreferences />} />
        <Route path="/date-requested" element={<DateRequested />} />
        <Route path="/call" element={<CallScreen />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;

// CancelDate
// ScheduleConfirmed
// QuizPrompt