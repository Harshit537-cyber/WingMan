import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ChevronLeft, Bell, AlignRight, X } from "lucide-react";
import AppLayout from "../../components/AppLayout/AppLayout";
import BottomNav from "../../components/BottomNav/BottomNav";
import "./Request.css";
import { useCallRequests } from "../../context/callanddate";
import axiosInstance from "../../api/axiosInstance";
import { useUser } from "../../context/userinfo";
import { useNotification } from "../../context/notification";
const Request = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Call");
  const {unreadCount,  fetchUnReadNotifi } = useNotification();
 
  const { callRequests, loading, fetchCallRequests } = useCallRequests();
  const { requestedDateReq, fetchUser } = useUser();


  const handleChangeStatus = useCallback(async (status, senderId) => {
    
    try {
      const userId = (localStorage.getItem("userId"));
      const fcmToken = localStorage.getItem("fcmToken");

      const res = await axiosInstance.post(
        `/call-request/reciever/change-status?receiverId=${userId}&senderId=${senderId}`,
        {
          status: status,
          // senderFcmToken: fcmToken,
        },
      );

      console.log(res?.data);
      fetchCallRequests();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(()=>{
    fetchUnReadNotifi();
  },[])


  useEffect(() => {
    if (location?.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  useEffect(() => {
    fetchUser();
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
            <div onClick={()=>navigate('/notifications')} style={{ position: "relative", display: "inline-block" }}>
                         <Bell size={26} color="#5a3c6d" />
           
                         {unreadCount > 0 && (
                           <span
                             style={{
                               position: "absolute",
                               top: "-6px",
                               right: "-6px",
                               background: "red",
                               color: "white",
                               borderRadius: "50%",
                               padding: "2px 6px",
                               fontSize: "10px",
                               fontWeight: "bold",
                               minWidth: "18px",
                               textAlign: "center",
                               cursor:"pointer"
                             }}
                           >
                             {unreadCount > 99 ? "99+" : unreadCount}
                           </span>
                         )}
                       </div>
            <button className="nav-icon-btn">
              <AlignRight size={24} color="#5a3c6d" />
            </button>
          </div>
        </header>

        {/* TABS - Fixed at top */}
        <div className="tab-container-wrap">
          <div className="segmented-control-bar">
            <button
              className={`control-tab-btn ${activeTab === "Call" ? "is-active" : ""}`}
              onClick={() => setActiveTab("Call")}
            >
              Call Request
            </button>
            <button
              className={`control-tab-btn ${activeTab === "Date" ? "is-active" : ""}`}
              onClick={() => setActiveTab("Date")}
            >
              Date Request
            </button>
          </div>
        </div>

        {/* SCROLLABLE LIST AREA */}
        {activeTab === "Call" && (
          <>
            <div className="requests-scroll-area slide-up">
              {callRequests.length > 0
                ? callRequests.map((value, index) => (
                    <div key={index} className="ui-request-card-item">
                      <div className="card-left-part">
                        <div className="avatar-circle">
                          <img
                            src={
                              value?.senderId?.profilephoto ||
                              `https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg`
                            }
                            alt="User"
                          />
                        </div>
                        <div className="user-details-box">
                          <h4 className="user-name-text">
                            {value?.senderId?.name}
                          </h4>
                          <p className="request-sub-text">
                            {activeTab === "Call"
                              ? "Requested for call"
                              : "Asked you out"}
                          </p>
                        </div>
                      </div>

                      <div className="card-right-part">
                        <button
                          className="confirm-purple-btn"
                          onClick={() =>
                            handleChangeStatus("accepted", value.senderId._id)
                          }
                        >
                          Confirm
                        </button>
                        <button
                          className="cancel-x-btn"
                          onClick={() =>
                            handleChangeStatus("rejected", value.senderId._id)
                          }
                        >
                          <X size={24} strokeWidth={3} color="#5a3c6d" />
                        </button>
                      </div>
                    </div>
                  ))
                : "No call request Received Yet 😌"}
              {/* Bottom spacer ensures the last card isn't hidden by BottomNav */}
              <div className="footer-spacer"></div>
            </div>
          </>
        )}
        {activeTab === "Date" && (
          <>
            <div className="requests-scroll-area slide-up">
              {requestedDateReq?.length > 0
                ? requestedDateReq.map((value, index) => (
                    <div key={index} className="ui-request-card-item">
                      <div
                        onClick={() =>
                          navigate("/plan-details", {
                            state: {
                              id: value?.senderId?._id,
                              name: value?.senderId?.name,
                            },
                          })
                        }
                        className="card-left-part"
                      >
                        <div className="avatar-circle">
                          <img
                            src={
                              value?.senderId?.profilephoto ||
                              `https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg`
                            }
                            alt="User"
                          />
                        </div>
                        <div className="user-details-box">
                          <h4 className="user-name-text">
                            {value?.senderId?.name}
                          </h4>
                          <p className="request-sub-text">
                            {activeTab === "Call"
                              ? "Requested for call"
                              : "Asked you out"}
                          </p>
                        </div>
                      </div>

                      <div className="card-right-part">
                        <button
                          className={` ${
                            value?.status === "rejected"
                              ? "bg-red-100 text-red-500 cursor-not-allowed px-4 py-2 rounded-lg font-semibold"
                              : "confirm-purple-btn"
                          }`}
                          onClick={() =>
                            navigate("/plan-details", {
                              state: {
                                id: value?.senderId?._id,
                                name: value?.senderId?.name,
                              },
                            })
                          }
                        >
                          {value.status == "rejected"
                            ? value.status
                            : "View Plan"}
                        </button>
                      </div>
                    </div>
                  ))
                : "No Date request Received Yet 😌"}
              {/* Bottom spacer ensures the last card isn't hidden by BottomNav */}
              <div className="footer-spacer"></div>
            </div>
          </>
        )}

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Request;
