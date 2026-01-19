import React, { useState } from 'react';
import './Interests.css';
import { useNavigate } from 'react-router-dom';

const Interests = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(["Eating Out", "Cooking", "Parting", "Fitness"]);

    const options = ["Eating Out", "Pets", "Music", "Reading", "Cooking", "Travel", "Movies", "Theatre", "Parting", "Shopping", "Art and Craft", "Adventure", "Dancing", "Fitness", "Singing", "Video Games", "Gardening", "Sports", "Yoga", "Photography", "Meditation"];

    return (
        <div className="web-container">
            <div className="interests-screen animate-fade-in">
                
                {/* Is div ke andar scroll hoga */}
                <div className="scrollable-content">
                    <div className="back-btn" onClick={() => navigate(-1)}>‹</div>
                    <h1 className="title-text">What do you love doing in your free time?</h1>
                    <p className="sub-text">Anything that makes you You! Select upto 5</p>
                    <div className="interests-grid">
                        {options.map((item) => (
                            <div 
                                key={item} 
                                className={`interest-item ${selected.includes(item) ? 'selected' : ''}`}
                                onClick={() => setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Yeh div fixed rahega screen par niche */}
                <div className="bottom-nav">
                    <div className="next-circle-btn" onClick={() => navigate('/appreciate')}>
                        <div className="inner-circle">
                            <span style={{ fontSize: '20px' }}>&rarr;</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Interests;