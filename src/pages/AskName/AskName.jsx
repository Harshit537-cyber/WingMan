import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './AskName.css';
import { useUser } from '../../context/userinfo';
import axiosInstance from '../../api/axiosInstance';
const AskName = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchUser} = useUser();
  
  // const gender = location.state?.gender; 
  const [name, setName] = useState('');
  const data = location.state
 

  const handleNext = () => {
    if (name.trim()) {
      // ✅ Spreading location.state ensures ALL previous data (gender, etc.) 
      // is carried forward along with the new 'name'
      navigate('/hy', { 
        state: { 
          ...location.state, 
          name: name 
        } 
      }); 
    }
  };

  useEffect(()=>{
    setName(location.state.name)
  },[location?.state]);

  const UpdateName =async ()=>{
     const user = JSON.parse(localStorage.getItem('user'))

    const res = await axiosInstance.put(`/update-profile/${user._id}`,{
      name
    })
    if(res.status === 200){
      navigate('/edit-profile')
      fetchUser()
    }
  }

  return (
    <AppLayout> 
      <div className="name-screen-container">
        <div className="name-header-section">
          <OnboardingHeader 
            title="Cool, what's your name?" 
            description="I'll save it as your display name."
          />
        </div>

        <div className="name-body-content">
          <div className="name-input-box slide-up">
            <input 
              type="text" 
              className="custom-name-field" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="name-footer-action">
          <div className="footer-wavy-decoration"></div>
          {/* Logic: 
              - currentStep/totalSteps controls the circle progress
              - disabled={!name.trim()} keeps it disabled until name is typed
          */}
         {
          location?.state?.profile_edit ? <>
           <button onClick={UpdateName} className='text-xl px-6 py-1.5 font-semibold rounded-lg border border-[#523461] text-[#523461]'>
              Update
            </button>
          </> : <>
           <StepProgressButton 
            currentStep={2} 
            totalSteps={20} 
            disabled={!name?.trim()} 
            onClick={handleNext} 
          />
          </>
         }
        </div>
      </div>
    </AppLayout> 
  );
};

export default AskName;