import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import verifyImg from '../../../assets/verify-illustration.png'; 
import { ChevronLeft } from 'lucide-react';
import './VerifyProfile.css';

const VerifyProfile = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="verify-screen-container">
        
        {/* Fixed Header with Centered Title */}
        <div className="verify-header">
          <button className="back-btn-abs" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} />
          </button>
          <h1 className="header-title-text fade-in">Verify my profile</h1>
        </div>

        <div className="verify-scroll-area">
          <div className="verify-content-body">
            
            {/* Lavender Illustration Box */}
            <div className="illustration-container slide-up">
              <img src={verifyImg} alt="Wingmate Support" className="verify-main-img" />
            </div>

            {/* Info Card (Overlap Effect) */}
            <div className="info-card-overlap slide-up-delay">
              <h2 className="info-title">Know yourself</h2>
              <p className="info-description">
                Meet your wingmate. Get clear on what you want, why you want it, 
                and what you’re ready for. This step ensures every profile we 
                show is real, intentional, and worthy of someone else’s time.
              </p>

              <button className="schedule-action-btn" onClick={() => navigate('/schedule')}>
                Schedule
              </button>
            </div>
          </div>
          
          {/* Bottom Spacer taaki content navbar ke peeche na chhupay */}
          <div className="bottom-nav-spacer"></div>
        </div>

        {/* Background Dashed Line */}
        <div className="verify-bg-line">
          <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path d="M0,60 Q100,20 200,60 T400,60" fill="none" stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default VerifyProfile;