import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, AlignRight, Heart } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./Dates.css";
import { useUser } from "../../../context/userinfo";
const userImg = "https://randomuser.me/api/portraits/women/44.jpg";

const Dates = () => {
  const navigate = useNavigate();
  const { requestedDateReq, dateaccepted } = useUser();
  console.log("requestedDateReq : ", requestedDateReq);

  return (
    <AppLayout>
      <div className="dates-screen-container">
        {/* --- HEADER --- */}
        <header className="dates-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="header-title">Dates</h1>
          <div className="header-right-icons">
            <Bell
              size={26}
              color="#5a3c6d"
              onClick={() => navigate("/notifications")}
              style={{ cursor: "pointer" }}
            />
            <AlignRight
              size={26}
              color="#5a3c6d"
              onClick={() => navigate("/settings")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="dates-content-scroll">
          {/* Card 1: Someone asked you out -> Route to AskedOut page */}
          <section className="dates-section fade-in">
            <div className="horizontal-date-card">
              <div className="card-header-row">
                <div className="title-with-heart">
                  <span>Someone asked you out</span>
                  <Heart size={18} fill="#5a3c6d" color="#5a3c6d" />
                </div>
                <span className="count-badge">
                  {requestedDateReq.length || ""}
                </span>
              </div>
              <div>
                <div className="avatar-row">
                  {requestedDateReq.length > 0 ? (
                    requestedDateReq?.map((value, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          navigate("/asked-out", {
                            state: { data: requestedDateReq },
                          })
                        }
                        className="avatar-circle"
                      >
                        <img
                          src={
                            value?.senderId?.profilephoto ||
                            `https://randomuser.me/api/portraits/men/${index + 10}.jpg`
                          }
                          alt={value?.senderId?.name}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="no-requests-placeholder text-gray-400">
                      No new date requests
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="avatar-row">
                <div className="avatar-circle"><img src={userImg} alt="user" /></div>
                <div className="avatar-circle"><img src={userImg} alt="user" /></div>
                <div className="avatar-circle"><img src={userImg} alt="user" /></div>
              </div> */}
            </div>
          </section>

          {/* Grid Section: Planned & Proposed */}
          <section className="grid-section slide-up">
            {/* Planned Dates Card */}
            <div
              className="vertical-date-card"
              onClick={() =>
                navigate("/planned-dates", {
                  state: { date: dateaccepted },
                })
              }
            >
              <h3>
                Planned <br /> Dates
              </h3>
              {dateaccepted.length >0 ? dateaccepted.map((value, index) => (
                <div key={index} className="large-avatar">
                  <img
                    src={
                      value?.senderId?.profilephoto ||
                      `https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg`
                    }
                  />
                </div>
              )) : <div className="no-requests-placeholder text-gray-400">No planned dates</div>}
             {/* <div className="large-avatar">
                <img src={userImg} alt="user" />
              </div> */}
            </div>

            {/* Proposed Dates Card */}
            {/* <div
              className="vertical-date-card"
              onClick={() => navigate("/proposed-dates")}
            >
              <h3>
                Proposed <br /> dates
              </h3>
              <div className="large-avatar">
                <img src={userImg} alt="user" />
              </div>
            </div> */}
          </section>

          {/* Card 4: Completed Dates -> Route to Completed page */}
          {/* <section
            className="dates-section slide-up delay-1"
            onClick={() => navigate("/completed-dates")}
          >
            <div className="horizontal-date-card">
              <div className="card-header-row">
                <div className="title-with-heart">
                  <span>Completed Dates</span>
                  <Heart size={18} fill="#5a3c6d" color="#5a3c6d" />
                </div>
                <span className="count-badge">3</span>
              </div>
              <div className="avatar-row">
                <div className="avatar-circle">
                  <img src={userImg} alt="user" />
                </div>
                <div className="avatar-circle">
                  <img src={userImg} alt="user" />
                </div>
                <div className="avatar-circle">
                  <img src={userImg} alt="user" />
                </div>
              </div>
            </div>
          </section> */}

          <div className="bottom-spacing"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Dates;
