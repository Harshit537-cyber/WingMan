import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, AlignRight } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./AskedOutList.css";

const AskedOutList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;


  // Dummy data based on image
  const requests = [
    {
      id: 1,
      name: "Emelie",
      distance: "10km away",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Emelie",
      distance: "10km away",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Emelie",
      distance: "10km away",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 4,
      name: "Emelie",
      distance: "10km away",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <AppLayout>
      <div className="asked-out-container">
        {/* Header Section */}
        <header className="asked-out-header">
          <button className="nav-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={30} color="#5a3c6d" />
          </button>
          <h1 className="header-title-text">Someone Asked You Out</h1>
          <button className="filter-btn">
            <AlignRight size={28} color="#5a3c6d" />
          </button>
        </header>

        <div className="asked-out-scroll-body">
          <div className="request-list">
            {data?.map((value, index) => (
              <div
                key={index}
                className="request-item-card slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* <img
                        src={
                          value?.senderId?.profilephoto ||
                          `https://randomuser.me/api/portraits/men/${index + 10}.jpg`
                        }
                        alt={value?.senderId?.name}
                      /> */}
                <div className="user-avatar-box">
                  <div className="avatar-ring">
                    <img
                      src={
                        value?.senderId?.profilephoto ||
                        `https://randomuser.me/api/portraits/men/${index + 10}.jpg`
                      }
                      alt={value?.senderId?.name}
                    />
                  </div>
                </div>

                <div className="user-details-box">
                  <h3 className="user-name">{value?.senderId?.name}</h3>
                  <h4 className="font-semibold text-gray-500 text-xs">
                    {value?.senderId?.state}
                  </h4>
                </div>

                <button
                  className="view-plan-action-btn"
                  onClick={() => navigate("/plan-details", {
                    state:{id:value?.senderId?._id , name: value?.senderId?.name}
                  })}
                >
                  View Plan
                </button>
              </div>
            ))}
            {/* {requests.map((item, index) => (
              <div 
                key={item.id} 
                className="request-item-card slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
              
                <div className="user-avatar-box">
                  <div className="avatar-ring">
                    <img src={item.img} alt={item.name} />
                  </div>
                </div>

                <div className="user-details-box">
                  <h3 className="user-name">{item.name}</h3>
                  <p className="user-distance">{item.distance}</p>
                </div>

        
                <button className="view-plan-action-btn" onClick={() => navigate('/plan-details')}>
                  View Plan
                </button>
              </div>
            ))} */}
          </div>

          {/* Spacer for BottomNav */}
          <div className="bottom-nav-padding"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default AskedOutList;
