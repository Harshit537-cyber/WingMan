import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  AlignRight,
  Smile,
  Frown,
  Meh,
  SmilePlus,
  Angry,
  Mail,
} from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./Feedback.css";
import  { submitFeedback } from '../../../api/feedback'
const Feedback = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState(null);
 

  // Emojis data for feedback
  const ratings = [
    { id: 1, icon: <Smile size={32} /> },
    { id: 2, icon: <SmilePlus size={32} /> },
    { id: 3, icon: <Meh size={32} /> },
    { id: 4, icon: <Frown size={32} /> },
    { id: 5, icon: <Angry size={32} /> },
  ];

  const ratingMap = {
    1: "very_good",
    2: "good",
    3: "average",
    4: "bad",
    5: "very_bad",
  };


 const handleSubmit = async () => {
  if (!selectedRating) {
    alert("Please select a rating");
    return;
  }

  const payload = {
    userDataId: JSON.parse(localStorage.getItem("user"))?._id,
    type: ratingMap[selectedRating],
    message,
  };

  console.log("📦 Payload:", payload);

  const res = await submitFeedback(payload);

  if (res?.success) {
    alert("✅ Feedback submitted successfully");
    setSelectedRating(null);
    setMessage("");
    navigate('/profile')
  } else {
    alert(res?.message || "❌ Something went wrong");
  }
};

  return (
    <AppLayout>
      <div className="feedback-main-container">
        {/* HEADER */}
        <header className="feedback-top-nav">
          <button className="nav-back-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="feedback-nav-title">Feedback</h1>
          <div className="nav-right-box">
            <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className="feedback-scroll-content slide-up-animation">
          {/* TEXT SECTION */}
          <div className="feedback-header-text">
            <h1 className="feedback-heading">
              How's your experience with Wingmann?
            </h1>
            <p className="feedback-subtext">
              You'r genuine feedback will help us to serve you better.
            </p>
          </div>

          {/* REACTION EMOJIS */}
          <div className="reactions-row">
            {ratings.map((rate) => (
              <div
                key={rate.id}
                className={`reaction-circle ${selectedRating === rate.id ? "active" : ""}`}
                onClick={() => setSelectedRating(rate.id)}
              >
                {rate.icon}
              </div>
            ))}
          </div>

          {/* MESSAGE BOX */}
          <div className="feedback-input-container">
            <textarea
              className="feedback-textarea"
              placeholder="Write Message......"
              rows="8"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          {/* CONTACT INFO */}
          <div className="feedback-contact-info">
            <Mail size={18} color="#666" />
            <p>
              Feel free to reach out us <span>hello@wingmann.in</span>
            </p>
          </div>

          {/* SEND BUTTON */}
          <div className="feedback-action-box" onClick={handleSubmit}>
            <button className="feedback-send-btn">Send</button>
          </div>

          <div className="footer-spacer"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Feedback;
