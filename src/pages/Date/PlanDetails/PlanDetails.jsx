import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  AlignRight,
  Calendar,
  Utensils,
  Banknote,
  CheckCircle2,
} from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./PlanDetails.css";
import { fetchdateRequestdata, Confirmdate } from "./apicall";
import { useUser } from "../../../context/userinfo";

const PlanDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUser } = useUser();
  const id = location?.state?.id || [];
  const [dateRequest, setDateRequest] = useState(null);
  console.log(dateRequest);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateId, setSelectedDateId] = useState(null);
  console.log(selectedDateId);
  const name = location?.state?.name || "";
  console.log(name, id);
  const user = JSON.parse(localStorage.getItem("user"));
  const receiverId = user?._id;
  const [selectedSlot, setSelectedSlot] = useState(null);
  console.log(selectedSlot);
  // const [selectedDate, setSelectedDate] = useState("12 JAN (Mon)");
  // const [selectedTime, setSelectedTime] = useState("1:00 PM");

  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetchdateRequestdata(id, receiverId);

      console.log(data);
      if (data?.data?.length) {
        setDateRequest(data.data[0]);
      }
    };
    fetchdata();
  }, []);

  const handleConfirmDate = async (dateRequestId, status, dateId) => {
    console.log("Confirming date with ID:", dateRequestId);
    const data = await Confirmdate(dateRequestId, status, dateId);
    console.log("Date confirmation response:", data);
    if (data.success == true) {
      fetchUser();
      navigate("/dates");
    }
  };

  return (
    <AppLayout>
      <div className="plan-page-container">
        {/* --- HEADER --- */}
        <header className="plan-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="header-title">Plan</h1>
          <button className="menu-btn">
            <AlignRight size={28} color="#5a3c6d" />
          </button>
        </header>

        {/* --- CONTENT --- */}
        <div className="plan-scroll-content">
          <div className="main-msg-section">
            <h2 className="request-title">
              {name} Has Requested A Date With You!
            </h2>
            <p className="request-subtitle">
              Select One Option That Works Best For You.
            </p>
          </div>

          {/* Date & Time Card */}
          <section className="plan-card">
            <div className="card-header-main">
              <div className="icon-bg-purple">
                <Calendar size={18} color="#fff" />
              </div>

              <div className="header-text-group">
                <h3 className="card-title-text">
                  Choose Preferred Date & Time
                </h3>
                <p className="card-subtitle-text">
                  Select One Options That Work Best For You
                </p>
              </div>
            </div>

            <div className="selection-area">
              <div className="dates-row">
                {dateRequest?.dateSlots?.map((slot) => {
                  return (
                  
                    <button
                      key={slot._id}
                      className={`date-chip-box ${
                        selectedDateId === slot._id ? "active" : ""
                      }`}
                      onClick={() => setSelectedDateId(slot._id)}
                    >
                      <Calendar size={14} />
                      <span>
                        {`${slot.date}`} <br /> {` (${slot.day})`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <h4 className="slot-heading">Available Time Slot</h4>

              <div className="times-row">
                {dateRequest?.dateSlots?.map((slot) => (
                  <button
                    key={slot._id}
                    className={`time-chip-pill ${
                      selectedDateId === slot._id ? "active" : ""
                    }`}
                    onClick={() => setSelectedDateId(slot._id)}
                  >
                    <CheckCircle2 size={14} />
                    <span>{slot.time}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="food-mood-card-exact">
            <div className="fm-header">
              <Utensils size={24} color="#7a4ca3" strokeWidth={2.2} />
              <h1 className="fm-title">Food Mood</h1>
            </div>

            <p className="fm-preference">
              Preference -{" "}
              <span className="fm-purple-val">{dateRequest?.locationType}</span>
            </p>
            <div className="fm-chips-wrapper">
              {dateRequest?.mealType.map((value, index) => {
                return (
                  <div className="fm-chip-box" key={index}>
                    {value}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Budget Card */}
          <section className="plan-card">
            <div className="card-header-simple">
              <div className="budget-icon-container">
                <Banknote size={20} color="#5a3c6d" fill="#5a3c6d" />
              </div>
              <h3 className="card-title-text">Budget & Expenses</h3>
            </div>
            <div className="budget-info-rows">
              <div className="b-row">
                <span className="b-label">Estimated Budget</span>
                <span className="b-value">{dateRequest?.budget}/person</span>
              </div>
              <div className="b-row">
                <span className="b-label">Preferred To Pay :</span>
                <span className="pay-status-chip">
                  {dateRequest?.payType == "him"
                    ? "He Will Pay "
                    : dateRequest?.payType == "her"
                      ? "She Will Pay "
                      : "Payment Split "}
                </span>
              </div>
            </div>
          </section>

          <div className="bottom-padding"></div>

          <div className="flex flex-col space-y-2 confirm-scroll-container">
            {dateRequest?.status === "rejected" ? (
              <button
                disabled
                className="bg-red-100 py-3.5 rounded-[14px] font-semibold text-lg text-red-600 cursor-not-allowed"
              >
                Rejected
              </button>
            ) : (
              <>
                <button
                  className="confirm-plan-btn"
                  onClick={() =>
                    handleConfirmDate(dateRequest?._id, "accepted", selectedDateId)
                  }
                >
                  Confirm Plan
                </button>

                <button
                  className="bg-red-100 py-3.5 rounded-[14px] font-semibold text-lg text-red-600"
                  onClick={() =>
                    handleConfirmDate(dateRequest?._id, "rejected")
                  }
                >
                  Reject Plan
                </button>
              </>
            )}
          </div>

          <div className="bottom-padding"></div>
        </div>
        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default PlanDetails;
