import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./Schedule.css";
import axiosInstance from "../../../api/axiosInstance";
import { fetchdata } from "./getInterviewAPI";

const Schedule = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [scheduleData, setScheduleData] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  console.log(selectedTime);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📅 Get next 7 days
  const getNextSevenDays = () => {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      daysArray.push({
        fullDate: currentDate.toISOString().split("T")[0],
        day: currentDate.toLocaleDateString("en-US", { weekday: "short" }),
        date: currentDate.getDate(),
        disabled: false,
      });
    }

    return daysArray;
  };

  const dates = getNextSevenDays();

  // ✅ API CALL
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      const data = await fetchdata(selectedDate);
      setScheduleData(data || []);
      setLoading(false);
    };

    if (selectedDate) {
      getSchedule();
    }
  }, [selectedDate]);

  // 🕒 Format Time
  const formatTime = (time) => {
    const [hour, min] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${min} ${ampm}`;
  };

  // ✅ Confirm Booking
  const handleConfirmSchedule = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;

      const formattedDate = new Date(selectedDate)
        .toISOString()
        .replace("Z", "+00:00");

      const payload = {
        userName: user.name,
        userEmail: user.email,
        interviewerId: selectedInterviewer,
        day: new Date(selectedDate).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        date: formattedDate,
        time: selectedTime,
      };

      const response = await axiosInstance.post(
        `/book-slot/${userId}`,
        payload,
      );

      if (response.data.success) {
        navigate("/schedule-video-call", {
          state: {
            booking: response.data.data.booking,
            meetLink: response.data.data.meetLink,
            time: selectedTime,
            date: selectedDate,
            doc_id : response.data.data.booking._id
          },
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <AppLayout>
      <div className="schedule-container">
        {/* Header */}
        <header className="schedule-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} />
          </button>
          <h1 className="header-title">
            Availability Of The <br /> Wingmann Executive
          </h1>
        </header>

        <div className="schedule-content">
          {/* 📅 Date Section */}
          <section className="date-section">
            <h2>Select Date</h2>

            <div className="date-scroll-wrapper">
              {dates.map((item) => (
                <div
                  key={item.fullDate}
                  className={`date-card ${
                    selectedDate === item.fullDate ? "active" : ""
                  }`}
                  onClick={() => setSelectedDate(item.fullDate)}
                >
                  <span>{item.day}</span>
                  <span>{item.date}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 🕒 Time Section */}
          <section className="time-section">
            <h2>Available Slots</h2>

            {loading ? (
              <p>Loading...</p>
            ) : scheduleData.length === 0 ? (
              <p>No slots available</p>
            ) : (
              scheduleData.map((item, index) => (
                <div key={index} className="interviewer-block">
                  {/* 👤 Interviewer Name */}
                  <h3 className="text-purple-700 font-semibold text-lg pt-4">
                    {item.interviewerName}
                  </h3>

                  {/* ⏰ Slots */}
                  <div className="time-grid">
                    {item.times?.map((time, i) => (
                      <button
                        key={i}
                        className={`time-slot ${
                          selectedSlot?.time === time &&
                          selectedSlot?.interviewerId === item.interviewerId
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedSlot({
                            time: time,
                            interviewerId: item.interviewerId,
                          });

                          setSelectedTime(time);
                          setSelectedInterviewer(item.interviewerId);
                        }}
                      >
                        {formatTime(time)}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>
        </div>

        {/* ✅ Confirm Button */}
        <div className="confirm-btn-wrapper">
          <button
            className="confirm-schedule-btn"
            onClick={handleConfirmSchedule}
            disabled={!selectedTime}
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
