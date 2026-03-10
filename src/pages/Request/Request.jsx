import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight, X } from 'lucide-react';
import AppLayout from '../../components/AppLayout/AppLayout';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Request.css';
import  {useCallRequests} from '../../context/callanddate'
import axiosInstance from '../../api/axiosInstance';
import { useUser } from '../../context/userinfo'
const Request = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Call');
  const { callRequests, loading, fetchCallRequests, }= useCallRequests();
  const { daterequest} = useUser();
  console.log(daterequest)

  // Extended mock data to ensure scrolling is visible
  const requestsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 const handleChangeStatus = useCallback(async (status, senderId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axiosInstance.post(
      `/call-request/reciever/change-status?receiverId=${user._id}&senderId=${senderId}`,
      {
        status: status,
      }
    );

    console.log(res?.data);
    fetchCallRequests();
  } catch (error) {
    console.log(error);
  }
}, []);

  return (
    <AppLayout>
      <div className="requests-page-main">
        
        {/* HEADER - Fixed at top */}
        <header className="request-header">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <div className="right-nav-icons">
            <button className="nav-icon-btn"><Bell size={24} color="#5a3c6d" /></button>
            <button className="nav-icon-btn"><AlignRight size={24} color="#5a3c6d" /></button>
          </div>
        </header>

        {/* TABS - Fixed at top */}
        <div className="tab-container-wrap">
          <div className="segmented-control-bar">
            <button 
              className={`control-tab-btn ${activeTab === 'Call' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('Call')}
            >
              Call Request
            </button>
            <button 
              className={`control-tab-btn ${activeTab === 'Date' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('Date')}
            >
              Date Request
            </button>
          </div>
        </div>

        {/* SCROLLABLE LIST AREA */}
        {
          activeTab === 'Call' && (
            <>
            <div className="requests-scroll-area slide-up">
          {callRequests.length >0 && callRequests.map((value, index) => (
            <div key={index} className="ui-request-card-item">
              <div className="card-left-part">
                <div className="avatar-circle">
                  <img 
                    src={ value?.senderId?.profilephoto ||`https://randomuser.me/api/portraits/women/${40 + index}.jpg`} 
                    alt="User" 
                  />
                </div>
                <div className="user-details-box">
                  <h4 className="user-name-text">{value?.senderId?.name}</h4>
                  <p className="request-sub-text">
                    {activeTab === 'Call' ? 'Requested for call' : 'Asked you out'}
                  </p>
                </div>
              </div>

              <div className="card-right-part">
                <button className="confirm-purple-btn"  onClick={() => handleChangeStatus("accepted", value.senderId._id)}>Confirm</button>
                <button className="cancel-x-btn" onClick={()=>handleChangeStatus('rejected',value.senderId._id)}>
                  <X size={24} strokeWidth={3}  color="#5a3c6d" />
                </button>
              </div>
            </div>
          ))}
          {/* Bottom spacer ensures the last card isn't hidden by BottomNav */}
          <div className="footer-spacer"></div>
        </div>
            </>
          )
        }
        {
          activeTab === 'Date' && (
            <>
            <div className="requests-scroll-area slide-up">
          {daterequest?.length > 0 && daterequest.map((value, index) => (
            <div key={index} className="ui-request-card-item">
              <div className="card-left-part">
                <div className="avatar-circle">
                  <img 
                    src={ value?.senderId?.profilephoto ||`https://randomuser.me/api/portraits/women/${40 + index}.jpg`} 
                    alt="User" 
                  />
                </div>
                <div className="user-details-box">
                  <h4 className="user-name-text">{value?.senderId?.name}</h4>
                  <p className="request-sub-text">
                    {activeTab === 'Call' ? 'Requested for call' : 'Asked you out'}
                  </p>
                </div>
              </div>

              <div className="card-right-part">
                <button className="confirm-purple-btn"  onClick={() => handleChangeStatus("accepted", value.senderId._id)}>Confirm</button>
                <button className="cancel-x-btn" onClick={()=>handleChangeStatus('rejected',value.senderId._id)}>
                  <X size={24} strokeWidth={3}  color="#5a3c6d" />
                </button>
              </div>
            </div>
          ))}
          {/* Bottom spacer ensures the last card isn't hidden by BottomNav */}
          <div className="footer-spacer"></div>
        </div>
            </>
          )
        }
        

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Request;