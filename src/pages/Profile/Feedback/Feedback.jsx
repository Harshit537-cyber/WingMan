// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   ChevronLeft, AlignRight, Smile, Frown, Meh, 
//   SmilePlus, Angry, Mail 
// } from 'lucide-react';
// import AppLayout from '../../../components/AppLayout/AppLayout';
// import BottomNav from '../../../components/BottomNav/BottomNav';
// import './Feedback.css';

// const Feedback = () => {
//   const navigate = useNavigate();
//   const [selectedRating, setSelectedRating] = useState(null);

//   // Emojis data for feedback
//   const ratings = [
//     { id: 1, icon: <Smile size={32} /> },
//     { id: 2, icon: <SmilePlus size={32} /> },
//     { id: 3, icon: <Meh size={32} /> },
//     { id: 4, icon: <Frown size={32} /> },
//     { id: 5, icon: <Angry size={32} /> },
//   ];

//   return (
//     <AppLayout>
//       <div className="feedback-main-container">
        
//         {/* HEADER */}
//         <header className="feedback-top-nav">
//           <button className="nav-back-circle" onClick={() => navigate(-1)}>
//             <ChevronLeft size={28} color="#5a3c6d" />
//           </button>
//           <h1 className="feedback-nav-title">Feedback</h1>
//           <div className="nav-right-box">
//              <AlignRight size={26} color="#5a3c6d" />
//           </div>
//         </header>

//         <div className="feedback-scroll-content slide-up-animation">
          
//           {/* TEXT SECTION */}
//           <div className="feedback-header-text">
//             <h1 className="feedback-heading">How's your experience with Wingmann?</h1>
//             <p className="feedback-subtext">
//               You'r genuine feedback will help us to serve you better.
//             </p>
//           </div>

//           {/* REACTION EMOJIS */}
//           <div className="reactions-row">
//             {ratings.map((rate) => (
//               <div 
//                 key={rate.id} 
//                 className={`reaction-circle ${selectedRating === rate.id ? 'active' : ''}`}
//                 onClick={() => setSelectedRating(rate.id)}
//               >
//                 {rate.icon}
//               </div>
//             ))}
//           </div>

//           {/* MESSAGE BOX */}
//           <div className="feedback-input-container">
//             <textarea 
//                className="feedback-textarea" 
//                placeholder="Write Message......"
//                rows="8"
//             ></textarea>
//           </div>

//           {/* CONTACT INFO */}
//           <div className="feedback-contact-info">
//              <Mail size={18} color="#666" />
//              <p>Feel free to reach out us <span>hello@wingmann.in</span></p>
//           </div>

//           {/* SEND BUTTON */}
//           <div className="feedback-action-box">
//              <button className="feedback-send-btn">
//                Send
//              </button>
//           </div>

//           <div className="footer-spacer"></div>
//         </div>

//         <BottomNav />
//       </div>
//     </AppLayout>
//   );
// };

// export default Feedback;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, AlignRight, Smile, Frown, Meh, 
  SmilePlus, Angry, Mail 
} from 'lucide-react';

import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { postfeedback } from '../../../api/feedback'; // ✅ adjust path if needed

import './Feedback.css';

const Feedback = () => {
  const navigate = useNavigate();

  const [selectedRating, setSelectedRating] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Rating mapping (matches backend)
  const ratingTypeMap = {
    1: "very_good",
    2: "good",
    3: "average",
    4: "bad",
    5: "very_bad",
  };

  // 🔹 Emojis
  const ratings = [
    { id: 1, icon: <Smile size={32} /> },
    { id: 2, icon: <SmilePlus size={32} /> },
    { id: 3, icon: <Meh size={32} /> },
    { id: 4, icon: <Frown size={32} /> },
    { id: 5, icon: <Angry size={32} /> },
  ];

  // 🔹 Submit handler
  const handleSubmit = async () => {
    try {
      if (!selectedRating) {
        alert("Please select a rating");
        return;
      }

      setLoading(true);

      const payload = {
        userDataId: localStorage.getItem("userId"), // 🔥 make sure this exists
        type: ratingTypeMap[selectedRating],
        message: message,
      };

      const res = await postfeedback(payload);

 

      alert("Feedback submitted successfully ✅");

      // Reset form
      setSelectedRating(null);
      setMessage("");
      navigate("/home");

    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit feedback ❌");
    } finally {
      setLoading(false);
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
          
          {/* TEXT */}
          <div className="feedback-header-text">
            <h1 className="feedback-heading">
              How's your experience with Wingmann?
            </h1>
            <p className="feedback-subtext">
              Your genuine feedback will help us serve you better.
            </p>
          </div>

          {/* EMOJIS */}
          <div className="reactions-row">
            {ratings.map((rate) => (
              <div 
                key={rate.id} 
                className={`reaction-circle ${
                  selectedRating === rate.id ? 'active' : ''
                }`}
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

          {/* CONTACT */}
          <div className="feedback-contact-info">
            <Mail size={18} color="#666" />
            <p>
              Feel free to reach out us <span>hello@wingmann.in</span>
            </p>
          </div>

          {/* BUTTON */}
          <div className="feedback-action-box">
            <button 
              className="feedback-send-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

          <div className="footer-spacer"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Feedback;