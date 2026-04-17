import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PickACard.css';

const PickACard = () => {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const scrollRef = useRef(null);

    const cardsData = [
        { id: 1, title: "Attachment & Comfort Zone", route: "/attachment" },
        { id: 2, title: "Lifestyle & Value", route: "/lifestyle-quiz" },
        { id: 3, title: "Emotional Communication", route: "/upset" },
        { id: 4, title: "Conflict & Repair Patterns", route: "/conflict-quiz" },
        { id: 5, title: "Growth, Readiness & Emotional Maturity", route: "/assessment-quiz" }
    ];

    useEffect(() => {
        const fetchProgress = async () => {
            // 1. Agar flag "true" hai toh direct saare cards tick kar do
            const isGlobalDone = localStorage.getItem("all_quizzes_done") === "true";
            
            if (isGlobalDone) {
                setCompletedQuizzes(cardsData.map(c => c.title));
                return; 
            }

            try {
                const token = localStorage.getItem('auth_token');
                
                // 2. Local Storage sync (Partial progress)
                const localData = JSON.parse(localStorage.getItem("quiz_progress")) || [];
                const localNames = localData.map(q => q.quizName);

                // 3. Server sync (Submitted quizzes)
                const res = await axios.get('https://wingmann.onrender.com/api/quiz/my-quizzes', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const serverNames = res.data.data.map(q => q.quizName);

                // 4. Combine both
                const allDone = [...new Set([...localNames, ...serverNames])];
                setCompletedQuizzes(allDone);

                // Check if all 5 are done on server and update flag
                if (serverNames.length >= 5) {
                    localStorage.setItem("all_quizzes_done", "true");
                }

            } catch (err) {
                console.error("Error fetching progress", err);
            }
        };

        fetchProgress();
        
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', () => navigate('/home', { replace: true }));
    }, [navigate]);

    const handleContinue = () => {
        const card = cardsData[activeCard];
        if (completedQuizzes.includes(card.title)) {
            alert("This section is already completed!");
            return;
        }
        navigate(card.route);
    };

    return (
        <div className="main-container-fixed">
            <header className="fixed-header">
                <button className="back-btn-icon" onClick={() => navigate('/home', { replace: true })}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <h1 className="title-text">Pick A Card</h1>
            </header>

            <div className="horizontal-scroll-section" ref={scrollRef}>
                {cardsData.map((card, index) => {
                    const isDone = completedQuizzes.includes(card.title);
                    return (
                        <div key={card.id} className={`card-wrapper ${activeCard === index ? 'active-card' : 'inactive-card'}`}>
                            <div className={`card-content-box ${isDone ? 'done-style' : ''}`}>
                                {isDone && (
                                    <div className="card-tick-badge">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#5D326F"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                                    </div>
                                )}
                                <h2 className="card-heading">{card.title}</h2>
                            </div>
                        </div>
                    );
                })}
            </div>
            <footer className="fixed-footer">
                <button className="cta-button" onClick={handleContinue}>Continue</button>
            </footer>
        </div>
    );
};

export default PickACard;