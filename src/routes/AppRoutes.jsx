import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import Appreciate from '../pages/Appreciate/Appreciate';
import Interests from '../pages/Interests/Interests';
import UploadPhoto  from  '../pages/UploadPhoto/UploadPhoto';
import Gender from '../pages/gender/Gender';
import AskName from '../pages/AskName/AskName';
import SayHy from '../pages/SayHy/SayHy';
import Birthday from '../pages/Birthday/Birthday';
import AskHight from '../pages/AskHight/AskHight';
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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Base path "/" par Landing Page dikhega */}
          <Route path="/preference" element={<Preferences />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/appreciate" element={<Appreciate />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/uploads" element={<UploadPhoto />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/askName" element={<AskName />} />
        <Route path="/hy" element={<SayHy />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/hight" element={<AskHight />} />
        <Route path="/celebration" element={<Celebration />} />
        <Route path="/quiz-world" element={<QuizPrompt />} />
        <Route path="/pick-card" element={<PickCard />} />
        <Route path='/lifestyle-quiz' element={<LifestyleQuiz/>} />
        <Route path='/finance-quiz' element={<FinanceQuiz/>} />
        <Route path='/habit-quiz' element={<HabitQuiz/>} />
        <Route path='/topic-selector' element={<TopicSelector/>} />
        <Route path='/emotional-quiz' element={<EmotionalQuiz/>} />
        <Route path='/emotional-communication' element={<EmotionalCommunication/>} />
        <Route path='/relationship-quiz' element={<RelationshipInputQuiz/>} />
        <Route path='/emotional-commQuiz' element={<EmotionalCommQuiz/>} />


      </Routes>
    </Router>
  );
};

export default AppRoutes;

 FinanceQuiz.jsx