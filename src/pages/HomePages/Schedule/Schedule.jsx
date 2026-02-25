import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./Schedule.css";
import axiosInstance from "../../../api/axiosInstance";
const Schedule = () => {
  const navigate = useNavigate();

  // States for selection
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  console.log("default date :", selectedDate);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  const getNextSevenDays = () => {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      daysArray.push({
        fullDate: currentDate.toISOString().split("T")[0], // YYYY-MM-DD
        day: currentDate.toLocaleDateString("en-US", { weekday: "short" }),
        date: currentDate.getDate(),
        disabled: false,
      });
    }

    return daysArray;
  };

  const dates = getNextSevenDays();
  console.log("date : ", dates);

  // Dummy Data for Times
  const timeSlots = [
    { time: "10:00 AM", disabled: false },
    { time: "11:00 AM", disabled: false },
    { time: "12:00 PM", disabled: false },
    { time: "01:00 PM", disabled: false },
    { time: "02:00 PM", disabled: false },
    { time: "03:00 PM", disabled: false },
    { time: "04:00 PM", disabled: true }, // Disabled time
    { time: "05:00 PM", disabled: false },
    { time: "06:00 PM", disabled: false },
    { time: "07:00 PM", disabled: false },
    { time: "08:00 PM", disabled: false },
    { time: "09:00 PM", disabled: false },
  ];

  const handleConfirmSchedule = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;

      // Convert selectedDate to ISO
      const formattedDate = new Date(selectedDate)
        .toISOString()
        .replace("Z", "+00:00");
      const payload = {
        userName: user.name,
        userEmail: user.email,
        day: new Date(selectedDate).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        // day:"Monday",
        date: formattedDate,
        time: selectedTime,
      };
      console.log(payload);

      const response = await axiosInstance.post(
        `/book-slot/${userId}`,
        payload,
      );

      if (response.data.success) {
        console.log(selectedTime);
        // Navigate after success
        navigate("/schedule-video-call", {
          state: {
            booking: response.data.data.booking,
            meetLink: response.data.data.meetLink,
            time: selectedTime,
            date: selectedDate,
          },
        });
      }
    } catch (error) {
      console.log("Booking error:", error.response?.data || error.message);
      alert(error.response.data.message)
    }
  };

  return (
    <AppLayout>
      <div className="schedule-container">
        {/* Header Section */}
        <header className="schedule-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} />
          </button>
          <h1 className="header-title">
            Availability Of The <br /> Wingmann Executive
          </h1>
        </header>

        <div className="schedule-content">
          {/* Date Picker Section */}
          <section className="date-section slide-up">
            <h2 className="label-text">Select Date</h2>
            <div className="date-scroll-wrapper">
              {dates.map((item) => (
                <div
                  key={item.fullDate}
                  className={`date-card 
      ${selectedDate === item.fullDate ? "active" : ""} 
      ${item.disabled ? "disabled" : ""}`}
                  onClick={() =>
                    !item.disabled && setSelectedDate(item.fullDate)
                  }
                >
                  <span className="day">{item.day}</span>
                  <span className="date-num">{item.date}</span>
                  {selectedDate === item.fullDate && (
                    <div className="active-line"></div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Time Picker Section */}
          <section className="time-section slide-up delay-1">
            <h2 className="label-text">Choose Time</h2>
            <p className="sub-label">Select at least 3 different time slots</p>

            <div className="time-grid">
              {timeSlots.map((item) => (
                <button
                  key={item.time}
                  className={`time-slot ${selectedTime === item.time ? "selected" : ""} ${item.disabled ? "is-disabled" : ""}`}
                  onClick={() => !item.disabled && setSelectedTime(item.time)}
                  disabled={item.disabled}
                >
                  {item.time.split(" ")[0]} <br />
                  <small>{item.time.split(" ")[1]}</small>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Action Button */}
        <div className="confirm-btn-wrapper fade-in-up">
          <button
            className="confirm-schedule-btn"
            onClick={handleConfirmSchedule}
          >
            Confirm Schedule
          </button>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Schedule;
