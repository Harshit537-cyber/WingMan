import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import datingImg from '../../assets/image.svg'; 
import AppLayout from '../../components/AppLayout/AppLayout';
import { X } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  // 🔒 Lock background scroll
  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : 'unset';
  }, [activeModal]);

  const openEmailModal = () => setActiveModal('email');
  const openOtpModal = () => setActiveModal('otp');
  const closeModal = () => setActiveModal(null);

  const handleVerifyEmail = () => {
    if (!email.includes('@')) return alert('Enter valid email');
    openOtpModal();
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = () => {
    if (otp.join('').length !== 4) return alert('Enter valid OTP');
    closeModal();
    navigate('/gender');
  };

  return (
    <AppLayout>
      <div className={`landing-container ${activeModal ? 'blur-bg' : ''}`}>
        <div className="illustration-box fade-in-down">
          <img src={datingImg} alt="Dating" className="illustration-img" />
        </div>

        <div className="text-box fade-in-up">
          <h1 className="landing-title">
            Ready to stop <br />
            <span>swiping and start</span> <br />
            dating with intent?
          </h1>
        </div>

        <div className="button-box fade-in-up-delay">
          <button className="google-login-btn" onClick={openEmailModal}>
            Connect to Google
          </button>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content slide-up-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={22} />
            </button>

            {/* EMAIL MODAL */}
            {activeModal === 'email' && (
              <div className="modal-inner">
                <h2 className="modal-title">Verify Email</h2>
                <input
                  type="email"
                  className="modal-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="modal-primary-btn" onClick={handleVerifyEmail}>
                  Verify
                </button>
              </div>
            )}

            {/* OTP MODAL */}
            {activeModal === 'otp' && (
              <div className="modal-inner">
                <h2 className="modal-title">Enter OTP</h2>

                <div className="otp-input-row">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      className="otp-box"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                    />
                  ))}
                </div>

                <button className="modal-primary-btn" onClick={handleOtpSubmit}>
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default LandingPage;
