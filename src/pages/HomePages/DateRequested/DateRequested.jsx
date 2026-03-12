import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, AlignRight, X } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./DateRequested.css";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DateRequested = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.payload;

  // Selection Logic States
  const [selectedDate, setSelectedDate] = useState(null);
  const month = new Date().toLocaleString("default", { month: "short" });

 const date=("date :", `${selectedDate} ${month}`);
  console.log("date : ", date);
  const [completedPairs, setCompletedPairs] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getNextSevenDays = () => {
    const today = new Date();

    return Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      return {
        day: currentDate.toLocaleDateString("en-US", { weekday: "short" }),
        id: currentDate.getDate().toString(),
      };
    });
  };

  const dates = getNextSevenDays();
  console.log(dates);
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  const handleTimeSelect = async (time) => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }

    if (completedPairs.length >= 3) return;

    const newPair = {
      date: date,
      day: new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      time: time,
    };
    const updatedPairs = [...completedPairs, newPair];
    console.log(updatedPairs);
    setCompletedPairs(updatedPairs);
    setSelectedDate(null);

    // When 3 date-time pairs are selected
    if (updatedPairs.length === 3) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          alert("User not found. Please login again.");
          return;
        }

        const payload = {
          senderId: user._id,
          receiverId: data?.receiverId,
          locationType: data?.dateType,
          budget: `${data?.budget.min}-${data?.budget.max}`,
          mealType: data?.selectedMoods,
          payType: data?.payWay?.toLowerCase(),
          dateSlots: updatedPairs,
        };

        const res = await axiosInstance.post("date-request/create", payload);

        console.log(res.data);

        if (res.data) {
          setShowSuccessModal(true);
        }
      } catch (error) {
        console.log(error.response?.data);
      }
    }
  };

  return (
    <AppLayout>
      <div className="date-requested-container">
        {/* Is div ko blur karenge jab modal open hoga */}
        <div
          className={`main-content-wrapper ${showSuccessModal ? "apply-blur" : ""}`}
        >
          {/* HEADER */}
          <header className="top-nav-bar">
            <button className="back-circle" onClick={() => navigate(-1)}>
              <ChevronLeft size={28} color="#5a3c6d" />
            </button>
            <h1 className="nav-title">Date Requested</h1>
            <div className="nav-right">
              <Bell
                size={26}
                color="#5a3c6d"
                onClick={() => navigate("/notifications")}
              />
              <AlignRight size={26} color="#5a3c6d" />
            </div>
          </header>

          <div className="req-scroll-body">
            <div className="selection-status">
              Selected: <span>{completedPairs.length} / 3 slots</span>
            </div>

            {/* DATE SECTION */}
            <section className="ui-card-section">
              <h2 className="section-h2">Choose Dates</h2>
              <p className="section-p">
                Select a date as per your availability.
              </p>

              <div className="date-picker-card">
                {dates.map((item) => {
                  const isAlreadyDone = completedPairs.find(
                    (p) => p.date === item.id,
                  );
                  return (
                    <div
                      key={item.id}
                      className={`date-node ${selectedDate === item.id ? "active" : ""} ${isAlreadyDone ? "done" : ""}`}
                      onClick={() => !isAlreadyDone && setSelectedDate(item.id)}
                    >
                      <span className="node-day">{item.day}</span>
                      <span className="node-date">{item.id}</span>
                      {selectedDate === item.id && (
                        <div className="purple-underline-bar"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TIME SECTION */}
            <section className="ui-card-section">
              <h2 className="section-h2">Choose Time</h2>
              <p className="section-p">
                Select 1 time slot for the selected date
              </p>

              <div className="time-grid-layout">
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className="time-slot-item"
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot.split(" ")[0]}
                    <br />
                    {slot.split(" ")[1]}
                  </div>
                ))}
              </div>
            </section>

            <div className="bottom-spacer"></div>
          </div>

          {/* User's BottomNav Component - Unchanged */}
          <BottomNav />
        </div>

        {/* POPUP MODAL - Fixed and Centered */}
        {showSuccessModal && (
          <div className="fixed-modal-overlay">
            <div className="success-modal-box slide-up-animation">
              <div className="modal-icon-square">
                <X size={35} strokeWidth={1.5} color="#1a1a1a" />
              </div>
              <h2 className="modal-title-text">Your date request is sent</h2>
              <p className="modal-subtitle-text">
                We’ll notify you once the user confirms.
              </p>
              <button
                className="modal-action-btn"
                onClick={() => navigate("/matches")}
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DateRequested;
