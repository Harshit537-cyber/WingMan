import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Native.css';

const Native = () => {
  const [selectedState, setSelectedState] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];


  const handleNext = () => {
    if (selectedState) {
      // ✅ Changing key to 'state' to match your network requirements
      navigate('/story', {
        state: {
          ...location.state,
          state: selectedState
        }
      });
    }
  };

  return (
    <AppLayout>
      <div className="native-screen-container">

        {/* Background Animation */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path d="M-50,550 C100,500 350,500 350,350 C350,200 100,200 100,350 C100,450 250,500 450,450"
              stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

        {/* TOP SECTION: Left Aligned Header */}
        <div className="native-header-section">
          <OnboardingHeader
            title="What state do you call home?"
            description="It’s good to know where’s someone story began."
          />
        </div>

        {/* MIDDLE SECTION: Custom Select area */}
        <div className="native-body-content">
          <div className="select-box-wrapper slide-up-delay">
            <div className="custom-select-container">
              <select
                className="native-dropdown-field"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="" disabled hidden>Select State</option>
                {states.map((st, index) => (
                  <option key={index} value={st}>{st}</option>
                ))}
              </select>
              <div className="dropdown-chevron">
                <ChevronDown size={24} color="#8B6FA8" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Fixed Footer */}
        <div className="native-footer-action">
          <div className="footer-wavy-decoration"></div>

          {/* 
              Logic:
              - currentStep={6} (Ye 6th step hai)
              - totalSteps={15} (Sequence ke hisab se)
              - disabled={!selectedState} (Jab tak state select nahi hogi tab tak disabled)
          */}
          <StepProgressButton
            currentStep={6}
            totalSteps={15}
            disabled={!selectedState}
            onClick={handleNext}
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Native;