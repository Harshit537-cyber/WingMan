import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../../components/AppLayout/AppLayout';
import scheduledImg from '../../../assets/scheduled-illustration.png';
import './ScheduleConfirmed.css';
import axiosInstance from '../../../api/axiosInstance';
const ScheduleConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false)

  // Data from previous screen state
  const date = location.state?.date || 16;
  const month = location.state?.month || "Jan";
  const time = location.state?.time || "11:00AM";
  const meetLink = location.state.meetLink
  const doc_id = location?.state?.doc_id;
  const dates = `${date}-${month}`
  


  const Confirmstatus = async()=>{
  
    const user = JSON.parse(localStorage.getItem('user'))
    try{
      const InterviewConfirm = await axiosInstance.patch(`/confirm-status/${doc_id}`,{
        userId :user._id,
        meetLink,
        dates,
        time

      })
  
      if(InterviewConfirm.data.success === true){
        // navigate('/verified')
        setShow(true);
      }


    }catch(error){
      console.log(error.message)
    }
    
  }

  return (
    <AppLayout>
      <div className="confirmed-page-container">
        
        <h1 className="confirmed-header fade-in">Schedule Video Call</h1>

        <div className="confirmed-illustration slide-up">
          <img src={scheduledImg} alt="Scheduled Call" className="main-illustration" />
        </div>

        {/* --- EXACT SAME CARD UI --- */}
        <div className="status-card-container slide-up-delay">
          <div className="status-card-content">
            
            {/* Left Side: Calendar & Reschedule */}
            <div className="status-left-section">
              <div className="mini-calendar-icon">
                <div className="mini-calendar-top-hooks">
                    <span></span>
                    <span></span>
                </div>
                <div className="mini-calendar-inner-box">
                  <span className="mini-date-text">{date}{month.substring(0,3)}</span>
                </div>
              </div>
              <button className="reschedule-action-text" onClick={() => navigate('/schedule')}>
                Reschedule
              </button>
            </div>

            {/* Right Side: Status & Time */}
            <div className="status-right-section">
              <h2 className="today-label">Today</h2>
              <p className="scheduled-time-text">{time}</p>
            </div>

          </div>
        </div>

        <p className="google-meet-info fade-in-slow">
          Google meet link : <span className="link-placeholder text-blue-500">{meetLink}</span>
        </p>

        <div className="bottom-action-area">
  <button 
    className="status-scheduled-btn" 

    // onClick={() => navigate('/verified')} // Is line ko add karein
    onClick={Confirmstatus}
  >
    Scheduled
  </button>
</div>

        <div className="footer-wave-bg">
          <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
            <path d="M0,80 Q100,40 200,80 T400,80" fill="none" stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

      </div>

      {
        <AnimatePresence>
      {show && (
        <div style={overlay}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={modal}
          >
            <h2 style={{ marginBottom: "10px", color: "#28a745" }}>
              🎉 Interview Scheduled!
            </h2>

            <p style={text}>
              Your interview has been successfully scheduled.
            </p>

            <div style={card}>
              <p><strong>📅 Date:</strong> {dates}</p>
              <p><strong>⏰ Time:</strong> {time}</p>
              <p>
                <strong className='text-lg text-red-500'>Be there Join on ime</strong>{" "}
               
              </p>
            </div>

            <button style={btn} onClick={()=> {
              setShow(false),
              navigate('/home')
            }}>
             Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
      }
    </AppLayout>
  );
};

export default ScheduleConfirmed;

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};


const text = {
  fontSize: "14px",
  color: "#555",
  marginBottom: "15px",
};

const card = {
  background: "#f8f9fa",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  textAlign: "left",
};

const btn = {
  background: "#28a745",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};