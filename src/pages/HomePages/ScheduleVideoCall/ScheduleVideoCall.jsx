import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../../../components/AppLayout/AppLayout";
import "./ScheduleVideoCall.css";

const ScheduleVideoCall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);

  // Dynamic Data from Previous Screen
  const selectedDate = new Date(location.state?.date).getDate();
  const bookingDate = location.state.booking?.date;

  const selectedMonth = bookingDate
    ? new Date(bookingDate).toLocaleString("en-US", { month: "long" })
    : "January";
  console.log(selectedMonth);
  const selectedYear = location.state.booking?.year || "2026";
  const selectedTime = location.state?.time;
  const meetLink = location?.state?.meetLink;
  console.log("selectedTime", selectedTime);
  const doc_id = location?.state?.doc_id;
  console.log('doc _id :', doc_id)

  const formatTime = (time) => {
    const [hour, min] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${min} ${ampm}`;
  };

  // Calculate 30 min end time
  const getEndTime = (start) => {
    let [h, m] = start.split(":").map(Number);

    m += 30;
    if (m >= 60) {
      m -= 60;
      h += 1;
    }

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  return (
    <AppLayout>
      <div className="schedule-confirm-page">
        <h1 className="page-header-title fade-in">Schedule Video Call</h1>

        <div className="card-outer-wrapper slide-up">
          <div className="ticket-card">
            {/* Top Section */}
            <div className="ticket-top">
              <div className="calendar-graphic">
                <div className="calendar-rings">
                  <span></span>
                  <span></span>
                </div>
                <div className="calendar-header-strip"></div>
                <div className="calendar-main-body">
                  <span className="dynamic-day m-auto">
                    {" "}
                    {formatTime(selectedTime)}
                  </span>
                </div>
              </div>

              <div className="booking-info">
                <h2 className="display-date">
                  {selectedMonth} {selectedDate}, {selectedYear}
                </h2>

                <p className="display-time">
                  {selectedTime} - {getEndTime(selectedTime)}
                </p>
              </div>
            </div>

            {/* Premium Notched Divider */}
            <div className="ticket-divider">
              <div className="left-notch"></div>
              <div className="dashed-line"></div>
              <div className="right-notch"></div>
            </div>

            {/* Bottom Section */}
            <div className="ticket-bottom">
              <p className="description-text">
                A half an hour call to verify your profile and help us know you
                better.
              </p>

              <button
                className="final-confirm-btn"
                onClick={() =>
                  navigate("/schedule-confirmed", {
                    state: { meetLink: meetLink, doc_id:doc_id },

                  })
                }
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Curve */}
        <div className="bottom-wave-bg">
          <svg
            width="100%"
            height="100"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 Q100,40 200,80 T400,80"
              fill="none"
              stroke="#E2D8E8"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>
        </div>
      </div>
    </AppLayout>
  );
};

export default ScheduleVideoCall;
