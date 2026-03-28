import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { ChevronLeft, AlignRight } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './PlanedDates.css';

const PlanedDates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plannedList = location?.state?.date || [];


  // Dummy data (Same as image)
  // const plannedList = [
  //   { id: 1, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
  //   { id: 2, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
  //   { id: 3, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
  //   { id: 4, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
  // ];
const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <AppLayout>
      <div className="planed-dates-container">
        
        {/* Header Section */}
        <header className="planed-header">
          <button className="back-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={30} color="#5a3c6d" />
          </button>
          <h1 className="planed-title">Planed Dates</h1>
          <button className="filter-btn">
            <AlignRight size={28} color="#5a3c6d" />
          </button>
        </header>

        {/* Scrollable List Area */}
        <div className="planed-scroll-view">
          <div className="dates-list-wrapper">
           {plannedList.map((item, index) => {
  const isSender = item?.senderId?._id === currentUser?._id;

  const otherUser = isSender
    ? item?.receiverId
    : item?.senderId;

  return (
    <div
      key={item._id}
      className="plan-item-card flex justify-between staggered-slide-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center space-x-1">
        
        {/* Avatar */}
        <div className="avatar-outer">
          <div className="avatar-inner-ring">
            <img
              src={
                otherUser?.profilephoto ||
                "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
              }
              alt={otherUser?.name}
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className="name-text">{otherUser?.name}</h3>
          <p className="dist-text">{item?.distance || "—"}</p>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button
          className="view-btn py-4"
          onClick={() =>
            navigate("/date-planned", {
              state: { data: item },
            })
          }
        >
          View Plan
        </button>
      </div>
    </div>
  );
})}
          </div>
          
          {/* Padding so bottom navigation doesn't overlap cards */}
          <div className="nav-bottom-spacer"></div>
        </div>

        {/* Bottom Navigation Component */}
        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default PlanedDates;