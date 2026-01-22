import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight, Contact, X } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './Invite.css';

const Invite = () => {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);

  // Background scroll lock logic
  useEffect(() => {
    if (showContactModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showContactModal]);

  const closeModal = () => setShowContactModal(false);

  return (
    <AppLayout>
      <div className="invite-main-container">
        
        {/* HEADER */}
        <header className="invite-top-nav">
          <button className="nav-back-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="invite-nav-title">Invite</h1>
          <div className="nav-right-group">
             <div className="bell-container">
                <Bell size={26} color="#5a3c6d" />
                <span className="notification-dot"></span>
             </div>
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className={`invite-scroll-content ${showContactModal ? 'blur-bg' : ''}`}>
          
          <div className="invite-text-section slide-up">
            <h1 className="invite-heading">Be someone's wingman!</h1>
            <p className="invite-subtext">
              Invite your friends and help them find their special one!
            </p>
          </div>

          <div className="invite-form-container slide-up">
            {/* Input Trigger for Popup */}
            <div className="invite-input-wrapper" onClick={() => setShowContactModal(true)}>
              <input 
                type="text" 
                className="invite-custom-input" 
                placeholder="Search with love ..." 
                readOnly /* Readonly taaki keyboard na khule aur popup trigger ho */
              />
            </div>

            <div className="invite-input-wrapper">
              <textarea 
                className="invite-custom-textarea" 
                placeholder="Write Message......"
                rows="8"
              ></textarea>
            </div>
          </div>

          <div className="invite-action-container">
            <button className="invite-primary-btn">
              Invite
            </button>
          </div>

          <div className="footer-spacer"></div>
        </div>

        <BottomNav />

        {/* CONTACT ACCESS MODAL */}
        {showContactModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content slide-up-modal" onClick={(e) => e.stopPropagation()}>
              
              {/* Close Button */}
              <button className="modal-close-x" onClick={closeModal}>
                <X size={24} color="#5a3c6d" />
              </button>

              <div className="modal-inner">
                <div className="contact-icon-wrapper">
                   <div className="contact-card-icon">
                      <Contact size={50} color="#5a3c6d" strokeWidth={1.5} />
                   </div>
                </div>

                <h2 className="modal-title">Contact Access</h2>
                <p className="modal-subtitle">
                  Your contacts are used to help suggest connections. 
                  Your data will not be shared without consent.
                </p>

                <button className="modal-primary-btn" onClick={closeModal}>
                  Allow Access
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Invite;