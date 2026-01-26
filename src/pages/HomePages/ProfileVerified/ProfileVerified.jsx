import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import './ProfileVerified.css';

const ProfileVerified = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="verified-page-container">
        
        {/* Top Header */}
        <h1 className="verified-header-text fade-in">Verified</h1>

        <div className="verified-card-wrapper">
          <div className="verified-card slide-up">
            
            {/* Animated Checkmark Circles */}
            <div className="checkmark-outer-circle pop-in">
              <div className="checkmark-inner-circle">
                <Check size={40} color="white" strokeWidth={4} />
              </div>
            </div>

            <h2 className="verified-title">Your Profile is Verified</h2>

            <p className="verified-message">
              Congratulations, We are going ahead with your profile. 
              Please continue with your compatibility quiz.
            </p>

            <button className="home-back-btn" onClick={() => navigate('/home')}>
              Take me home
            </button>
          </div>
        </div>

        {/* Decorative Dashed Wave */}
        <div className="verified-bottom-wave">
          <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
            <path d="M0,80 Q100,40 200,80 T400,80" fill="none" stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

      </div>
    </AppLayout>
  );
};

export default ProfileVerified;