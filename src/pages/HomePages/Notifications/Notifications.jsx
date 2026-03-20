import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, AlignRight, X, ChevronRight } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./Notifications.css";
import { useUser } from "../../../context/userinfo";
import axiosInstance from "../../../api/axiosInstance";
import { useNotification } from "../../../context/notification";
const Notifications = () => {
  const navigate = useNavigate();
  const { fetchUnReadNotifi } = useNotification();
  const [activeTab, setActiveTab] = useState("All");
  const { notification, dateRequest_notifications, callRequest_notifications, fetchUser } =
    useUser();
    const [notifications, setNotifications] = useState([]);
    const [date_request_notifications, setDateRequestNotifications] = useState([]);
    const [call_request_notifications, setCallRequestNotifications] = useState([]);
  console.log(
    "notification : ",
    notification,
    dateRequest_notifications,
    callRequest_notifications,
  );

  useEffect(() => {
    setNotifications(notification);
    setDateRequestNotifications(dateRequest_notifications);
    setCallRequestNotifications(callRequest_notifications);
  }, [notification, dateRequest_notifications, callRequest_notifications]);

  const tabs = ["All", "Dating", "Calls"];
  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);

    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleNotificationClick = async (notif) => {
    if (!notif?.isRead) {
      await markAsRead(notif._id);
    }

    // 👉 navigation logic
    if (notif?.type === "call request") {
      if (notif.title === "New Call Request") {
        navigate("/Request");
      } else {
        navigate("/matches/profile-details", {
          state: { receverId: notif?.receiverId },
        });
      }
    }

    if (notif?.type === "date request") {
      if (notif.title === "New Date Request") {
        navigate("/Request", {
          state: { activeTab: "Date" },
        });
      }else{
        navigate("/dates", )
      }
    }
  };

 const markAsRead = async (doc_id) => {
  try {
    await axiosInstance.patch(`read-notification/${doc_id}`);
    await fetchUser();
    fetchUnReadNotifi();
    // ✅ Update UI instantly
    setNotifications((prev) =>
      prev.map((item) =>
        item._id === doc_id ? { ...item, isRead: true } : item
      )
    );
    setDateRequestNotifications((prev) =>
      prev.map((item) =>
        item._id === doc_id ? { ...item, isRead: true } : item
      )
    );
    setCallRequestNotifications((prev) =>
      prev.map((item) =>
        item._id === doc_id ? { ...item, isRead: true } : item
      )
    );

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {}, []);
  return (
    <AppLayout>
      <div className="notif-wrapper">
        {/* HEADER */}
        <header className="notif-top-nav">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="nav-title">Notifications</h1>
          <div className="header-right">
           
            <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        {/* CATEGORY TABS */}
        <div className="tabs-scroll-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-pill ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "All" && (
          <>
            <div className="notif-content slide-up">
              <div className="notif-stack">
                {/* CARD 1: Nikita Asked Out (Large Confirm Button) */}

                {notifications.length === 0 ? (
                  <div className="no-notif-placeholder">
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications?.map((notif, index) => (
                    <>
                      <div
                        onClick={() => handleNotificationClick(notif)}
                        key={index}
                        className={`figma-notif-card ${
                          notif?.isRead ? "bg-white" : "bg-purple-200"
                        }`}
                      >
                        <div className="card-main-row">
                          <div className="user-info-side">
                            <img
                              src={notif.AcceptingPersonImage}
                              className="avatar-50"
                              alt="user"
                            />
                            <div className="text-side">
                              <h4 className="user-name">
                                {
                                  notif.title == 'Interview Update' ?( <>
                                    {notif?.title}
                                    
                                    </>):(
                                   <>

                                    {notif?.body?.trim()?.split(" ").pop()}
                                    </>
                                  )
                                }
                              </h4>
                              <p className="notif-label"> <p dangerouslySetInnerHTML={{ __html: notif.body }} /></p>
                            </div>
                          </div>
                          <div className="right-action-side">
                            <span className="time-text">
                              {getTimeAgo(notif.updatedAt)}
                            </span>
                            {notif?.type === "call request" && (
                              <>
                                {notif.title == "New Call Request" ? (
                                  <>
                                    <button
                                      className="btn-confirm-78"
                                      // onClick={() =>
                                      //   navigate("/Request")
                                      // }
                                    >
                                      View
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn-confirm-78"
                                      // onClick={() =>
                                      //   navigate("/matches/profile-details", {
                                      //     state: { receverId: notif?.receiverId },
                                      //   })
                                      // }
                                    >
                                      View Profile
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                            {notif?.type === "date request" && (
                              <>
                                {notif.title == "New Date Request" ? (
                                  <>
                                    <button
                                      className="btn-confirm-78"
                                      onClick={() =>
                                        navigate("/Request", {
                                          state: { activeTab: "Date" },
                                        })
                                      }
                                    >
                                      View
                                    </button>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                )}

                {/* CARD 2: Nikita Requested Call (Small Buttons) */}
                {/* <div className="figma-notif-card">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Nikita</h4>
                    <p className="notif-label">Requested for call</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">12m ago</span>
                  <div className="btn-group-row-sm">
                    <button className="btn-delete-52">Delete</button>
                    <button className="btn-confirm-52">Confirm</button>
                  </div>
                </div>
              </div>
            </div> */}

                {/* CARD 3: Alex Accepted Call */}
                {/* <div className="figma-notif-card">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Alex</h4>
                    <p className="notif-label">Accepted your call request</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">1h ago</span>
                </div>
              </div>
            </div> */}

                {/* CARD 4: Alex Date Planned (View Details) */}
                {/* <div className="figma-notif-card height-auto">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Alex</h4>
                    <p className="notif-label">Your date is planned for tomorrow</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">3h ago</span>
                </div>
              </div>
              <div className="details-btn-wrapper">
                <button className="view-details-pill">
                  View Details <ChevronRight size={14} strokeWidth={3} />
                </button>
              </div>
            </div> */}
              </div>
              <div className="notif-spacer"></div>
            </div>
          </>
        )}
        {activeTab === "Dating" && (
          <>
            <div className="notif-content slide-up">
              <div className="notif-stack">
                {/* CARD 1: Nikita Asked Out (Large Confirm Button) */}

                {date_request_notifications.length === 0 ? (
                  <div className="no-notif-placeholder">
                    <p>No dating notifications yet</p>
                  </div>
                ) : (
                  date_request_notifications?.map((notif, index) => (
                    <div  onClick={() => handleNotificationClick(notif)}
                        key={index}
                        className={`figma-notif-card ${
                          notif?.isRead ? "bg-white" : "bg-purple-200"
                        }`}>
                      <div className="card-main-row">
                        <div className="user-info-side">
                          <img
                            src={notif.AcceptingPersonImage}
                            className="avatar-50"
                            alt="user"
                          />
                          <div className="text-side">
                            <h4 className="user-name">
                              {notif?.body?.trim()?.split(" ").pop()}
                            </h4>
                            <p className="notif-label">{notif?.body}</p>
                          </div>
                        </div>
                        <div className="right-action-side">
                          <span className="time-text">
                            {getTimeAgo(notif.updatedAt)}
                          </span>
                          {/* <div className="btn-group-row">
                    <button className="btn-confirm-78">Confirm</button>
                    <button className="icon-x-btn"><X size={20} strokeWidth={3} color="#5a3c6d" /></button>
                  </div> */}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {/* CARD 2: Nikita Requested Call (Small Buttons) */}
        {/* <div className="figma-notif-card">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Nikita</h4>
                    <p className="notif-label">Requested for call</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">12m ago</span>
                  <div className="btn-group-row-sm">
                    <button className="btn-delete-52">Delete</button>
                    <button className="btn-confirm-52">Confirm</button>
                  </div>
                </div>
              </div>
            </div> */}

        {/* CARD 3: Alex Accepted Call */}
        {/* <div className="figma-notif-card">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Alex</h4>
                    <p className="notif-label">Accepted your call request</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">1h ago</span>
                </div>
              </div>
            </div> */}

        {/* CARD 4: Alex Date Planned (View Details) */}
        {/* <div className="figma-notif-card height-auto">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Alex</h4>
                    <p className="notif-label">Your date is planned for tomorrow</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">3h ago</span>
                </div>
              </div>
              <div className="details-btn-wrapper">
                <button className="view-details-pill">
                  View Details <ChevronRight size={14} strokeWidth={3} />
                </button>
              </div>
            </div> */}

        {activeTab === "Calls" && (
          <>
            <div className="notif-content slide-up">
              <div className="notif-stack">
                {callRequest_notifications.length === 0 ? (
                  <div className="no-notif-placeholder">
                    <p>No calling notifications yet</p>
                  </div>
                ) : (
                  callRequest_notifications?.map((notif, index) => (
                    <>
                      <div onClick={() => handleNotificationClick(notif)}
                        key={index}
                        className={`figma-notif-card ${
                          notif?.isRead ? "bg-white" : "bg-purple-200"
                        }`}>
                        <div className="card-main-row">
                          <div className="user-info-side">
                            <img
                              src={notif.AcceptingPersonImage}
                              className="avatar-50"
                              alt="user"
                            />
                            <div className="text-side">
                              <h4 className="user-name">
                                {notif?.body?.trim()?.split(" ").pop()}
                              </h4>
                              <div className="w-full">
                                <p className="notif-label">{notif?.body}</p>
                              </div>
                            </div>
                          </div>
                          <div className="right-action-side">
                            <span className="time-text line-clamp-1">
                              {getTimeAgo(notif.updatedAt)}
                            </span>
                            <div className="btn-group-row">
                              {notif.title == "New Call Request" ? (
                                <>
                                  <button
                                    className="btn-confirm-78"
                                    // onClick={() => navigate("/Request")}
                                  >
                                    View
                                  </button>
                                </>
                              ) : (
                                <>
                                  {/* <button
                                    className="btn-confirm-78"
                                    // onClick={() =>
                                    //   navigate("/matches/profile-details", {
                                    //     state: { receverId: notif?.receiverId },
                                    //   })
                                    // }
                                  >
                                    View Profile
                                  </button> */}
                                </>
                              )}

                              {/* <button className="icon-x-btn"><X size={20} strokeWidth={3} color="#5a3c6d" /></button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                )}
                {/* CARD 1: Nikita Asked Out (Large Confirm Button) */}

                {/* CARD 2: Nikita Requested Call (Small Buttons) */}
                {/* <div className="figma-notif-card">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Nikita</h4>
                    <p className="notif-label">Requested for call</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">12m ago</span>
                  <div className="btn-group-row-sm">
                    <button className="btn-delete-52">Delete</button>
                    <button className="btn-confirm-52">Confirm</button>
                  </div>
                </div>
              </div>
            </div> */}

                {/* CARD 3: Alex Accepted Call */}
                {/* <div className="figma-notif-card">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Alex</h4>
                    <p className="notif-label">Accepted your call request</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">1h ago</span>
                </div>
              </div>
            </div> */}

                {/* CARD 4: Alex Date Planned (View Details) */}
                {/* <div className="figma-notif-card height-auto">
              <div className="card-main-row">
                <div className="user-info-side">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="avatar-50" alt="user" />
                  <div className="text-side">
                    <h4 className="user-name">Alex</h4>
                    <p className="notif-label">Your date is planned for tomorrow</p>
                  </div>
                </div>
                <div className="right-action-side">
                  <span className="time-text">3h ago</span>
                </div>
              </div>
              <div className="details-btn-wrapper">
                <button className="view-details-pill">
                  View Details <ChevronRight size={14} strokeWidth={3} />
                </button>
              </div>
            </div> */}
              </div>
              <div className="notif-spacer"></div>
            </div>
          </>
        )}

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Notifications;
